/**
 * Live2DArea - Live2D 角色显示区域
 */

class Live2DArea {
  constructor(containerElement, position = 'left') {
    this.container = containerElement;
    this.position = position; // 'left' or 'right'
    this.element = null;
    this.canvas = null;
    
    this.init();
  }

  init() {
    // 创建容器
    this.element = document.createElement('div');
    this.element.id = `live2d-area-${this.position}`;
    this.element.style.cssText = `
      position: absolute;
      z-index: 50;
      pointer-events: auto;
    `;
    
    // 创建 canvas（Live2D 需要）
    this.canvas = document.createElement('canvas');
    this.canvas.style.cssText = `
      width: 100%;
      height: 100%;
    `;
    
    this.element.appendChild(this.canvas);
    this.container.appendChild(this.element);
  }

  /**
   * 获取 Canvas 元素
   * @returns {HTMLCanvasElement}
   */
  getCanvas() {
    return this.canvas;
  }

  /**
   * 调整大小
   * @param {number} width
   * @param {number} height
   */
  resize(width, height) {
    if (this.canvas) {
      this.canvas.width = width;
      this.canvas.height = height;
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
  module.exports = Live2DArea;
}
