package main

import (
	"bufio"
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strings"
	"time"
)

// 详细模式配置 - 默认开启,可通过 COZE_VERBOSE=false 关闭
var cozeVerboseMode = true

// CozeWorkflowClient Coze工作流客户端
type CozeWorkflowClient struct {
	APIToken string
	BaseURL  string
}

// MainWorkflowRequest Main工作流请求
type MainWorkflowRequest struct {
	WorkflowID string                 `json:"workflow_id"`
	AppID      string                 `json:"app_id,omitempty"`
	Parameters map[string]interface{} `json:"parameters"`
}

// StreamNode 流式响应节点
type StreamNode struct {
	NodeTitle   string `json:"node_title"`
	Content     string `json:"content"`
	ContentType string `json:"content_type"`
	NodeType    string `json:"node_type"`
	NodeID      string `json:"node_id"`
}

// MusicParams 音乐参数
type MusicParams struct {
	MusicConfig struct {
		BPM         int     `json:"bpm"`
		Brightness  float64 `json:"brightness"`
		Density     float64 `json:"density"`
		Guidance    int     `json:"guidance"`
		Scale       string  `json:"scale"`
		Temperature float64 `json:"temperature"`
	} `json:"music_config"`
	WeightedPrompts []struct {
		Text   string  `json:"text"`
		Weight float64 `json:"weight"`
	} `json:"weighted_prompts"`
	Reasoning string `json:"reasoning"`
}

// HostOutput 主持人输出
type HostOutput struct {
	Host1  string `json:"host1"`
	TTS    string `json:"tts"`
	Action string `json:"action"` // 新增: 动作指令
}

// MainWorkflowResult Main工作流结果
type MainWorkflowResult struct {
	MusicParams   *MusicParams `json:"music_params"`
	HostScript    string       `json:"host_script"`
	HostTTSURL    string       `json:"host_tts_url"`
	HostAction    string       `json:"host_action"`    // 新增
	RawHostOutput *HostOutput  `json:"raw_host_output"`
	Comments      []string     `json:"comments"`
	Reply         string       `json:"reply"`
}

// IntegrationResult 完整集成结果
type IntegrationResult struct {
	MusicParams   *MusicParams        `json:"music_params"`
	HostScript    string              `json:"host_script"`
	HostTTSURL    string              `json:"host_tts_url"`
	HostAction    string              `json:"host_action"`       // 新增
	RawHostOutput *HostOutput         `json:"raw_host_output,omitempty"`
	Atmosphere    *AtmosphereResult   `json:"atmosphere,omitempty"`
}

// AtmosphereResult 气氛组结果
type AtmosphereResult struct {
	Comments       []string `json:"comments"`
	LongComment    string   `json:"long_comment"`
	Reply          string   `json:"reply"`
	TTSURL         string   `json:"tts_url"`
	Replies        []string `json:"replies"`          // 新增: 完整回复列表
	SelectedReply  string   `json:"selected_reply"`   // 新增: 选中的回复
	SelectedTTSURL string   `json:"selected_tts_url"` // 新增: 选中的TTS
}

const (
	MainWorkflowID    = "7581397947751333888" // 用户提供的双人对话工作流
	MainAppID         = "7581311542793125922"
	APIBaseURL        = "https://api.coze.cn/v1/workflow/stream_run"
)

// NewCozeClient 创建Coze客户端
func NewCozeClient() *CozeWorkflowClient {
	// 优先使用环境变量，如果没有则使用硬编码的测试Token (仅供本地测试)
	apiToken := os.Getenv("COZE_API_TOKEN")
	if apiToken == "" {
		// 使用用户提供的Token进行测试
		apiToken = "pat_Wa6zkuduQfdqSxHsSOuT2i1gDuvliVTOTHUYPwflStO9ycxGdvXFp7N4PCLjoM9L"
		fmt.Println("⚠️ 使用硬编码的测试Token")
	}

	return &CozeWorkflowClient{
		APIToken: apiToken,
		BaseURL:  APIBaseURL,
	}
}

// CallMainWorkflow 调用Main工作流
func (c *CozeWorkflowClient) CallMainWorkflow(textInput, username, processInput string, chatTrigger bool, callback StreamCallback) (*MainWorkflowResult, error) {
	// 获取 Workflow ID (优先环境变量)
	workflowID := os.Getenv("COZE_WORKFLOW_ID")
	if workflowID == "" {
		workflowID = "7581487516789735476" // 默认使用新的弹幕分析师工作流
	}

	// 构造 danmu 参数 (单条消息包装为列表)
	danmuList := []map[string]interface{}{
		{
			"name":   username,
			"text":   textInput,
			"weight": 1,
		},
	}

	// 使用用户提供的参数结构
	req := MainWorkflowRequest{
		WorkflowID: workflowID,
		// AppID:      MainAppID, // 暂时移除 AppID，因为新工作流可能不需要或不匹配
		Parameters: map[string]interface{}{
			"USER_INPUT":        textInput,
			"CONVERSATION_NAME": "Default",
			"User_name":         username,
			"Chat_trigger":      chatTrigger,
			"danmu":             danmuList, // 新增 danmu 参数
			// 保留旧参数以防万一
			"text_input":    textInput,
			"process_input": processInput,
		},
	}

	// 调试: 打印请求参数
	reqJSON, _ := json.MarshalIndent(req, "", "  ")
	fmt.Printf("🚀 [Coze] 发起请求: %s\n", string(reqJSON))

	nodes, err := c.callWorkflow(req, callback)
	if err != nil {
		return nil, err
	}

	// 解析节点数据
	result := &MainWorkflowResult{
		Comments: []string{},
	}

	for _, node := range nodes {
		// 打印节点信息以便调试
		fmt.Printf("🔍 解析节点: Title='%s', Type='%s'\n", node.NodeTitle, node.NodeType)

		switch {
		case strings.Contains(node.NodeTitle, "output") || strings.Contains(node.NodeTitle, "输出") || strings.Contains(node.NodeTitle, "Baobab") || strings.Contains(node.NodeTitle, "Acacia"):
			// 兼容新的节点命名: Baobab_Fast_Output, Baobab_long_comment, Baobab聊天输出, Acacia聊天输出
			
			title := node.NodeTitle
			content := node.Content
			
			// 1. 尝试解析 MusicParams (通常在 Baobab_long_comment 或 output 中)
			var musicParams MusicParams
			if err := json.Unmarshal([]byte(content), &musicParams); err == nil {
				if musicParams.MusicConfig.BPM != 0 || len(musicParams.WeightedPrompts) > 0 {
					result.MusicParams = &musicParams
					fmt.Println("   ✅ 成功解析为 MusicParams")
					// 如果是纯 JSON 配置节点，可能不需要作为对话脚本显示，但为了保险起见，先不 return
				}
			}

			// 2. 归类对话脚本
			// 过滤掉纯 JSON 内容 (MusicParams)
			if strings.TrimSpace(content) != "" && !strings.HasPrefix(strings.TrimSpace(content), "{") {
				if strings.Contains(title, "Baobab") || title == "输出" {
					// Baobab (Host 1)
					prefix := "Baobab: "
					if strings.Contains(title, "Fast") {
						prefix = "[Fast Ack] Baobab: "
					}
					
					// 清理 JSON 尾巴 (针对 Fast Ack 混合内容)
					cleanContent := content
					if idx := strings.Index(content, "\n{"); idx != -1 {
						if json.Valid([]byte(content[idx+1:])) {
							cleanContent = content[:idx]
						}
					}

					if result.HostScript == "" {
						result.HostScript = prefix + cleanContent
					} else {
						result.HostScript += "\n\n" + prefix + cleanContent
					}

				} else if strings.Contains(title, "Acacia") || title == "输出_1" {
					// Acacia (Host 2) -> 映射为 Mao
					prefix := "Mao: "
					cleanContent := content
					
					if strings.HasPrefix(content, "topic：") || strings.HasPrefix(content, "topic:") {
						prefix = "Topic: "
						cleanContent = strings.TrimPrefix(content, "topic：")
						cleanContent = strings.TrimPrefix(cleanContent, "topic:")
						cleanContent = strings.TrimSpace(cleanContent)
					}

					if result.HostScript == "" {
						result.HostScript = prefix + cleanContent
					} else {
						result.HostScript += "\n\n" + prefix + cleanContent
					}
				}
			}
			
		case strings.Contains(node.NodeTitle, "(debug)音乐提示词"):
			var musicParams MusicParams
			if err := json.Unmarshal([]byte(node.Content), &musicParams); err == nil {
				result.MusicParams = &musicParams
			}
		case strings.Contains(node.NodeTitle, "主持人1输出"):
			var hostOutput HostOutput
			if err := json.Unmarshal([]byte(node.Content), &hostOutput); err == nil {
				result.HostScript = hostOutput.Host1
				result.HostTTSURL = hostOutput.TTS
				result.HostAction = hostOutput.Action // 解析动作
				result.RawHostOutput = &hostOutput // 保存原始数据
			}
		case strings.Contains(node.NodeTitle, "主持人2输出"):
			// 兼容旧版节点名，如果存在主持人2输出，也尝试解析
			// 但通常现在都走 Acacia 节点逻辑
			var hostOutput HostOutput
			if err := json.Unmarshal([]byte(node.Content), &hostOutput); err == nil {
				// 如果 HostScript 已经有内容，追加
				if result.HostScript != "" {
					result.HostScript += "\n\nMao: " + hostOutput.Host1 // 假设 Host1 字段存的是文本
				} else {
					result.HostScript = "Mao: " + hostOutput.Host1
				}
			}
		case strings.Contains(node.NodeTitle, "评论"):
			var comments map[string]string
			if err := json.Unmarshal([]byte(node.Content), &comments); err == nil {
				for i := 1; i <= 3; i++ {
					if comment, ok := comments[fmt.Sprintf("s%d", i)]; ok {
						result.Comments = append(result.Comments, comment)
					}
				}
			}
		case strings.Contains(node.NodeTitle, "reply"):
			result.Reply = node.Content
		}
	}

	return result, nil
}

// StreamCallback 流式回调函数定义
// event: 事件类型 (e.g., "node_finished")
// node: 节点数据
type StreamCallback func(event string, node *StreamNode)

// GenerateMusicAndAtmosphere 完整流程: 生成音乐 + 气氛组
// callback: 用于实时推送流式节点 (如 Fast Ack)
func (c *CozeWorkflowClient) GenerateMusicAndAtmosphere(userInput, username, context string, useAtmosphere bool, chatTrigger bool, callback StreamCallback) (*IntegrationResult, error) {
	fmt.Printf("\n%s\n", strings.Repeat("=", 70))
	fmt.Printf("🎯 开始生成音乐和气氛组内容 (流式模式)\n")
	fmt.Printf("%s\n", strings.Repeat("=", 70))
	fmt.Printf("📝 用户输入: %s (User: %s) [ChatTrigger: %v]\n", userInput, username, chatTrigger)
	fmt.Printf("📝 上下文: %s\n", context)

	// Step 1: 调用Main工作流 (传入回调)
	mainResult, err := c.CallMainWorkflow(userInput, username, context, chatTrigger, callback)
	if err != nil {
		return nil, fmt.Errorf("Main工作流调用失败: %v", err)
	}

	fmt.Printf("\n✅ Main工作流完成 - 原始数据:\n")
	mainResultJSON, _ := json.MarshalIndent(mainResult, "", "  ")
	fmt.Printf("%s\n", string(mainResultJSON))

	// 构建基础返回结果
	result := &IntegrationResult{
		MusicParams:   mainResult.MusicParams,
		HostScript:    mainResult.HostScript,
		HostTTSURL:    mainResult.HostTTSURL,
		HostAction:    mainResult.HostAction, // 传递动作
		RawHostOutput: mainResult.RawHostOutput,
	}

	// Step 2: 气氛组逻辑已移除 (根据用户需求)
	// if useAtmosphere && mainResult.MusicParams != nil { ... }

	fmt.Printf("\n%s\n", strings.Repeat("=", 70))

	fmt.Printf("🎉 完整流程完成!\n")
	fmt.Printf("%s\n\n", strings.Repeat("=", 70))

	return result, nil
}

// callWorkflow 通用工作流调用方法 (暴力调试版 - 强制打印所有数据)
func (c *CozeWorkflowClient) callWorkflow(req interface{}, callback StreamCallback) ([]StreamNode, error) {
	reqBody, err := json.Marshal(req)
	if err != nil {
		return nil, err
	}

	// 【强制打印】请求体
	fmt.Println("\n============= 🔥 暴力调试：发送给 Coze 的数据 =============")
	fmt.Println(string(reqBody))
	fmt.Println("=========================================================\n")

	httpReq, err := http.NewRequest("POST", c.BaseURL, bytes.NewBuffer(reqBody))
	if err != nil {
		return nil, err
	}

	httpReq.Header.Set("Authorization", "Bearer "+c.APIToken)
	httpReq.Header.Set("Content-Type", "application/json")

	client := &http.Client{
		Timeout: 300 * time.Second, // 增加超时时间到 5 分钟
	}

	log.Printf("📡 发起请求...")
	resp, err := client.Do(httpReq)
	if err != nil {
		log.Printf("❌ 请求失败: %v", err)
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		// 【强制打印】错误响应
		fmt.Printf("❌ HTTP 错误 %d: %s\n", resp.StatusCode, string(body))
		return nil, fmt.Errorf("HTTP %d", resp.StatusCode)
	}

	fmt.Println("\n============= 🌊 按包解析 Coze SSE 流 =============")

	var nodes []StreamNode
	scanner := bufio.NewScanner(resp.Body)
	buf := make([]byte, 0, 64*1024)
	scanner.Buffer(buf, 1024*1024)

	// SSE 包解析状态
	var currentPacket struct {
		id    string
		event string
		data  string
	}
	packetCount := 0
	
	// 🔍 调试函数:打印并处理当前包
	processPacket := func() {
		if currentPacket.data == "" {
			return
		}
		
		packetCount++
		fmt.Printf("\n📦 ========== SSE包 #%d ========== 📦\n", packetCount)
		fmt.Printf("ID: %s\n", currentPacket.id)
		fmt.Printf("Event: %s\n", currentPacket.event)
		
		// 解析 JSON
		var node StreamNode
		if err := json.Unmarshal([]byte(currentPacket.data), &node); err == nil {
			fmt.Printf("节点标题: '%s'\n", node.NodeTitle)
			fmt.Printf("节点类型: %s\n", node.NodeType)
			fmt.Printf("节点ID: %s\n", node.NodeID)
			
			// 打印 content 的前150个字符
			contentPreview := node.Content
			if len(contentPreview) > 150 {
				contentPreview = contentPreview[:150] + "..."
			}
			fmt.Printf("Content预览: %s\n", contentPreview)
			
			// 🔥 特别关注 "output" 节点 (音乐提示词)
			if strings.ToLower(node.NodeTitle) == "output" || node.NodeTitle == "output" {
				fmt.Println("\n🎵🎵🎵 【发现音乐提示词节点!!!】 🎵🎵🎵")
				fmt.Println("完整 Content:")
				fmt.Println(node.Content)
			}
			
			// 打印格式化的 JSON (只有在特殊节点时才打印完整JSON)
			if node.NodeTitle == "output" || node.NodeTitle == "输出" || strings.Contains(node.NodeTitle, "音乐") {
				var prettyJSON bytes.Buffer
				if err := json.Indent(&prettyJSON, []byte(currentPacket.data), "", "  "); err == nil {
					fmt.Println("\n完整JSON数据:")
					fmt.Println(prettyJSON.String())
				}
			}
			
			// 收集节点
			if node.Content != "" && node.NodeType == "Message" {
				nodes = append(nodes, node)
				
				// 🔥 实时回调: 如果有回调函数，立即通知上层
				if callback != nil {
					callback("node_finished", &node)
				}
			}
		} else {
			// JSON 解析失败
			fmt.Printf("原始数据: %s\n", currentPacket.data)
			fmt.Printf("⚠️ JSON解析失败: %v\n", err)
		}
		
		fmt.Println("======================================")
	}

	for scanner.Scan() {
		line := scanner.Text()
		
		// 【调试】打印每一行原始数据
		fmt.Printf("🔍 RAW: %q\n", line)

		// 空行表示一个包结束
		if strings.TrimSpace(line) == "" {
			processPacket()
			// 重置包状态
			currentPacket.id = ""
			currentPacket.event = ""
			currentPacket.data = ""
			continue
		}

		// 解析 SSE 字段
		if strings.HasPrefix(line, "id:") {
			// 如果已经有 id,说明新包开始了(即使没有空行)
			if currentPacket.id != "" {
				processPacket()
				currentPacket.id = ""
				currentPacket.event = ""
				currentPacket.data = ""
			}
			currentPacket.id = strings.TrimSpace(strings.TrimPrefix(line, "id:"))
		} else if strings.HasPrefix(line, "event:") {
			currentPacket.event = strings.TrimSpace(strings.TrimPrefix(line, "event:"))
		} else if strings.HasPrefix(line, "data:") {
			currentPacket.data = strings.TrimSpace(strings.TrimPrefix(line, "data:"))
		}
	}
	
	// 处理最后一个包(如果没有空行结束)
	processPacket()
	
	fmt.Printf("\n============= 🏁 流解析完成 (共 %d 个包) =============\n\n", packetCount)

	if err := scanner.Err(); err != nil {
		log.Printf("❌ 流读取错: %v", err)
		return nil, err
	}

	return nodes, nil
}
