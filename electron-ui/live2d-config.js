/**
 * Live2D 配置文件
 * 为未来集成 Live2D 准备
 */

export const Live2DConfig = {
  // Live2D 资源路径
  basePath: '../live2d/public',
  corePath: '../live2d/public/Core/live2dcubismcore.js',
  
  // 主持人配置
  hosts: [
    {
      id: 'host1',
      modelJsonUrl: '/live2d/hiyori/hiyori_pro_t11.model3.json',
      scale: 0.32,
      position: { xRatio: 0.3, yRatio: 0.95 },
      name: '主持人1',
    },
    {
      id: 'host2',
      modelJsonUrl: '/live2d/mao/mao_pro.model3.json',
      scale: 0.42,
      position: { xRatio: 0.7, yRatio: 0.97 },
      name: '主持人2',
    },
  ],
  
  // Live2D 选项
  options: {
    persist: true, // 允许用户在 localStorage 覆盖 NL 映射
    enablePanel: false, // 生产环境关闭调试面板
  },
  
  // 动作映射（自然语言）
  actions: {
    greeting: ['挥手', '打招呼'],
    dancing: ['跳舞', '律动'],
    excited: ['兴奋', '激动'],
    happy: ['开心', '高兴'],
    idle: ['待机', '休息'],
  },
};

/**
 * Live2D 管理器（占位符）
 * 未来实现完整的 Live2D 集成
 */
export class Live2DManager {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.controller = null;
    this.isInitialized = false;
  }

  /**
   * 初始化 Live2D
   */
  async init() {
    if (this.isInitialized) {
      console.warn('⚠️ Live2D 已初始化');
      return;
    }

    console.log('🎭 Live2D 初始化准备中...');
    
    // TODO: 实现 Live2D 初始化逻辑
    // 参考 long-tree/live2d 仓库的 initLive2d 方法
    
    this.isInitialized = true;
    console.log('✅ Live2D 管理器已就绪（待实现）');
  }

  /**
   * 触发主持人动作
   * @param {string} hostId - 主持人 ID
   * @param {string} action - 动作名称
   */
  playAction(hostId, action) {
    if (!this.isInitialized) {
      console.warn('⚠️ Live2D 未初始化');
      return;
    }

    console.log(`🎭 播放动作: ${hostId} -> ${action}`);
    
    // TODO: 实现动作播放逻辑
    // this.controller.act(hostId, action);
  }

  /**
   * 播放主持人语音并同步口型
   * @param {string} hostId - 主持人 ID
   * @param {string} action - 动作名称
   * @param {string} audioUrl - 音频 URL
   */
  playWithAudio(hostId, action, audioUrl) {
    if (!this.isInitialized) {
      console.warn('⚠️ Live2D 未初始化');
      return;
    }

    console.log(`🎭 播放带音频的动作: ${hostId} -> ${action}, 音频: ${audioUrl}`);
    
    // TODO: 实现音频同步逻辑
    // this.controller.actWithAudio(hostId, action, audioUrl, {
    //   volume: 1,
    //   expression: 0,
    //   resetExpression: true,
    // });
  }

  /**
   * 根据音乐节奏调整主持人动作
   * @param {number} intensity - 音乐强度 (0-1)
   */
  updateWithMusic(intensity) {
    if (!this.isInitialized) return;

    // TODO: 根据音乐强度触发不同的动作
    // 例如：高强度时跳舞，低强度时待机
    if (intensity > 0.7) {
      // 高强度：兴奋/跳舞
    } else if (intensity > 0.4) {
      // 中等强度：摇摆
    } else {
      // 低强度：待机
    }
  }

  /**
   * 销毁 Live2D
   */
  destroy() {
    if (this.controller) {
      // TODO: 实现销毁逻辑
      this.controller = null;
    }
    this.isInitialized = false;
    console.log('✅ Live2D 已销毁');
  }
}
