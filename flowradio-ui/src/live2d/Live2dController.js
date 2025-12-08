/**
 * Live2dController - Live2D 控制器包装
 * 集成 pixi-live2d-display-lipsyncpatch
 */

class Live2dController {
  constructor() {
    this.controller = null;
    this.initialized = false;
    this.characters = new Map(); // id -> character data
  }

  /**
   * 初始化 Live2D 控制器
   * @param {Object} config - 配置参数
   * @param {string} config.canvasId - Canvas ID
   * @param {Array} config.characterConfigs - 角色配置数组
   * @param {boolean} config.persist - 是否持久化 NL 映射
   * @param {boolean} config.enablePanel - 是否启用调试面板
   */
  async init(config) {
    try {
      // 检查是否已加载 Live2D 库
      if (typeof window.initLive2d !== 'function') {
        console.warn('[Live2dController] Live2D library not loaded, using mock mode');
        this.initialized = false;
        return;
      }

      // 初始化 Live2D
      this.controller = await window.initLive2d({
        canvasId: config.canvasId,
        characterConfigs: config.characterConfigs || [],
        persist: config.persist !== false,
        enablePanel: config.enablePanel || false
      });

      // 保存角色信息
      if (config.characterConfigs) {
        config.characterConfigs.forEach(char => {
          this.characters.set(char.id, {
            id: char.id,
            modelJsonUrl: char.modelJsonUrl,
            scale: char.scale || 1.0,
            position: char.position || { xRatio: 0.5, yRatio: 0.95 }
          });
        });
      }

      this.initialized = true;
      console.log('[Live2dController] Initialized successfully');
    } catch (error) {
      console.error('[Live2dController] Initialization failed:', error);
      this.initialized = false;
    }
  }

  /**
   * 触发动作/表情
   * @param {string} id - 角色 ID
   * @param {string|Object} input - 自然语言或 { type, index }
   * @param {Object} extra - 额外参数 { priority, ... }
   */
  act(id, input, extra = {}) {
    if (!this.initialized || !this.controller) {
      console.warn('[Live2dController] Not initialized');
      return;
    }

    try {
      this.controller.act(id, input, extra);
    } catch (error) {
      console.error('[Live2dController] Act failed:', error);
    }
  }

  /**
   * 所有角色触发动作/表情
   * @param {string|Object} input - 自然语言或 { type, index }
   * @param {Object} extra - 额外参数
   */
  actAll(input, extra = {}) {
    if (!this.initialized || !this.controller) {
      console.warn('[Live2dController] Not initialized');
      return;
    }

    try {
      this.controller.actAll(input, extra);
    } catch (error) {
      console.error('[Live2dController] ActAll failed:', error);
    }
  }

  /**
   * 动作 + 音频 + 口型同步
   * @param {string} id - 角色 ID
   * @param {string|Object} input - 动作输入
   * @param {string} soundUrl - 音频 URL
   * @param {Object} extra - 额外参数
   * @param {number} extra.volume - 音量 (0-1)
   * @param {number|string} extra.expression - 表情索引或名称
   * @param {boolean} extra.resetExpression - 是否重置表情
   * @param {string} extra.crossOrigin - CORS 设置
   * @param {Function} extra.onFinish - 完成回调
   * @param {Function} extra.onError - 错误回调
   */
  actWithAudio(id, input, soundUrl, extra = {}) {
    if (!this.initialized || !this.controller) {
      console.warn('[Live2dController] Not initialized');
      return;
    }

    try {
      this.controller.actWithAudio(id, input, soundUrl, extra);
    } catch (error) {
      console.error('[Live2dController] ActWithAudio failed:', error);
      if (extra.onError) {
        extra.onError(error);
      }
    }
  }

  /**
   * 所有角色动作 + 音频 + 口型
   * @param {string|Object} input - 动作输入
   * @param {string} soundUrl - 音频 URL
   * @param {Object} extra - 额外参数
   */
  actAllWithAudio(input, soundUrl, extra = {}) {
    if (!this.initialized || !this.controller) {
      console.warn('[Live2dController] Not initialized');
      return;
    }

    try {
      this.controller.actAllWithAudio(input, soundUrl, extra);
    } catch (error) {
      console.error('[Live2dController] ActAllWithAudio failed:', error);
      if (extra.onError) {
        extra.onError(error);
      }
    }
  }

  /**
   * 设置角色模式
   * @param {string} id - 角色 ID
   * @param {number} mode - 1:手动(索引) 2:自然语言
   */
  setMode(id, mode) {
    if (!this.initialized || !this.controller) {
      console.warn('[Live2dController] Not initialized');
      return;
    }

    try {
      this.controller.setMode(id, mode);
    } catch (error) {
      console.error('[Live2dController] SetMode failed:', error);
    }
  }

  /**
   * 停止角色动作
   * @param {string} id - 角色 ID
   */
  stopMotions(id) {
    if (!this.initialized || !this.controller) {
      console.warn('[Live2dController] Not initialized');
      return;
    }

    try {
      this.controller.stopMotions(id);
    } catch (error) {
      console.error('[Live2dController] StopMotions failed:', error);
    }
  }

  /**
   * 列出所有角色
   * @returns {Array} - 角色列表
   */
  list() {
    if (!this.initialized || !this.controller) {
      return Array.from(this.characters.values());
    }

    try {
      return this.controller.list();
    } catch (error) {
      console.error('[Live2dController] List failed:', error);
      return Array.from(this.characters.values());
    }
  }

  /**
   * 获取角色信息
   * @param {string} id - 角色 ID
   * @returns {Object}
   */
  getCharacter(id) {
    return this.characters.get(id);
  }

  /**
   * 销毁控制器
   */
  destroy() {
    if (this.controller && this.controller.destroy) {
      this.controller.destroy();
    }
    this.controller = null;
    this.initialized = false;
    this.characters.clear();
  }
}

// CommonJS 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Live2dController;
}
