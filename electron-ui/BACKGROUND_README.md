# FlowRadio 动态背景与 Live2D 集成说明

## 架构概览

### 1. 动态背景系统

FlowRadio 现已集成模块化的动态背景系统，支持：
- ✅ 俄罗斯方块动态效果（已实现）
- 🔜 节奏光剑效果（待实现）
- 🔜 粒子特效（待实现）
- 🎵 音乐节奏同步

#### 文件结构
```
electron-ui/
├── backgrounds/
│   ├── manager.js      # 背景管理器（支持切换不同背景）
│   └── tetris.js       # 俄罗斯方块背景实现
├── live2d-config.js    # Live2D 配置（占位符）
├── index.html          # 主页面（已添加背景容器）
├── style.css           # 样式（已添加背景和 Live2D 样式）
└── renderer.js         # 主渲染逻辑（已集成背景和音频分析）
```

#### 使用方法

**初始化背景**：
```javascript
import { BackgroundManager } from './backgrounds/manager.js';

const manager = new BackgroundManager('dynamic-background');
await manager.init('tetris', {
  blockSize: 30,
  baseSpeed: 2,
  spawnInterval: 60,
});
```

**切换背景**：
```javascript
await manager.switchBackground('beatSaber', { /* options */ });
```

**音乐节奏同步**：
```javascript
manager.updateWithMusic(intensity); // intensity: 0-1
```

---

### 2. 音乐节奏分析

使用 Web Audio API 分析音频流并实时更新背景：

- **分析频率**：每 50ms 更新一次
- **强度计算**：基于音频频谱平均值（0-255 归一化为 0-1）
- **背景响应**：
  - 高强度（> 0.7）：加快方块下落速度、增加透明度
  - 低强度（< 0.4）：恢复正常速度

---

### 3. Live2D 集成准备

已为 Live2D 集成打好基础：

#### 容器准备
- HTML：`<div id="live2d-container"></div>`
- CSS：已定义样式（固定在底部，双主持人布局）

#### 配置文件
`live2d-config.js` 包含：
- 模型路径配置
- 主持人位置和缩放
- 动作映射（自然语言）

#### 下一步实现
1. 复制 `long-tree/live2d` 的模型文件到 `electron-ui/public/live2d/`
2. 引入 `live2dcubismcore.js` 核心库
3. 实现 `Live2DManager` 类的 `init()` 方法
4. 将主持人动作与音乐节奏绑定

---

## 如何添加新背景

### 步骤 1：创建背景类
在 `backgrounds/` 目录下创建新文件（如 `beatSaber.js`）：

```javascript
import * as PIXI from 'pixi.js';

export class BeatSaberBackground {
  constructor(container, options = {}) {
    this.container = container;
    this.options = options;
    this.app = null;
  }

  async init() {
    // 初始化 Pixi 应用
    this.app = new PIXI.Application({ /* ... */ });
    this.container.appendChild(this.app.view);
    
    // 启动动画
    this.app.ticker.add((delta) => this.update(delta));
  }

  update(delta) {
    // 更新动画逻辑
  }

  updateWithMusic(intensity) {
    // 根据音乐节奏调整动画
  }

  destroy() {
    // 清理资源
  }
}
```

### 步骤 2：注册到管理器
在 `backgrounds/manager.js` 中添加：

```javascript
import { BeatSaberBackground } from './beatSaber.js';

this.availableBackgrounds = {
  tetris: TetrisBackground,
  beatSaber: BeatSaberBackground, // 新增
};
```

### 步骤 3：使用新背景
```javascript
await manager.switchBackground('beatSaber');
```

---

## 技术栈

- **Pixi.js**：高性能 2D 渲染引擎
- **Web Audio API**：音频分析和播放
- **Live2D**（计划中）：角色动画
- **Electron**：桌面应用框架

---

## 已知问题

1. **音频分析延迟**：约 50ms 的分析延迟，可能导致背景与音乐不完全同步
   - **解决方案**：调整 `musicIntensityInterval` 频率或使用预测算法

2. **性能优化**：大量方块可能影响性能
   - **解决方案**：限制 `maxBlocks` 数量或使用对象池

---

## 未来计划

- [ ] 实现节奏光剑背景
- [ ] 集成 Live2D 主持人
- [ ] 添加背景切换 UI
- [ ] 支持自定义背景参数
- [ ] 优化音乐节奏分析算法

---

## 参考资料

- [Pixi.js 官方文档](https://pixijs.com/docs)
- [long-tree/live2d 仓库](https://github.com/long-tree/live2d)
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
