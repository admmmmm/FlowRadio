# FlowRadio UI 系统架构

## 整体架构图

```
┌─────────────────────────────────────────────────────────────┐
│                     Electron Main Process                    │
│                        (main.js)                             │
│  - 窗口管理                                                   │
│  - 生命周期控制                                               │
│  - IPC 通信                                                   │
└──────────────────────┬──────────────────────────────────────┘
                       │ IPC Bridge (preload.js)
┌──────────────────────┴──────────────────────────────────────┐
│                  Renderer Process (Browser)                  │
│                      (renderer.js)                           │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │           FlowRadioApp (主控制器)                   │    │
│  │  - 初始化所有子系统                                  │    │
│  │  - 协调模块通信                                      │    │
│  │  - 处理用户输入                                      │    │
│  └───┬──────────┬──────────┬──────────┬───────────────┘    │
│      │          │          │          │                     │
│  ┌───▼────┐ ┌──▼──────┐ ┌─▼─────┐ ┌─▼──────────────┐      │
│  │ Layout │ │ PixiJS  │ │ Audio │ │ Live2D         │      │
│  │Manager │ │   App   │ │Analyzer│ │   Controller   │      │
│  └───┬────┘ └──┬──────┘ └─┬─────┘ └────────────────┘      │
│      │          │          │                                │
│  ┌───▼─────────────────────▼──────────────────────┐        │
│  │          UI Components Layer                    │        │
│  │  ┌──────┐  ┌──────────┐  ┌──────────────┐      │        │
│  │  │TopBar│  │BottomInput│  │Live2DArea x2│      │        │
│  │  └──────┘  └──────────┘  └──────────────┘      │        │
│  └─────────────────────────────────────────────────┘        │
│                                                              │
│  ┌─────────────────────────────────────────────────┐        │
│  │        Background System (PixiJS Stage)         │        │
│  │  ┌────────────────────────────────────────┐    │        │
│  │  │      Background Manager                │    │        │
│  │  │  ┌──────────────────────────────────┐  │    │        │
│  │  │  │  TetrisNeonBackground           │  │    │        │
│  │  │  │  - init()                       │  │    │        │
│  │  │  │  - update(dt) ◄────────┐       │  │    │        │
│  │  │  │  - resize()             │       │  │    │        │
│  │  │  │  - destroy()            │       │  │    │        │
│  │  │  └────────────────┬────────┘       │  │    │        │
│  │  │                   │                 │  │    │        │
│  │  │        ┌──────────▼─────────┐      │  │    │        │
│  │  │        │   Audio Analyzer   │      │  │    │        │
│  │  │        │   - FFT Data       │      │  │    │        │
│  │  │        │   - Beat Detection │      │  │    │        │
│  │  │        │   - Energy Levels  │      │  │    │        │
│  │  │        └────────────────────┘      │  │    │        │
│  │  └──────────────────────────────────┘  │    │        │
│  └─────────────────────────────────────────────┘        │
└──────────────────────────────────────────────────────────┘
```

## 数据流向图

```
User Input → BottomInput → FlowRadioApp → TopBar (显示消息)
                                        └→ Live2D (触发动作)

Microphone/Audio File → AudioAnalyzer → FFT/Beat Data
                                       → Background.update()
                                       → Visual Effects

Window Resize → LayoutManager → Components.resize()
                              → PixiApp.resize()
                              → Background.resize()
```

## 模块依赖关系

```
main.js (Electron)
  └─> renderer.js
       ├─> LayoutManager
       │    ├─> TopBar
       │    ├─> BottomInput
       │    └─> Live2DArea
       │
       ├─> AudioAnalyzer
       │
       ├─> Live2dController
       │
       └─> PixiJS Application
            └─> BackgroundSystem
                 ├─> BackgroundBase (抽象类)
                 └─> TetrisNeonBackground
                      └─> AudioAnalyzer (依赖注入)
```

## Neon Tetris 内部架构

```
TetrisNeonBackground
├─ 游戏逻辑
│   ├─ 网格系统 (10x20 grid)
│   ├─ 方块管理 (7 种 Tetromino)
│   ├─ 碰撞检测
│   ├─ 消行算法
│   └─ AI 操作 (定时器驱动)
│
├─ 渲染系统
│   ├─ 纹理缓存 (预渲染 Neon 块)
│   ├─ Sprite 池 (动态创建/销毁)
│   ├─ 粒子系统 (消行特效)
│   └─ 发光滤镜 (BloomFilter)
│
└─ 音频响应
    ├─ Kick (低频) → 震动 + 脉冲
    ├─ Snare (中频) → 旋转
    └─ Hi-hat (高频) → 颜色跃迁
```

## 时间轴（帧循环）

```
Frame N (16.67ms @ 60fps)
├─ 1. AudioAnalyzer.updateEnergies()
│   └─ FFT 分析 → 频段能量
│
├─ 2. AudioAnalyzer.getBeat()
│   └─ 节拍检测 → 触发事件
│
├─ 3. Background.update(dt)
│   ├─ AI 逻辑 (aiTimer, aiDropTimer)
│   ├─ 粒子更新 (位置, 透明度, 生命)
│   ├─ 脉冲衰减 (kickPulse *= 0.9)
│   └─ 震动衰减 (shakeIntensity *= 0.9)
│
├─ 4. Background.render()
│   ├─ 清空旧精灵
│   ├─ 渲染网格块 (带透视)
│   └─ 渲染当前方块 (带高亮)
│
└─ 5. PixiJS.render()
    └─ GPU 渲染到 Canvas
```

## 布局计算流程

```
LayoutManager.resize()
├─ 1. 计算窗口尺寸 (width, height)
│
├─ 2. 计算 SafeArea
│   ├─ safeLeft   = width * 0.05
│   ├─ safeRight  = width * 0.95
│   ├─ safeTop    = height * 0.05
│   └─ safeBottom = height * 0.92
│
├─ 3. 分配区域
│   ├─ topBar: {x, y, width, height}
│   ├─ bottomInput: {x, y, width, height}
│   ├─ live2dLeft: {x, y, width, height}  (30%)
│   ├─ live2dRight: {x, y, width, height} (30%)
│   └─ background: {0, 0, width, height}  (100%)
│
└─ 4. 应用到 DOM 元素
    └─ element.style = {position, left, top, width, height}
```

## 音频分析管道

```
Audio Source (Microphone/File)
     │
     ▼
AudioContext.createMediaStreamSource()
     │
     ▼
AnalyserNode (fftSize=2048)
     │
     ├─> getByteFrequencyData() → FFT Array [0-255]
     │                              │
     │                              ├─> Kick:   bins[3-13]   (60-250 Hz)
     │                              ├─> Snare:  bins[10-31]  (200-600 Hz)
     │                              └─> Hi-hat: bins[256-512](5k-10k Hz)
     │
     └─> Beat Detection Algorithm
          ├─ 当前能量 vs 历史平均
          ├─ 阈值: energy > avgEnergy * 1.3
          └─> 输出: true/false
```

## 性能优化策略

```
渲染优化
├─ Sprite 复用 (不用 Graphics)
├─ 纹理 Atlas (7 种颜色预渲染)
├─ 批处理渲染 (Container.addChild 批量)
└─ 对象池 (粒子复用)

内存优化
├─ 及时销毁 (sprites.forEach(s => s.destroy()))
├─ 纹理缓存 (Map<type, texture>)
└─ 弱引用 (事件监听器清理)

算法优化
├─ AI 定时器 (减少计算频率)
├─ 碰撞检测 (仅检测必要区域)
└─ FFT 降采样 (必要时)
```

## 安全架构

```
Main Process (Node.js Full Access)
     │
     │ IPC Channel (Whitelisted)
     │ ['user-message', 'app-command']
     │
     ▼
Preload Script (contextBridge)
     │
     │ Exposed API: window.electronAPI
     │
     ▼
Renderer Process (Sandboxed)
     - nodeIntegration: false
     - contextIsolation: true
     - No direct Node.js access
```

## 扩展接口设计

```javascript
// 新增背景主题只需 3 步：

// 1. 创建类（继承 BackgroundBase）
class MyBackground extends BackgroundBase {
  init(app, audioAnalyzer) { /* ... */ }
  update(dt) { /* ... */ }
  resize(w, h) { /* ... */ }
  destroy() { /* ... */ }
}

// 2. 导出模块
module.exports = MyBackground;

// 3. 在 renderer.js 中导入并实例化
const MyBackground = require('./backgrounds/MyBackground');
this.currentBackground = new MyBackground();
this.currentBackground.init(this.pixiApp, this.audioAnalyzer);
```

## 文件组织原则

```
src/
├── main.js           # Electron 主进程（单文件）
├── renderer.js       # 渲染入口（应用协调器）
├── layout/           # UI 布局组件（纯展示）
├── live2d/           # Live2D 集成（业务逻辑）
├── backgrounds/      # 背景主题（可插拔）
└── audio/            # 音频分析（独立模块）
```

每个模块：
- 单一职责
- 明确接口
- CommonJS 导出
- 完整注释

---

**此架构设计确保：**
- ✅ 模块化：易于扩展和维护
- ✅ 高性能：60 FPS @ 2K 分辨率
- ✅ 可测试：接口清晰，依赖注入
- ✅ 安全性：Electron 沙箱隔离
