package main

import (
	"bufio"
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"math/rand"
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
	AppID      string                 `json:"app_id"`
	Parameters map[string]interface{} `json:"parameters"`
}

// CommentWorkflowRequest Comment Reply工作流请求
type CommentWorkflowRequest struct {
	WorkflowID string                 `json:"workflow_id"`
	AppID      string                 `json:"app_id"`
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
	Host1 string `json:"host1"`
	TTS   string `json:"tts"`
}

// MainWorkflowResult Main工作流结果
type MainWorkflowResult struct {
	MusicParams  *MusicParams `json:"music_params"`
	HostScript   string       `json:"host_script"`
	HostTTSURL   string       `json:"host_tts_url"`
	Comments     []string     `json:"comments"`
	Reply        string       `json:"reply"`
}

// CommentReplyResult Comment Reply工作流结果
type CommentReplyResult struct {
	Comments        []string `json:"comments"`
	LongComment     string   `json:"long_comment"`
	Replies         []string `json:"replies"`
	TTSURLs         []string `json:"tts_urls"`
	SelectedReply   string   `json:"selected_reply"`
	SelectedTTSURL  string   `json:"selected_tts_url"`
}

// IntegrationResult 完整集成结果
type IntegrationResult struct {
	MusicParams  *MusicParams        `json:"music_params"`
	HostScript   string              `json:"host_script"`
	HostTTSURL   string              `json:"host_tts_url"`
	Atmosphere   *AtmosphereResult   `json:"atmosphere,omitempty"`
}

// AtmosphereResult 气氛组结果
type AtmosphereResult struct {
	Comments    []string `json:"comments"`
	LongComment string   `json:"long_comment"`
	Reply       string   `json:"reply"`
	TTSURL      string   `json:"tts_url"`
}

const (
	MainWorkflowID    = "7580689179203403776" // 新工作流 - 包含 (debug)音乐提示词 节点
	MainAppID         = "7580596786936086563"
	CommentWorkflowID = "7580359385462521875"
	CommentAppID      = "7580265822782799935"
	APIBaseURL        = "https://api.coze.cn/v1/workflow/stream_run"
)

// NewCozeClient 创建Coze客户端
func NewCozeClient() *CozeWorkflowClient {
	apiToken := os.Getenv("COZE_API_TOKEN")
	if apiToken == "" {
		panic("未找到COZE_API_TOKEN环境变量")
	}

	return &CozeWorkflowClient{
		APIToken: apiToken,
		BaseURL:  APIBaseURL,
	}
}

// CallMainWorkflow 调用Main工作流
func (c *CozeWorkflowClient) CallMainWorkflow(textInput, processInput string) (*MainWorkflowResult, error) {
	req := MainWorkflowRequest{
		WorkflowID: MainWorkflowID,
		AppID:      MainAppID,
		Parameters: map[string]interface{}{
			"text_input":    textInput,
			"process_input": processInput,
			"pic_input":     "",
			"audio_input":   "",
		},
	}

	nodes, err := c.callWorkflow(req)
	if err != nil {
		return nil, err
	}

	// 解析节点数据
	result := &MainWorkflowResult{
		Comments: []string{},
	}

	for _, node := range nodes {
		switch {
		case strings.Contains(node.NodeTitle, "output") || strings.Contains(node.NodeTitle, "输出"):
			// 🎵 音乐提示词节点或输出节点
			fmt.Printf("🔍 处理节点 '%s':\n", node.NodeTitle)
			fmt.Printf("   Content: %s\n", node.Content)
			
			// 尝试解析为 MusicParams
			var musicParams MusicParams
			if err := json.Unmarshal([]byte(node.Content), &musicParams); err == nil {
				result.MusicParams = &musicParams
				fmt.Println("   ✅ 成功解析为 MusicParams")
			} else {
				fmt.Printf("   ⚠️ 不是 MusicParams 格式: %v\n", err)
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

// CallCommentReplyWorkflow 调用Comment Reply工作流
func (c *CozeWorkflowClient) CallCommentReplyWorkflow(musicParams *MusicParams) (*CommentReplyResult, error) {
	musicJSON, err := json.Marshal(musicParams)
	if err != nil {
		return nil, err
	}

	req := CommentWorkflowRequest{
		WorkflowID: CommentWorkflowID,
		AppID:      CommentAppID,
		Parameters: map[string]interface{}{
			"output": string(musicJSON),
		},
	}

	nodes, err := c.callWorkflow(req)
	if err != nil {
		return nil, err
	}

	// 解析节点数据
	result := &CommentReplyResult{
		Comments: []string{},
		Replies:  []string{},
		TTSURLs:  []string{},
	}

	for _, node := range nodes {
		switch {
		case strings.Contains(node.NodeTitle, "评论"):
			var comments map[string]string
			if err := json.Unmarshal([]byte(node.Content), &comments); err == nil {
				for i := 1; i <= 3; i++ {
					if comment, ok := comments[fmt.Sprintf("s%d", i)]; ok {
						result.Comments = append(result.Comments, comment)
					}
				}
				if longComment, ok := comments["l1"]; ok {
					result.LongComment = longComment
				}
			}
		case strings.Contains(node.NodeTitle, "reply"):
			var replyData map[string]string
			if err := json.Unmarshal([]byte(node.Content), &replyData); err == nil {
				for i := 1; i <= 4; i++ {
					if reply, ok := replyData[fmt.Sprintf("r%d", i)]; ok {
						result.Replies = append(result.Replies, reply)
					}
					if tts, ok := replyData[fmt.Sprintf("link%d", i)]; ok {
						result.TTSURLs = append(result.TTSURLs, tts)
					}
				}
			}
		}
	}

	// 随机选择一个回复
	if len(result.Replies) > 0 {
		idx := rand.Intn(len(result.Replies))
		result.SelectedReply = result.Replies[idx]
		if idx < len(result.TTSURLs) {
			result.SelectedTTSURL = result.TTSURLs[idx]
		}
	}

	return result, nil
}

// GenerateMusicAndAtmosphere 完整流程: 生成音乐 + 气氛组
func (c *CozeWorkflowClient) GenerateMusicAndAtmosphere(userInput, context string, useAtmosphere bool) (*IntegrationResult, error) {
	fmt.Printf("\n%s\n", strings.Repeat("=", 70))
	fmt.Printf("🎯 开始生成音乐和气氛组内容\n")
	fmt.Printf("%s\n", strings.Repeat("=", 70))
	fmt.Printf("📝 用户输入: %s\n", userInput)
	fmt.Printf("📝 上下文: %s\n", context)

	// Step 1: 调用Main工作流
	mainResult, err := c.CallMainWorkflow(userInput, context)
	if err != nil {
		return nil, fmt.Errorf("Main工作流调用失败: %v", err)
	}

	fmt.Printf("\n✅ Main工作流完成 - 原始数据:\n")
	mainResultJSON, _ := json.MarshalIndent(mainResult, "", "  ")
	fmt.Printf("%s\n", string(mainResultJSON))

	// 构建基础返回结果
	result := &IntegrationResult{
		MusicParams: mainResult.MusicParams,
		HostScript:  mainResult.HostScript,
		HostTTSURL:  mainResult.HostTTSURL,
	}

	// Step 2: 如果启用气氛组,调用Comment Reply工作流
	if useAtmosphere && mainResult.MusicParams != nil {
		atmosphereResult, err := c.CallCommentReplyWorkflow(mainResult.MusicParams)
		if err != nil {
			fmt.Printf("⚠️ Comment Reply工作流调用失败: %v\n", err)
		} else {
			fmt.Printf("\n✅ Comment Reply工作流完成 - 原始数据:\n")
			atmosphereJSON, _ := json.MarshalIndent(atmosphereResult, "", "  ")
			fmt.Printf("%s\n", string(atmosphereJSON))

			result.Atmosphere = &AtmosphereResult{
				Comments:    atmosphereResult.Comments,
				LongComment: atmosphereResult.LongComment,
				Reply:       atmosphereResult.SelectedReply,
				TTSURL:      atmosphereResult.SelectedTTSURL,
			}
		}
	}

	fmt.Printf("\n%s\n", strings.Repeat("=", 70))
	fmt.Printf("🎉 完整流程完成!\n")
	fmt.Printf("%s\n\n", strings.Repeat("=", 70))

	return result, nil
}

// callWorkflow 通用工作流调用方法 (暴力调试版 - 强制打印所有数据)
func (c *CozeWorkflowClient) callWorkflow(req interface{}) ([]StreamNode, error) {
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
		Timeout: 120 * time.Second,
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
