/**
 * LayoutManager - 响应式横屏布局管理器
 * 支持 SafeArea + 9-grid 自适应布局
 */

class LayoutManager {
  constructor(containerElement) {
    this.container = containerElement;
    this.width = 0;
    this.height = 0;
    this.aspectRatio = 16 / 9; // 默认宽高比
    
    // SafeArea 边距 (百分比)
    this.safeArea = {
      top: 0.05,    // 5%
      bottom: 0.08, // 8%
      left: 0.05,   // 5%
      right: 0.05   // 5%
    };
    
    // 布局区域
    this.regions = {
      topBar: null,       // 顶部栏
      bottomInput: null,  // 底部输入
      live2dLeft: null,   // 左侧 Live2D
      live2dRight: null,  // 右侧 Live2D
      background: null    // 中间背景
    };
    
    // 区域元素引用
    this.elements = {};
    
    this.init();
  }

  init() {
    // 监听窗口大小变化
    window.addEventListener('resize', () => this.resize());
    
    // 初始化布局
    this.resize();
  }

  /**
   * 响应式布局计算
   */
  resize() {
    this.width = this.container.clientWidth || window.innerWidth;
    this.height = this.container.clientHeight || window.innerHeight;
    this.aspectRatio = this.width / this.height;
    
    console.log(`[LayoutManager] Resize: ${this.width}x${this.height}, aspect: ${this.aspectRatio.toFixed(2)}`);
    
    // 计算 SafeArea
    const safeLeft = this.width * this.safeArea.left;
    const safeRight = this.width * (1 - this.safeArea.right);
    const safeTop = this.height * this.safeArea.top;
    const safeBottom = this.height * (1 - this.safeArea.bottom);
    const safeWidth = safeRight - safeLeft;
    const safeHeight = safeBottom - safeTop;
    
    // 顶部栏区域 (SuperChat / 提示栏)
    this.regions.topBar = {
      x: safeLeft,
      y: 0,
      width: safeWidth,
      height: safeTop * 1.5 // 延伸到 SafeArea 之外
    };
    
    // 底部输入区域
    const bottomHeight = Math.max(60, this.height * 0.08);
    this.regions.bottomInput = {
      x: safeLeft,
      y: safeBottom,
      width: safeWidth,
      height: bottomHeight
    };
    
    // Live2D 区域计算
    // 左右各占 30%，中间 40% 为背景
    const live2dWidth = safeWidth * 0.3;
    const backgroundWidth = safeWidth * 0.4;
    
    this.regions.live2dLeft = {
      x: safeLeft,
      y: safeTop,
      width: live2dWidth,
      height: safeHeight
    };
    
    this.regions.live2dRight = {
      x: safeLeft + live2dWidth + backgroundWidth,
      y: safeTop,
      width: live2dWidth,
      height: safeHeight
    };
    
    // 背景区域 (铺满整个可视区域，Live2D 在其上层)
    this.regions.background = {
      x: 0,
      y: 0,
      width: this.width,
      height: this.height
    };
    
    // 应用布局到已注册的元素
    this.applyLayout();
    
    // 触发布局更新事件
    this.onResize();
  }

  /**
   * 注册布局元素
   * @param {string} region - 区域名称
   * @param {HTMLElement} element - DOM 元素
   */
  registerElement(region, element) {
    this.elements[region] = element;
    this.applyLayoutToElement(region, element);
  }

  /**
   * 应用布局到所有元素
   */
  applyLayout() {
    for (const [region, element] of Object.entries(this.elements)) {
      this.applyLayoutToElement(region, element);
    }
  }

  /**
   * 应用布局到单个元素
   * @param {string} region - 区域名称
   * @param {HTMLElement} element - DOM 元素
   */
  applyLayoutToElement(region, element) {
    const rect = this.regions[region];
    if (!rect || !element) return;
    
    element.style.position = 'absolute';
    element.style.left = `${rect.x}px`;
    element.style.top = `${rect.y}px`;
    element.style.width = `${rect.width}px`;
    element.style.height = `${rect.height}px`;
    
    // 防止溢出
    element.style.overflow = 'hidden';
  }

  /**
   * 获取区域尺寸
   * @param {string} region - 区域名称
   * @returns {{ x: number, y: number, width: number, height: number }}
   */
  getRegion(region) {
    return this.regions[region];
  }

  /**
   * 布局更新回调（由子类或外部重写）
   */
  onResize() {
    // 触发自定义事件
    const event = new CustomEvent('layoutResize', {
      detail: {
        width: this.width,
        height: this.height,
        regions: this.regions
      }
    });
    window.dispatchEvent(event);
  }

  /**
   * 销毁布局管理器
   */
  destroy() {
    window.removeEventListener('resize', this.resize);
    this.elements = {};
  }
}

// CommonJS 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = LayoutManager;
}
