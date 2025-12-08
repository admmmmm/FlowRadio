# 🎵 FlowRadio 完整系统 - 快速启动指南

## ✅ 已完成的集成工作

### 1. 系统组件整合

✅ **Lyria 音乐服务** (lyria_service.py)
- 实时 AI 音乐生成
- 48kHz 立体声输出
- 风格切换支持

✅ **Go WebSocket 后端** (backend/)
- AI 聊天处理
- WebSocket 实时通信
- 音乐风格推荐

✅ **Live2D 服务** (live2d/)
- 双主播渲染（Hiyori + Mao）
- 字幕气泡功能（新增）
- 动作/表情/口型同步
- Vite Dev Server 部署

✅ **FlowRadio UI** (flowradio-ui/)
- Electron 桌面应用
- Neon Tetris 音乐可视化
- Live2D iframe 集成
- 实时音频分析
- WebSocket 客户端

### 2. 新增功能

🆕 **Live2D 字幕气泡**
- 漫画风粉色渐变气泡
- 自动换行（14字/行，3行）
- 5秒自动消失
- 跟随角色位置

🆕 **统一启动脚本**
- 一键启动所有服务
- 自动环境检查
- 依赖自动安装

🆕 **完整集成文档**
- 系统架构图
- 数据流向说明
- API 使用示例
- 故障排除指南

## 🚀 立即启动（3 步）

### 步骤 1: 配置 API Keys

创建 `.env` 文件（参考 `.env.example`）：

```env
GEMINI_API_KEY=你的_Gemini_Key
```

### 步骤 2: 运行启动脚本

```powershell
cd D:\dev\FlowRadio
.\start-complete.ps1
```

### 步骤 3: 等待启动完成

脚本会自动：
1. ✅ 检查环境变量
2. ✅ 启动 Lyria Service (端口 8000)
3. ✅ 启动 Go Backend (端口 8080)
4. ✅ 启动 Live2D Service (端口 5173)
5. ✅ 启动 Electron UI（自动打开窗口）

## 🎮 使用流程

### 场景 1: 聊天点歌

1. 在 UI 底部输入框输入：
   ```
   播放一首轻松的lofi音乐
   ```

2. **系统响应：**
   - TopBar 显示你的消息
   - AI 分析意图
   - Live2D 主播说话 + 字幕气泡
   - Lyria 切换到 lofi 风格
   - 背景随音乐节奏变化

### 场景 2: 音乐可视化

- **低频节拍 (Kick)** → 屏幕震动 + 方块脉冲
- **中频鼓点 (Snare)** → 方块旋转
- **高频镲片 (Hi-hat)** → 颜色闪烁

### 场景 3: Live2D 互动

主播会自动：
- 说话时显示字幕气泡
- 动作配合音乐节奏
- 表情跟随情绪变化

## 📊 服务状态检查

### Lyria Music Service
```powershell
# 测试端点
curl http://localhost:8000/status
```

### Go Backend
```powershell
# 测试 WebSocket（需要 wscat 工具）
wscat -c ws://localhost:8080/ws
```

### Live2D Service
```powershell
# 浏览器打开
start http://localhost:5173/flowradio.html
```

## 🔧 服务控制

### 单独启动服务

**Lyria:**
```powershell
python lyria_service.py
```

**Go Backend:**
```powershell
cd backend
go run .
```

**Live2D:**
```powershell
cd live2d
npm run dev
```

**Electron UI:**
```powershell
cd flowradio-ui
npm start
```

### 停止服务

在对应的 PowerShell 窗口按 `Ctrl+C`

## 🐛 快速故障排除

### 问题：Live2D 黑屏

**检查：**
```powershell
# 确认 Vite 服务运行
cd live2d
npm run dev
```

**验证：**
浏览器打开 http://localhost:5173/flowradio.html

### 问题：音乐无声

**检查清单：**
1. ✅ Lyria Service 已启动
2. ✅ GEMINI_API_KEY 正确配置
3. ✅ 点击页面解锁音频（浏览器限制）

**测试音频流：**
```powershell
curl http://localhost:8000/stream --output test.wav
```

### 问题：WebSocket 连接失败

**检查：**
```powershell
# 确认 Go Backend 运行
cd backend
go run .
```

**验证端口：**
```powershell
netstat -an | findstr 8080
```

### 问题：依赖缺失

**重新安装：**
```powershell
# Live2D
cd live2d
rm -r node_modules
npm install

# FlowRadio UI
cd ../flowradio-ui
rm -r node_modules
npm install
```

## 📁 重要文件位置

```
D:\dev\FlowRadio\
├── start-complete.ps1        # ⭐ 主启动脚本
├── .env                      # ⭐ 环境变量配置
├── README-COMPLETE.md        # 项目总览
├── flowradio-ui/
│   ├── INTEGRATION.md        # ⭐ 完整集成文档
│   ├── src/renderer.js       # UI 主逻辑
│   └── public/index.html     # UI 入口
├── live2d/
│   ├── flowradio.html        # ⭐ FlowRadio 专用页面
│   └── src/dialog-api.js     # 字幕气泡 API
├── backend/
│   └── main.go               # WebSocket 服务器
└── lyria_service.py          # 音乐生成服务
```

## 💡 开发提示

### 修改 Live2D 配置

编辑 `live2d/flowradio.html`：

```javascript
characterConfigs: [
  { 
    id: 'hiyori', 
    modelJsonUrl: '/live2d/hiyori/hiyori_pro_t11.model3.json', 
    scale: 0.32,          // 调整大小
    position: { 
      xRatio: 0.3,        // 水平位置 (0-1)
      yRatio: 0.95        // 垂直位置 (0-1)
    } 
  }
]
```

### 修改背景主题

编辑 `flowradio-ui/src/renderer.js`：

```javascript
// 切换到其他背景
const ParticlesBackground = require('./backgrounds/ParticlesBackground');
this.currentBackground = new ParticlesBackground();
```

### 添加新的 AI 响应

编辑 `backend/main.go`，修改 WebSocket 消息处理。

## 📚 完整文档

- **集成指南**: `flowradio-ui/INTEGRATION.md`
- **UI 技术文档**: `flowradio-ui/README.md`
- **Live2D 说明**: `live2d/README.md`
- **系统架构**: `flowradio-ui/ARCHITECTURE.md`

## ✨ 系统特色

1. **真实 AI 对话** - Coze/Volcano LLM 智能理解
2. **实时音乐生成** - Google Gemini 驱动
3. **Live2D 字幕** - 漫画风对话气泡
4. **音乐可视化** - FFT 驱动的动态背景
5. **一键启动** - 所有服务自动编排

## 🎯 验收清单

启动后确认以下功能：

- [ ] 4 个 PowerShell 窗口打开（Lyria, Go, Live2D, UI）
- [ ] Electron UI 窗口显示
- [ ] 可以看到 Live2D 角色（Hiyori 和 Mao）
- [ ] 背景 Neon Tetris 正常运行
- [ ] 底部输入框可用
- [ ] 点击页面后音乐播放
- [ ] 输入消息后 AI 回复
- [ ] Live2D 显示字幕气泡
- [ ] 背景随音乐节奏变化

## 🆘 获取帮助

遇到问题？检查：

1. **Console 日志** - 按 F12 打开 DevTools
2. **PowerShell 输出** - 查看各服务窗口
3. **集成文档** - `flowradio-ui/INTEGRATION.md`
4. **故障排除** - 见上方快速故障排除章节

---

**系统已完全集成，祝使用愉快！** 🎵✨🎨

**FlowRadio Team** © 2024
