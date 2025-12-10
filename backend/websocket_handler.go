package main

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"regexp"
	"strings"
	"sync"
	"time"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true // 允许所有来源 (开发环境)
	},
}

// WebSocket 客户端管理
type WSClientManager struct {
	clients   map[*websocket.Conn]bool
	broadcast chan []byte
	register  chan *websocket.Conn
	unregister chan *websocket.Conn
	mu        sync.Mutex
}

func NewWSClientManager() *WSClientManager {
	return &WSClientManager{
		clients:    make(map[*websocket.Conn]bool),
		broadcast:  make(chan []byte, 256),
		register:   make(chan *websocket.Conn),
		unregister: make(chan *websocket.Conn),
	}
}

func (m *WSClientManager) Run() {
	for {
		select {
		case client := <-m.register:
			m.mu.Lock()
			m.clients[client] = true
			m.mu.Unlock()
			log.Printf("✅ WebSocket 客户端已连接 (总数: %d)", len(m.clients))

		case client := <-m.unregister:
			m.mu.Lock()
			if _, ok := m.clients[client]; ok {
				delete(m.clients, client)
				client.Close()
			}
			m.mu.Unlock()
			log.Printf("❌ WebSocket 客户端已断开 (总数: %d)", len(m.clients))

		case message := <-m.broadcast:
			m.mu.Lock()
			for client := range m.clients {
				err := client.WriteMessage(websocket.TextMessage, message)
				if err != nil {
					log.Printf("❌ 发送消息失败: %v", err)
					client.Close()
					delete(m.clients, client)
				}
			}
			m.mu.Unlock()
		}
	}
}

// 广播消息给所有 WebSocket 客户端
func (m *WSClientManager) BroadcastMessage(msgType string, data interface{}) {
	message := map[string]interface{}{
		"type": msgType,
		"data": data,
	}
	jsonData, err := json.Marshal(message)
	if err != nil {
		log.Printf("❌ JSON 序列化失败: %v", err)
		return
	}
	m.broadcast <- jsonData
}

// WebSocket 处理函数
func (m *WSClientManager) HandleWebSocket(globalState *GlobalState) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		conn, err := upgrader.Upgrade(w, r, nil)
		if err != nil {
			log.Printf("❌ WebSocket 升级失败: %v", err)
			return
		}

		m.register <- conn

		// 读取客户端消息
		go func() {
			defer func() {
				m.unregister <- conn
			}()

			for {
				_, message, err := conn.ReadMessage()
				if err != nil {
					break
				}

				// 解析客户端消息
				var msg map[string]interface{}
				if err := json.Unmarshal(message, &msg); err != nil {
					log.Printf("❌ 解析客户端消息失败: %v", err)
					continue
				}

				// 处理用户输入
				if msg["type"] == "USER_INPUT" {
					if data, ok := msg["data"].(map[string]interface{}); ok {
						if text, ok := data["text"].(string); ok {
							// 提取用户名 (默认为 adm)
							username := "adm"
							if u, ok := data["username"].(string); ok && u != "" {
								username = u
							}
							// 提取 chatTrigger (默认为 false)
							chatTrigger := false
							if ct, ok := data["chatTrigger"].(bool); ok {
								chatTrigger = ct
							}
							go globalState.handleUserInput(text, username, chatTrigger)
						}
					}
				}

				// 处理 Coze 工作流的音乐更新请求
				if msg["type"] == "UPDATE_MUSIC" {
					if data, ok := msg["data"].(map[string]interface{}); ok {
						go globalState.handleMusicUpdate(data)
					}
				}

				// 处理前端转发的弹幕总结 (DANMU_SUMMARY)
				if msg["type"] == "DANMU_SUMMARY" {
					if data, ok := msg["data"].(map[string]interface{}); ok {
						if text, ok := data["text"].(string); ok {
							username := "弹幕分析师"
							if u, ok := data["username"].(string); ok && u != "" {
								username = u
							}
							log.Printf("📥 收到前端转发的弹幕总结: %s (User: %s)", text, username)
							// 强制触发 Coze 工作流
							go globalState.handleUserInputWithCoze(text, username, true)
						}
					}
				}
			}
		}()
	}
}

// 处理用户输入 (优先使用 Coze 工作流)
func (g *GlobalState) handleUserInput(userText string, username string, chatTrigger bool) {
	log.Printf("📥 收到用户输入: %s (User: %s, ChatTrigger: %v)", userText, username, chatTrigger)

	// 检查是否启用 Coze
	cozeToken := os.Getenv("COZE_API_TOKEN")
	useCoze := cozeToken != ""

	if useCoze {
		// 使用 Coze 工作流
		log.Println("🎯 使用 Coze 工作流处理请求")
		g.handleUserInputWithCoze(userText, username, chatTrigger)
	} else {
		// 回退到传统 LLM
		log.Println("🔄 使用传统 LLM 处理请求")
		g.handleUserInputWithLLM(userText)
	}
}

// 使用 Coze 工作流处理用户输入
func (g *GlobalState) handleUserInputWithCoze(userText string, username string, chatTrigger bool) {
	client := NewCozeClient()

	var hasStreamedMessages bool // 标记是否已通过流式发送过消息

	// 定义流式回调函数
	streamCallback := func(event string, node *StreamNode) {
		if event == "node_finished" {
			log.Printf("🔄 [Stream] 节点完成: Title='%s', Type='%s'", node.NodeTitle, node.NodeType)
			
			title := node.NodeTitle
			lowerTitle := strings.ToLower(title)

			// 1. 检查是否是 Fast Ack 节点
			if strings.Contains(lowerTitle, "fast_ack") || strings.Contains(lowerTitle, "urgent") || strings.Contains(lowerTitle, "快速回复") || strings.Contains(lowerTitle, "baobab_fast_output") {
				log.Printf("⚡ [Fast Ack] 检测到快速回复节点: %s", node.NodeTitle)
				
				// 解析 Fast Ack 内容
				var fastAckData struct {
					Script string `json:"script"`
					TTS    string `json:"tts"`
					// 兼容可能直接返回 text/audio 字段的情况
					Text   string `json:"text"`
					Audio  string `json:"audio"`
				}
				
				// 尝试解析 JSON
				// 注意: Coze 有时会返回 "文本\n{JSON}" 的混合格式
				content := node.Content
				var script, tts string
				
				// 1. 尝试提取混合格式中的 JSON
				if idx := strings.Index(content, "\n{"); idx != -1 {
					jsonPart := content[idx+1:]
					textPart := content[:idx]
					
					var mixedData struct {
						Link     string  `json:"link"`     // 观察到的字段名
						Duration float64 `json:"duration"` // 观察到的字段名
						TTS      string  `json:"tts"`
						Audio    string  `json:"audio"`
					}
					if err := json.Unmarshal([]byte(jsonPart), &mixedData); err == nil {
						script = textPart
						tts = mixedData.Link
						if tts == "" { tts = mixedData.TTS }
						if tts == "" { tts = mixedData.Audio }
						log.Printf("⚡ [Fast Ack] 成功解析混合格式: Script len=%d, TTS=%s", len(script), tts)
					}
				}

				// 2. 如果混合解析失败，尝试直接解析纯 JSON
				if script == "" {
					if err := json.Unmarshal([]byte(content), &fastAckData); err == nil {
						script = fastAckData.Script
						if script == "" { script = fastAckData.Text }
						tts = fastAckData.TTS
						if tts == "" { tts = fastAckData.Audio }
					}
				}

				// 3. 如果还是失败，且不是 JSON 格式，则视为纯文本
				if script == "" && !strings.HasPrefix(strings.TrimSpace(content), "{") {
					script = content
				}

				if tts != "" || script != "" {
					log.Printf("⚡ [Fast Ack] 发送 URGENT_PLAY 指令: %s", script)
					g.WSManager.BroadcastMessage("URGENT_PLAY", map[string]interface{}{
						"text":    script, // 前端使用 text 字段
						"audioUrl": tts,   // 前端使用 audioUrl 字段
						"source":  "Coze Fast Ack",
					})
				} else {
					log.Printf("⚠️ [Fast Ack] 解析失败或无内容: %s", content)
				}
			} else if strings.Contains(title, "Baobab") || strings.Contains(title, "Acacia") || strings.Contains(title, "输出") {
				// 2. 常规对话节点流式处理
				
				content := node.Content
				var script, ttsUrl string
				
				// --- 复杂内容解析 (MusicParams + Script + TTS) ---
				
				// 1. 尝试提取开头的 MusicParams JSON
				if idx := strings.Index(content, "\n"); idx != -1 {
					potentialJSON := content[:idx]
					if strings.HasPrefix(strings.TrimSpace(potentialJSON), "{") {
						var mp MusicParams
						if err := json.Unmarshal([]byte(potentialJSON), &mp); err == nil {
							// 验证关键字段
							if mp.Reasoning != "" || len(mp.WeightedPrompts) > 0 {
								log.Printf("🎵 [Stream] 检测到 MusicParams, 发送更新...")
								// 发送音乐参数
								musicData := map[string]interface{}{
									"music_config":      mp.MusicConfig,
									"weighted_prompts": mp.WeightedPrompts,
									"reasoning":        mp.Reasoning,
								}
								g.WSManager.BroadcastMessage("MUSIC_PARAMS", musicData)
								// 调用 Lyria
								g.updateLyriaWithMusicParams(&mp)
								
								// 移除 MusicParams 部分，保留剩余内容
								content = content[idx+1:]
							}
						}
					}
				}

				// 2. 尝试提取结尾的 TTS JSON
				// 查找最后一个换行符 (或者倒数第二个)
				if lastIdx := strings.LastIndex(content, "\n"); lastIdx != -1 {
					potentialTTS := content[lastIdx+1:]
					if strings.HasPrefix(strings.TrimSpace(potentialTTS), "{") {
						var ttsData struct {
							Link string `json:"link"`
							TTS  string `json:"tts"`
						}
						if err := json.Unmarshal([]byte(potentialTTS), &ttsData); err == nil {
							if ttsData.Link != "" || ttsData.TTS != "" {
								ttsUrl = ttsData.Link
								if ttsUrl == "" { ttsUrl = ttsData.TTS }
								// 截断 TTS 部分
								script = content[:lastIdx]
							}
						}
					}
				}

				// 如果没有找到 TTS JSON，或者提取后 script 为空(说明只有TTS?)，则处理剩余部分
				if script == "" {
					// 如果 content 看起来像纯 JSON 且不是 TTS，可能需要忽略
					if strings.HasPrefix(strings.TrimSpace(content), "{") {
						// 1. 尝试解析为 HostOutput (包含 Action)
						var hostOut struct {
							Script string `json:"script"`
							Text   string `json:"text"`
							Action string `json:"action"`
							Host1  string `json:"host1"`
						}
						if err := json.Unmarshal([]byte(content), &hostOut); err == nil {
							// 如果有 Action，广播 Action
							if hostOut.Action != "" {
								log.Printf("🎬 [Stream] 检测到动作: %s", hostOut.Action)
								// TODO: 可以在这里广播动作，或者只在汇总时广播
								// 目前前端可能只在 HOST_MESSAGE 中处理 action
							}
							
							// 提取 Script
							extractedScript := hostOut.Script
							if extractedScript == "" { extractedScript = hostOut.Text }
							if extractedScript == "" { extractedScript = hostOut.Host1 }
							
							if extractedScript != "" {
								script = extractedScript
							}
						}

						// 2. 再次检查是否是 MusicParams (如果整个节点只是 MusicParams)
						// 只有当 script 仍然为空时才检查，避免误判
						if script == "" {
							var mp MusicParams
							if err := json.Unmarshal([]byte(content), &mp); err == nil {
								if mp.Reasoning != "" {
									// 已经在上面处理过了? 不，如果节点只有 MusicParams 没有换行
									log.Printf("🎵 [Stream] 节点仅包含 MusicParams")
									musicData := map[string]interface{}{
										"music_config":      mp.MusicConfig,
										"weighted_prompts": mp.WeightedPrompts,
										"reasoning":        mp.Reasoning,
									}
									g.WSManager.BroadcastMessage("MUSIC_PARAMS", musicData)
									g.updateLyriaWithMusicParams(&mp)
									return
								}
							}
						}
					}
					
					if script == "" {
						script = content
					}
				}

				// --- 清理 Script 中的标签 ---
				// 移除 </think...> 标签
				if idx := strings.Index(script, "</think"); idx != -1 {
					// 找到闭合的 >
					if endIdx := strings.Index(script[idx:], ">"); endIdx != -1 {
						// 移除整个标签
						script = script[:idx] + script[idx+endIdx+1:]
					}
				}
				// 移除 <think...> 标签 (如果存在)
				if idx := strings.Index(script, "<think"); idx != -1 {
					if endIdx := strings.Index(script[idx:], ">"); endIdx != -1 {
						script = script[:idx] + script[idx+endIdx+1:]
					}
				}
				
				// 移除 "AcaciaSaid为false." 等调试信息
				script = strings.ReplaceAll(script, "AcaciaSaid为false.", "")
				script = strings.ReplaceAll(script, "AcaciaSaid为true.", "")
				
				script = strings.TrimSpace(script)

				// --- 解析动作 (Action) ---
				// 格式: (动作名) 文本内容
				// 示例: (眼睛发光) 大樹快看！...
				var action string
				// 匹配开头括号内的内容，支持中文括号
				// 注意: 在 Go 正则中，中文括号不需要转义，且不能转义
				reAction := regexp.MustCompile(`^[(（](.*?)[)）]\s*(.*)`)
				matches := reAction.FindStringSubmatch(script)
				if len(matches) == 3 {
					action = matches[1]
					script = matches[2]
					log.Printf("🎬 [Stream] 提取到动作: %s", action)
				}

				// Determine Speaker
				prefix := "Baobab: "
				isTopic := false
				
				if strings.Contains(title, "Acacia") || strings.Contains(title, "输出_1") {
					if strings.HasPrefix(script, "topic：") || strings.HasPrefix(script, "topic:") {
						// 处理 topic 输出
						isTopic = true
						script = strings.TrimPrefix(script, "topic：")
						script = strings.TrimPrefix(script, "topic:")
						script = strings.TrimSpace(script)
					} else {
						prefix = "Mao: "
					}
				}
				
				// Send if we have content
				if script != "" {
					// 更新上次说话时间
					g.HostState.mu.Lock()
					g.HostState.LastSpeakTime = time.Now()
					g.HostState.mu.Unlock()

					if isTopic {
						log.Printf("🌊 [Stream] 发送 Topic 消息: %s", script)
						g.WSManager.BroadcastMessage("TOPIC_CHANGE", map[string]interface{}{
							"topic": script,
						})
					} else {
						fullScript := prefix + script
						log.Printf("🌊 [Stream] 发送流式消息: %s... (TTS: %v, Action: %s)", fullScript[:min(20, len(fullScript))], ttsUrl != "", action)
						g.WSManager.BroadcastMessage("HOST_MESSAGE", map[string]interface{}{
							"script":  fullScript,
							"tts_url": ttsUrl,
							"action":  action, // 新增动作字段
							"source":  "Coze Stream",
						})
					}
					hasStreamedMessages = true
				}
			}
		}
	}

	// 调用 Main 工作流
	result, err := client.GenerateMusicAndAtmosphere(
		userText,
		username,
		"用户在线听歌。Host1负责对音乐做出评论，Host2负责回复弹幕。", // 上下文
		true,           // 启用气氛组
		chatTrigger,    // Chat_trigger (由调用方决定)
		streamCallback, // 传入回调
	)

	if err != nil {
		log.Printf("❌ Coze 工作流调用失败: %v", err)
		g.WSManager.BroadcastMessage("SYSTEM_STATUS", map[string]interface{}{
			"message": "Coze 调用失败: " + err.Error(),
		})
		// 回退到传统 LLM
		g.handleUserInputWithLLM(userText)
		return
	}

	// 1. 广播主持人播报 (包含原始数据)
	// 即使流式发送过消息，如果最终结果包含 URL (音频链接)，也必须发送汇总消息，否则前端无法播放语音
	shouldSendFinal := !hasStreamedMessages
	if hasStreamedMessages {
		// 检查是否包含 URL (TTS链接)
		if result.HostTTSURL != "" || strings.Contains(result.HostScript, "http") {
			shouldSendFinal = true
			log.Printf("🌊 [Stream] 虽然已流式发送，但最终结果包含 URL，强制发送汇总消息")
		}
	}

	if shouldSendFinal {
		// 更新上次说话时间
		g.HostState.mu.Lock()
		g.HostState.LastSpeakTime = time.Now()
		g.HostState.mu.Unlock()

		// 检查是否是 Topic 消息
		if strings.HasPrefix(result.HostScript, "Topic: ") {
			topicContent := strings.TrimPrefix(result.HostScript, "Topic: ")
			log.Printf("📤 [环节2-发送数据] 发送 Topic 消息: %s", topicContent)
			g.WSManager.BroadcastMessage("TOPIC_CHANGE", map[string]interface{}{
				"topic": topicContent,
			})
		} else {
			messageData := map[string]interface{}{
				"script":  result.HostScript,
				"tts_url": result.HostTTSURL,
				"action":  result.HostAction, // 传递动作
				"source":  "Coze Main工作流 (Aggregated)",
			}
			// 添加原始主持人输出数据供前端智能解析
			if result.RawHostOutput != nil {
				messageData["raw_host"] = result.RawHostOutput
				log.Printf("📤 [环节2-发送数据] 准备发送HOST_MESSAGE: script='%s', tts_url='%s', action='%s', raw_host=%+v", 
					messageData["script"].(string)[:min(30, len(messageData["script"].(string)))], 
					messageData["tts_url"].(string)[:min(50, len(messageData["tts_url"].(string)))], 
					messageData["action"],
					messageData["raw_host"])
			} else {
				log.Printf("⚠️ [环节2-发送数据] RawHostOutput为nil,只发送script和tts_url")
			}
			g.WSManager.BroadcastMessage("HOST_MESSAGE", messageData)
		}
	} else {
		log.Printf("🌊 [Stream] 已通过流式发送消息且无新URL，跳过发送汇总 HOST_MESSAGE")
	}

	// 2. 发送音乐参数到 Lyria
	if result.MusicParams != nil {
		// 更新上次音乐请求时间
		g.HostState.mu.Lock()
		g.HostState.LastMusicRequestTime = time.Now()
		g.HostState.mu.Unlock()

		// 转换为 map 以便发送
		musicData := map[string]interface{}{
			"music_config":      result.MusicParams.MusicConfig,
			"weighted_prompts": result.MusicParams.WeightedPrompts,
			"reasoning":        result.MusicParams.Reasoning,
		}

		g.WSManager.BroadcastMessage("MUSIC_PARAMS", musicData)

		// 调用 Lyria API
		g.updateLyriaWithMusicParams(result.MusicParams)
	}

	// 3. 广播气氛组内容
	if result.Atmosphere != nil {
		// 气氛组说话也算说话
		g.HostState.mu.Lock()
		g.HostState.LastSpeakTime = time.Now()
		g.HostState.mu.Unlock()

		g.WSManager.BroadcastMessage("ATMOSPHERE", map[string]interface{}{
			"comments":         result.Atmosphere.Comments,
			"long_comment":     result.Atmosphere.LongComment,
			"reply":            result.Atmosphere.Reply,
			"tts_url":          result.Atmosphere.TTSURL,
			"replies":          result.Atmosphere.Replies,
			"selected_reply":   result.Atmosphere.SelectedReply,
			"selected_tts_url": result.Atmosphere.SelectedTTSURL,
		})
	}
}

// 使用传统 LLM 处理用户输入
func (g *GlobalState) handleUserInputWithLLM(userText string) {
	// 检查 LLM 代理是否可用
	if g.llmProxy == nil {
		log.Println("❌ LLM 回退模式不可用 (VOLCANO_API_KEY 未配置)")
		g.WSManager.BroadcastMessage("SYSTEM_STATUS", map[string]interface{}{
			"message": "❌ LLM 回退模式不可用\n\n请配置以下任一选项:\n1. COZE_API_TOKEN (推荐)\n2. VOLCANO_API_KEY (回退)",
			"error":   true,
		})
		return
	}

	g.HostState.mu.Lock()
	conversationHistory := g.HostState.ConversationHistory
	currentGenre := g.HostState.CurrentGenre
	g.HostState.mu.Unlock()

	// 调用 LLM 获取决策
	decision, err := g.llmProxy.GetDJDecision(userText, currentGenre, conversationHistory)
	if err != nil {
		log.Printf("❌ LLM 调用失败: %v", err)
		g.WSManager.BroadcastMessage("SYSTEM_STATUS", map[string]interface{}{
			"message": "LLM 调用失败: " + err.Error(),
		})
		return
	}

	// 更新状态
	g.HostState.mu.Lock()
	g.HostState.ConversationHistory = decision.NewConversationMemory
	if len(decision.MusicPrompts) > 0 {
		g.HostState.CurrentGenre = decision.MusicPrompts[0]
	}
	g.HostState.mu.Unlock()

	// 广播 DJ 决策
	g.WSManager.BroadcastMessage("DJ_DECISION", map[string]interface{}{
		"dj_script":     decision.DJScript,
		"music_prompts": decision.MusicPrompts,
		"action_reason": decision.ActionReason,
		"audio_url":     decision.AudioURL, // TTS 音频 URL (如果有)
	})

	// 切换音乐风格
	var newPrompt string
	if len(decision.MusicPrompts) > 0 && decision.MusicPrompts[0] != "" {
		newPrompt = decision.MusicPrompts[0] // 使用第一个提示词
	} else {
		// 如果 LLM 没有返回新提示词,使用当前风格
		newPrompt = currentGenre
		if newPrompt == "" {
			newPrompt = "lofi chill beats" // 默认风格
		}
	}

	// 广播 LLM → Lyria 的消息到调试面板
	g.WSManager.BroadcastMessage("LLM_TO_LYRIA", map[string]interface{}{
		"prompt": newPrompt,
		"source": "豆包 LLM",
		"target": "Lyria Music API",
		"note":   fmt.Sprintf("原始提示词: %v", decision.MusicPrompts),
	})

	if err := g.magentaProxy.SetStyle(newPrompt); err != nil {
		log.Printf("❌ 切换音乐风格失败: %v", err)
		g.WSManager.BroadcastMessage("SYSTEM_STATUS", map[string]interface{}{
			"message": "切换音乐风格失败: " + err.Error(),
		})
	} else {
		log.Printf("🎨 音乐风格已切换: %s", newPrompt)
	}
}

	// 处理 Coze 工作流的音乐更新请求
func (g *GlobalState) handleMusicUpdate(data map[string]interface{}) {
	log.Printf("🎵 收到 Coze 音乐更新请求")

	// 更新上次音乐请求时间
	g.HostState.mu.Lock()
	g.HostState.LastMusicRequestTime = time.Now()
	g.HostState.mu.Unlock()

	// 新格式: 直接传递完整的音乐参数给 Lyria
	// data 包含: genre, instrument, mood, theme, bpm, duration 等
	
	// 提取参数
	var displayText string
	if genre, ok := data["genre"].([]interface{}); ok && len(genre) > 0 {
		if str, ok := genre[0].(string); ok {
			displayText = str
		}
	}
	
	reasoning := ""
	if r, ok := data["reasoning"].(string); ok {
		reasoning = r
	}

	// 更新状态
	if displayText != "" {
		g.HostState.mu.Lock()
		g.HostState.CurrentGenre = displayText
		g.HostState.mu.Unlock()
	}

	// 广播 Coze → Lyria 消息
	g.WSManager.BroadcastMessage("LLM_TO_LYRIA", map[string]interface{}{
		"source":    "Coze 工作流",
		"target":    "Lyria Music API",
		"reasoning": reasoning,
		"params":    data,
	})

	// 调用 Lyria API - 传递完整的参数对象
	lyriaResp, err := g.magentaProxy.SetStyleWithParams(data)
	if err != nil {
		log.Printf("❌ 切换音乐风格失败: %v", err)
		g.WSManager.BroadcastMessage("SYSTEM_STATUS", map[string]interface{}{
			"message": "切换音乐风格失败: " + err.Error(),
		})
		// 发送错误响应到前端调试面板
		g.WSManager.BroadcastMessage("LYRIA_RESPONSE", map[string]interface{}{
			"success": false,
			"error":   err.Error(),
			"params":  data,
		})
	} else {
		log.Printf("🎨 音乐参数已更新 (Coze): Genre=%v, BPM=%v", data["genre"], data["bpm"])
		// 发送成功响应到前端调试面板
		g.WSManager.BroadcastMessage("LYRIA_RESPONSE", map[string]interface{}{
			"success":  true,
			"response": lyriaResp,
			"params":   data,
		})
	}
}

// 使用音乐参数更新 Lyria
func (g *GlobalState) updateLyriaWithMusicParams(musicParams *MusicParams) {
	if musicParams == nil {
		return
	}

	// 构建 Lyria 提示词
	var prompts []string
	for _, wp := range musicParams.WeightedPrompts {
		prompts = append(prompts, wp.Text)
	}

	// 合并提示词
	mainPrompt := ""
	if len(prompts) > 0 {
		mainPrompt = prompts[0]
		for i := 1; i < len(prompts); i++ {
			mainPrompt += ", " + prompts[i]
		}
	}

	if mainPrompt == "" {
		mainPrompt = "lofi chill beats" // 默认
	}

	log.Printf("🎵 发送到 Lyria: %s (BPM: %d)", mainPrompt, musicParams.MusicConfig.BPM)

	// 广播调试信息
	g.WSManager.BroadcastMessage("LLM_TO_LYRIA", map[string]interface{}{
		"prompt":       mainPrompt,
		"source":       "Coze Main工作流",
		"target":       "Lyria Music API",
		"music_config": musicParams.MusicConfig,
		"reasoning":    musicParams.Reasoning,
	})

	// 调用 Lyria
	if err := g.magentaProxy.SetStyle(mainPrompt); err != nil {
		log.Printf("❌ 切换音乐风格失败: %v", err)
		g.WSManager.BroadcastMessage("SYSTEM_STATUS", map[string]interface{}{
			"message": "切换音乐风格失败: " + err.Error(),
		})
	} else {
		log.Printf("🎨 音乐风格已切换: %s", mainPrompt)
	}
}

// 转发音频块到 WebSocket 客户端
func (m *WSClientManager) BroadcastAudioChunk(audioData []byte) {
	// 将二进制音频数据编码为 base64
	base64Audio := base64.StdEncoding.EncodeToString(audioData)
	m.BroadcastMessage("AUDIO_CHUNK", base64Audio)
}
