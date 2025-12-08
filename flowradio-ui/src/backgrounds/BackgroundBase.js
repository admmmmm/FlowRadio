/**
 * BackgroundBase - 背景系统基类
 * 所有背景主题必须继承此类并实现接口
 */

class BackgroundBase {
  constructor() {
    this.app = null;
    this.audioAnalyzer = null;
    this.container = null;
    this.initialized = false;
  }

  /**
   * 初始化背景
   * @param {PIXI.Application} app - PixiJS 应用实例
   * @param {AudioAnalyzer} audioAnalyzer - 音频分析器
   */
  init(app, audioAnalyzer) {
    this.app = app;
    this.audioAnalyzer = audioAnalyzer;
    
    // 创建容器
    this.container = new PIXI.Container();
    this.app.stage.addChild(this.container);
    
    this.initialized = true;
  }

  /**
   * 更新（每帧调用）
   * @param {number} dt - Delta time (秒)
   */
  update(dt) {
    // 子类实现
  }

  /**
   * 调整大小
   * @param {number} width - 宽度
   * @param {number} height - 高度
   */
  resize(width, height) {
    // 子类实现
  }

  /**
   * 设置音频分析器（用于后期连接）
   * @param {AudioAnalyzer} audioAnalyzer - 音频分析器
   */
  setAudioAnalyzer(audioAnalyzer) {
    this.audioAnalyzer = audioAnalyzer;
    console.log('[BackgroundBase] AudioAnalyzer connected');
  }

  /**
   * 销毁背景
   */
  destroy() {
    if (this.container) {
      this.container.destroy({ children: true });
      this.container = null;
    }
    
    this.app = null;
    this.audioAnalyzer = null;
    this.initialized = false;
  }
}

// CommonJS 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BackgroundBase;
}
