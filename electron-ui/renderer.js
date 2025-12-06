const WebSocket = require('ws');
const { ipcRenderer } = require('electron');

// ============ 配置 ============
const WS_SERVER_URL = 'ws://localhost:8080/ws'; // Go 后端 WebSocket 地址

// WebSocket 重连配置
const RECONNECT_DELAYS = [1000, 2000, 5000, 10000, 30000]; // 重连延迟(指数退避)
const MAX_RECONNECT_ATTEMPTS = 10; // 最大重连次数

// ============ 全局状态 ============
let ws = null;
let reconnectAttempts = 0;
let reconnectTimer = null;
let audioContext = null;
let nextStartTime = 0;  // 下一个音频块的播放时间
let isFirstChunk = true; // 是否是第一个音频块
let audioBufferQueue = []; // 音频缓冲队列
let isPlaying = false; // 是否正在播放
let preBufferQueue = []; // 预缓冲队列
let isPreBuffering = true; // 是否正在预缓冲
const PRE_BUFFER_SIZE = 10; // 预缓冲块数 (约210ms)

// ============ DOM 元素 ============
const chatContainer = document.getElementById('chatContainer');
const danmakuContainer = document.getElementById('danmakuContainer');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const connectionDot = document.getElementById('connectionDot');
const connectionStatus = document.getElementById('connectionStatus');
const reconnectBtn = document.getElementById('reconnectBtn');
const currentGenre = document.getElementById('currentGenre');

// 弹幕轨道管理
const danmakuTracks = Array(6).fill(0); // 6条轨道,记录每条轨道最后的弹幕结束时间
const TRACK_HEIGHT = 50; // 每条轨道高度(px)

// Lyria 调试面板元素
const openSettingsBtn = document.getElementById('openSettingsBtn');
const lyriaPanel = document.getElementById('lyriaPanel');
const closeLyriaBtn = document.getElementById('closeLyriaBtn');
const lastSentParams = document.getElementById('lastSentParams');
const lyriaResponse = document.getElementById('lyriaResponse');
const sendManualParams = document.getElementById('sendManualParams');

// 存储最后发送的参数
let lastMusicParams = null;

// ============ Lyria 调试面板 ============
openSettingsBtn.addEventListener('click', () => {
  lyriaPanel.style.display = 'flex';
});

closeLyriaBtn.addEventListener('click', () => {
  lyriaPanel.style.display = 'none';
});

// 手动发送参数到 Lyria
sendManualParams.addEventListener('click', () => {
  const params = {
    genre: document.getElementById('manualGenre').value.split(',').map(s => s.trim()).filter(s => s),
    instrument: document.getElementById('manualInstrument').value.split(',').map(s => s.trim()).filter(s => s),
    mood: document.getElementById('manualMood').value.split(',').map(s => s.trim()).filter(s => s),
    theme: document.getElementById('manualTheme').value.split(',').map(s => s.trim()).filter(s => s),
    bpm: parseInt(document.getElementById('manualBPM').value) || 120,
    duration: parseInt(document.getElementById('manualDuration').value) || 60,
    reasoning: '手动发送测试'
  };
  
  console.log('🎛️ 手动发送参数到 Lyria:', params);
  
  // 更新显示
  lastSentParams.textContent = JSON.stringify(params, null, 2);
  lyriaResponse.textContent = '等待响应...';
  
  // 发送到后端
  if (ws && ws.readyState === WebSocket.OPEN) {
    const message = {
      type: 'UPDATE_MUSIC',
      data: params
    };
    ws.send(JSON.stringify(message));
    
    addSystemMessage(`🎛️ 手动更新音乐: ${params.genre[0] || 'unknown'} @ ${params.bpm} BPM`);
    lyriaResponse.textContent = '✅ 已发送到后端\n等待 Lyria 响应...';
  } else {
    lyriaResponse.textContent = '❌ WebSocket 未连接';
  }
});

// 处理 Lyria 响应
function handleLyriaResponse(data) {
  console.log('📥 收到 Lyria 响应:', data);
  
  if (data.success) {
    lyriaResponse.textContent = '✅ 成功!\n\n' + JSON.stringify(data.response, null, 2);
  } else {
    lyriaResponse.textContent = '❌ 失败!\n\n错误: ' + (data.error || '未知错误') + '\n\n发送的参数:\n' + JSON.stringify(data.params, null, 2);
  }
}

// ============ WebSocket 连接 ============
function connectWebSocket() {
  // 清除之前的重连定时器
  if (reconnectTimer) {
    clearTimeout(reconnectTimer);
    reconnectTimer = null;
  }
  
  console.log('🔌 正在连接 WebSocket...');
  
  ws = new WebSocket(WS_SERVER_URL);
  
  ws.on('open', () => {
    console.log('✅ WebSocket 已连接');
    reconnectAttempts = 0; // 重置重连计数器
    updateConnectionStatus(true);
    addSystemMessage('已连接到 FlowRadio 后端');
  });
  
  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data.toString());
      handleServerMessage(message);
    } catch (error) {
      console.error('❌ 解析消息失败:', error);
    }
  });
  
  ws.on('error', (error) => {
    // 只在非连接错误时显示详细信息
    if (error.code !== 'ECONNREFUSED') {
      console.error('❌ WebSocket 错误:', error);
    }
    updateConnectionStatus(false);
  });
  
  ws.on('close', () => {
    console.log('🔌 WebSocket 已断开');
    updateConnectionStatus(false);
    
    // 检查是否超过最大重连次数
    if (reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
      const message = `❌ 无法连接到后端服务器 (已尝试 ${reconnectAttempts} 次)\n\n请确保:\n1. Go 后端已启动 (cd backend && go run .)\n2. 端口 8080 未被占用\n\n点击"重新连接"按钮手动重试`;
      addSystemMessage(message);
      console.warn('⚠️ 已达到最大重连次数,停止自动重连');
      return;
    }
    
    // 计算重连延迟(指数退避)
    const delayIndex = Math.min(reconnectAttempts, RECONNECT_DELAYS.length - 1);
    const delay = RECONNECT_DELAYS[delayIndex];
    
    reconnectAttempts++;
    const message = `连接已断开,${delay/1000}秒后重连 (尝试 ${reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS})...`;
    addSystemMessage(message);
    
    reconnectTimer = setTimeout(connectWebSocket, delay);
  });
}

// 手动重连功能
function manualReconnect() {
  console.log('🔄 手动重连...');
  reconnectAttempts = 0; // 重置计数器
  connectWebSocket();
}

// ============ 消息处理 ============
function handleServerMessage(message) {
  const { type, data } = message;
  
  switch (type) {
    case 'DJ_DECISION':
      handleDJDecision(data);
      break;
      
    case 'HOST_MESSAGE':
      // Coze Main工作流的主持人播报
      handleHostMessage(data);
      break;
      
    case 'MUSIC_PARAMS':
      // Coze Main工作流的音乐参数
      handleMusicParams(data);
      break;
      
    case 'ATMOSPHERE':
      // Coze Comment Reply工作流的气氛组内容
      handleAtmosphere(data);
      break;
      
    case 'AUDIO_CHUNK':
      handleAudioChunk(data);
      break;
      
    case 'VIRTUAL_COMMENT':
      addDJMessage(data.text);
      break;
      
    case 'SYSTEM_STATUS':
      addSystemMessage(data.message);
      break;
    
    case 'LYRIA_RESPONSE':
      // 🎛️ Lyria 响应 - 更新调试面板
      handleLyriaResponse(data);
      break;
      
    case 'LLM_TO_LYRIA':
      // 调试信息
      handleLLMToLyria(data);
      break;
      
    default:
      console.log('未知消息类型:', type);
  }
}

function handleDJDecision(data) {
  const { dj_script, music_prompts, action_reason } = data;
  
  // 更新当前风格
  if (music_prompts && music_prompts.length > 0) {
    currentGenre.textContent = music_prompts[0];
  }
  
  // 显示 DJ 回应
  addDJMessage(dj_script);
  
  // 显示决策原因
  addSystemMessage(`🎵 风格: ${music_prompts?.[0] || '未知'} | 原因: ${action_reason}`);
}

// 处理 Coze 主持人消息
function handleHostMessage(data) {
  const { script, tts_url, source } = data;
  
  console.log('📢 主持人播报:', script);
  
  // 显示主持人脚本
  addDJMessage(script, tts_url);
  
  // 自动播放 TTS
  if (tts_url) {
    setTimeout(() => playTTS(tts_url), 500);
  }
}

// 处理音乐参数
function handleMusicParams(data) {
  const { music_config, weighted_prompts, reasoning } = data;
  
  console.log('🎵 音乐参数:', data);
  
  // 重置音频状态 (新音乐开始)
  isFirstChunk = true;
  isPreBuffering = true;
  preBufferQueue = [];
  console.log('🔄 音乐切换,重置音频缓冲');
  
  // 更新显示
  if (weighted_prompts && weighted_prompts.length > 0) {
    const mainPrompt = weighted_prompts[0].text;
    currentGenre.textContent = mainPrompt;
  }
  
  // 更新调试面板
  if (lastSentParams) {
    lastSentParams.textContent = JSON.stringify(data, null, 2);
  }
  
  // 显示提示
  const bpm = music_config?.bpm || '?';
  const scale = music_config?.scale || '?';
  addSystemMessage(`🎼 新音乐: BPM ${bpm}, ${scale} | ${reasoning || ''}`);
}

// 处理气氛组内容
function handleAtmosphere(data) {
  const { comments, long_comment, reply, tts_url } = data;
  
  console.log('💬 气氛组:', data);
  
  // 延迟显示气氛组内容 (等待音乐切换后)
  const baseDelay = 8000; // 基础延迟8秒
  
  // 随机选择1-2个评论显示
  if (comments && comments.length > 0) {
    const numToShow = Math.min(2, comments.length);
    const selectedComments = shuffleArray([...comments]).slice(0, numToShow);
    
    selectedComments.forEach((comment, idx) => {
      // 添加随机性: 基础延迟 + 2-5秒随机间隔
      const randomDelay = baseDelay + idx * (2000 + Math.random() * 3000);
      setTimeout(() => {
        addAtmosphereComment(comment);
      }, randomDelay);
    });
  }
  
  // 显示主持人回复 (在评论之后)
  if (reply) {
    const replyDelay = baseDelay + numToShow * 3500 + Math.random() * 2000;
    setTimeout(() => {
      addAtmosphereReply(reply, tts_url);
    }, replyDelay);
  }
}

// 处理 LLM -> Lyria 调试信息
function handleLLMToLyria(data) {
  console.log('🔄 LLM → Lyria:', data);
  
  // 更新调试面板
  if (lastSentParams && data.params) {
    lastSentParams.textContent = JSON.stringify(data.params, null, 2);
  }
}

function handleLyriaResponse(data) {
  console.log('📥 收到 Lyria 响应:', data);
  
  if (data.success) {
    lyriaResponse.textContent = '✅ 成功!\n\n' + JSON.stringify(data.response, null, 2);
  } else {
    lyriaResponse.textContent = '❌ 失败!\n\n错误: ' + data.error;
  }
}

function handleAudioChunk(data) {
  // data 是 base64 编码的音频数据
  const audioData = Buffer.from(data, 'base64');
  
  // 预缓冲机制: 先积累一定数量的块再开始播放
  if (isPreBuffering) {
    preBufferQueue.push(audioData);
    
    if (preBufferQueue.length >= PRE_BUFFER_SIZE) {
      console.log(`✅ 预缓冲完成 (${PRE_BUFFER_SIZE}块 ≈ ${(PRE_BUFFER_SIZE * 21).toFixed(0)}ms)`);
      isPreBuffering = false;
      
      // 播放所有预缓冲的块
      preBufferQueue.forEach(chunk => playAudioChunk(chunk));
      preBufferQueue = [];
    }
  } else {
    // 正常播放
    playAudioChunk(audioData);
  }
}

// ============ Web Audio API 播放 (官方优化版) ============
// 参考官方 PromptDJ 的 decodeAudioData 逻辑
function initAudioContext() {
  if (!audioContext) {
    // ⚠️ 必须使用 48kHz 立体声 (匹配 lyria_service.py 输出)
    audioContext = new (window.AudioContext || window.webkitAudioContext)({
      sampleRate: 48000,  // 官方标准: 48kHz
      latencyHint: 'playback'  // 优化: 使用 'playback' 而非 'interactive' (更大缓冲,减少卡顿)
    });
    console.log('✅ Web Audio Context 已初始化 (48kHz Stereo, 优化缓冲)');
    console.log(`   - Sample Rate: ${audioContext.sampleRate} Hz`);
    console.log(`   - Latency Hint: playback (减少卡顿)`);
    console.log(`   - Base Latency: ${audioContext.baseLatency.toFixed(3)}s`);
    nextStartTime = audioContext.currentTime;
    isFirstChunk = true;
  }
}

async function playAudioChunk(audioData) {
  initAudioContext();
  
  try {
    // === 官方 PromptDJ 的 decodeAudioData 完整流程 ===
    // 1. Int16 PCM → Float32
    // 2. 解交错 (deinterleave) 立体声
    // 3. copyToChannel 到 AudioBuffer
    // 4. 精确时间调度播放
    
    // 确保 audioData 是 Buffer
    const buffer = Buffer.isBuffer(audioData) ? audioData : Buffer.from(audioData);
    
    // Step 1: 将 Buffer 转换为 Int16Array (16-bit PCM)
    const int16Array = new Int16Array(
      buffer.buffer,
      buffer.byteOffset,
      buffer.byteLength / 2
    );
    
    // Step 2: 转换为 Float32Array (-1.0 到 1.0) 并解交错立体声
    // 官方逻辑: audio[i] / 32768.0, 然后解交错为 [L,L,L...] 和 [R,R,R...]
    const numFrames = int16Array.length / 2;  // 立体声: 2 channels
    const leftChannel = new Float32Array(numFrames);
    const rightChannel = new Float32Array(numFrames);
    
    for (let i = 0; i < numFrames; i++) {
      // 解交错: [L0,R0,L1,R1,...] → [L0,L1,...] 和 [R0,R1,...]
      leftChannel[i] = int16Array[i * 2] / 32768.0;
      rightChannel[i] = int16Array[i * 2 + 1] / 32768.0;
    }
    
    // Step 3: 创建 AudioBuffer (立体声, 48000Hz)
    const audioBuffer = audioContext.createBuffer(
      2,       // 2 channels (stereo)
      numFrames,
      48000    // 官方标准: 48kHz
    );
    
    // Step 4: copyToChannel (官方 API)
    audioBuffer.copyToChannel(leftChannel, 0);   // 左声道
    audioBuffer.copyToChannel(rightChannel, 1);  // 右声道
    
    // === 优化: 使用缓冲队列平滑播放 ===
    const currentTime = audioContext.currentTime;
    
    // 计算目标播放时间
    let targetTime;
    if (isFirstChunk) {
      // 首次播放: 当前时间 + 小缓冲
      targetTime = currentTime + 0.05;  // 50ms 初始缓冲
      isFirstChunk = false;
    } else if (nextStartTime < currentTime) {
      // 时间漂移修正: 重新同步,但保持平滑
      const drift = currentTime - nextStartTime;
      if (drift > 0.5) {
        // 漂移过大(>500ms),重新同步
        targetTime = currentTime + 0.1;
        console.warn(`⚠️ 音频时间重新同步 (漂移: ${drift.toFixed(3)}s)`);
      } else {
        // 小漂移,继续使用计划时间(避免卡顿)
        targetTime = nextStartTime;
      }
    } else {
      // 正常情况: 使用计划时间
      targetTime = nextStartTime;
    }
    
    // 创建音频源
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    
    // 在精确时间点播放
    source.start(targetTime);
    
    // 更新下一个块的时间
    nextStartTime = targetTime + audioBuffer.duration;
    
    // 调试信息 (减少频率,避免性能影响)
    if (Math.random() < 0.02) {  // 2% 概率 (原来5%)
      const latency = (nextStartTime - currentTime).toFixed(3);
      const bufferHealth = (nextStartTime - currentTime) / audioBuffer.duration;
      console.log(`🎵 [48kHz] ${numFrames}帧 ${audioBuffer.duration.toFixed(3)}s | 缓冲: ${latency}s (${bufferHealth.toFixed(1)}x)`);
    }
    
  } catch (error) {
    console.error('❌ 音频播放错误:', error);
    console.error('   - 数据长度:', audioData.byteLength);
    console.error('   - AudioContext 状态:', audioContext?.state);
    
    // 官方错误处理: 重置状态
    isFirstChunk = true;
    
    // 尝试恢复 AudioContext (官方优化)
    if (audioContext && audioContext.state === 'suspended') {
      console.log('⚠️ AudioContext 已暂停, 尝试恢复...');
      audioContext.resume().then(() => {
        console.log('✅ AudioContext 已恢复');
      });
    }
  }
}

// ============ UI 更新 ============
function updateConnectionStatus(connected) {
  if (connected) {
    connectionDot.classList.add('connected');
    connectionStatus.textContent = '已连接';
    reconnectBtn.style.display = 'none'; // 隐藏重连按钮
    sendBtn.disabled = false;
  } else {
    connectionDot.classList.remove('connected');
    connectionStatus.textContent = '未连接';
    // 只在达到最大重连次数时显示重连按钮
    if (reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
      reconnectBtn.style.display = 'inline-block';
    }
    sendBtn.disabled = true;
  }
}

function addUserMessage(text) {
  // 发送弹幕
  sendDanmaku(text, 'user');
  
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message user';
  messageDiv.textContent = text;
  chatContainer.appendChild(messageDiv);
  scrollToBottom();
}

function addDJMessage(text, ttsUrl = null) {
  // 发送弹幕
  sendDanmaku(text, 'dj');
  
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message dj';
  messageDiv.textContent = text;
  
  // 如果有 TTS 音频 URL,添加播放按钮
  if (ttsUrl) {
    const playBtn = document.createElement('button');
    playBtn.className = 'tts-play-btn';
    playBtn.textContent = '🔊 播放语音';
    playBtn.onclick = () => playTTS(ttsUrl);
    messageDiv.appendChild(playBtn);
  }
  
  chatContainer.appendChild(messageDiv);
  scrollToBottom();
}

function addSystemMessage(text) {
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message system';
  messageDiv.textContent = text;
  chatContainer.appendChild(messageDiv);
  scrollToBottom();
}

function scrollToBottom() {
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// 添加气氛组评论
function addAtmosphereComment(text) {
  // 发送弹幕
  sendDanmaku(text, 'atmosphere');
  
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message atmosphere-comment';
  
  const icon = document.createElement('span');
  icon.className = 'atmosphere-icon';
  icon.textContent = '🎵';
  
  const content = document.createElement('span');
  content.textContent = text;
  
  messageDiv.appendChild(icon);
  messageDiv.appendChild(content);
  chatContainer.appendChild(messageDiv);
  
  // 添加淡入动画
  messageDiv.style.animation = 'fadeInUp 0.5s ease-out';
  
  scrollToBottom();
}

// 添加气氛组回复
function addAtmosphereReply(text, ttsUrl = null) {
  // 发送弹幕
  sendDanmaku(text, 'reply');
  
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message atmosphere-reply';
  
  const icon = document.createElement('span');
  icon.className = 'atmosphere-icon host-icon';
  icon.textContent = '🎙️';
  
  const content = document.createElement('span');
  content.textContent = text;
  
  messageDiv.appendChild(icon);
  messageDiv.appendChild(content);
  
  // 如果有 TTS,添加播放按钮
  if (ttsUrl) {
    const playBtn = document.createElement('button');
    playBtn.className = 'tts-play-btn small';
    playBtn.textContent = '🔊';
    playBtn.title = '播放语音';
    playBtn.onclick = () => playTTS(ttsUrl);
    messageDiv.appendChild(playBtn);
    
    // 自动播放
    setTimeout(() => playTTS(ttsUrl), 300);
  }
  
  chatContainer.appendChild(messageDiv);
  
  // 添加淡入动画
  messageDiv.style.animation = 'fadeInUp 0.5s ease-out';
  
  scrollToBottom();
}

// ============ 弹幕系统 ============
function sendDanmaku(text, type = 'user') {
  const danmaku = document.createElement('div');
  danmaku.className = `danmaku-item danmaku-${type}`;
  danmaku.textContent = text;
  
  // 选择可用轨道 (避免碰撞)
  const now = Date.now();
  let trackIndex = 0;
  let minEndTime = Infinity;
  
  for (let i = 0; i < danmakuTracks.length; i++) {
    if (danmakuTracks[i] < now) {
      trackIndex = i;
      break;
    }
    if (danmakuTracks[i] < minEndTime) {
      minEndTime = danmakuTracks[i];
      trackIndex = i;
    }
  }
  
  // 设置轨道位置
  const topPosition = 30 + trackIndex * TRACK_HEIGHT;
  danmaku.style.top = `${topPosition}px`;
  
  // 更新轨道占用时间 (12秒动画 + 1秒缓冲)
  danmakuTracks[trackIndex] = now + 13000;
  
  // 添加到容器
  danmakuContainer.appendChild(danmaku);
  
  // 动画结束后移除
  setTimeout(() => {
    danmaku.remove();
  }, 12000);
}

// 工具函数: 数组随机打乱
function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// ============ 用户交互 ============
function sendMessage() {
  const text = userInput.value.trim();
  if (!text || !ws || ws.readyState !== WebSocket.OPEN) return;
  
  // 显示用户消息
  addUserMessage(text);
  
  // 发送到服务器 (后端会自动选择 Coze 或 LLM)
  ws.send(JSON.stringify({
    type: 'USER_INPUT',
    data: { text }
  }));
  
  // 清空输入框
  userInput.value = '';
}

// ============ TTS 播放 ============
let ttsAudio = null;

function playTTS(ttsUrl) {
  console.log('播放 TTS:', ttsUrl);
  
  // 停止之前的音频
  if (ttsAudio) {
    ttsAudio.pause();
    ttsAudio = null;
  }
  
  // 播放新音频
  ttsAudio = new Audio(ttsUrl);
  ttsAudio.play()
    .then(() => {
      console.log('✅ TTS 播放成功');
    })
    .catch(err => {
      console.error('❌ TTS 播放失败:', err);
      addSystemMessage('⚠️ 语音播放失败');
    });
}

// ============ 事件监听 ============
sendBtn.addEventListener('click', sendMessage);

reconnectBtn.addEventListener('click', () => {
  console.log('🔄 用户手动重连');
  reconnectBtn.style.display = 'none';
  manualReconnect();
});

userInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

// ============ 初始化 ============
window.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 FlowRadio Electron UI 启动');
  connectWebSocket();
  addSystemMessage('🤖 欢迎来到 FlowRadio! | 后端会自动选择 Coze/LLM 模式');
});
