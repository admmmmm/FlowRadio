/**
 * TopBar - 顶部栏组件 (SuperChat / 提示栏)
 */

class TopBar {
  constructor(containerElement) {
    this.container = containerElement;
    this.element = null;
    this.messageQueue = [];
    this.currentMessage = null;
    this.animationId = null;
    
    this.init();
  }

  init() {
    // 创建顶部栏元素
    this.element = document.createElement('div');
    this.element.id = 'top-bar';
    this.element.style.cssText = `
      position: absolute;
      background: linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%);
      color: white;
      font-family: 'Microsoft YaHei', sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100;
      pointer-events: none;
    `;
    
    this.container.appendChild(this.element);
  }

  /**
   * 显示消息
   * @param {string} text - 消息文本
   * @param {number} duration - 显示时长 (ms)
   * @param {string} type - 消息类型 'normal' | 'superchat' | 'warning'
   */
  showMessage(text, duration = 3000, type = 'normal') {
    this.messageQueue.push({ text, duration, type });
    
    if (!this.currentMessage) {
      this.displayNext();
    }
  }

  /**
   * 显示下一条消息
   */
  displayNext() {
    if (this.messageQueue.length === 0) {
      this.currentMessage = null;
      this.element.innerHTML = '';
      return;
    }
    
    this.currentMessage = this.messageQueue.shift();
    const { text, duration, type } = this.currentMessage;
    
    // 设置样式
    let bgColor = 'rgba(0,0,0,0.6)';
    let textColor = '#ffffff';
    let fontSize = '16px';
    
    if (type === 'superchat') {
      bgColor = 'linear-gradient(90deg, #ff6b6b 0%, #ff8e53 100%)';
      fontSize = '20px';
    } else if (type === 'warning') {
      bgColor = 'rgba(255,193,7,0.8)';
      textColor = '#000000';
    }
    
    this.element.style.background = bgColor;
    this.element.innerHTML = `
      <span style="
        font-size: ${fontSize};
        color: ${textColor};
        padding: 10px 20px;
        text-shadow: 0 2px 4px rgba(0,0,0,0.3);
      ">${text}</span>
    `;
    
    // 淡入动画
    this.element.style.opacity = '0';
    this.element.style.transform = 'translateY(-20px)';
    this.element.style.transition = 'opacity 0.3s, transform 0.3s';
    
    setTimeout(() => {
      this.element.style.opacity = '1';
      this.element.style.transform = 'translateY(0)';
    }, 50);
    
    // 自动隐藏
    setTimeout(() => {
      this.element.style.opacity = '0';
      this.element.style.transform = 'translateY(-20px)';
      
      setTimeout(() => {
        this.displayNext();
      }, 300);
    }, duration);
  }

  /**
   * 清空消息队列
   */
  clear() {
    this.messageQueue = [];
    this.currentMessage = null;
    this.element.innerHTML = '';
  }

  /**
   * 销毁组件
   */
  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    this.clear();
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }
}

// CommonJS 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TopBar;
}
