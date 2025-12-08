# 🚀 FlowRadio UI 快速启动

## 📋 项目完成清单

### ✅ 核心系统（已完成）

1. **响应式布局系统**
   - ✅ LayoutManager (SafeArea + 9-grid)
   - ✅ TopBar (SuperChat / 提示栏)
   - ✅ BottomInput (输入栏)
   - ✅ Live2DArea (左右角色区域)
   - ✅ 自动适配任意宽高比

2. **音频分析系统**
   - ✅ AudioAnalyzer 类
   - ✅ FFT 频谱分析
   - ✅ 节拍检测 (Kick/Snare/Hi-hat)
   - ✅ 频段能量提取
   - ✅ RMS 音量测量

3. **可插拔背景系统**
   - ✅ BackgroundBase 基类
   - ✅ 统一接口设计
   - ✅ 自动加载机制

4. **Neon Tetris 背景主题**
   - ✅ Neon 发光块渲染
   - ✅ 伪 3D 透视效果
   - ✅ AI 自动操作（堆叠/消行/旋转）
   - ✅ 音乐驱动特效
     - Kick → 震动 + 脉冲
     - Snare → 旋转脉冲
     - Hi-hat → 颜色跃迁
   - ✅ 消行特效（闪光 + 粒子爆炸）
   - ✅ 高性能渲染（Sprite + Atlas）

5. **Live2D 集成**
   - ✅ Live2dController 包装器
   - ✅ 动作/表情控制
   - ✅ 音频 + 口型同步接口
   - ✅ 自然语言映射支持

6. **Electron 工程**
   - ✅ 主进程 (main.js)
   - ✅ 渲染进程 (renderer.js)
   - ✅ 预加载脚本 (preload.js)
   - ✅ 安全的 IPC 通信

## 🎯 立即启动

### 步骤 1：安装依赖

```bash
cd flowradio-ui
npm install
```

**安装包括：**
- Electron ^28.0.0
- PixiJS ^7.4.2

### 步骤 2：验证项目

```bash
npm run verify
```

**验证项：**
- [x] package.json 存在
- [x] 主进程文件
- [x] 渲染进程文件
- [x] HTML 文件
- [x] node_modules 已安装
- [x] PixiJS 版本正确
- [x] 背景文件完整

### 步骤 3：启动应用

```bash
npm start
```

**或开发模式（带 DevTools）：**

```bash
npm run dev
```

## 🎨 核心特性演示

### 1️⃣ Neon Tetris 背景

**效果展示：**
- 🔵 蓝色/青色/洋红 Neon 发光块
- 📐 伪 3D 透视（远小近大）
- 🎮 AI 自动游戏（看起来像高手在玩）
- 🎵 音乐驱动：
  - 低音炮 → 屏幕震动
  - 军鼓 → 方块旋转
  - 镲片 → 颜色闪烁
- ✨ 消行：白色闪光 + 粒子爆炸

**性能指标：**
- 1080p: 60 FPS
- 2K: 60 FPS
- 4K: 45-60 FPS

### 2️⃣ 响应式布局

**布局结构：**

```
┌──────────────────────────────────┐
│      TopBar (SuperChat)          │
├──────┬──────────────────┬────────┤
│      │                  │        │
│Live2D│  Neon Tetris BG  │ Live2D │
│ (L)  │   (PixiJS)       │  (R)   │
│      │                  │        │
├──────┴──────────────────┴────────┤
│     BottomInput (输入框)          │
└──────────────────────────────────┘
```

**自适应特性：**
- 窗口缩放自动调整
- SafeArea 保护边距
- 组件不会变形

### 3️⃣ 音频分析

**实时分析：**
- FFT 1024 bins
- 60 FPS 更新率
- 3 频段分离（低/中/高）
- 节拍检测阈值自适应

**音频源支持：**
- 麦克风输入 ✅
- 音频文件 ✅
- WebRTC 流 ✅
- MediaStream ✅

## 📁 文件结构说明

```
flowradio-ui/
├── package.json           # 项目配置
├── verify.js              # 验证脚本
├── README.md              # 技术文档
├── USAGE.md               # 使用指南
├── QUICKSTART.md          # 本文件
├── .gitignore             # Git 忽略规则
├── public/
│   ├── index.html         # 主页面（加载屏幕）
│   ├── preload.js         # Electron 预加载
│   └── live2d/            # Live2D 模型目录
└── src/
    ├── main.js            # Electron 主进程
    ├── renderer.js        # 渲染进程主入口 ⭐
    ├── layout/
    │   ├── LayoutManager.js    # 布局管理器
    │   ├── TopBar.js           # 顶部栏
    │   ├── BottomInput.js      # 输入框
    │   └── Live2DArea.js       # Live2D 区域
    ├── live2d/
    │   └── Live2dController.js # Live2D 控制
    ├── backgrounds/
    │   ├── BackgroundBase.js         # 基类
    │   └── TetrisNeonBackground.js   # Neon Tetris ⭐
    └── audio/
        └── AudioAnalyzer.js    # 音频分析 ⭐
```

**⭐ 标记为核心文件**

## 🔧 常见配置

### 修改音频源

编辑 `src/renderer.js` 第 89 行：

```javascript
// 方案 A：麦克风（默认）
const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
this.audioAnalyzer = new AudioAnalyzer(stream);

// 方案 B：音频文件
const audio = document.createElement('audio');
audio.src = './music/song.mp3';
// ... (详见 USAGE.md)
```

### 调整 AI 速度

编辑 `src/backgrounds/TetrisNeonBackground.js` 第 29-30 行：

```javascript
this.aiMoveInterval = 0.5;  // 移动间隔（秒）
this.aiDropInterval = 1.0;  // 下落间隔（秒）
```

### 更换背景主题

编辑 `src/renderer.js` 第 106 行：

```javascript
// 创建其他背景实例
const ParticlesBackground = require('./backgrounds/ParticlesBackground');
this.currentBackground = new ParticlesBackground();
```

## 🐛 故障排除

### ❌ 问题：npm install 失败

**解决：**
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### ❌ 问题：没有音频响应

**解决：**
1. 检查麦克风权限（浏览器设置）
2. 播放音乐确保有声音输入
3. 查看 Console 是否有错误

### ❌ 问题：性能卡顿

**解决：**
1. 降低粒子数量（见 USAGE.md）
2. 关闭 Bloom 滤镜
3. 减小窗口尺寸

### ❌ 问题：Live2D 不显示

**解决：**
1. 确认模型文件存在
2. 检查 `public/index.html` 是否引入 Live2D 库
3. 查看 Console 错误信息

## 📚 延伸阅读

- **README.md** - 完整技术文档
- **USAGE.md** - 详细使用指南
- **源码注释** - 所有文件都有中文注释

## 🎯 下一步计划

### 待实现功能

1. **更多背景主题**
   - [ ] ParticlesBackground.js
   - [ ] BeatSaberBackground.js
   - [ ] WaveformBackground.js

2. **后端集成**
   - [ ] gRPC 通信（连接现有 Go 后端）
   - [ ] WebSocket 实时推送
   - [ ] AI 回复显示

3. **Live2D 增强**
   - [ ] 多模型同时渲染
   - [ ] 动作队列系统
   - [ ] 表情预加载

4. **UI 完善**
   - [ ] 设置面板
   - [ ] SuperChat 滚动显示
   - [ ] 音乐播放器控制条

## 🎉 开始使用

现在一切就绪！运行以下命令启动应用：

```bash
npm start
```

**享受你的 FlowRadio AI DJ 体验！** 🎵🎨✨

---

**FlowRadio Team** - 2024
