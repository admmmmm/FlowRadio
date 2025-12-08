/**
 * 设置面板 - 包含聊天历史、Live2D Panel、Magenta控制
 */

class SettingsPanel {
  constructor(container, app) {
    this.container = container;
    this.app = app;
    this.element = null;
    this.isOpen = false;
    
    this.create();
  }

  create() {
    // 创建面板容器
    this.element = document.createElement('div');
    this.element.id = 'settings-panel';
    this.element.style.cssText = `
      position: fixed;
      top: 0;
      right: -400px;
      width: 400px;
      height: 100vh;
      background: rgba(0, 0, 0, 0.95);
      border-left: 2px solid #00ff88;
      z-index: 10000;
      transition: right 0.3s ease;
      overflow-y: auto;
      color: white;
      font-family: 'Microsoft YaHei', sans-serif;
    `;

    // 创建顶部标题栏
    const header = document.createElement('div');
    header.style.cssText = `
      padding: 20px;
      border-bottom: 1px solid #00ff88;
      display: flex;
      justify-content: space-between;
      align-items: center;
    `;
    header.innerHTML = `
      <h2 style="margin: 0; color: #00ff88; font-size: 20px;">⚙️ 设置</h2>
      <button id="close-settings" style="
        background: transparent;
        border: 1px solid #00ff88;
        color: #00ff88;
        padding: 5px 15px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
      ">关闭</button>
    `;
    this.element.appendChild(header);

    // 创建标签页
    const tabs = document.createElement('div');
    tabs.style.cssText = `
      display: flex;
      border-bottom: 1px solid #333;
      background: rgba(0, 0, 0, 0.5);
    `;
    tabs.innerHTML = `
      <button class="settings-tab active" data-tab="history">📜 聊天历史</button>
      <button class="settings-tab" data-tab="live2d">🎭 Live2D Panel</button>
      <button class="settings-tab" data-tab="magenta">🎵 Magenta控制</button>
    `;
    this.element.appendChild(tabs);

    // 创建标签页内容容器
    const content = document.createElement('div');
    content.id = 'settings-content';
    content.style.cssText = `
      padding: 20px;
    `;
    this.element.appendChild(content);

    // 添加到容器
    this.container.appendChild(this.element);

    // 添加样式
    this.addStyles();

    // 绑定事件
    this.bindEvents();

    // 默认显示聊天历史
    this.showTab('history');
  }

  addStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .settings-tab {
        flex: 1;
        padding: 12px;
        background: transparent;
        border: none;
        color: #888;
        cursor: pointer;
        transition: all 0.2s;
        font-size: 14px;
      }
      .settings-tab:hover {
        background: rgba(0, 255, 136, 0.1);
        color: #00ff88;
      }
      .settings-tab.active {
        background: rgba(0, 255, 136, 0.2);
        color: #00ff88;
        border-bottom: 2px solid #00ff88;
      }
      
      .history-item {
        padding: 15px;
        margin-bottom: 10px;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 8px;
        border-left: 3px solid #00ff88;
        cursor: pointer;
        transition: all 0.2s;
      }
      .history-item:hover {
        background: rgba(0, 255, 136, 0.1);
        transform: translateX(5px);
      }
      .history-item.user {
        border-left-color: #0088ff;
      }
      .history-item .role {
        color: #00ff88;
        font-weight: bold;
        margin-bottom: 5px;
        font-size: 12px;
      }
      .history-item.user .role {
        color: #0088ff;
      }
      .history-item .message {
        color: #fff;
        font-size: 14px;
        line-height: 1.5;
      }
      .history-item .time {
        color: #666;
        font-size: 11px;
        margin-top: 5px;
      }
      .history-item .play-btn {
        background: #00ff88;
        border: none;
        color: black;
        padding: 5px 10px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 12px;
        margin-top: 8px;
      }
      .history-item .play-btn:hover {
        background: #00cc6f;
      }

      .magenta-form input,
      .magenta-form textarea {
        width: 100%;
        padding: 10px;
        margin-bottom: 15px;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid #333;
        border-radius: 5px;
        color: white;
        font-family: inherit;
        font-size: 14px;
      }
      .magenta-form input:focus,
      .magenta-form textarea:focus {
        outline: none;
        border-color: #00ff88;
      }
      .magenta-form label {
        display: block;
        color: #00ff88;
        margin-bottom: 5px;
        font-size: 13px;
      }
      .magenta-form button {
        background: #00ff88;
        border: none;
        color: black;
        padding: 12px 30px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
        font-weight: bold;
        width: 100%;
      }
      .magenta-form button:hover {
        background: #00cc6f;
      }
    `;
    document.head.appendChild(style);
  }

  bindEvents() {
    // 关闭按钮
    this.element.querySelector('#close-settings').addEventListener('click', () => {
      this.close();
    });

    // 标签页切换
    this.element.querySelectorAll('.settings-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const tabName = tab.dataset.tab;
        this.showTab(tabName);
      });
    });
  }

  showTab(tabName) {
    // 更新标签页激活状态
    this.element.querySelectorAll('.settings-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.tab === tabName);
    });

    // 显示对应内容
    const content = this.element.querySelector('#settings-content');
    switch (tabName) {
      case 'history':
        this.showChatHistory(content);
        break;
      case 'live2d':
        this.showLive2DPanel(content);
        break;
      case 'magenta':
        this.showMagentaControl(content);
        break;
    }
  }

  showChatHistory(content) {
    const history = this.app.chatHistory || [];
    
    if (history.length === 0) {
      content.innerHTML = `
        <div style="text-align: center; padding: 50px; color: #666;">
          <p style="font-size: 48px; margin-bottom: 10px;">💬</p>
          <p>还没有聊天记录</p>
        </div>
      `;
      return;
    }

    let html = '<div style="max-height: calc(100vh - 200px); overflow-y: auto;">';
    
    // 倒序显示(最新的在上面)
    for (let i = history.length - 1; i >= 0; i--) {
      const item = history[i];
      const time = new Date(item.timestamp).toLocaleTimeString('zh-CN');
      const roleClass = item.role === 'User' ? 'user' : '';
      const roleIcon = item.role === 'User' ? '👤' : '🤖';
      
      html += `
        <div class="history-item ${roleClass}">
          <div class="role">${roleIcon} ${item.role}</div>
          <div class="message">${this.escapeHtml(item.message)}</div>
          <div class="time">${time}</div>
          ${item.audioUrl ? `<button class="play-btn" onclick="window.playHistoryAudio('${item.audioUrl}')">🔊 播放语音</button>` : ''}
        </div>
      `;
    }
    
    html += '</div>';
    content.innerHTML = html;

    // 添加播放音频的全局函数
    window.playHistoryAudio = (url) => {
      const audio = new Audio(url);
      audio.play().catch(err => console.error('播放失败:', err));
    };
  }

  showLive2DPanel(content) {
    content.innerHTML = `
      <div style="text-align: center; padding: 30px;">
        <h3 style="color: #00ff88; margin-bottom: 20px;">🎭 Live2D 开发面板</h3>
        <p style="color: #888; margin-bottom: 30px;">在 Live2D iframe 中打开开发面板</p>
        <button id="open-live2d-panel" style="
          background: #00ff88;
          border: none;
          color: black;
          padding: 15px 40px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 16px;
          font-weight: bold;
        ">打开 Panel Dev</button>
      </div>
    `;

    content.querySelector('#open-live2d-panel').addEventListener('click', () => {
      const iframe = document.getElementById('live2d-frame');
      if (iframe && iframe.contentWindow) {
        // 触发Live2D iframe中的panel toggle
        const button = iframe.contentDocument.getElementById('panel-toggle');
        if (button) {
          button.click();
          this.app.topBar.showMessage('✅ Live2D Panel已打开', 2000, 'normal');
        } else {
          this.app.topBar.showMessage('❌ Panel按钮未找到', 2000, 'warning');
        }
      }
    });
  }

  showMagentaControl(content) {
    content.innerHTML = `
      <div class="magenta-form">
        <h3 style="color: #00ff88; margin-bottom: 20px;">🎵 Magenta 音乐控制</h3>
        
        <label>风格标签 (逗号分隔)</label>
        <input type="text" id="magenta-genre" placeholder="例: Jazz, Lofi, Electronic" value="Lofi, Chill">
        
        <label>乐器 (逗号分隔)</label>
        <input type="text" id="magenta-instrument" placeholder="例: Piano, Guitar" value="Piano">
        
        <label>情绪 (逗号分隔)</label>
        <input type="text" id="magenta-mood" placeholder="例: Happy, Relaxed" value="Relaxed">
        
        <label>BPM (节奏)</label>
        <input type="number" id="magenta-bpm" placeholder="60-180" value="80" min="60" max="180">
        
        <label>时长 (秒)</label>
        <input type="number" id="magenta-duration" placeholder="30-300" value="60" min="30" max="300">
        
        <label>推理原因 (可选)</label>
        <textarea id="magenta-reasoning" placeholder="为什么选择这个风格?" rows="3">手动测试音乐切换</textarea>
        
        <button id="send-magenta">🎵 发送到 Magenta</button>
      </div>
    `;

    content.querySelector('#send-magenta').addEventListener('click', () => {
      const params = {
        genre: content.querySelector('#magenta-genre').value.split(',').map(s => s.trim()).filter(s => s),
        instrument: content.querySelector('#magenta-instrument').value.split(',').map(s => s.trim()).filter(s => s),
        mood: content.querySelector('#magenta-mood').value.split(',').map(s => s.trim()).filter(s => s),
        theme: [],
        bpm: parseInt(content.querySelector('#magenta-bpm').value) || 80,
        duration: parseInt(content.querySelector('#magenta-duration').value) || 60,
        reasoning: content.querySelector('#magenta-reasoning').value
      };

      console.log('🎛️ 发送音乐参数到Magenta:', params);
      
      if (this.app.ws && this.app.ws.readyState === WebSocket.OPEN) {
        this.app.ws.send(JSON.stringify({
          type: 'UPDATE_MUSIC',
          data: params
        }));
        this.app.topBar.showMessage('✅ 已发送到Magenta', 2000, 'normal');
      } else {
        this.app.topBar.showMessage('❌ WebSocket未连接', 2000, 'warning');
      }
    });
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  open() {
    this.element.style.right = '0';
    this.isOpen = true;
    // 刷新聊天历史
    if (this.element.querySelector('.settings-tab.active').dataset.tab === 'history') {
      this.showTab('history');
    }
  }

  close() {
    this.element.style.right = '-400px';
    this.isOpen = false;
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  destroy() {
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }
}

module.exports = SettingsPanel;
