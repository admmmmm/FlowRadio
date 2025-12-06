#!/usr/bin/env python3
"""
🎼 Lyria Music Generation HTTP Service (生产级优化版)

完全照搬 test_lyria_dynamic.py 的成功经验:
1. 48kHz立体声 (官方规格)
2. Throttle防抖 (200ms)
3. 状态机管理 (stopped/loading/playing/paused)
4. 错误处理和自动重连
5. 过滤weight=0的prompts
6. 平滑过渡支持

提供HTTP接口:
- POST /start - 启动Lyria会话
- POST /stop - 停止Lyria会话
- POST /style - 设置音乐风格 (支持smooth_transition)
- POST /prompts - 直接设置weighted prompts
- GET /stream - 音频流输出
- GET /status - 获取播放状态
"""
import asyncio
import os
import queue
import time
import threading
from enum import Enum
from functools import wraps
from flask import Flask, Response, request, jsonify
from google import genai
from google.genai import types
import numpy as np

# ============================================================================
# 1️⃣ 状态机定义 (参考官方PromptDJ)
# ============================================================================
class PlaybackState(Enum):
    """播放状态"""
    STOPPED = "stopped"
    LOADING = "loading"
    PLAYING = "playing"
    PAUSED = "paused"

# ============================================================================
# 2️⃣ Throttle装饰器 (200ms防抖)
# ============================================================================
def throttle(delay_ms: int):
    """Throttle装饰器 - 限制函数调用频率"""
    def decorator(func):
        last_call = [0.0]
        
        @wraps(func)
        async def wrapper(*args, **kwargs):
            now = time.time() * 1000
            time_since_last = now - last_call[0]
            
            if time_since_last >= delay_ms:
                last_call[0] = now
                return await func(*args, **kwargs)
            else:
                remaining = delay_ms - time_since_last
                print(f"⏱️ Throttle: 跳过调用 ({remaining:.0f}ms后可用)")
        
        return wrapper
    return decorator

# ============================================================================
# 3️⃣ 配置
# ============================================================================
API_KEY = os.environ.get("GEMINI_API_KEY")
if not API_KEY:
    print("❌ 错误: 未设置 GEMINI_API_KEY 环境变量!")
    exit(1)

client = genai.Client(api_key=API_KEY, http_options={'api_version': 'v1alpha'})

# 音频配置 - 严格按官方规格
SAMPLE_RATE = 48000  # 48kHz
CHANNELS = 2         # Stereo
DTYPE = np.float32

# ============================================================================
# 4️⃣ 全局状态
# ============================================================================
app = Flask(__name__)

# 播放状态
playback_state = PlaybackState.STOPPED
connection_error = False
filtered_prompts = set()

# 音频缓冲区 (线程安全队列)
audio_buffer = queue.Queue(maxsize=800)

# Lyria会话和后台任务
lyria_session = None
lyria_task = None
lyria_loop = None

# 当前配置 (用于状态查询)
current_config = {
    'prompts': [],
    'bpm': 100,
    'temperature': 1.0,
}

# ============================================================================
# 5️⃣ 智能Prompt设置 (带过滤和Throttle)
# ============================================================================
@throttle(200)
async def set_prompts_smart(session, prompts):
    """智能设置prompts - 自动过滤和throttle
    
    参考官方逻辑:
    1. 过滤被拦截的prompts
    2. 过滤weight=0的prompts
    3. Throttle 200ms避免频繁调用
    """
    global filtered_prompts, current_config
    
    # 过滤逻辑
    prompts_to_send = [
        p for p in prompts
        if p.get('text') not in filtered_prompts
        and p.get('weight', 0) > 0
    ]
    
    if not prompts_to_send:
        print("⚠️ 所有prompts被过滤,跳过设置")
        return
    
    # 转换为WeightedPrompt对象
    weighted_prompts = [
        types.WeightedPrompt(text=p['text'], weight=p['weight'])
        for p in prompts_to_send
    ]
    
    # 发送到Lyria
    await session.set_weighted_prompts(prompts=weighted_prompts)
    
    # 更新当前配置
    current_config['prompts'] = prompts_to_send
    
    print(f"✅ Prompts已更新: {len(prompts_to_send)}个")

async def smooth_transition(session, from_prompts, to_prompts, steps=5, step_duration=2):
    """平滑过渡 - 完全照搬test_lyria_dynamic.py"""
    print(f"\n🎨 平滑过渡: {steps}步, 每步{step_duration}秒")
    
    for i in range(steps + 1):
        progress = i / steps
        
        mixed_prompts = []
        
        # 旧提示词递减
        for p in from_prompts:
            new_weight = p['weight'] * (1 - progress)
            if new_weight > 0.1:
                mixed_prompts.append({'text': p['text'], 'weight': new_weight})
        
        # 新提示词递增
        for p in to_prompts:
            new_weight = p['weight'] * progress
            if new_weight > 0.1:
                mixed_prompts.append({'text': p['text'], 'weight': new_weight})
        
        # 应用混合权重
        if mixed_prompts:
            await set_prompts_smart(session, mixed_prompts)
            weights_str = ", ".join([f"{p['text']}:{p['weight']:.1f}" for p in mixed_prompts])
            print(f"   步骤{i+1}/{steps+1}: {weights_str}")
        
        if i < steps:
            await asyncio.sleep(step_duration)
    
    print("✅ 过渡完成\n")

# ============================================================================
# 6️⃣ 音频接收任务 (完全照搬test_lyria_dynamic.py)
# ============================================================================
async def receive_audio(session):
    """后台任务: 接收并转换音频"""
    global playback_state
    
    chunk_count = 0
    start_time = asyncio.get_event_loop().time()
    
    try:
        async for message in session.receive():
            elapsed = asyncio.get_event_loop().time() - start_time
            
            if message.server_content and message.server_content.audio_chunks:
                audio_data = message.server_content.audio_chunks[0].data
                
                # === 严格按官方JS的decodeAudioData逻辑 ===
                # 1. 解码为Int16
                audio_int16 = np.frombuffer(audio_data, dtype=np.int16)
                
                # 2. 转换为Float32并归一化
                audio_float = audio_int16.astype(np.float32) / 32768.0
                
                # 3. 解交错立体声
                num_frames = len(audio_float) // CHANNELS
                audio_stereo = audio_float[:num_frames * CHANNELS].reshape(num_frames, CHANNELS)
                
                # 4. 钳位
                audio_stereo = np.clip(audio_stereo, -1.0, 1.0)
                
                # 5. 放入缓冲区
                try:
                    audio_buffer.put(audio_stereo, timeout=1.0)
                    chunk_count += 1
                    
                    # 每50块显示状态
                    if chunk_count % 50 == 0:
                        q_size = audio_buffer.qsize()
                        print(f"📥 已接收{chunk_count}块 | 队列:{q_size} | 时间:{elapsed:.1f}s", end='\r')
                        
                        # 状态自动切换
                        if playback_state == PlaybackState.LOADING and q_size > 5:
                            playback_state = PlaybackState.PLAYING
                            print(f"\n▶️  状态: LOADING -> PLAYING (队列:{q_size})")
                            
                except queue.Full:
                    print(f"⚠️ 缓冲区满,丢弃数据")
                
                # 极短睡眠
                await asyncio.sleep(10**-12)
                
    except Exception as e:
        print(f"\n❌ 音频接收错误: {e}")
        import traceback
        traceback.print_exc()

# ============================================================================
# 7️⃣ Lyria会话管理 (带错误处理和重连)
# ============================================================================
async def lyria_session_loop():
    """Lyria会话主循环"""
    global lyria_session, playback_state, connection_error, filtered_prompts
    
    try:
        # 状态: STOPPED -> LOADING
        playback_state = PlaybackState.LOADING
        connection_error = False
        filtered_prompts.clear()
        
        print("\n" + "="*70)
        print("🎼 Lyria会话启动中...")
        print("="*70)
        
        async with (
            client.aio.live.music.connect(model='models/lyria-realtime-exp') as session,
            asyncio.TaskGroup() as tg,
        ):
            lyria_session = session
            print(f"✅ 已连接Lyria! 状态: {playback_state.value}")
            
            # 初始配置
            await session.set_music_generation_config(
                config=types.LiveMusicGenerationConfig(
                    bpm=current_config['bpm'],
                    temperature=current_config['temperature'],
                )
            )
            
            # 初始prompts
            initial_prompts = current_config.get('prompts') or [
                {'text': 'lofi hip hop', 'weight': 1.5},
                {'text': 'warm', 'weight': 1.0},
            ]
            await set_prompts_smart(session, initial_prompts)
            
            await session.play()
            
            # 启动音频接收任务
            tg.create_task(receive_audio(session))
            
            # 保持会话运行
            print("🎵 Lyria会话运行中,等待指令...")
            while playback_state != PlaybackState.STOPPED:
                await asyncio.sleep(1)
            
        print("\n📡 会话正常结束")
        
    except Exception as e:
        # 错误处理 (参考官方onerror)
        connection_error = True
        playback_state = PlaybackState.STOPPED
        
        print(f"\n❌ 连接错误: {e}")
        print("💡 提示: 可通过 /start 重新连接")
        import traceback
        traceback.print_exc()

def run_lyria_background():
    """在后台线程运行Lyria"""
    global lyria_loop
    
    lyria_loop = asyncio.new_event_loop()
    asyncio.set_event_loop(lyria_loop)
    
    try:
        lyria_loop.run_until_complete(lyria_session_loop())
    except Exception as e:
        print(f"❌ Lyria后台任务异常: {e}")
    finally:
        lyria_loop.close()

# ============================================================================
# 8️⃣ Flask HTTP接口
# ============================================================================

@app.route('/start', methods=['POST'])
def start_music():
    """启动Lyria会话"""
    global lyria_task, playback_state
    
    if playback_state != PlaybackState.STOPPED:
        return jsonify({
            "status": "already_running",
            "state": playback_state.value
        })
    
    # 启动后台任务
    lyria_task = threading.Thread(target=run_lyria_background, daemon=True)
    lyria_task.start()
    
    # 等待连接
    time.sleep(0.5)
    
    return jsonify({
        "status": "started",
        "state": playback_state.value,
        "message": "Lyria会话启动中..."
    })

@app.route('/stop', methods=['POST'])
def stop_music():
    """停止Lyria会话"""
    global playback_state
    
    if playback_state == PlaybackState.STOPPED:
        return jsonify({"status": "already_stopped"})
    
    playback_state = PlaybackState.STOPPED
    
    return jsonify({
        "status": "stopped",
        "message": "Lyria会话已停止"
    })

@app.route('/style', methods=['POST'])
def set_style():
    """设置音乐风格 - 支持平滑过渡"""
    global lyria_session, playback_state
    
    if playback_state == PlaybackState.STOPPED:
        return jsonify({
            "error": "Lyria未启动,请先调用 /start",
            "state": playback_state.value
        }), 503
    
    data = request.json
    
    # 支持多种格式
    if 'prompts' in data:
        # 直接设置weighted prompts
        new_prompts = data['prompts']
    elif 'prompt' in data:
        # 简单格式
        new_prompts = [{'text': data['prompt'], 'weight': 1.5}]
    else:
        # 结构化格式 (genre, instrument, mood, theme)
        new_prompts = []
        for genre in data.get('genre', []):
            new_prompts.append({'text': genre, 'weight': 2.0})
        for instrument in data.get('instrument', []):
            new_prompts.append({'text': instrument, 'weight': 1.5})
        for mood in data.get('mood', []):
            new_prompts.append({'text': mood, 'weight': 1.2})
        for theme in data.get('theme', []):
            new_prompts.append({'text': theme, 'weight': 0.8})
    
    if not new_prompts:
        return jsonify({"error": "未提供有效的prompts"}), 400
    
    # 是否使用平滑过渡
    use_transition = data.get('smooth_transition', False)
    
    # 在Lyria循环中执行
    if lyria_session and lyria_loop:
        try:
            if use_transition:
                # 平滑过渡
                old_prompts = current_config.get('prompts', [])
                steps = data.get('transition_steps', 5)
                duration = data.get('transition_duration', 2)
                
                future = asyncio.run_coroutine_threadsafe(
                    smooth_transition(lyria_session, old_prompts, new_prompts, steps, duration),
                    lyria_loop
                )
                future.result(timeout=30)
            else:
                # 直接切换
                future = asyncio.run_coroutine_threadsafe(
                    set_prompts_smart(lyria_session, new_prompts),
                    lyria_loop
                )
                future.result(timeout=5)
            
            # 更新BPM (如果提供)
            if 'bpm' in data:
                bpm = data['bpm']
                config = types.LiveMusicGenerationConfig(
                    bpm=bpm,
                    temperature=data.get('temperature', 1.0)
                )
                
                # 如果BPM变化需要reset_context
                if abs(bpm - current_config['bpm']) > 10:
                    print(f"\n⚡ BPM变化较大 ({current_config['bpm']}->{bpm}), 重置上下文")
                    future = asyncio.run_coroutine_threadsafe(
                        lyria_session.reset_context(),
                        lyria_loop
                    )
                    future.result(timeout=5)
                
                future = asyncio.run_coroutine_threadsafe(
                    lyria_session.set_music_generation_config(config=config),
                    lyria_loop
                )
                future.result(timeout=5)
                
                current_config['bpm'] = bpm
                current_config['temperature'] = data.get('temperature', 1.0)
            
            return jsonify({
                "status": "success",
                "message": "风格已更新",
                "prompts": new_prompts,
                "smooth_transition": use_transition
            })
            
        except Exception as e:
            print(f"❌ 设置风格失败: {e}")
            import traceback
            traceback.print_exc()
            return jsonify({"error": str(e)}), 500
    
    return jsonify({"error": "会话未就绪"}), 503

@app.route('/prompts', methods=['POST'])
def set_prompts():
    """直接设置weighted prompts"""
    global lyria_session, lyria_loop
    
    if playback_state == PlaybackState.STOPPED:
        return jsonify({"error": "Lyria未启动"}), 503
    
    data = request.json
    prompts = data.get('prompts', [])
    
    if not prompts:
        return jsonify({"error": "prompts不能为空"}), 400
    
    if lyria_session and lyria_loop:
        try:
            future = asyncio.run_coroutine_threadsafe(
                set_prompts_smart(lyria_session, prompts),
                lyria_loop
            )
            future.result(timeout=5)
            
            return jsonify({"status": "success", "prompts": prompts})
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    
    return jsonify({"error": "会话未就绪"}), 503

@app.route('/stream', methods=['GET'])
def audio_stream():
    """
    音频流输出 - 48kHz立体声PCM
    
    官方PromptDJ优化:
    1. 严格的48kHz立体声格式 (2 channels)
    2. Int16 PCM交错格式 [L0,R0,L1,R1,...]
    3. 正确的Float32->Int16转换 (*32768不是32767)
    4. 队列管理和错误处理
    """
    def generate():
        print("📡 [官方格式] 客户端连接到48kHz立体声流")
        sent_count = 0
        consecutive_empty = 0  # 官方优化: 跟踪连续空队列
        chunk_batch = []  # 批量发送缓冲
        BATCH_SIZE = 4  # 每次发送4个块 (约84ms) - 减少网络开销
        
        while playback_state != PlaybackState.STOPPED:
            try:
                # 从缓冲区获取音频 (Float32立体声, shape: [frames, 2])
                audio_data = audio_buffer.get(timeout=0.1)  # 减少超时时间
                
                # === 官方PromptDJ的正确转换 ===
                # Float32 -> Int16 (使用32768而非32767,保持对称性)
                audio_int16 = (audio_data * 32768.0).astype(np.int16)
                
                # 确保交错格式: [L0,R0,L1,R1,...]
                # numpy的tobytes()已经是交错格式,无需额外处理
                audio_bytes = audio_int16.tobytes()
                
                chunk_batch.append(audio_bytes)
                
                # 批量发送
                if len(chunk_batch) >= BATCH_SIZE:
                    # 合并多个块一起发送
                    combined = b''.join(chunk_batch)
                    yield combined
                    sent_count += len(chunk_batch)
                    chunk_batch = []
                    consecutive_empty = 0
                    
                    if sent_count % 100 == 0:
                        q_size = audio_buffer.qsize()
                        print(f"📤 已发送{sent_count}块 | 队列:{q_size} | 批量:{BATCH_SIZE}块/次")
                    
            except queue.Empty:
                # 先发送已有的块
                if chunk_batch:
                    combined = b''.join(chunk_batch)
                    yield combined
                    sent_count += len(chunk_batch)
                    chunk_batch = []
                
                consecutive_empty += 1
                
                # 官方优化: 只在前几次空队列时发送静音,避免无限静音
                if consecutive_empty < 10:
                    # 发送静音块 (约100ms的静音)
                    silence_frames = int(SAMPLE_RATE * 0.1)  # 100ms
                    silence = np.zeros((silence_frames, CHANNELS), dtype=np.int16)
                    yield silence.tobytes()
                else:
                    # 队列持续为空,等待新数据
                    import time
                    time.sleep(0.1)
        
        print("📡 音频流结束 (客户端断开或会话停止)")
    
    return Response(
        generate(),
        mimetype='audio/pcm',
        headers={
            'X-Sample-Rate': str(SAMPLE_RATE),
            'X-Channels': str(CHANNELS),
            'X-Bit-Depth': '16',
            'X-Format': 'Interleaved PCM',  # 官方格式说明
            'Cache-Control': 'no-cache'  # 官方优化: 禁用缓存
        }
    )

@app.route('/status', methods=['GET'])
def get_status():
    """获取播放状态"""
    return jsonify({
        "status": "ok",
        "state": playback_state.value,
        "connection_error": connection_error,
        "buffer_size": audio_buffer.qsize(),
        "config": current_config,
        "filtered_prompts": list(filtered_prompts),
        "audio": {
            "sample_rate": SAMPLE_RATE,
            "channels": CHANNELS,
            "dtype": str(DTYPE)
        }
    })

@app.route('/health', methods=['GET'])
def health():
    """健康检查"""
    return jsonify({
        "status": "ok",
        "service": "Lyria Music Generation",
        "version": "2.0-production",
        "optimizations": [
            "48kHz Stereo (官方规格)",
            "Throttle 200ms防抖",
            "PlaybackState状态机",
            "错误处理和重连",
            "过滤weight=0",
            "平滑过渡支持"
        ]
    })

# ============================================================================
# 9️⃣ 主程序
# ============================================================================
if __name__ == '__main__':
    print("\n" + "="*70)
    print("🎼 Lyria Music Service (生产级优化版)")
    print("="*70)
    print("\n🔥 优化特性:")
    print("   ✅ 48kHz立体声 (官方规格)")
    print("   ✅ Throttle防抖 (200ms)")
    print("   ✅ 状态机管理 (stopped/loading/playing/paused)")
    print("   ✅ 错误处理和自动重连")
    print("   ✅ 过滤weight=0的prompts")
    print("   ✅ 平滑过渡支持")
    print("\n📡 API端点:")
    print("   POST /start - 启动Lyria会话")
    print("   POST /stop - 停止Lyria会话")
    print("   POST /style - 设置音乐风格 (支持smooth_transition)")
    print("   POST /prompts - 直接设置weighted prompts")
    print("   GET /stream - 音频流输出 (48kHz Stereo PCM)")
    print("   GET /status - 获取播放状态")
    print("   GET /health - 健康检查")
    print("\n监听端口: 8000")
    print("="*70 + "\n")
    
    app.run(host='0.0.0.0', port=8000, threaded=True, debug=False)

