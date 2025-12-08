# FlowRadio UI 使用指南

## 🎬 首次启动

### Windows

```powershell
cd flowradio-ui
npm install
npm start
```

### macOS / Linux

```bash
cd flowradio-ui
npm install
npm start
```

## 🎮 界面操作

### 布局说明

```
┌─────────────────────────────────────────────────┐
│          SuperChat / 顶部提示栏 (TopBar)          │
├──────────┬──────────────────────┬──────────────┤
│          │                      │              │
│  Live2D  │   Neon Tetris 背景   │   Live2D     │
│  主播 A  │   (PixiJS 渲染)      │   主播 B     │
│  (左侧)  │                      │   (右侧)     │
│          │                      │              │
├──────────┴──────────────────────┴──────────────┤
│              输入栏 (BottomInput)                │
└─────────────────────────────────────────────────┘
```

### 交互功能

1. **底部输入框**
   - 输入文字后按 `Enter` 或点击「发送」按钮
   - 消息会显示在顶部提示栏
   - 自动触发 AI 回复（当前为演示模式）

2. **Neon Tetris 背景**
   - 自动 AI 操作，无需手动控制
   - 响应麦克风输入的音乐节奏
   - 消行时会触发白色闪光和粒子效果
   - 低频强劲时会震动屏幕

3. **Live2D 主播**
   - 需要在 `public/live2d/` 目录放置模型文件
   - 支持动作、表情、口型同步
   - 可通过代码控制（见下方）

## 🔧 高级配置

### 1. 音频源切换

#### 方法 A：使用麦克风（默认）

麦克风会实时捕捉环境音频，适合播放外部音乐。

首次运行时浏览器会请求麦克风权限，点击「允许」即可。

#### 方法 B：使用音频文件

编辑 `src/renderer.js` 第 89-101 行：

```javascript
// 注释掉麦克风代码
// const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
// this.audioAnalyzer = new AudioAnalyzer(stream);

// 使用音频文件
const audio = document.createElement('audio');
audio.src = './path/to/your/music.mp3'; // 替换为实际路径
audio.crossOrigin = 'anonymous';
audio.loop = true;
document.body.appendChild(audio);

const audioContext = new AudioContext();
const source = audioContext.createMediaElementSource(audio);

// 连接到音频输出（可选）
source.connect(audioContext.destination);

this.audioAnalyzer = new AudioAnalyzer(source);

// 用户交互后播放（浏览器安全限制）
document.addEventListener('click', () => {
  audio.play();
}, { once: true });
```

### 2. Live2D 模型配置

#### 步骤 1：准备模型文件

将 Live2D 模型放置在 `public/live2d/` 目录下：

```
public/live2d/
├── hiyori/
│   ├── hiyori_pro_t11.model3.json
│   ├── *.moc3
│   ├── textures/
│   └── motions/
└── mao/
    ├── mao_pro.model3.json
    └── ...
```

#### 步骤 2：配置模型

编辑 `src/renderer.js` 第 67-82 行：

```javascript
characterConfigs: [
  {
    id: 'hiyori',
    modelJsonUrl: './live2d/hiyori/hiyori_pro_t11.model3.json',
    scale: 0.32,
    position: { xRatio: 0.3, yRatio: 0.95 }
  },
  {
    id: 'mao',
    modelJsonUrl: './live2d/mao/mao_pro.model3.json',
    scale: 0.42,
    position: { xRatio: 0.7, yRatio: 0.97 }
  }
]
```

#### 步骤 3：引入 Live2D 库

在 `public/index.html` 中取消注释：

```html
<!-- Live2D Core -->
<script src="./Core/live2dcubismcore.js"></script>

<!-- Live2D Display -->
<script type="module" src="./live2d/main.js"></script>
```

### 3. 背景主题切换

#### 当前主题：Neon Tetris

如需切换到其他背景，编辑 `src/renderer.js` 第 106 行：

```javascript
// 方式 1：导入新背景类
const ParticlesBackground = require('./backgrounds/ParticlesBackground');
this.currentBackground = new ParticlesBackground();

// 方式 2：条件切换
const theme = 'tetris'; // 'tetris' | 'particles' | 'beatsaber'
switch (theme) {
  case 'tetris':
    this.currentBackground = new TetrisNeonBackground();
    break;
  case 'particles':
    this.currentBackground = new ParticlesBackground();
    break;
  // ...
}
```

### 4. 性能调优

#### 降低粒子数量

编辑 `src/backgrounds/TetrisNeonBackground.js` 第 292 行：

```javascript
// 原代码：8 个粒子
for (let i = 0; i < 8; i++) { ... }

// 修改为 4 个（减半）
for (let i = 0; i < 4; i++) { ... }
```

#### 降低 AI 操作频率

编辑 `src/backgrounds/TetrisNeonBackground.js` 第 29-30 行：

```javascript
this.aiMoveInterval = 1.0;  // 从 0.5 改为 1.0 秒
this.aiDropInterval = 2.0;  // 从 1.0 改为 2.0 秒
```

#### 关闭发光滤镜

编辑 `src/backgrounds/TetrisNeonBackground.js` 第 85-92 行：

```javascript
// 注释掉 Bloom 滤镜
// if (PIXI.filters && PIXI.filters.BloomFilter) {
//   this.glowFilter = new PIXI.filters.BloomFilter(...);
//   this.container.filters = [this.glowFilter];
// }
```

## 🐛 常见问题

### Q1: 启动后没有声音/背景不响应音乐

**A:** 检查麦克风权限：
1. 浏览器地址栏左侧点击 🔒 图标
2. 确保「麦克风」权限为「允许」
3. 刷新页面（`Ctrl+R`）

### Q2: 性能卡顿/FPS 低

**A:** 尝试以下操作：
1. 关闭其他占用 GPU 的程序
2. 降低粒子数量（见上方调优）
3. 关闭 Bloom 滤镜
4. 减小窗口尺寸

### Q3: Live2D 模型不显示

**A:** 确认：
1. 模型文件路径正确
2. 已引入 `live2dcubismcore.js`
3. 检查 Console 是否有错误信息
4. 模型文件格式为 `.model3.json`（Cubism SDK 4.0+）

### Q4: Electron 窗口无法调整大小

**A:** 编辑 `src/main.js` 第 10 行：

```javascript
// 移除最小尺寸限制
// minWidth: 1280,
// minHeight: 720,

// 或修改为更小值
minWidth: 800,
minHeight: 600,
```

## 📞 技术支持

遇到问题？检查以下资源：

1. **Console 日志**：`F12` → Console 标签页
2. **README.md**：项目根目录技术文档
3. **源码注释**：所有文件都有详细注释

---

**祝你使用愉快！** 🎉
