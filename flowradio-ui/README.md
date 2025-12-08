# FlowRadio UI Framework

一个专为 FlowRadio AI DJ 设计的 Electron + PixiJS + Live2D 横屏 UI 框架。

## ✨ 核心特性

### 🎨 响应式布局系统
- **SafeArea + 9-grid** 自适应布局
- **横屏优化**，适配任意宽高比
- 顶部：SuperChat / 提示栏
- 中间：Live2D (左) + 动态背景 + Live2D (右)
- 底部：输入栏

### 🎮 可插拔背景系统
支持多主题动态背景，统一接口设计：

```javascript
class BackgroundBase {
  init(app, audioAnalyzer) {}
  update(dt) {}
  resize(width, height) {}
  destroy() {}
}
```

#### 🔥 Neon Tetris 背景（已实现）
- ✅ **Neon 发光块** + 伪 3D 透视效果
- ✅ **AI 熟练操作**：自动堆叠、消行、旋转
- ✅ **音乐驱动**：
  - 低频 (Kick) → 屏幕震动 + 块脉冲
  - 中频 (Snare) → 旋转脉冲
  - 高频 (Hi-hat) → 颜色跃迁
- ✅ **消行特效**：白色闪光 + 粒子爆炸
- ✅ **高性能**：Sprite + Atlas 批处理渲染

### 🎎 Live2D 集成
完整集成 `pixi-live2d-display-lipsyncpatch`：
- 动作/表情控制
- 音频 + 口型同步
- 自然语言映射
- 调试面板支持

### 🎵 音频分析系统
实时音频分析器 (`AudioAnalyzer`)：
- FFT 频谱分析
- 节拍检测 (Kick/Snare/Hi-hat)
- 频段能量提取
- RMS 音量测量

## 📦 项目结构

```
flowradio-ui/
├── public/
│   ├── index.html          # 主页面
│   ├── preload.js          # Electron 预加载脚本
│   └── live2d/             # Live2D 模型资源
├── src/
│   ├── main.js             # Electron 主进程
│   ├── renderer.js         # 渲染进程入口
│   ├── layout/             # 布局组件
│   │   ├── LayoutManager.js
│   │   ├── TopBar.js
│   │   ├── BottomInput.js
│   │   └── Live2DArea.js
│   ├── live2d/             # Live2D 控制器
│   │   └── Live2dController.js
│   ├── backgrounds/        # 背景主题
│   │   ├── BackgroundBase.js
│   │   └── TetrisNeonBackground.js
│   └── audio/              # 音频系统
│       └── AudioAnalyzer.js
└── package.json
```

## 🚀 快速开始

### 1️⃣ 安装依赖

```bash
cd flowradio-ui
npm install
```

### 2️⃣ 运行开发模式

```bash
npm run dev
```

### 3️⃣ 正式启动

```bash
npm start
```

## 🎛️ 配置说明

### Live2D 模型配置

编辑 `src/renderer.js` 中的 `initLive2D()` 方法：

```javascript
characterConfigs: [
  {
    id: 'hiyori',
    modelJsonUrl: '/live2d/hiyori/hiyori_pro_t11.model3.json',
    scale: 0.32,
    position: { xRatio: 0.3, yRatio: 0.95 }
  },
  {
    id: 'mao',
    modelJsonUrl: '/live2d/mao/mao_pro.model3.json',
    scale: 0.42,
    position: { xRatio: 0.7, yRatio: 0.97 }
  }
]
```

### 音频源配置

`src/renderer.js` 中的 `initAudio()` 方法支持：

1. **麦克风输入**（默认）：
```javascript
const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
this.audioAnalyzer = new AudioAnalyzer(stream);
```

2. **音频文件**：
```javascript
const audio = document.createElement('audio');
audio.src = '/path/to/music.mp3';
audio.crossOrigin = 'anonymous';
audio.loop = true;
await audio.play();

const audioContext = new AudioContext();
const source = audioContext.createMediaElementSource(audio);
this.audioAnalyzer = new AudioAnalyzer(source);
```

## 🎨 背景主题开发

### 创建新背景

1. 继承 `BackgroundBase`：

```javascript
const BackgroundBase = require('./BackgroundBase');

class MyCustomBackground extends BackgroundBase {
  init(app, audioAnalyzer) {
    super.init(app, audioAnalyzer);
    // 初始化逻辑
  }

  update(dt) {
    // 每帧更新（dt = 秒）
    if (this.audioAnalyzer) {
      const beat = this.audioAnalyzer.getBeat('kick');
      // 响应音乐
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

module.exports = MyCustomBackground;
```

2. 在 `renderer.js` 中切换：

```javascript
const MyCustomBackground = require('./backgrounds/MyCustomBackground');
this.currentBackground = new MyCustomBackground();
this.currentBackground.init(this.pixiApp, this.audioAnalyzer);
```

## 🎯 API 参考

### AudioAnalyzer

```javascript
const analyzer = new AudioAnalyzer(audioSource);

// 获取音量 (0-1)
const volume = analyzer.getVolume();

// 获取 FFT 数据
const fft = analyzer.getFFT();

// 节拍检测
const kickBeat = analyzer.getBeat('kick');    // 低频
const snareBeat = analyzer.getBeat('snare');  // 中频
const hihatBeat = analyzer.getBeat('hihat');  // 高频

// 频段能量
const energies = analyzer.getEnergies();
// { kick: 0-1, snare: 0-1, hihat: 0-1, average: 0-1 }
```

### Live2dController

```javascript
const controller = new Live2dController();
await controller.init(config);

// 触发动作
controller.act('hiyori', '挥手');

// 动作 + 音频 + 口型
controller.actWithAudio('hiyori', '打招呼', '/audio/hello.mp3', {
  volume: 1.0,
  expression: 0,
  resetExpression: true
});

// 停止动作
controller.stopMotions('hiyori');
```

## 🔧 性能优化

### Neon Tetris 背景优化要点

1. **使用 Sprite 而非 Graphics**：预渲染纹理
2. **纹理复用**：所有块共享同一 Atlas
3. **对象池**：复用粒子对象
4. **批处理**：一次性渲染所有 Sprite
5. **60 FPS 目标**：即使 2K 屏幕也能流畅运行

### 调试工具

开发模式下按 `F12` 打开 DevTools，检查：
- FPS 计数器
- GPU 内存占用
- Console 日志

## 📝 待办事项

- [ ] 实现更多背景主题（Beat Saber, Particles）
- [ ] 优化 Live2D 模型加载
- [ ] 添加后端 AI 通信接口
- [ ] 实现 SuperChat 系统
- [ ] 添加音乐播放器控制
- [ ] 持久化用户设置

## 📄 许可证

MIT License

---

**FlowRadio Team** © 2024
