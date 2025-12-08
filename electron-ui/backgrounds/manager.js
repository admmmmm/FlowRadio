/**
 * 动态背景管理器
 * 支持切换不同的背景效果
 */

const { TetrisBackground } = require('./tetris.js');

class BackgroundManager {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      throw new Error(`容器 #${containerId} 不存在`);
    }

    this.currentBackground = null;
    this.backgroundType = null;
    this.availableBackgrounds = {
      tetris: TetrisBackground,
      // 未来可以添加更多背景类型
      // beatSaber: BeatSaberBackground,
      // particles: ParticlesBackground,
    };
  }

  /**
   * 初始化背景
   * @param {string} type - 背景类型 ('tetris', 'beatSaber', 等)
   * @param {object} options - 背景选项
   */
  async init(type = 'tetris', options = {}) {
    // 如果已有背景，先销毁
    if (this.currentBackground) {
      this.destroy();
    }

    const BackgroundClass = this.availableBackgrounds[type];
    if (!BackgroundClass) {
      console.error(`❌ 未知的背景类型: ${type}`);
      return;
    }

    this.backgroundType = type;
    this.currentBackground = new BackgroundClass(this.container, options);
    await this.currentBackground.init();

    console.log(`✅ 背景已切换到: ${type}`);
  }

  /**
   * 根据音乐节奏更新背景
   * @param {number} intensity - 节奏强度 (0-1)
   */
  updateWithMusic(intensity) {
    if (this.currentBackground && typeof this.currentBackground.updateWithMusic === 'function') {
      this.currentBackground.updateWithMusic(intensity);
    }
  }

  /**
   * 切换背景类型
   * @param {string} type - 新的背景类型
   * @param {object} options - 背景选项
   */
  async switchBackground(type, options = {}) {
    await this.init(type, options);
  }

  /**
   * 获取当前背景类型
   */
  getCurrentType() {
    return this.backgroundType;
  }

  /**
   * 销毁当前背景
   */
  destroy() {
    if (this.currentBackground) {
      this.currentBackground.destroy();
      this.currentBackground = null;
      this.backgroundType = null;
      
      // 清空容器
      while (this.container.firstChild) {
        this.container.removeChild(this.container.firstChild);
      }
    }
  }
}

module.exports = { BackgroundManager };
