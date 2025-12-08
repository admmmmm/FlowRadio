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

// ============ 背景管理器（占位符）============
let backgroundManager = null;

// ============ 设置菜单逻辑 ============
const settingsMenu = document.getElementById('settingsMenu');
const menuLyria = document.getElementById('menuLyria');
const menuBackground = document.getElementById('menuBackground');
const menuAbout = document.getElementById('menuAbout');

// 切换菜单显示
openSettingsBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  const isVisible = settingsMenu.style.display === 'block';
  settingsMenu.style.display = isVisible ? 'none' : 'block';
});

// 点击其他地方关闭菜单
document.addEventListener('click', () => {
  settingsMenu.style.display = 'none';
});

// 菜单项点击事件
menuLyria.addEventListener('click', () => {
  lyriaPanel.style.display = 'flex';
});

menuBackground.addEventListener('click', () => {
  // 简单的背景切换逻辑
  document.body.style.backgroundColor = 
    document.body.style.backgroundColor === 'rgb(30, 30, 30)' ? '#000' : '#1e1e1e';
  addSystemMessage('🖼️ 背景已切换');
});

menuAbout.addEventListener('click', () => {
  alert('FlowRadio v1.0\nAI DJ & Music Generator\nPowered by Gemini & Coze');
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
        // 随机生成用户名
        const randomUser = `User${Math.floor(Math.random() * 1000)}`;
        // 发送弹幕
        window.addDanmaku(comment, '#fff', randomUser);
      }, randomDelay);
    });
  }
  
  // 显示主持人回复 (在评论之后)
  if (reply) {
    // 解析回复 JSON
    let replyText = reply;
    let replyAudio = tts_url;
    
    try {
      // 尝试解析 JSON 格式的回复
      // 格式: {"r1": "...", "r2": "...", "link1": "..."}
      if (reply.trim().startsWith('{')) {
        const replyObj = JSON.parse(reply);
        // 随机选一条回复文本
        const replyKeys = Object.keys(replyObj).filter(k => k.startsWith('r'));
        if (replyKeys.length > 0) {
          const randomKey = replyKeys[Math.floor(Math.random() * replyKeys.length)];
          replyText = replyObj[randomKey];
          
          // 尝试找对应的语音链接 (link1 对应 r1)
          const linkKey = randomKey.replace('r', 'link');
          if (replyObj[linkKey]) {
            replyAudio = replyObj[linkKey];
          }
        }
      }
    } catch (e) {
      console.warn('解析回复JSON失败,使用原始文本:', e);
    }

    const replyDelay = baseDelay + (comments ? comments.length : 0) * 3500 + Math.random() * 2000;
    setTimeout(() => {
      addAtmosphereReply(replyText, replyAudio);
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
let analyser = null; // 音频分析器
let musicIntensityInterval = null; // 音乐强度分析定时器

function initAudioContext() {
  if (!audioContext) {
    // ⚠️ 必须使用 48kHz 立体声 (匹配 lyria_service.py 输出)
    audioContext = new (window.AudioContext || window.webkitAudioContext)({
      sampleRate: 48000,  // 官方标准: 48kHz
      latencyHint: 'playback'  // 优化: 使用 'playback' 而非 'interactive' (更大缓冲,减少卡顿)
    });
    
    // 创建音频分析器
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    analyser.connect(audioContext.destination);
    
    console.log('✅ Web Audio Context 已初始化 (48kHz Stereo, 优化缓冲)');
    console.log(`   - Sample Rate: ${audioContext.sampleRate} Hz`);
    console.log(`   - Latency Hint: playback (减少卡顿)`);
    console.log(`   - Base Latency: ${audioContext.baseLatency.toFixed(3)}s`);
    nextStartTime = audioContext.currentTime;
    isFirstChunk = true;
    
    // 启动音乐强度分析
    startMusicIntensityAnalysis();
  }
}

// 启动音乐强度分析
function startMusicIntensityAnalysis() {
  if (musicIntensityInterval) {
    clearInterval(musicIntensityInterval);
  }
  
  // 将analyser暴露为全局变量供背景使用
  window.analyser = analyser;
  
  const dataArray = new Uint8Array(analyser.frequencyBinCount);
  
  musicIntensityInterval = setInterval(() => {
    if (!analyser || !backgroundManager) return;
    
    analyser.getByteFrequencyData(dataArray);
    
    // 计算音频强度 (0-1)
    const average = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
    const intensity = average / 255;
    
    // 更新背景动画（背景内部会自己分析）
    backgroundManager.updateWithMusic(intensity);
  }, 50); // 每50ms更新一次
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
    
    // 连接到分析器和输出
    if (analyser) {
      source.connect(analyser);
    } else {
      source.connect(audioContext.destination);
    }
    
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
  window.addDanmaku(text, '#a0c4ff', 'User');
  
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message user';
  messageDiv.textContent = text;
  chatContainer.appendChild(messageDiv);
  scrollToBottom();
}

function addDJMessage(text, ttsUrl = null) {
  // 发送弹幕
  window.addDanmaku(text, '#ff99cc', 'Mao');

  
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

// 添加气氛组评论 (只发弹幕,不进聊天记录)
function addAtmosphereComment(text) {
  // 随机生成用户名
  const randomUser = `User${Math.floor(Math.random() * 1000)}`;
  // 发送弹幕
  window.addDanmaku(text, '#fff', randomUser);
}

// 添加气氛组回复 (进聊天记录)
function addAtmosphereReply(text, ttsUrl = null) {
  // 发送弹幕
  window.addDanmaku(text, '#ffcc80', 'Mao');
  
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

// ============ 弹幕系统 (内部实现) ============
function sendDanmaku(text, type = 'user') {
  // 兼容旧代码调用,转接到新接口
  let color = '#fff';
  let user = 'User';
  
  if (type === 'dj' || type === 'reply') {
    color = '#ff99cc';
    user = 'Mao';
  } else if (type === 'atmosphere') {
    color = '#fff';
    user = `User${Math.floor(Math.random() * 1000)}`;
  } else if (type === 'user') {
    color = '#a0c4ff';
    user = 'Me';
  }
  
  window.addDanmaku(text, color, user);
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

// ============ 弹幕 & Super Chat 接口 ============

/**
 * 添加弹幕 (暴露给外部调用)
 * @param {string} text 弹幕内容
 * @param {string} color 弹幕颜色 (可选)
 * @param {string} user 用户名 (可选)
 */
window.addDanmaku = function(text, color = '#fff', user = '') {
  const danmaku = document.createElement('div');
  danmaku.className = 'danmaku-item';
  danmaku.textContent = text;
  danmaku.style.color = color;
  
  // 随机轨道逻辑 (0-5)
  const trackIndex = Math.floor(Math.random() * 6);
  const top = trackIndex * 50 + 80; // 80px起始高度,避开顶部
  danmaku.style.top = `${top}px`;
  danmaku.style.position = 'fixed';
  danmaku.style.right = '-100px'; // 从右侧开始 (稍微靠外一点)
  danmaku.style.whiteSpace = 'nowrap';
  danmaku.style.fontSize = '24px';
  danmaku.style.fontWeight = 'bold';
  danmaku.style.textShadow = '2px 2px 4px rgba(0,0,0,0.8)';
  danmaku.style.zIndex = '100';
  danmaku.style.pointerEvents = 'none';
  danmaku.style.fontFamily = '"Microsoft YaHei", sans-serif';
  danmaku.style.animation = 'none'; // 禁用 CSS 动画，使用 JS 控制
  
  // 动画时长 (随机 8-12s)
  const duration = 8 + Math.random() * 4;
  danmaku.style.transition = `transform ${duration}s linear`;
  
  danmakuContainer.appendChild(danmaku);
  
  // 触发动画
  requestAnimationFrame(() => {
    // 移动到左侧屏幕外 (屏幕宽度 + 自身宽度估计)
    danmaku.style.transform = `translateX(-${window.innerWidth + 500}px)`; 
  });
  
  // 动画结束后移除
  setTimeout(() => {
    danmaku.remove();
  }, duration * 1000);
};

/**
 * 添加 Super Chat (暴露给外部调用)
 * @param {string} user 用户名
 * @param {string} text 内容
 * @param {number} price 金额 (CNY)
 * @param {number} duration 持续时间(秒), 默认根据金额计算
 */
window.addSuperChat = function(user, text, price, duration = 0) {
  const scContainer = document.getElementById('superChatContainer');
  
  // 如果没有指定时长，根据金额计算: 每10元增加10秒，最少10秒，最多300秒
  if (duration <= 0) {
    duration = Math.max(10, Math.min(300, Math.ceil(price / 10) * 10));
  }
  
  const card = document.createElement('div');
  card.className = 'sc-card';
  
  // 根据金额改变颜色 (仿 YouTube 风格)
  let bgColor = 'linear-gradient(90deg, #1565c0, #1e88e5)'; // 蓝色 (低)
  if (price >= 30) bgColor = 'linear-gradient(90deg, #00b8d4, #00e5ff)'; // 青色
  if (price >= 50) bgColor = 'linear-gradient(90deg, #ffb300, #ffca28)'; // 黄色
  if (price >= 100) bgColor = 'linear-gradient(90deg, #e65100, #f57c00)'; // 橙色
  if (price >= 500) bgColor = 'linear-gradient(90deg, #c2185b, #e91e63)'; // 品红
  if (price >= 1000) bgColor = 'linear-gradient(90deg, #d50000, #ff1744)'; // 红色 (高)
  
  card.style.background = bgColor;
  
  card.innerHTML = `
    <div class="sc-header">
      <span class="sc-user">${user}</span>
      <span class="sc-price">¥${price}</span>
    </div>
    <div class="sc-content">${text}</div>
  `;
  
  scContainer.appendChild(card);
  
  // 自动移除
  setTimeout(() => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(-20px)';
    setTimeout(() => card.remove(), 300); // 等待动画结束
  }, duration * 1000);
  
  // 同时发送到聊天栏
  addSystemMessage(`[SC ¥${price}] ${user}: ${text}`);
};

userInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

// ============ 初始化 ============
window.addEventListener('DOMContentLoaded', async () => {
  console.log('🚀 FlowRadio Electron UI 启动');
  
  // 初始化背景管理器
  try {
    const { BackgroundManager } = require('./backgrounds/manager.js');
    backgroundManager = new BackgroundManager('dynamic-background');
    await backgroundManager.init('tetris', {
      blockSize: 30,
      baseSpeed: 2,
      spawnInterval: 60,
    });
    console.log('✅ 动态背景已初始化');
  } catch (error) {
    console.error('❌ 背景初始化失败:', error);
  }
  
  connectWebSocket();
  addSystemMessage('🤖 欢迎来到 FlowRadio! | 后端会自动选择 Coze/LLM 模式');
});
