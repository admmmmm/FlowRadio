/**
 * 渲染进程主入口
 */

const { ipcRenderer } = require('electron');

// ⚠️ 必须在 PIXI 之前导入 @pixi/unsafe-eval
console.log('[Renderer] Loading @pixi/unsafe-eval...');
require('@pixi/unsafe-eval');
console.log('[Renderer] ✓ @pixi/unsafe-eval loaded');

console.log('[Renderer] Loading PIXI...');
const PIXI = require('pixi.js');
console.log('[Renderer] PIXI loaded:', typeof PIXI, PIXI ? 'OK' : 'FAIL');
console.log('[Renderer] PIXI.Application:', typeof PIXI?.Application);

const LayoutManager = require('./layout/LayoutManager');
const TopBar = require('./layout/TopBar');
const BottomInput = require('./layout/BottomInput');
const Live2DArea = require('./layout/Live2DArea');
const AudioAnalyzer = require('./audio/AudioAnalyzer');
const TetrisNeonBackground = require('./backgrounds/TetrisNeonBackground');

class FlowRadioApp {
  constructor() {
    this.layoutManager = null;
    this.topBar = null;
    this.bottomInput = null;
    this.live2dLeft = null;
    this.live2dRight = null;
    this.live2dController = null;
    this.audioAnalyzer = null;
    this.pixiApp = null;
    this.currentBackground = null;
    
    // WebSocket 连接
    this.ws = null;
    this.wsReconnectTimer = null;
    
    // Lyria 音频流
    this.lyriaAudio = null;
    this.lyriaConnected = false;
    
    // 音频播放
    this.audioContext = null;
    this.audioQueue = [];
    this.isPlayingAudio = false;
    this.nextStartTime = 0;
    this.isFirstChunk = true;
    this.preBufferQueue = [];
    this.isPreBuffering = true;
    this.PRE_BUFFER_SIZE = 10; // 预缓冲块数 (约210ms)
    this.analyser = null;
    
    // 聊天历史和设置面板
    this.chatHistory = [];
    this.maxHistorySize = 100;
    this.settingsPanel = null;
    
    // 从 localStorage 加载历史
    try {
      const saved = localStorage.getItem('chatHistory');
      if (saved) {
        this.chatHistory = JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load chat history:', e);
    }
    
    // 语音队列
    this.speechQueue = [];
    this.isSpeaking = false;
    this.speechId = 0; // 用于追踪当前的语音任务ID，防止中断时的竞态条件
    
    // 音量控制
    this.hostVolume = 1.0;
    this.musicVolume = 0.5;
    this.musicGainNode = null;

    // SC 队列
    this.scQueue = [];
    this.isProcessingSC = false;
  }

  async init() {
    console.log('[FlowRadioApp] ========== INITIALIZATION START ==========');
    
    // 获取容器元素
    const container = document.getElementById('app-container');
    if (!container) {
      throw new Error('app-container not found!');
    }
    console.log('[FlowRadioApp] ✓ Container found:', container);

    try {
      console.log('[FlowRadioApp] Step 1: Creating LayoutManager...');
      this.layoutManager = new LayoutManager(container);
      console.log('[FlowRadioApp] ✓ LayoutManager created');

      // 创建顶部栏
      console.log('[FlowRadioApp] Step 2: Creating TopBar...');
      this.topBar = new TopBar(container);
      this.layoutManager.registerElement('topBar', this.topBar.element);
      console.log('[FlowRadioApp] ✓ TopBar created');

      // 创建底部输入
      console.log('[FlowRadioApp] Step 3: Creating BottomInput...');
      this.bottomInput = new BottomInput(container, (message) => {
        this.handleUserMessage(message);
      });
      this.layoutManager.registerElement('bottomInput', this.bottomInput.element);
      console.log('[FlowRadioApp] ✓ BottomInput created');
    } catch (error) {
      console.error('[FlowRadioApp] ❌ FATAL ERROR during basic UI initialization:', error);
      console.error('[FlowRadioApp] Stack trace:', error.stack);
      throw error;
    }

    try {
      // 创建 Live2D 区域 (已废弃，改用 iframe)
      console.log('[FlowRadioApp] Step 4: Skipping legacy Live2DArea...');
      // this.live2dLeft = new Live2DArea(container, 'left');
      // this.live2dRight = new Live2DArea(container, 'right');
      // this.layoutManager.registerElement('live2dLeft', this.live2dLeft.element);
      // this.layoutManager.registerElement('live2dRight', this.live2dRight.element);
      
      // ⚠️ 暂时跳过 PixiJS 背景（简化调试）
      console.log('[FlowRadioApp] Step 5: Initializing Tetris 3D Background...');
      // await this.initPixiBackground();
      // this.tetrisBackground = new TetrisNeonBackground(this.pixiApp);
      // this.currentBackground = this.tetrisBackground;
      
      // 初始化 Tetris 3D SDK
      console.log('[FlowRadioApp] Step 5: Waiting for Tetris 3D SDK...');
      
      const initTetris = () => {
        if (!window.TetrisSDK) {
            console.log('[Tetris] SDK not ready yet, retrying...');
            setTimeout(initTetris, 500);
            return;
        }

        const bgEl = document.getElementById('live-bg');
        if (!bgEl) {
            console.error('[Tetris] #live-bg element not found!');
            return;
        }

        const rect = bgEl.getBoundingClientRect();
        console.log(`[Tetris] Container size: ${rect.width}x${rect.height}`);

        try {
            console.log('[Tetris] Initializing SDK...');
            // ⚠️ 不要增加任何参数，否则会覆盖默认
            window.TetrisSDK.init('live-bg');
            console.log('[FlowRadioApp] ✓ Tetris 3D SDK initialized');
            
            // 外部 API 调用示例 (可选)
            if (window.TetrisFlow) {
                // 音乐映射
                window.TetrisFlow.syncMusic({
                    density: 0.8,       // 音乐密度 (0.0 ~ 1.0) -> 控制流动速度
                    brightness: 0.5,    // 音乐明亮度 (0.0 ~ 1.0) -> 控制颜色色调
                    expectedDuration: 180 // 歌曲预期时长 (秒) -> 自动计算 BPM 以填满屏幕
                });

                window.TetrisFlow.on('reset', () => {
                    console.log("[Tetris] Visuals Finished. Playing next song...");
                });
            }
        } catch (e) {
            console.error('[FlowRadioApp] ❌ Failed to init Tetris SDK:', e);
        }
      };

      // 启动轮询
      setTimeout(initTetris, 1000); // 初始延迟 1秒
      
      console.log('[FlowRadioApp] ✓ Background setup initiated');

      // 初始化 Live2D（使用独立仓库）
      console.log('[FlowRadioApp] Step 6: Initializing Live2D iframe...');
      await this.initLive2D();
      console.log('[FlowRadioApp] ✓ Live2D iframe initialized');

      // 连接后端服务
      console.log('[FlowRadioApp] Step 7: Connecting to backend...');
      this.connectBackend();
      console.log('[FlowRadioApp] ✓ Backend connection initiated');

      // ⚠️ 暂时跳过 Lyria 音乐服务（简化调试）
      console.log('[FlowRadioApp] Step 8: Skipping Lyria (simplified mode)...');
      // this.connectLyria();
      console.log('[FlowRadioApp] ✓ Lyria skipped');

      // 监听布局变化
      window.addEventListener('layoutResize', (e) => {
        this.handleResize(e.detail);
      });

      // 监听Live2D iframe的消息
      window.addEventListener('message', (event) => {
        const { type, success, result, error, visible, state } = event.data;
        
        if (type === 'live2d-ready') {
          console.log('[Live2D] ✅ iframe已就绪');
          this.live2dReady = true;  // ✅ 设置就绪标志
        } else if (type === 'live2d-say-result') {
          if (success) {
            console.log('[Live2D] ✅ 气泡显示成功:', result);
          } else {
            console.error('[Live2D] ❌ 气泡显示失败:', error);
          }
        } else if (type === 'panel-toggled') {
          console.log('[Live2D] Panel状态:', visible ? 'ON' : 'OFF', state);
          this.topBar.showMessage(`🎭 Panel ${visible ? '已开启' : '已关闭'}`, 2000, 'info');
          
          // 更新设置面板按钮文本
          const toggleBtn = document.getElementById('toggle-live2d-panel');
          if (toggleBtn) {
            toggleBtn.textContent = visible ? '关闭 Panel' : '开启 Panel';
          }

          // ✅ 关键修复: 根据面板状态切换 iframe 的点击穿透
          const iframe = document.getElementById('live2d-frame');
          const container = document.getElementById('live2d-container');
          if (iframe && container) {
             const pointerEvents = visible ? 'auto' : 'none';
             iframe.style.pointerEvents = pointerEvents;
             container.style.pointerEvents = pointerEvents;
             console.log(`[Live2D] Updated pointer-events to: ${pointerEvents}`);
          }
        } else if (type === 'bilibili-danmaku') {
            // 监听来自 iframe 的 B站弹幕 (如果有)
            const { message, username } = event.data;
            if (message && username) {
                this.addDanmaku(message, '#fff', username);
            }
        }
      });

      // 初始化设置面板
      console.log('[FlowRadioApp] Step 9: Initializing settings panel...');
      this.initSettingsPanel();
      console.log('[FlowRadioApp] ✓ Settings panel initialized');

      // 刷新聊天历史 (确保启动时显示)
      console.log('[FlowRadioApp] Step 10: Refreshing chat history...');
      this.refreshChatHistory();
      console.log('[FlowRadioApp] ✓ Chat history refreshed');

      // 注入调试面板
      this.injectDebugPanel();

      // 显示欢迎消息
      this.topBar.showMessage('🎵 FlowRadio AI DJ 已启动', 3000, 'superchat');

      console.log('[FlowRadioApp] ========== INITIALIZATION COMPLETE ==========');
    } catch (error) {
      console.error('[FlowRadioApp] ❌ ERROR during post-initialization:', error);
      console.error('[FlowRadioApp] Stack trace:', error.stack);
      // 不抛出错误，让应用继续运行
    }
  }

  /**
   * 初始化 PixiJS 背景
   */
  async initPixiBackground() {
    console.log('[PixiBackground] Creating background container...');
    const bgContainer = document.createElement('div');
    bgContainer.id = 'background-container';
    bgContainer.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    `;
    document.getElementById('app-container').appendChild(bgContainer);
    console.log('[PixiBackground] Container created');

    // 创建 PixiJS 应用
    console.log('[PixiBackground] Creating PIXI.Application...');
    console.log('[PixiBackground] Window size:', window.innerWidth, 'x', window.innerHeight);
    
    this.pixiApp = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x000000,
      antialias: true,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
      eventMode: 'passive',
      eventFeatures: {
        move: true,
        globalMove: false,
        click: true,
        wheel: false
      }
    });
    console.log('[PixiBackground] ✓ PIXI.Application created');

    bgContainer.appendChild(this.pixiApp.view);

    // 启动游戏循环
    this.pixiApp.ticker.add((delta) => {
      const dt = delta / 60; // 转换为秒
      if (this.currentBackground) {
        this.currentBackground.update(dt);
      }
    });

    // 等待 AudioAnalyzer（稍后初始化）
    console.log('[FlowRadioApp] PixiJS initialized');
  }

    injectDebugPanel() {
        const debugPanel = document.createElement('div');
        debugPanel.style.cssText = `
            position: fixed;
            bottom: 10px;
            left: 10px;
            background: rgba(0,0,0,0.7);
            padding: 10px;
            border-radius: 5px;
            z-index: 9999;
            display: flex;
            gap: 5px;
            flex-wrap: wrap;
            max-width: 300px;
        `;
        
        const actions = [
            { label: 'Test Heart (Mao)', action: '比心', role: 'Mao' },
            { label: 'Test Happy (Mao)', action: '高兴', role: 'Mao' },
            { label: 'Test Happy (Baobab)', action: '高兴', role: 'Baobab' },
            { label: 'Test Speak (Mao)', action: '说话', role: 'Mao', text: '测试说话功能' },
            { label: 'Test Speak (Baobab)', action: '说话', role: 'Baobab', text: '测试说话功能' },
        ];

        actions.forEach(act => {
            const btn = document.createElement('button');
            btn.textContent = act.label;
            btn.style.cssText = 'padding: 5px; cursor: pointer; font-size: 12px;';
            btn.onclick = () => {
                console.log(`[Debug] Triggering ${act.label}`);
                this.triggerLive2DAction({
                    characterId: act.role === 'Mao' ? 'mao' : 'hiyori',
                    text: act.text || '测试动作',
                    audioUrl: null,
                    motion: act.action
                });
            };
            debugPanel.appendChild(btn);
        });

        document.body.appendChild(debugPanel);
    }

  /**
   * 初始化 Live2D（使用独立 Live2D 仓库）
   */
  async initLive2D() {
    try {
      // 等待 Live2D 库加载（由 iframe 提供）
      await this.waitForLive2D();
      
      console.log('[FlowRadioApp] Live2D initialized from external repo');
    } catch (error) {
      console.warn('[FlowRadioApp] Live2D initialization skipped:', error.message);
    }
  }

  /**
   * 等待 Live2D 初始化完成
   */
  waitForLive2D() {
    return new Promise((resolve, reject) => {
      // 如果已经就绪，直接返回
      if (this.live2dReady) {
        console.log('[Live2D] ✓ Already ready');
        resolve();
        return;
      }

      const timeout = setTimeout(() => {
        console.warn('[Live2D] Init timeout - continuing anyway. (Please ensure Live2D service is running at http://localhost:5173)');
        resolve(); // 不再reject，允许继续
      }, 10000);

      const checkInterval = setInterval(() => {
        // 检查 live2dReady 标志 (由 postMessage 设置)
        if (this.live2dReady) {
            clearTimeout(timeout);
            clearInterval(checkInterval);
            console.log('[Live2D] ✓ Ready signal received');
            resolve();
        }
      }, 100);
    });
  }

  /**
   * 连接后端 WebSocket 服务
   */
  async connectBackend() {
    // 1. 连接 Go 后端 (控制逻辑)
    this.connectGoBackend();
    
    // 2. 连接 Bilibili 爬虫 (弹幕数据)
    this.connectBilibiliCrawler();
  }

  connectGoBackend() {
    const wsUrl = 'ws://localhost:8080/ws';
    console.log('[WebSocket] 🔌 Connecting to Go Backend:', wsUrl);
    
    try {
      this.ws = new WebSocket(wsUrl);
      // ... (Standard handlers)
      this.ws.onopen = () => {
        console.log('[GoBackend] ✅ Connected');
        this.topBar?.showMessage('✅ 已连接后端控制', 2000, 'normal');
      };
      this.ws.onmessage = (e) => this.handleBackendMessage(JSON.parse(e.data));
      this.ws.onclose = () => setTimeout(() => this.connectGoBackend(), 5000);
      this.ws.onerror = (e) => console.error('[GoBackend] Error:', e);
    } catch (e) {
      console.error('[GoBackend] Connection failed:', e);
    }
  }

  connectBilibiliCrawler() {
    const wsUrl = 'ws://localhost:3000'; // 默认爬虫端口
    console.log('[WebSocket] 🔌 Connecting to Bilibili Crawler:', wsUrl);

    try {
      // 显式指定协议，避免某些环境下的 400 错误
      const biliWs = new WebSocket(wsUrl, []);
      
      biliWs.onopen = () => {
        console.log('[BiliCrawler] ✅ Connected');
        this.topBar?.showMessage('✅ 已连接B站弹幕源', 2000, 'bilibili');
      };

      biliWs.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          // 爬虫消息格式: { type: 'danmu'|'gift'|..., payload: ... }
          this.handleBilibiliMessage(msg);
        } catch (e) {
          console.error('[BiliCrawler] Parse error:', e);
        }
      };

      biliWs.onclose = () => {
        console.warn('[BiliCrawler] Disconnected, retrying in 5s...');
        setTimeout(() => this.connectBilibiliCrawler(), 5000);
      };
    } catch (e) {
      console.error('[BiliCrawler] Connection failed:', e);
    }
  }

  handleBilibiliMessage(msg) {
    const { type, payload } = msg;
    // console.log('[BiliCrawler]', type, payload);

    switch (type) {
      case 'danmu':
        // payload: { nickname, content, ... }
        if (payload.content) {
            this.addDanmaku(payload.content, '#fff', payload.nickname);
            
            // 转发给后端触发 Coze 回复 (Chat Trigger = true)
            if (this.ws && this.ws.readyState === WebSocket.OPEN) {
                this.ws.send(JSON.stringify({
                    type: 'USER_INPUT',
                    data: { 
                        text: payload.content,
                        username: payload.nickname,
                        chatTrigger: true
                    }
                }));
            }
        }
        break;
      case 'gift':
        // payload: { nickname, giftName, num, ... }
        this.addDanmaku(`🎁 ${payload.nickname} 投喂了 ${payload.num} 个 ${payload.giftName}`, '#ffeb3b', 'System');
        break;
      case 'superchat':
        this.addDanmaku(`💰 [SC] ${payload.nickname}: ${payload.message}`, '#ff4081', 'System');
        break;
      case 'entry':
        // 进场消息太多可能刷屏，可选开启
        this.addDanmaku(`👋 ${payload.nickname} 进入直播间`, '#aaa', 'System');
        
        // 欢迎用户 (通过弹幕分析师渠道)
        // 30% 概率触发欢迎，避免刷屏
        if (Math.random() < 0.3 && this.ws && this.ws.readyState === WebSocket.OPEN) {
             this.ws.send(JSON.stringify({
                type: 'USER_INPUT',
                data: { 
                    text: `用户 ${payload.nickname} 进入了直播间，请热情欢迎一下！`,
                    username: '弹幕分析师',
                    chatTrigger: true
                }
            }));
        }
        break;
      case 'danmuSummary':
        // Coze 总结完成
        console.log('[BiliCrawler] 📝 Summary:', payload.cozeText);
        if (payload.cozeText && payload.cozeText.length > 0) {
            // 显示为 Super Chat 样式的弹幕分析师消息
            const summaryText = payload.cozeText[0];
            this._renderSuperChat('弹幕分析师', summaryText, 100, 15); // 100元颜色(橙色), 15秒显示
            
            // 关键修复: 显式发送给后端触发 Coze 工作流
            // 因为后端直接连接爬虫可能不稳定，或者被前端抢占
            console.log('[BiliCrawler] 📤 Forwarding summary to backend...');
            if (this.ws && this.ws.readyState === WebSocket.OPEN) {
                this.ws.send(JSON.stringify({
                    type: 'DANMU_SUMMARY',
                    data: { 
                        text: summaryText,
                        username: '弹幕分析师'
                    }
                }));
            } else {
                console.warn('[BiliCrawler] ⚠️ Backend not connected, cannot forward summary');
            }
        }
        break;
    }
  }

  /**
   * (Legacy) 连接后端 WebSocket 服务 - 保留旧方法名以防兼容性问题，但内部已拆分
   */
  async connectBackend_Legacy() {
    const wsUrl = 'ws://localhost:8080/ws';
    
    console.log('[WebSocket] 🔌 Attempting to connect to:', wsUrl);
    
    try {
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = (e) => {
        console.log('[WebSocket] ✅ OPEN - Connected successfully!', e);
        if (this.topBar) {
          this.topBar.showMessage('✅ 已连接到后端服务', 2000, 'normal');
        }
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log('[WebSocket] 📩 Received:', data);
          this.handleBackendMessage(data);
        } catch (error) {
          console.error('[WebSocket] ❌ Message parse error:', error);
        }
      };

      this.ws.onerror = (e) => {
        console.error('[WebSocket] ❌ ERROR:', e);
        console.error('[WebSocket] Error type:', e.type);
        console.error('[WebSocket] Error message:', e.message || 'Connection failed');
        if (this.topBar) {
          this.topBar.showMessage('❌ 后端连接错误', 2000, 'warning');
        }
      };

      this.ws.onclose = (e) => {
        console.log('[WebSocket] 🔴 CLOSED - Code:', e.code, 'Reason:', e.reason || 'No reason');
        console.log('[WebSocket] Clean close:', e.wasClean);
        if (this.topBar) {
          this.topBar.showMessage('⚠️ 后端连接断开，重连中...', 2000, 'warning');
        }
        
        // 5 秒后重连
        this.wsReconnectTimer = setTimeout(() => {
          console.log('[WebSocket] 🔄 Reconnecting...');
          this.connectBackend();
        }, 5000);
      };
    } catch (error) {
      console.error('[WebSocket] ❌ Connection failed:', error);
      if (this.topBar) {
        this.topBar.showMessage('❌ 无法连接后端服务', 3000, 'warning');
      }
    }
  }

  /**
   * 处理后端 WebSocket 消息
   */
  handleBackendMessage(data) {
    console.log('[WebSocket] Received:', data);

    switch (data.type) {
      case 'HOST_MESSAGE':
        // Coze主持人播报 - 主要消息类型
        this.handleHostMessage(data);
        break;

      case 'MUSIC_PARAMS':
        // 音乐参数更新
        this.handleMusicParams(data);
        break;

      case 'ATMOSPHERE':
        // 气氛组评论
        this.handleAtmosphere(data);
        break;

      case 'AUDIO_CHUNK':
        // 音频数据块
        this.handleAudioChunk(data);
        break;

      case 'chat_response':
        // 传统AI回复(兼容旧版)
        this.topBar.showMessage(`🤖 ${data.message}`, 5000, 'normal');
        if (this.live2dController && data.action) {
          this.triggerLive2DAction(data.action);
        }
        break;

      case 'music_style_changed':
        // 音乐风格变化
        this.topBar.showMessage(`🎵 切换到 ${data.style} 风格`, 2000, 'normal');
        break;

      case 'system_notification':
        // 系统通知
        this.topBar.showMessage(data.message, 3000, 'warning');
        break;

      case 'URGENT_PLAY':
        // 紧急插播 (Fast Ack)
        this.handleUrgentPlay(data);
        break;

      default:
        console.log('[WebSocket] Unknown message type:', data.type);
    }
  }

  /**
   * 处理主持人播报消息
   */
  handleHostMessage(data) {
    console.log('[Coze] 📦 收到HOST_MESSAGE完整数据:', data);
    
    // BroadcastMessage 自动包装了一层 {type, data}
    // 实际数据在 data.data 中: {script, tts_url, source, raw_host}
    const messageData = data.data || data;
    let { script, tts_url, source, raw_host } = messageData;
    
    // 智能解析:优先使用script,否则从raw_host提取
    if (!script && raw_host) {
      console.log('[Coze] 🔍 script为空,尝试从raw_host解析:', raw_host);
      script = raw_host.host1 || raw_host.host2 || '';
      tts_url = tts_url || raw_host.tts || '';
      console.log('[Coze] ✅ 从raw_host解析:', { script: script.substring(0, 50), tts_url });
    }
    
    // 智能解析角色 (从 script 前缀)
    let role = 'Baobab'; // 默认为 Baobab (Host 1)
    
    // 检查 raw_host 是否明确指定了 host2 (Mao/Acacia)
    // 有些时候 Coze 返回的 raw_host 包含 role 字段，或者我们可以通过 host2 字段判断
    if (raw_host) {
        if (raw_host.host2 || raw_host.role === 'Acacia' || raw_host.role === 'Mao') {
            role = 'Mao';
        }
    }

    if (script) {
        if (script.includes('Mao:') || script.includes('Acacia:')) {
            role = 'Mao';
            // 移除前缀以便显示更干净
            script = script.replace(/^(Mao|Acacia):\s*/, '');
        } else if (script.includes('Baobab:')) {
            role = 'Baobab';
            script = script.replace(/^Baobab:\s*/, '');
        }
    }

    // 智能解析: 如果 script 中包含 URL 且 tts_url 为空，尝试提取
    // 格式示例: "Mao: ...\nhttps://...\n\nBaobab: ...\nhttps://..."
    if (script && (script.includes('http://') || script.includes('https://'))) {
        console.log('[Coze] 🔍 检测到 script 中包含 URL，尝试解析多轮对话...');
        
        // 1. 尝试按双换行分割多轮对话
        const parts = script.split(/\n\s*\n/);
        const parsedSegments = [];
        
        for (const part of parts) {
            // 提取 URL
            const urlMatch = part.match(/(https?:\/\/[^\s]+)/);
            const partUrl = urlMatch ? urlMatch[0] : '';
            
            // 提取文本 (移除 URL)
            let partText = part.replace(/(https?:\/\/[^\s]+)/g, '').trim();
            
            // 提取角色
            let partRole = role; // 默认继承
            if (partText.includes('Mao:') || partText.includes('Acacia:')) {
                partRole = 'Mao';
                partText = partText.replace(/^(Mao|Acacia):\s*/, '');
            } else if (partText.includes('Baobab:')) {
                partRole = 'Baobab';
                partText = partText.replace(/^Baobab:\s*/, '');
            }
            
            // 提取动作 (如果文本中有动作标记)
            let partAction = messageData.action; // 默认继承
            const actionMatch = partText.match(/^[(（](.*?)[)）]/);
            if (actionMatch) {
                partAction = actionMatch[1];
                // 移除动作标记，只保留文本
                partText = partText.replace(/^[(（].*?[)）]\s*/, '');
            }

            if (partText) {
                parsedSegments.push({
                    text: partText,
                    audioUrl: partUrl || (parsedSegments.length === 0 ? tts_url : ''), // 第一段如果没有URL则尝试使用主tts_url
                    role: partRole,
                    action: partAction
                });
            }
        }

        if (parsedSegments.length > 0) {
            console.log(`[Coze] ✅ 成功解析出 ${parsedSegments.length} 段对话`);
            parsedSegments.forEach((seg, index) => {
                console.log(`   [${index}] Role: ${seg.role}, Action: ${seg.action}, Text: ${seg.text.substring(0,10)}..., URL: ${seg.audioUrl ? 'Yes' : 'No'}`);
                this.enqueueSpeech(seg);
                // 仅保存第一段或合并保存历史记录? 这里简单起见每段都保存
                this.saveChatHistory('AI', seg.text, seg.audioUrl);
            });
            return; // ✅ 已处理，直接返回
        }
    }

    // 过滤掉 URL 显示 (如果 script 中包含 URL 但未触发上面的多轮解析)
    if (script && (script.includes('http://') || script.includes('https://'))) {
        // 简单的正则替换，移除 URL
        script = script.replace(/https?:\/\/[^\s]+/g, '').trim();
    }

    console.log('[Coze] 📢 主持人播报:', script || '(空)');
    console.log('[Coze] 🎯 TTS URL:', tts_url || '(空)');
    console.log('[Coze] 📍 来源:', source);
    console.log('[Coze] 🎭 角色:', role);
    
    if (!script) {
      console.error('[Coze] ❌ HOST_MESSAGE 缺少 script 字段,完整数据:', messageData);
      return;
    }

    // 加入语音队列
    this.enqueueSpeech({
      text: script,
      audioUrl: tts_url,
      role: role,
      action: messageData.action // 传递动作
    });
    
    // 保存到聊天历史
    this.saveChatHistory('AI', script, tts_url);
  }

  /**
   * 处理音乐参数
   */
  handleMusicParams(data) {
    const { music_config, weighted_prompts, reasoning } = data;
    
    console.log('[Coze] 🎵 音乐参数:', data);
    
    // 重置音频缓冲(新音乐开始)
    this.isFirstChunk = true;
    this.isPreBuffering = true;
    this.preBufferQueue = [];
    console.log('[Audio] 🔄 音乐切换,重置音频缓冲');
    
    // 同步 Tetris 3D 视觉效果
    if (window.TetrisFlow && music_config) {
        try {
            console.log('[Tetris] Syncing music params:', music_config);
            window.TetrisFlow.syncMusic({
                density: music_config.density || 0.5,
                brightness: music_config.brightness || 0.5,
                expectedDuration: 180 // 默认 3 分钟
            });
            
            // 如果有 BPM，也可以尝试设置 (虽然 syncMusic 主要是 density/brightness)
            // TetrisFlow 可能有其他 API 设置 BPM，或者通过 syncMusic 内部处理
        } catch (e) {
            console.error('[Tetris] Failed to sync music:', e);
        }
    }
    
    // 显示提示
    const bpm = music_config?.bpm || '?';
    const mainPrompt = weighted_prompts?.[0]?.text || 'unknown';
    this.topBar.showMessage(`🎼 新音乐: ${mainPrompt} @ ${bpm} BPM`, 3000, 'normal');
  }

  /**
   * 处理气氛组评论
   */
  handleAtmosphere(data) {
    // 兼容旧版和新版数据结构
    // 新版: { replies: [], tts_urls: [], selected_reply: "...", selected_tts_url: "..." }
    // 旧版: { comments: [], reply: "...", tts_url: "..." }
    
    // 修复: data 可能被包裹在 data.data 中 (BroadcastMessage 的行为)
    const payload = (data.data && data.data.comments) ? data.data : data;
    
    const { comments, reply, tts_url, selected_reply, selected_tts_url, replies } = payload;
    
    console.log('[Coze] 💬 气氛组 RAW DATA:', JSON.stringify(data, null, 2));
    console.log('[Coze] 🔍 Parsed fields:', { 
        hasComments: !!comments, 
        hasReplies: !!replies, 
        selectedReply: selected_reply, 
        selectedTTS: selected_tts_url 
    });
    
    const baseDelay = 8000; // 基础延迟8秒
    
    // 1. 处理评论 (转为弹幕)
    // 优先使用 replies 作为虚拟弹幕 (如果 comments 不存在)
    // 逻辑: replies 列表中的内容其实就是虚拟观众的评论
    const danmakuSource = (comments && comments.length > 0) ? comments : replies;

    if (danmakuSource && danmakuSource.length > 0) {
      // 随机选择1-3个评论显示
      const numToShow = Math.min(3, danmakuSource.length);
      const shuffled = [...danmakuSource].sort(() => 0.5 - Math.random());
      
      shuffled.slice(0, numToShow).forEach((comment, idx) => {
        // 过滤掉被选中的回复 (避免重复)
        if (comment === selected_reply) return;

        const randomDelay = baseDelay + idx * (1500 + Math.random() * 2000);
        setTimeout(() => {
          const randomUser = `User${Math.floor(Math.random() * 1000)}`;
          this.addDanmaku(comment, '#fff', randomUser);
        }, randomDelay);
      });
    }
    
    // 2. 处理回复 (Mao说话)
    let replyText = '';
    let replyAudio = '';
    
    // 优先使用新版字段
    if (selected_reply) {
      replyText = selected_reply;
      replyAudio = selected_tts_url || '';
    } 
    // 回退到旧版字段
    else if (reply) {
      replyText = reply;
      replyAudio = tts_url || '';
      
      // 尝试解析旧版JSON格式
      try {
        if (reply.trim().startsWith('{')) {
          const replyObj = JSON.parse(reply);
          const replyKeys = Object.keys(replyObj).filter(k => k.startsWith('r'));
          if (replyKeys.length > 0) {
            const randomKey = replyKeys[Math.floor(Math.random() * replyKeys.length)];
            replyText = replyObj[randomKey];
            const linkKey = randomKey.replace('r', 'link');
            if (replyObj[linkKey]) {
              replyAudio = replyObj[linkKey];
            }
          }
        }
      } catch (e) {
        console.warn('[Coze] 解析回复JSON失败,使用原始文本:', e);
      }
    }

    // 如果有回复内容，加入队列
    if (replyText) {
      const replyDelay = baseDelay + (comments ? comments.length : 0) * 3500 + Math.random() * 2000;
      
      setTimeout(() => {
        console.log('[Coze] 🎤 Mao即将说话:', replyText);
        
        // 加入语音队列 (Role = Mao)
        this.enqueueSpeech({
          text: replyText,
          audioUrl: replyAudio,
          role: 'Mao'  // ✅ 明确指定角色为 Mao
        });
        
        // 保存到聊天历史 (Role = Mao)
        this.saveChatHistory('Mao', replyText, replyAudio);
      }, replyDelay);
    }
  }

  /**
   * 处理紧急插播 (Fast Ack)
   */
  handleUrgentPlay(data) {
    console.log('[Speech] 🚨 URGENT INTERRUPT:', data);
    const { audioUrl, text } = data;

    // 0. 标记当前任务失效 (这会导致正在进行的 processSpeechQueue 抛出异常或提前结束)
    this.speechId++;

    // 1. 停止当前播放
    if (this.currentAudio) {
      console.log('[Speech] 🛑 Stopping current audio');
      this.currentAudio.pause();
      this.currentAudio = null;
    }
    
    // 2. 取消当前的等待计时器
    if (this.speechTimer) {
      console.log('[Speech] 🛑 Cancelling speech timer');
      clearTimeout(this.speechTimer);
      this.speechTimer = null;
    }

    // 3. 如果正在等待Promise，立即解决它以便结束当前处理流程
    if (this.speechResolver) {
      this.speechResolver(); 
      this.speechResolver = null;
    }

    // 4. 清空队列
    if (this.speechQueue.length > 0) {
      console.log(`[Speech] 🗑️ Clearing queue of ${this.speechQueue.length} items.`);
      this.speechQueue = [];
    }
    
    // 5. 加入紧急消息
    // 注意: 不要在此时重置 isSpeaking = false，因为 processSpeechQueue 的 finally 块会处理它。
    // 如果我们在这里重置，enqueueSpeech 会立即启动新的播放，然后 finally 块会再次重置 isSpeaking，导致状态不一致。
    
    console.log('[Speech] ⚡ Enqueueing urgent message');
    
    // 过滤掉 URL 显示
    let cleanText = text;
    if (cleanText && (cleanText.includes('http://') || cleanText.includes('https://'))) {
        cleanText = cleanText.replace(/https?:\/\/[^\s]+/g, '').trim();
    }

    // 保存到聊天历史 (确保 Fast Ack 也被记录)
    // ⚠️ 修正: Fast Ack 默认是 Host 1 (Baobab)
    this.saveChatHistory('AI', cleanText, audioUrl);

    this.enqueueSpeech({
      text: cleanText,
      audioUrl: audioUrl,
      role: 'Baobab', // ⚠️ 明确指定角色为 Baobab (Host 1)
      isUrgent: true
    });
  }

  /**
   * 语音队列管理
   */
  enqueueSpeech(item) {
    this.speechQueue.push(item);
    this.processSpeechQueue();
  }

  async processSpeechQueue() {
    if (this.isSpeaking || this.speechQueue.length === 0) return;
    
    this.isSpeaking = true;
    const currentId = ++this.speechId; // 获取当前任务ID
    const item = this.speechQueue.shift();
    
    try {
      console.log(`[Speech] Processing ${item.isUrgent ? '(URGENT)' : ''}:`, item.text.substring(0, 20) + '...');
      
      // 1. 获取音频时长 (如果可能)
      let duration = 5000; // 默认 5秒
      if (item.audioUrl) {
        try {
          duration = await this.getAudioDuration(item.audioUrl) * 1000;
          console.log('[Speech] Audio duration:', duration, 'ms');
        } catch (e) {
          console.warn('[Speech] Failed to get duration, using default:', e);
          // 估算时长: 每字 200ms + 1000ms 缓冲
          duration = item.text.length * 200 + 1000;
        }
      } else {
        duration = item.text.length * 200 + 1000;
      }
      
      // 检查中断: 如果在获取时长期间发生了中断
      if (this.speechId !== currentId) {
        throw new Error('Interrupted before playback');
      }
      
      // 2. 触发 Live2D 说话
      // 根据 role 决定 characterId
      // 注意: Live2D 那边可能只识别 'mao' 和 'hiyori' (或 'baobab'?)
      // 假设 Host 1 是 'hiyori' (Baobab), Host 2 是 'mao' (Acacia)
      const characterId = (item.role === 'Mao') ? 'mao' : 'hiyori';
      
      // ⚠️ 移除 Renderer 直接播放，改为完全依赖 Live2D 的 say 方法
      // 这样可以解决双重播放问题，并确保口型同步
      /*
      if (item.audioUrl) {
        // ... (removed)
      }
      */

      // ⚠️ 确保 Fast Ack 也能触发 Live2D
      // 如果有 action，优先使用 action
      if (item.action) {
        console.log('[Speech] 🎬 Triggering action:', item.action);
        this.triggerLive2DAction({
            characterId: characterId,
            text: item.text,
            audioUrl: item.audioUrl,
            motion: item.action // 将 action 字符串作为 motion 传递
        });
      } else {
        this.triggerLive2DSpeech(item.text, item.audioUrl, characterId);
      }
      
      // 3. 等待播放完成 (支持中断)
      await new Promise(resolve => {
        // 再次检查中断 (防止在 await getAudioDuration 和 new Promise 之间发生中断)
        if (this.speechId !== currentId) {
            resolve();
            return;
        }
        
        this.speechResolver = resolve;
        this.speechTimer = setTimeout(() => {
          this.speechTimer = null;
          this.speechResolver = null;
          resolve();
        }, duration + 500);
      });
      
    } catch (error) {
      if (error.message === 'Interrupted before playback') {
        console.log('[Speech] 🛑 Task interrupted.');
      } else {
        console.error('[Speech] Error processing queue item:', error);
      }
    } finally {
      this.currentAudio = null;
      this.isSpeaking = false;
      // 处理下一个
      this.processSpeechQueue();
    }
  }

  /**
   * 获取音频时长
   */
  getAudioDuration(url) {
    return new Promise((resolve, reject) => {
      const audio = new Audio(url);
      audio.onloadedmetadata = () => resolve(audio.duration);
      audio.onerror = () => reject('Load failed');
      // 设置超时防止卡死
      setTimeout(() => reject('Timeout'), 5000);
    });
  }

  /**
   * 触发Live2D说话(显示气泡) - 使用postMessage跨域通信
   */
  async triggerLive2DSpeech(text, audioUrl = null, characterId = 'hiyori') {
    try {
      console.log('[Live2D] 准备显示气泡:', { text, audioUrl, characterId });
      
      const iframe = document.getElementById('live2d-frame');
      if (!iframe) {
        console.error('[Live2D] ❌ iframe元素未找到');
        return;
      }
      
      if (!iframe.contentWindow) {
        console.error('[Live2D] ❌ iframe.contentWindow不可用');
        return;
      }

      // 等待iframe完全加载
      await this.waitForLive2DReady();

      // ✅ 使用postMessage跨域通信
      console.log('[Live2D] 📤 Sending say command via postMessage');
      iframe.contentWindow.postMessage({
        type: 'live2d-say',
        data: {
          id: characterId,
          text: text,
          audioUrl: audioUrl, // 依然传给 Live2D，以便它做口型 (如果它支持)
          volume: this.hostVolume, // ✅ 传递音量
          motion: '说话',
          expression: null,
          crossOrigin: 'anonymous',
          charsPerSec: 8,
          fontSize: 18,
          maxLines: 3,
          maxCharsPerLine: 14
        }
      }, '*');
      
    } catch (error) {
      console.error('[Live2D] ❌ 触发说话失败:', error);
      console.error('[Live2D] 错误栈:', error.stack);
    }
  }

  /**
   * 触发 Live2D 动作 (带语音)
   */
  async triggerLive2DAction({ characterId, text, audioUrl, motion }) {
    try {
      console.log('[Live2D] 准备触发动作:', { characterId, text, audioUrl, motion });
      
      const iframe = document.getElementById('live2d-frame');
      if (!iframe) {
        console.error('[Live2D] ❌ iframe元素未找到');
        return;
      }
      
      // 等待iframe完全加载
      await this.waitForLive2DReady();

      // ✅ 使用postMessage跨域通信
      console.log('[Live2D] 📤 Sending action command via postMessage');
      iframe.contentWindow.postMessage({
        type: 'live2d-say', // 复用 say 接口，因为它支持 motion 参数
        data: {
          id: characterId,
          text: text,
          audioUrl: audioUrl,
          volume: this.hostVolume,
          motion: motion, // 传递动作名称 (如 "眼睛发光")
          expression: null, // 也可以根据动作映射表情
          crossOrigin: 'anonymous',
          charsPerSec: 8,
          fontSize: 18,
          maxLines: 3,
          maxCharsPerLine: 14
        }
      }, '*');
      
    } catch (error) {
      console.error('[Live2D] ❌ 触发动作失败:', error);
    }
  }
  waitForLive2DReady() {
    return new Promise((resolve) => {
      // ✅ 如果已经收到live2d-ready消息,直接resolve
      if (this.live2dReady) {
        resolve();
        return;
      }

      // 主动发送 ping
      const iframe = document.getElementById('live2d-frame');
      if (iframe && iframe.contentWindow) {
          iframe.contentWindow.postMessage({ type: 'live2d-ping' }, '*');
      }

      // 等待最多5秒
      let attempts = 0;
      const checkInterval = setInterval(() => {
        attempts++;
        if (this.live2dReady) {
          clearInterval(checkInterval);
          console.log('[Live2D] ✅ iframe已就绪(通过postMessage验证)');
          resolve();
        } else if (attempts > 50) {
          clearInterval(checkInterval);
          console.warn('[Live2D] ⚠️ iframe等待超时,继续尝试发送');
          // 再次尝试发送 ping
          if (iframe && iframe.contentWindow) {
              iframe.contentWindow.postMessage({ type: 'live2d-ping' }, '*');
          }
          resolve();
        } else if (attempts % 10 === 0) {
            // 每1秒重试一次 ping
            if (iframe && iframe.contentWindow) {
                iframe.contentWindow.postMessage({ type: 'live2d-ping' }, '*');
            }
        }
      }, 100);
    });
  }

  /**
   * 保存聊天历史
   */
  saveChatHistory(role, message, audioUrl = null) {
    this.chatHistory.push({
      role: role,        // 'User' 或 'AI'
      message: message,
      audioUrl: audioUrl,
      timestamp: Date.now()
    });

    // 限制历史记录大小
    if (this.chatHistory.length > this.maxHistorySize) {
      this.chatHistory.shift();
    }

    // 保存到 localStorage
    try {
      localStorage.setItem('chatHistory', JSON.stringify(this.chatHistory));
    } catch (e) {
      console.warn('Failed to save chat history:', e);
    }

    // 如果面板打开，实时刷新
    const panel = document.getElementById('settings-panel');
    if (panel && panel.classList.contains('open')) {
      this.refreshChatHistory();
    }

    console.log('[Chat] 历史记录数:', this.chatHistory.length);
  }

  /**
   * 处理音频数据块
   */
  async handleAudioChunk(data) {
    // data.data 是 base64 编码的音频数据
    const audioData = Buffer.from(data.data, 'base64');
    
    // 预缓冲机制: 先积累一定数量的块再开始播放
    if (this.isPreBuffering) {
      this.preBufferQueue.push(audioData);
      
      if (this.preBufferQueue.length >= this.PRE_BUFFER_SIZE) {
        console.log(`[Audio] ✅ 预缓冲完成 (${this.PRE_BUFFER_SIZE}块 ≈ ${(this.PRE_BUFFER_SIZE * 21).toFixed(0)}ms)`);
        this.isPreBuffering = false;
        
        // 播放所有预缓冲的块
        this.preBufferQueue.forEach(chunk => this.playAudioChunk(chunk));
        this.preBufferQueue = [];
      }
    } else {
      // 正常播放
      this.playAudioChunk(audioData);
    }
  }

  /**
   * 初始化 AudioContext
   */
  initAudioContext() {
    if (!this.audioContext) {
      // ⚠️ 必须使用 48kHz 立体声 (匹配 lyria_service.py 输出)
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)({
        sampleRate: 48000,  // 官方标准: 48kHz
        latencyHint: 'playback'  // 优化: 使用 'playback' 而非 'interactive' (更大缓冲,减少卡顿)
      });
      
      // 创建音频分析器
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 256;
      this.analyser.connect(this.audioContext.destination);
      
      // 创建音乐增益节点 (音量控制)
      this.musicGainNode = this.audioContext.createGain();
      this.musicGainNode.gain.value = this.musicVolume;
      this.musicGainNode.connect(this.analyser);
      
      console.log('[Audio] ✅ Web Audio Context 已初始化 (48kHz Stereo, 优化缓冲, 带增益控制)');
      console.log(`[Audio]    - Sample Rate: ${this.audioContext.sampleRate} Hz`);
      console.log(`[Audio]    - Latency Hint: playback (减少卡顿)`);
      console.log(`[Audio]    - Base Latency: ${this.audioContext.baseLatency.toFixed(3)}s`);
      this.nextStartTime = this.audioContext.currentTime;
      this.isFirstChunk = true;
    }
  }

  /**
   * 播放音频块 (完整参考 electron-ui 实现)
   */
  async playAudioChunk(audioData) {
    this.initAudioContext();
    
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
      const audioBuffer = this.audioContext.createBuffer(
        2,       // 2 channels (stereo)
        numFrames,
        48000    // 官方标准: 48kHz
      );
      
      // Step 4: copyToChannel (官方 API)
      audioBuffer.copyToChannel(leftChannel, 0);   // 左声道
      audioBuffer.copyToChannel(rightChannel, 1);  // 右声道
      
      // === 优化: 使用缓冲队列平滑播放 ===
      const currentTime = this.audioContext.currentTime;
      
      // 计算目标播放时间
      let targetTime;
      if (this.isFirstChunk) {
        // 首次播放: 当前时间 + 小缓冲
        targetTime = currentTime + 0.05;  // 50ms 初始缓冲
        this.isFirstChunk = false;
      } else if (this.nextStartTime < currentTime) {
        // 时间漂移修正: 重新同步,但保持平滑
        const drift = currentTime - this.nextStartTime;
        if (drift > 0.5) {
          // 漂移过大(>500ms),重新同步
          targetTime = currentTime + 0.1;
          console.warn(`[Audio] ⚠️ 音频时间重新同步 (漂移: ${drift.toFixed(3)}s)`);
        } else {
          // 小漂移,继续使用计划时间(避免卡顿)
          targetTime = this.nextStartTime;
        }
      } else {
        // 正常情况: 使用计划时间
        targetTime = this.nextStartTime;
      }
      
      // 创建音频源
      const source = this.audioContext.createBufferSource();
      source.buffer = audioBuffer;
      
      // 连接到分析器和输出
      if (this.musicGainNode) {
        source.connect(this.musicGainNode);
      } else if (this.analyser) {
        source.connect(this.analyser);
      } else {
        source.connect(this.audioContext.destination);
      }
      
      // 在精确时间点播放
      source.start(targetTime);
      
      // 更新下一个块的时间
      this.nextStartTime = targetTime + audioBuffer.duration;
      
      // 调试信息 (减少频率,避免性能影响)
      if (Math.random() < 0.02) {  // 2% 概率
        const latency = (this.nextStartTime - currentTime).toFixed(3);
        const bufferHealth = (this.nextStartTime - currentTime) / audioBuffer.duration;
        console.log(`[Audio] 🎵 [48kHz] ${numFrames}帧 ${audioBuffer.duration.toFixed(3)}s | 缓冲: ${latency}s (${bufferHealth.toFixed(1)}x)`);
      }
      
    } catch (error) {
      console.error('[Audio] ❌ 音频播放错误:', error);
      console.error('[Audio]    - 数据长度:', audioData.byteLength);
      console.error('[Audio]    - AudioContext 状态:', this.audioContext?.state);
      
      // 官方错误处理: 重置状态
      this.isFirstChunk = true;
      
      // 尝试恢复 AudioContext (官方优化)
      if (this.audioContext && this.audioContext.state === 'suspended') {
        console.log('[Audio] ⚠️ AudioContext 已暂停, 尝试恢复...');
        this.audioContext.resume().then(() => {
          console.log('[Audio] ✅ AudioContext 已恢复');
        });
      }
    }
  }



  /**
   * 连接 Lyria 音乐服务
   */
  async connectLyria() {
    console.log('[Lyria] Attempting to connect to music service...');
    
    try {
      // 创建音频元素
      this.lyriaAudio = document.createElement('audio');
      this.lyriaAudio.crossOrigin = 'anonymous';
      this.lyriaAudio.autoplay = false;
      
      // 连接到 Lyria 流
      const lyriaUrl = 'http://localhost:8000/stream';
      console.log('[Lyria] Stream URL:', lyriaUrl);
      this.lyriaAudio.src = lyriaUrl;
      
      // 创建音频分析器
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const source = audioContext.createMediaElementSource(this.lyriaAudio);
      
      // 连接到输出
      source.connect(audioContext.destination);
      
      // 创建音频分析器
      this.audioAnalyzer = new AudioAnalyzer(source);
      console.log('[Lyria] ✓ AudioAnalyzer created');
      
      // 连接到已创建的背景（不要重新创建）
      if (this.currentBackground && this.audioAnalyzer) {
        this.currentBackground.setAudioAnalyzer(this.audioAnalyzer);
        console.log('[Lyria] ✓ Background connected to audio');
      }
      
      // 监听音频事件
      this.lyriaAudio.addEventListener('canplay', () => {
        console.log('[Lyria] ✓ Audio stream ready');
        this.lyriaConnected = true;
        if (this.topBar) {
          this.topBar.showMessage('🎵 音乐服务已连接', 2000, 'normal');
        }
      });
      
      this.lyriaAudio.addEventListener('error', (e) => {
        console.error('[Lyria] ❌ Audio error:', e);
        if (this.topBar) {
          this.topBar.showMessage('❌ 音乐服务连接失败', 3000, 'warning');
        }
      });
      
      // 启动 Lyria 会话
      await this.startLyriaSession();
      
      // 用户点击后开始播放（浏览器限制）
      document.addEventListener('click', () => {
        if (this.lyriaAudio && this.lyriaAudio.paused) {
          console.log('[Lyria] User clicked, attempting to play...');
          this.lyriaAudio.play().catch(err => {
            console.warn('[Lyria] Autoplay blocked:', err);
          });
        }
      }, { once: true });
      
      console.log('[Lyria] Connection setup complete');
    } catch (error) {
      console.error('[Lyria] ❌ Connection failed:', error);
      console.error('[Lyria] Stack:', error.stack);
      
      if (this.topBar) {
        this.topBar.showMessage('⚠️ 音乐服务离线，使用静音模式', 3000, 'warning');
      }
      
      // 静音模式：不使用音频分析
      this.audioAnalyzer = null;
      if (this.pixiApp) {
        this.currentBackground = new TetrisNeonBackground();
        this.currentBackground.init(this.pixiApp, null);
      }
    }
  }

  /**
   * 启动 Lyria 音乐会话
   */
  async startLyriaSession() {
    try {
      const response = await fetch('http://localhost:8000/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          genre: 'lofi',
          bpm: 80
        })
      });
      
      if (response.ok) {
        console.log('[Lyria] Session started');
      } else {
        throw new Error('Failed to start Lyria session');
      }
    } catch (error) {
      console.error('[Lyria] Start session failed:', error);
    }
  }

  /**
   * 处理用户消息
   */
  handleUserMessage(message) {
    console.log('[FlowRadioApp] Enqueue User message:', message);

    // 加入 SC 队列 (带后端发送标志)
    this.enqueueSuperChat({
      user: '大樹', // 本地用户默认名为 adm
      text: message,
      price: 0,
      duration: 5, // 用户消息默认 5秒
      sendToBackend: true
    });
  }

  /**
   * 发送消息到后端
   */
  sendToBackend(text, username = 'adm') {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        type: 'USER_INPUT',
        data: { 
          text: text,
          username: username
        },
        timestamp: Date.now()
      }));
      console.log(`[WebSocket] ✅ 发送USER_INPUT到Coze后端: User=${username}, Text=${text}`);
    } else {
      this.topBar.showMessage('❌ 后端未连接', 2000, 'warning');
    }
  }

  /**
   * SC 队列管理
   */
  enqueueSuperChat(item) {
    // 自动计算时长
    if (!item.duration || item.duration <= 0) {
      // 价格越高，时间越长 (10s - 300s)
      item.duration = Math.max(10, Math.min(300, Math.ceil(item.price / 10) * 10));
    }
    
    this.scQueue.push(item);
    this.processSuperChatQueue();
  }

  async processSuperChatQueue() {
    if (this.isProcessingSC || this.scQueue.length === 0) return;
    
    this.isProcessingSC = true;
    const item = this.scQueue.shift();
    
    try {
      console.log('[SC Queue] Processing:', item.text);
      
      // 1. 显示 SC UI
      this._renderSuperChat(item.user, item.text, item.price, item.duration);
      
      // 2. 发送到后端 (如果需要)
      // 注意: 这里发送后，AI 会开始处理。
      // 由于我们等待了 duration，所以下一条消息会在 duration 之后才发送给 AI。
      if (item.sendToBackend) {
        this.sendToBackend(item.text, item.user);
      }
      
      // 3. 等待显示结束 (加一点缓冲)
      await new Promise(resolve => setTimeout(resolve, item.duration * 1000 + 500));
      
    } catch (error) {
      console.error('[SC Queue] Error:', error);
    } finally {
      this.isProcessingSC = false;
      // 处理下一个
      this.processSuperChatQueue();
    }
  }

  /**
   * 处理窗口大小变化
   */
  handleResize(detail) {
    const { width, height } = detail;

    // 调整 PixiJS
    if (this.pixiApp) {
      this.pixiApp.renderer.resize(width, height);
    }

    // 调整背景
    if (this.currentBackground) {
      this.currentBackground.resize(width, height);
    }

    // 调整 Live2D 区域
    if (this.live2dLeft) {
      const leftRegion = this.layoutManager.getRegion('live2dLeft');
      this.live2dLeft.resize(leftRegion.width, leftRegion.height);
    }

    if (this.live2dRight) {
      const rightRegion = this.layoutManager.getRegion('live2dRight');
      this.live2dRight.resize(rightRegion.width, rightRegion.height);
    }

    console.log('[FlowRadioApp] Resized:', width, height);
  }

  /**
   * 初始化设置面板
   */
  initSettingsPanel() {
    // 全局播放函数 (用于聊天历史重播)
    window.playHistoryAudio = (url) => {
      console.log('[Settings] Replaying audio:', url);
      const audio = new Audio(url);
      audio.volume = 1.0;
      audio.play().catch(err => {
        console.error('[Settings] 播放历史语音失败:', err);
        if (this.topBar) {
          this.topBar.showMessage('❌ 播放失败', 2000, 'error');
        }
      });
    };

    // 增强全局toggle函数(已在HTML中预定义)
    const originalToggle = window.toggleSettings;
    window.toggleSettings = () => {
      const panel = document.getElementById('settings-panel');
      if (!panel) return;
      
      panel.classList.toggle('open');
      
      // 如果打开面板,刷新聊天历史
      if (panel.classList.contains('open')) {
        this.refreshChatHistory();
      }
    };

    // 标签页切换
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const tabName = btn.dataset.tab;
        
        // 更新按钮状态
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // 更新面板显示
        tabPanes.forEach(pane => {
          pane.classList.remove('active');
          if (pane.id === `tab-${tabName}`) {
            pane.classList.add('active');
          }
        });
      });
    });

    // Temperature滑块更新
    const tempInput = document.querySelector('input[name="temperature"]');
    const tempValue = document.getElementById('temp-value');
    if (tempInput && tempValue) {
      tempInput.addEventListener('input', (e) => {
        tempValue.textContent = e.target.value;
      });
    }

    // Brightness滑块更新
    const brightnessInput = document.querySelector('input[name="brightness"]');
    const brightnessValue = document.getElementById('brightness-value');
    if (brightnessInput && brightnessValue) {
      brightnessInput.addEventListener('input', (e) => {
        brightnessValue.textContent = e.target.value;
      });
    }

    // Density滑块更新
    const densityInput = document.querySelector('input[name="density"]');
    const densityValue = document.getElementById('density-value');
    if (densityInput && densityValue) {
      densityInput.addEventListener('input', (e) => {
        densityValue.textContent = e.target.value;
      });
    }

    // 监听 Live2D Panel 切换按钮
    const togglePanelBtn = document.getElementById('toggle-live2d-panel');
    if (togglePanelBtn) {
      togglePanelBtn.addEventListener('click', () => {
        const iframe = document.getElementById('live2d-frame');
        if (!iframe || !iframe.contentWindow) {
          this.topBar.showMessage('❌ Live2D未加载', 2000, 'error');
          return;
        }

        // ✅ 使用postMessage通信,状态由iframe内main.js统一管理
        iframe.contentWindow.postMessage({
          type: 'toggle-panel'
        }, '*');
        
        console.log('[Settings] 📤 Sent toggle-panel message');
      });
    }

    // 音量滑块监听
    const hostVolumeSlider = document.getElementById('host-volume-slider');
    const hostVolumeValue = document.getElementById('host-volume-value');
    if (hostVolumeSlider && hostVolumeValue) {
      hostVolumeSlider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value);
        this.hostVolume = val / 100;
        hostVolumeValue.textContent = val + '%';
        // 尝试发送音量给 Live2D (如果支持)
        const iframe = document.getElementById('live2d-frame');
        if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage({
                type: 'live2d-set-volume',
                data: { volume: this.hostVolume }
            }, '*');
        }
      });
    }

    const musicVolumeSlider = document.getElementById('music-volume-slider');
    const musicVolumeValue = document.getElementById('music-volume-value');
    if (musicVolumeSlider && musicVolumeValue) {
      musicVolumeSlider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value);
        this.musicVolume = val / 100;
        musicVolumeValue.textContent = val + '%';
        if (this.musicGainNode) {
            this.musicGainNode.gain.setTargetAtTime(this.musicVolume, this.audioContext.currentTime, 0.1);
        }
      });
    }

    // 监听历史记录筛选
    const historyFilter = document.getElementById('history-filter');
    if (historyFilter) {
      historyFilter.addEventListener('change', () => {
        this.refreshChatHistory();
      });
    }

    // 监听清空历史按钮
    const clearHistoryBtn = document.getElementById('clear-history-btn');
    if (clearHistoryBtn) {
      clearHistoryBtn.addEventListener('click', () => {
        if (confirm('确定要清空所有聊天记录吗？')) {
          this.chatHistory = [];
          localStorage.removeItem('chatHistory');
          this.refreshChatHistory();
          this.topBar.showMessage('🗑️ 聊天记录已清空', 2000, 'info');
        }
      });
    }

    // 系统控制按钮
    const btnRestart = document.getElementById('btn-restart-app');
    if (btnRestart) {
      btnRestart.addEventListener('click', () => {
        console.log('[System] Restart button clicked');
        if (confirm('确定要重启应用吗？')) {
          try {
            // 尝试多种方式获取 ipcRenderer
            let ipcRenderer;
            if (window.require) {
                ipcRenderer = window.require('electron').ipcRenderer;
            } else if (window.electron && window.electron.ipcRenderer) {
                ipcRenderer = window.electron.ipcRenderer;
            } else {
                // 尝试直接 require (如果 nodeIntegration=true)
                const electron = require('electron');
                ipcRenderer = electron.ipcRenderer;
            }

            if (ipcRenderer) {
                console.log('[System] Sending system-relaunch IPC');
                ipcRenderer.send('system-relaunch');
            } else {
                throw new Error('ipcRenderer not found');
            }
          } catch (e) {
            console.error('[System] Failed to send relaunch IPC:', e);
            alert('重启失败: ' + e.message + '\n请尝试手动重启。');
          }
        }
      });
    }

    const btnQuit = document.getElementById('btn-quit-app');
    if (btnQuit) {
      btnQuit.addEventListener('click', () => {
        console.log('[System] Quit button clicked');
        if (confirm('确定要关闭应用吗？')) {
          try {
            let ipcRenderer;
            if (window.require) {
                ipcRenderer = window.require('electron').ipcRenderer;
            } else if (window.electron && window.electron.ipcRenderer) {
                ipcRenderer = window.electron.ipcRenderer;
            } else {
                const electron = require('electron');
                ipcRenderer = electron.ipcRenderer;
            }

            if (ipcRenderer) {
                console.log('[System] Sending system-quit IPC');
                ipcRenderer.send('system-quit');
            } else {
                throw new Error('ipcRenderer not found');
            }
          } catch (e) {
            console.error('[System] Failed to send quit IPC:', e);
            alert('关闭失败: ' + e.message);
          }
        }
      });
    }


    // Magenta表单提交
    const magentaForm = document.getElementById('magenta-form');
    if (magentaForm) {
      magentaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(magentaForm);
        
        // 解析weighted_prompts
        const promptsText = formData.get('prompts') || '';
        const weighted_prompts = promptsText.split('\n')
          .filter(line => line.trim())
          .map(line => {
            const parts = line.split('|');
            return {
              text: parts[0].trim(),
              weight: parts[1] ? parseFloat(parts[1].trim()) : 1.0
            };
          });

        const params = {
          music_config: {
            bpm: parseInt(formData.get('bpm')),
            brightness: parseFloat(formData.get('brightness')),
            density: parseFloat(formData.get('density')),
            guidance: parseInt(formData.get('guidance')),
            scale: formData.get('scale'),
            temperature: parseFloat(formData.get('temperature'))
          },
          weighted_prompts: weighted_prompts,
          reasoning: formData.get('reasoning') || ''
        };
        
        console.log('[Settings] Magenta参数:', params);
        this.topBar.showMessage('🎵 正在生成音乐...', 3000, 'info');
        
        // 发送MUSIC_PARAMS消息
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
          this.ws.send(JSON.stringify({
            type: 'MUSIC_PARAMS',
            data: params
          }));
        } else {
          this.topBar.showMessage('❌ 未连接到后端', 2000, 'error');
        }
      });
    }

    console.log('[Settings] 设置面板已初始化');
  }

  /**
   * 刷新聊天历史显示
   */
  refreshChatHistory() {
    const historyList = document.getElementById('chat-history-list');
    if (!historyList) {
      console.warn('[Settings] chat-history-list元素未找到');
      return;
    }

    // 确保 chatHistory 是数组
    if (!Array.isArray(this.chatHistory)) {
      console.warn('[Settings] chatHistory is not an array, resetting.');
      this.chatHistory = [];
    }

    console.log('[Settings] 刷新聊天历史, 总记录数:', this.chatHistory.length);

    // 1. 获取筛选条件
    const filterSelect = document.getElementById('history-filter');
    const filterValue = filterSelect ? filterSelect.value : 'all';

    // 2. 预处理数据 (保留原始索引以便删除)
    let displayItems = this.chatHistory.map((item, index) => ({ ...item, originalIndex: index }));

    // 3. 应用筛选
    if (filterValue !== 'all') {
      displayItems = displayItems.filter(item => {
        if (filterValue === 'SuperChat') {
          return item.role === 'User' && item.message && item.message.startsWith('[SC ¥');
        } else if (filterValue === 'User') {
          return item.role === 'User' && (!item.message || !item.message.startsWith('[SC ¥'));
        } else {
          return item.role === filterValue;
        }
      });
    }

    if (displayItems.length === 0) {
      historyList.innerHTML = '<p style="opacity: 0.5; text-align: center; padding: 20px;">暂无相关记录</p>';
      return;
    }

    // 4. 倒序显示(最新的在上面)
    const html = displayItems.reverse().map(item => {
      const date = new Date(item.timestamp);
      const timeStr = `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
      
      // 根据角色设置样式类
      let roleClass = '';
      let roleName = '';
      
      if (item.role === 'User') {
        if (item.message && item.message.startsWith('[SC ¥')) {
            roleClass = 'user superchat'; // 可以加个特殊样式
            roleName = '💰 Super Chat';
        } else {
            roleClass = 'user';
            roleName = '👤 用户';
        }
      } else if (item.role === 'Mao') {
        roleClass = 'mao';
        roleName = '🐱 Mao';
      } else {
        roleClass = 'ai';
        roleName = '🤖 Hiyori';
      }

      // 简单的 HTML 转义
      const escapeHtml = (text) => {
        if (!text) return '';
        return text
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;");
      };
      
      const safeMessage = escapeHtml(item.message);
      const safeUrl = item.audioUrl ? item.audioUrl.replace(/"/g, '&quot;') : '';

      return `
        <div class="chat-item ${roleClass}">
          <div class="chat-item-header">
            <span>${roleName} ${timeStr}</span>
            <button class="delete-msg-btn" data-index="${item.originalIndex}" style="background:none; border:none; color:rgba(255,255,255,0.3); cursor:pointer; font-size:14px; padding:0 5px;">✕</button>
          </div>
          <div class="chat-item-message">${safeMessage}</div>
          ${item.audioUrl ? `
            <div class="chat-item-audio">
              <button onclick="window.playHistoryAudio('${safeUrl}')">▶️ 播放语音</button>
            </div>
          ` : ''}
        </div>
      `;
    }).join('');

    historyList.innerHTML = html;

    // 5. 绑定删除按钮事件
    historyList.querySelectorAll('.delete-msg-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const index = parseInt(e.target.dataset.index);
        this.deleteChatItem(index);
      });
    });
    
    console.log('[Settings] ✅ 聊天历史已更新 (带筛选)');
  }

  /**
   * 删除单条聊天记录
   */
  deleteChatItem(index) {
    if (index >= 0 && index < this.chatHistory.length) {
      this.chatHistory.splice(index, 1);
      localStorage.setItem('chatHistory', JSON.stringify(this.chatHistory));
      this.refreshChatHistory();
    }
  }

  /**
   * 添加 Super Chat (公共接口，加入队列)
   */
  addSuperChat(user, text, price, duration = 0) {
    // 默认开启发送到后端 (除非明确不需要，比如历史回放)
    // 这样用户在控制台测试时也能触发 Coze
    this.enqueueSuperChat({
      user,
      text,
      price,
      duration,
      sendToBackend: true 
    });
  }

  /**
   * 渲染 Super Chat UI (内部调用)
   */
  _renderSuperChat(user, text, price, duration) {
    const scContainer = document.getElementById('superChatContainer');
    if (!scContainer) return;
    
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
      <div class="sc-progress-bar">
        <div class="sc-progress-fill" style="animation: progress ${duration}s linear forwards;"></div>
      </div>
      <style>
        @keyframes progress {
          from { width: 100%; }
          to { width: 0%; }
        }
      </style>
    `;
    
    scContainer.appendChild(card);
    
    // 自动移除
    setTimeout(() => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(-20px)';
      setTimeout(() => card.remove(), 300); // 等待动画结束
    }, duration * 1000);
    
    // 同时发送到聊天历史
    this.saveChatHistory('User', `[SC ¥${price}] ${user}: ${text}`);
    this.topBar.showMessage(`💰 SC: ${user} ¥${price}`, 5000, 'superchat');
  }

  /**
   * 添加弹幕
   */
  addDanmaku(text, color = '#fff', user = '') {
    const danmakuContainer = document.getElementById('danmakuContainer');
    if (!danmakuContainer) return;

    const danmaku = document.createElement('div');
    danmaku.className = 'danmaku-item';
    danmaku.textContent = text;
    danmaku.style.color = color;
    
    // 随机轨道逻辑 (0-5)
    const trackIndex = Math.floor(Math.random() * 6);
    const top = trackIndex * 50 + 80; // 80px起始高度,避开顶部
    danmaku.style.top = `${top}px`;
    danmaku.style.right = '-100px'; // 从右侧开始
    
    // 动画时长 (随机 8-12s)
    const duration = 8 + Math.random() * 4;
    danmaku.style.transition = `transform ${duration}s linear`;
    
    danmakuContainer.appendChild(danmaku);
    
    // 触发动画
    requestAnimationFrame(() => {
      // 移动到左侧屏幕外
      danmaku.style.transform = `translateX(-${window.innerWidth + 500}px)`; 
    });
    
    // 动画结束后移除
    setTimeout(() => {
      danmaku.remove();
    }, duration * 1000);
  }

  /**
   * 销毁应用
   */
  destroy() {
    // 关闭 WebSocket
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    
    if (this.wsReconnectTimer) {
      clearTimeout(this.wsReconnectTimer);
    }
    
    // 停止音频
    if (this.lyriaAudio) {
      this.lyriaAudio.pause();
      this.lyriaAudio.src = '';
      this.lyriaAudio = null;
    }
    
    if (this.currentBackground) {
      this.currentBackground.destroy();
    }

    if (this.pixiApp) {
      this.pixiApp.destroy(true);
    }

    if (this.audioAnalyzer) {
      this.audioAnalyzer.destroy();
    }

    if (this.topBar) {
      this.topBar.destroy();
    }

    if (this.bottomInput) {
      this.bottomInput.destroy();
    }

    if (this.layoutManager) {
      this.layoutManager.destroy();
    }
  }
}

// 页面加载后初始化
console.log('[Renderer] Module loaded, waiting for DOMContentLoaded...');

window.addEventListener('DOMContentLoaded', async () => {
  console.log('[Renderer] ========== DOMContentLoaded EVENT ==========');
  console.log('[Renderer] Creating FlowRadioApp instance...');
  
  try {
    const app = new FlowRadioApp();
    console.log('[Renderer] ✓ FlowRadioApp instance created');
    
    console.log('[Renderer] Calling app.init()...');
    await app.init();
    console.log('[Renderer] ✓ app.init() completed');

    // 全局暴露（方便调试）
    window.flowRadioApp = app;
    
    // 挂载全局接口
    window.addSuperChat = (user, text, price, duration) => app.addSuperChat(user, text, price, duration);
    window.addDanmaku = (text, color, user) => app.addDanmaku(text, color, user);
    
    // 修复: 确保 addSuperChat 在控制台可用
    // 有时候 window.addSuperChat 会被覆盖或未及时挂载
    Object.defineProperty(window, 'addSuperChat', {
      value: (user, text, price, duration) => app.addSuperChat(user, text, price, duration),
      writable: true,
      configurable: true
    });

    console.log('[Renderer] ✓ App exposed to window.flowRadioApp');
    console.log('[Renderer] ========== READY ==========');
  } catch (error) {
    console.error('[Renderer] ❌❌❌ FATAL ERROR ❌❌❌');
    console.error('[Renderer] Error:', error);
    console.error('[Renderer] Stack:', error.stack);
    
    // 显示错误到页面
    document.body.innerHTML += `
      <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
                  background: rgba(255,0,0,0.9); color: white; padding: 30px; border-radius: 15px;
                  z-index: 99999; max-width: 80%; font-family: monospace;">
        <h2>❌ FlowRadio 启动失败</h2>
        <p><strong>错误：</strong> ${error.message}</p>
        <pre style="background: rgba(0,0,0,0.5); padding: 15px; border-radius: 5px; 
                    overflow: auto; max-height: 300px; font-size: 12px;">
${error.stack}
        </pre>
        <p><small>请按 F12 打开 DevTools 查看完整日志</small></p>
      </div>
    `;
  }
});

console.log('[Renderer] DOMContentLoaded listener registered');
