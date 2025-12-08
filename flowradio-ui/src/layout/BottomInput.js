/**
 * BottomInput - 底部输入组件
 */

class BottomInput {
  constructor(containerElement, onSendCallback) {
    this.container = containerElement;
    this.onSend = onSendCallback || (() => {});
    this.element = null;
    this.input = null;
    this.sendButton = null;
    
    this.init();
  }

  init() {
    // 创建容器
    this.element = document.createElement('div');
    this.element.id = 'bottom-input';
    this.element.style.cssText = `
      position: absolute;
      background: linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 100%);
      display: flex;
      align-items: center;
      padding: 10px 20px;
      gap: 10px;
      z-index: 100;
      backdrop-filter: blur(10px);
    `;
    
    // 创建输入框
    this.input = document.createElement('input');
    this.input.type = 'text';
    this.input.placeholder = '和 AI DJ 聊聊天...';
    this.input.style.cssText = `
      flex: 1;
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.3);
      border-radius: 20px;
      padding: 10px 20px;
      color: white;
      font-size: 14px;
      font-family: 'Microsoft YaHei', sans-serif;
      outline: none;
      transition: all 0.3s;
    `;
    
    // 输入框焦点样式
    this.input.addEventListener('focus', () => {
      this.input.style.background = 'rgba(255,255,255,0.15)';
      this.input.style.borderColor = 'rgba(100,200,255,0.6)';
    });
    
    this.input.addEventListener('blur', () => {
      this.input.style.background = 'rgba(255,255,255,0.1)';
      this.input.style.borderColor = 'rgba(255,255,255,0.3)';
    });
    
    // 回车发送
    this.input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && this.input.value.trim()) {
        this.send();
      }
    });
    
    // 创建发送按钮
    this.sendButton = document.createElement('button');
    this.sendButton.textContent = '发送';
    this.sendButton.style.cssText = `
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: none;
      border-radius: 20px;
      padding: 10px 30px;
      color: white;
      font-size: 14px;
      font-family: 'Microsoft YaHei', sans-serif;
      cursor: pointer;
      transition: all 0.3s;
      box-shadow: 0 4px 15px rgba(102,126,234,0.4);
    `;
    
    this.sendButton.addEventListener('mouseenter', () => {
      this.sendButton.style.transform = 'translateY(-2px)';
      this.sendButton.style.boxShadow = '0 6px 20px rgba(102,126,234,0.6)';
    });
    
    this.sendButton.addEventListener('mouseleave', () => {
      this.sendButton.style.transform = 'translateY(0)';
      this.sendButton.style.boxShadow = '0 4px 15px rgba(102,126,234,0.4)';
    });
    
    this.sendButton.addEventListener('click', () => {
      if (this.input.value.trim()) {
        this.send();
      }
    });
    
    // 组装
    this.element.appendChild(this.input);
    this.element.appendChild(this.sendButton);
    this.container.appendChild(this.element);
  }

  /**
   * 发送消息
   */
  send() {
    const message = this.input.value.trim();
    if (!message) return;
    
    // 调用回调
    this.onSend(message);
    
    // 清空输入框
    this.input.value = '';
    
    // 按钮动画
    this.sendButton.style.transform = 'scale(0.95)';
    setTimeout(() => {
      this.sendButton.style.transform = 'scale(1)';
    }, 100);
  }

  /**
   * 设置输入框状态
   * @param {boolean} enabled - 是否启用
   */
  setEnabled(enabled) {
    this.input.disabled = !enabled;
    this.sendButton.disabled = !enabled;
    
    if (enabled) {
      this.sendButton.style.opacity = '1';
      this.sendButton.style.cursor = 'pointer';
    } else {
      this.sendButton.style.opacity = '0.5';
      this.sendButton.style.cursor = 'not-allowed';
    }
  }

  /**
   * 销毁组件
   */
  destroy() {
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }
}

// CommonJS 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BottomInput;
}
