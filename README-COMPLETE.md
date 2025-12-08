# 🎵 FlowRadio - AI DJ 完整系统

一个集成了 AI 对话、实时音乐生成、Live2D 主播和音乐可视化的完整 AI DJ 系统。

## ✨ 核心特性

- 🎵 **Lyria 音乐生成** - Google Gemini 驱动的实时 AI 音乐
- 🤖 **AI 聊天系统** - Coze/Volcano LLM 智能对话
- 🎎 **Live2D 双主播** - 动作同步 + 字幕气泡
- 🎨 **Neon Tetris 背景** - 音乐驱动的动态可视化
- 📡 **WebSocket 通信** - 实时双向数据流

## 🚀 快速启动

### 1️⃣ 配置环境变量

复制 `.env.example` 为 `.env`，填入 API Keys：

```env
GEMINI_API_KEY=your_gemini_key_here
COZE_API_TOKEN=your_coze_token_here  # 可选
```

### 2️⃣ 安装依赖

```powershell
# Python 依赖
pip install flask google-generativeai numpy

# Go 依赖
cd backend
go mod download

# Node.js 依赖
cd ../live2d
npm install

cd ../flowradio-ui
npm install
```

### 3️⃣ 一键启动

```powershell
.\start-complete.ps1
```

**启动 4 个服务：**
1. 🎵 Lyria Music (http://localhost:8000)
2. 🔧 Go Backend (ws://localhost:8080)
3. 🎎 Live2D (http://localhost:5173)
4. 🖥️ Electron UI (自动打开)

## 📚 文档

| 文档 | 说明 |
|------|------|
| [INTEGRATION.md](flowradio-ui/INTEGRATION.md) | 完整系统集成指南 |
| [flowradio-ui/README.md](flowradio-ui/README.md) | UI 框架技术文档 |
| [live2d/README.md](live2d/README.md) | Live2D 集成说明 |

## 🎮 使用示例

1. 在底部输入框输入："播放一首轻松的音乐"
2. AI 分析意图并回复
3. Live2D 主播说话 + 显示字幕气泡
4. Lyria 自动切换到对应风格
5. 背景随音乐节奏变化

## 🛠️ 技术栈

- **后端**: Python (Flask) + Go (WebSocket)
- **前端**: Electron + PixiJS
- **Live2D**: pixi-live2d-display-lipsyncpatch
- **AI**: Google Gemini + Coze/Volcano LLM

## 📂 项目结构

```
FlowRadio/
├── backend/              # Go WebSocket 后端
├── live2d/               # Live2D 服务（独立仓库）
├── flowradio-ui/         # Electron UI 框架
├── lyria_service.py      # Lyria 音乐服务
├── start-complete.ps1    # 一键启动脚本
└── .env                  # 环境变量配置
```

## 🔧 配置说明

### API Keys 获取

1. **Gemini API Key** (必需)
   - https://aistudio.google.com/app/apikey

2. **Coze Token** (推荐)
   - https://www.coze.cn/open/oauth/pats

3. **Volcano API Key** (备用)
   - https://console.volcengine.com/ark

### 端口配置

默认端口：
- Lyria: 8000
- Go Backend: 8080
- Live2D: 5173
- Electron: 自动

## 🐛 常见问题

**Q: Live2D 不显示？**
A: 确保 `npm run dev` 在 live2d 目录运行，检查 http://localhost:5173

**Q: 音乐无声？**
A: 检查 GEMINI_API_KEY，点击页面解锁音频播放

**Q: WebSocket 连接失败？**
A: 确保 Go Backend 已启动 (`cd backend && go run .`)

详细故障排除见 [INTEGRATION.md](flowradio-ui/INTEGRATION.md)

## 📊 系统架构

```
用户 → Electron UI
         ├─ WebSocket → Go Backend → AI 处理
         ├─ HTTP → Lyria Service → 音乐生成
         └─ iframe → Live2D Service → 角色渲染
```

## 🎯 未来计划

- [ ] 多主题背景切换
- [ ] SuperChat 弹幕
- [ ] 音乐播放器控制
- [ ] 移动端支持

## 📄 许可证

MIT License

---

**FlowRadio Team** © 2024
