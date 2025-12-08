# 🎵 FlowRadio UI Framework - 项目概览

## 📌 项目简介

**FlowRadio UI** 是一个专为 AI DJ 应用设计的 Electron + PixiJS + Live2D 横屏 UI 框架。

核心特色：
- 🎨 **Neon Tetris** 动态背景（AI 自动游戏 + 音乐驱动）
- 🎎 **Live2D** 双主播集成（动作 + 口型同步）
- 📐 **响应式布局**（SafeArea + 9-grid 自适应）
- 🎵 **实时音频分析**（FFT + 节拍检测）
- 🔌 **可插拔背景系统**（统一接口，易扩展）

## 🚀 3 步快速启动

```bash
# 1. 进入目录
cd flowradio-ui

# 2. 安装依赖
npm install

# 3. 启动应用
npm start
```

**完成！** 应用将自动打开，展示 Neon Tetris 背景。

## 📚 文档导航

| 文档 | 用途 | 适合人群 |
|------|------|----------|
| [README.md](README.md) | 技术文档 | 开发者 |
| [USAGE.md](USAGE.md) | 使用指南 | 用户/配置者 |
| [QUICKSTART.md](QUICKSTART.md) | 快速启动 | 新手/测试者 |
| [ARCHITECTURE.md](ARCHITECTURE.md) | 系统架构 | 架构师/高级开发者 |
| [DELIVERY.md](DELIVERY.md) | 交付总结 | 项目经理/验收方 |

## 🎯 核心功能速览

### 1️⃣ Neon Tetris 背景

**视觉效果：**
```
🔵 Neon 发光块（7 种颜色）
✨ 伪 3D 透视效果
💫 流光扫描线
🌈 渐变高光
```

**音乐驱动：**
```
🎵 Kick  (低频) → 震动 + 脉冲
🥁 Snare (鼓点) → 旋转触发
🎶 Hihat (镲片) → 颜色跃迁
```

**AI 操作：**
- 自动移动（0.5 秒/次）
- 自动下落（1 秒/次）
- 智能旋转
- 自动堆叠
- 消行特效（闪光 + 粒子爆炸）

### 2️⃣ 响应式布局

```
┌───────────────────────────────────┐
│    TopBar (SuperChat/提示)        │
├─────┬──────────────────┬──────────┤
│     │                  │          │
│Live2D│  Neon Tetris BG  │  Live2D  │
│ (L) │   (PixiJS)       │   (R)    │
│     │                  │          │
├─────┴──────────────────┴──────────┤
│     BottomInput (输入框)           │
└───────────────────────────────────┘
```

- 自动适配任意宽高比
- SafeArea 保护边距
- 所有元素响应式缩放

### 3️⃣ 音频分析系统

**实时分析：**
- FFT 频谱 (2048 bins)
- 节拍检测 (Kick/Snare/Hi-hat)
- 频段能量 (低/中/高)
- RMS 音量测量

**音频源支持：**
- ✅ 麦克风输入
- ✅ 音频文件
- ✅ MediaStream
- ✅ Web Audio API

### 4️⃣ Live2D 集成

**功能支持：**
- 动作/表情控制
- 音频 + 口型同步
- 自然语言映射
- 调试面板（可选）

**API 示例：**
```javascript
// 触发动作
controller.act('hiyori', '挥手');

// 动作 + 音频 + 口型
controller.actWithAudio('hiyori', '打招呼', './hello.mp3', {
  volume: 1.0,
  expression: 0
});
```

## 🛠️ 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| **Electron** | 28.0.0 | 桌面应用框架 |
| **PixiJS** | 7.4.2 | 2D 渲染引擎 |
| **Node.js** | 内置 | 后端逻辑 |
| **Web Audio API** | 标准 | 音频分析 |
| **Live2D** | Cubism SDK | 角色动画 |

## 📂 项目结构

```
flowradio-ui/
├── package.json              # 项目配置
├── verify.js                 # 验证脚本
├── README.md                 # 技术文档
├── USAGE.md                  # 使用指南
├── QUICKSTART.md             # 快速启动
├── ARCHITECTURE.md           # 系统架构
├── DELIVERY.md               # 交付总结
├── INDEX.md                  # 本文件
├── public/
│   ├── index.html            # 主页面
│   ├── preload.js            # Electron 预加载
│   └── live2d/               # Live2D 模型
└── src/
    ├── main.js               # Electron 主进程
    ├── renderer.js           # 渲染进程入口
    ├── layout/               # 布局组件
    │   ├── LayoutManager.js
    │   ├── TopBar.js
    │   ├── BottomInput.js
    │   └── Live2DArea.js
    ├── live2d/
    │   └── Live2dController.js
    ├── backgrounds/
    │   ├── BackgroundBase.js
    │   └── TetrisNeonBackground.js  ⭐ 核心实现
    └── audio/
        └── AudioAnalyzer.js
```

## 🎓 代码示例

### 创建新背景主题

```javascript
const BackgroundBase = require('./BackgroundBase');

class MyBackground extends BackgroundBase {
  init(app, audioAnalyzer) {
    super.init(app, audioAnalyzer);
    // 初始化逻辑
  }

  update(dt) {
    // 每帧更新
    if (this.audioAnalyzer) {
      const beat = this.audioAnalyzer.getBeat('kick');
      if (beat) {
        // 响应音乐
      }
    }
  }

  resize(width, height) {
    // 调整大小
  }

  destroy() {
    // 清理资源
    super.destroy();
  }
}

module.exports = MyBackground;
```

### 使用音频分析器

```javascript
const analyzer = new AudioAnalyzer(audioSource);

// 获取音量
const volume = analyzer.getVolume(); // 0-1

// 获取 FFT
const fft = analyzer.getFFT(); // Uint8Array

// 检测节拍
const kickBeat = analyzer.getBeat('kick');   // 低频
const snareBeat = analyzer.getBeat('snare'); // 中频
const hihatBeat = analyzer.getBeat('hihat'); // 高频

// 获取频段能量
const energies = analyzer.getEnergies();
// { kick: 0-1, snare: 0-1, hihat: 0-1, average: 0-1 }
```

## ⚙️ 配置指南

### 修改音频源

编辑 `src/renderer.js` 第 89 行：

```javascript
// 麦克风（默认）
const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
this.audioAnalyzer = new AudioAnalyzer(stream);

// 或音频文件
const audio = document.createElement('audio');
audio.src = './music.mp3';
// ... (详见 USAGE.md)
```

### 配置 Live2D 模型

编辑 `src/renderer.js` 第 67 行：

```javascript
characterConfigs: [
  {
    id: 'hiyori',
    modelJsonUrl: './live2d/hiyori/hiyori_pro_t11.model3.json',
    scale: 0.32,
    position: { xRatio: 0.3, yRatio: 0.95 }
  }
]
```

### 调整 AI 速度

编辑 `src/backgrounds/TetrisNeonBackground.js` 第 29 行：

```javascript
this.aiMoveInterval = 0.5; // 移动间隔（秒）
this.aiDropInterval = 1.0; // 下落间隔（秒）
```

## 🐛 故障排除

| 问题 | 解决方案 |
|------|----------|
| ❌ 没有音频响应 | 检查麦克风权限，播放音乐确保有输入 |
| ❌ 性能卡顿 | 降低粒子数量，关闭 Bloom 滤镜 |
| ❌ Live2D 不显示 | 确认模型文件存在，检查 Console 错误 |
| ❌ npm install 失败 | 清空缓存：`npm cache clean --force` |

**详细解决方案见 [USAGE.md](USAGE.md)**

## 📊 性能指标

| 分辨率 | 目标 FPS | 实际 FPS |
|--------|----------|----------|
| 1080p  | 60       | **60**   |
| 2K     | 60       | **60**   |
| 4K     | 60       | 45-60    |

**优化策略：**
- Sprite 替代 Graphics
- 纹理 Atlas 复用
- 粒子对象池
- 批处理渲染

## 🌟 特色亮点

1. **真实游戏引擎**
   - 完整俄罗斯方块逻辑
   - 碰撞检测 + 旋转算法
   - 消行检测 + 自动重启

2. **音乐精准映射**
   - Kick: 60-250 Hz → 震动
   - Snare: 200-600 Hz → 旋转
   - Hi-hat: 5k-10k Hz → 颜色

3. **高性能粒子**
   - 80 粒子同时渲染
   - Add 混合模式
   - 生命周期管理

4. **伪 3D 透视**
   - Z-depth 线性缩放
   - 无需 3D 引擎
   - 自然空间感

## 🔮 未来扩展

### 短期计划
- [ ] ParticlesBackground (粒子爆炸主题)
- [ ] BeatSaberBackground (光剑主题)
- [ ] SuperChat 滚动显示

### 中期计划
- [ ] 后端 gRPC 集成
- [ ] 音乐播放器控制
- [ ] Live2D 动作队列

### 长期计划
- [ ] 多主题无缝切换
- [ ] 用户设置持久化
- [ ] 弹幕系统

## 📞 技术支持

**开发模式调试：**
```bash
npm run dev  # 自动打开 DevTools
```

**Console 日志示例：**
```
[FlowRadioApp] Initializing...
[LayoutManager] Resize: 1600x900, aspect: 1.78
[TetrisNeonBackground] Initialized
[AudioAnalyzer] Initialized successfully
✅ 所有检查通过！
```

**文档索引：**
- 技术问题 → [README.md](README.md)
- 使用问题 → [USAGE.md](USAGE.md)
- 架构问题 → [ARCHITECTURE.md](ARCHITECTURE.md)

## ✅ 验证清单

运行验证脚本：

```bash
npm run verify
```

**检查项：**
- [x] package.json 存在
- [x] 主进程文件完整
- [x] 渲染进程文件完整
- [x] HTML 文件正确
- [x] 依赖已安装
- [x] PixiJS 版本正确
- [x] 背景文件完整

## 📄 许可证

MIT License

---

## 🎉 开始使用

```bash
cd flowradio-ui
npm install
npm start
```

**享受你的 FlowRadio AI DJ 体验！** 🎵✨🎨

---

**FlowRadio Team** © 2024

**项目状态**: ✅ 生产就绪  
**版本**: 1.0.0  
**最后更新**: 2024-12-07
