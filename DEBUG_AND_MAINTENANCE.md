# FlowRadio 调试与维护指南

本文档总结了 FlowRadio 项目中常见的调试问题、解决方案以及维护时需要关注的关键文件和代码位置。

## 1. 关键文件索引

| 模块 | 文件路径 | 关键功能/关键词 |
| :--- | :--- | :--- |
| **后端 (Go)** | `backend/main.go` | `runBilibiliListener` (爬虫监听), `startHTTPServer` |
| | `backend/websocket_handler.go` | `handleUserInputWithCoze` (Coze调用), `HOST_MESSAGE` (广播消息) |
| | `backend/coze_client.go` | `CallMainWorkflow` (参数构造), `Chat_trigger`, `HostAction` (动作解析) |
| **前端 (Electron)** | `flowradio-ui/src/renderer.js` | `handleHostMessage` (处理播报), `triggerLive2DAction`, `enqueueSpeech` (语音队列) |
| | `electron-ui/main.js` | `webSecurity` (跨域设置), `fullscreen` (窗口模式) |
| **Live2D** | `live2d/src/dialog-api.js` | `say` (说话逻辑), `estimateDuration` (气泡时长), `actWithAudio` |
| | `live2d/flowradio.html` | `characterConfigs` (人物位置配置), `initLive2dWithDialogue` |
| **爬虫 (Node)** | `bili-coze-panel/crawler.js` | `danmuSummary` (总结事件), `callCoze` (爬虫侧Coze调用) |
| **启动脚本** | `start.ps1` | 服务启动顺序, 环境变量检查 |

## 2. 常见问题与解决方案

### 2.1 Bilibili 弹幕总结未触发主持人说话
*   **现象**: 弹幕日志中显示 `[总结] ...`，但 Live2D 主持人没有反应。
*   **排查路径**:
    1.  **爬虫侧**: 检查 `crawler.js` 是否发出了 `danmuSummary` 事件。
        *   *关键词*: `emit(SUMMARY_EVENT`
    2.  **后端监听**: 检查 `backend/main.go` 中的 `runBilibiliListener` 是否收到消息。
        *   *日志*: `[BiliListener] 📝 收到总结:`
    3.  **Coze 调用**: 检查 `backend/coze_client.go` 是否正确传递了 `Chat_trigger=true`。
        *   *日志*: `📝 用户输入: ... [ChatTrigger: true]`
    4.  **结果解析**: 检查 Coze 返回的节点是否包含 `Baobab` 或 `output`。如果 Coze 工作流修改了节点名称，后端解析会失败。
        *   *维护*: 修改 `coze_client.go` 中的 `switch` 语句，添加新的节点名称匹配。

### 2.2 Live2D 说话不稳定 / 气泡闪退
*   **现象**: 气泡出现一下就消失，或者没有声音。
*   **原因**:
    *   音频 URL 加载失败 (403/404)，导致 `estimateDuration` 无法获取时长，回退到默认短时长。
    *   `actWithAudio` 失败，导致没有动作和声音。
*   **维护**:
    *   `live2d/src/dialog-api.js`: 调整 `estimateDuration` 中的默认时长 (目前已改为 3.0s)。
    *   检查网络请求，确保 TTS URL 可访问 (Referer/Origin 限制)。

### 2.3 Live2D 人物消失 / 纹理错误
*   **现象**: 屏幕上看不到人，控制台报 `Texture loading error`。
*   **原因**: `.model3.json` 文件中引用的纹理路径与实际文件结构不一致。
*   **维护**:
    *   检查 `live2d/public/live2d/.../*.model3.json` 中的 `Textures` 字段。
    *   确保 `live2d/public` 目录下存在对应的纹理文件。

### 2.4 WebSocket 连接失败 (400 Bad Request)
*   **现象**: Electron 控制台报 `WebSocket connection failed: 400`。
*   **原因**: `crawler.js` 中 `WebSocket.Server` 的 `path` 配置与前端连接路径不匹配，或 `upgrade` 事件处理冲突。
*   **维护**:
    *   `bili-coze-panel/crawler.js`: 确保 `new WebSocket.Server({ server })` 不带 `path` 限制 (除非前端也带)。
    *   确保没有重复的 `server.on('upgrade')` 监听器。

## 3. 调试技巧

*   **查看后端日志**: 后端是控制中枢，所有流程都会在终端打印日志。关注 `[BiliListener]`, `[Coze]`, `[WebSocket]` 开头的日志。
*   **前端控制台**: 在 Electron 窗口中按 `Ctrl+Shift+I` (如果开启了 DevTools) 或查看终端输出。关注 `[FlowRadioApp]`, `[Speech]` 日志。
*   **Live2D 独立调试**: 访问 `http://localhost:5173/flowradio.html` 可以独立测试 Live2D 表现，排除 Electron 环境干扰。

## 4. 关键配置修改点

*   **修改人物位置**: `live2d/flowradio.html` -> `characterConfigs` -> `position` (`xOffset`, `yRatio`)。
*   **修改 Coze 工作流 ID**: `.env` 文件 -> `COZE_MAIN_WORKFLOW_ID`。
*   **修改 Bilibili 房间号**: `.env` 文件 -> `BILIBILI_ROOM_ID`。
