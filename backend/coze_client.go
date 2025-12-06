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
	MainWorkflowID    = "7580359385462505491"
	MainAppID         = "7580265822782799935"
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

	fmt.Printf("\n✅ Main工作流完成:\n")
	if mainResult.MusicParams != nil {
		fmt.Printf("   - 音乐配置: BPM=%d, Scale=%s\n",
			mainResult.MusicParams.MusicConfig.BPM,
			mainResult.MusicParams.MusicConfig.Scale)
		fmt.Printf("   - 提示词数量: %d\n", len(mainResult.MusicParams.WeightedPrompts))
	}
	if len(mainResult.HostScript) > 50 {
		fmt.Printf("   - 主持人播报: %s...\n", mainResult.HostScript[:50])
	} else {
		fmt.Printf("   - 主持人播报: %s\n", mainResult.HostScript)
	}

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
			fmt.Printf("\n✅ Comment Reply工作流完成:\n")
			fmt.Printf("   - 模拟评论数: %d\n", len(atmosphereResult.Comments))
			fmt.Printf("   - 回复变体数: %d\n", len(atmosphereResult.Replies))
			if len(atmosphereResult.SelectedReply) > 50 {
				fmt.Printf("   - 选中回复: %s...\n", atmosphereResult.SelectedReply[:50])
			} else {
				fmt.Printf("   - 选中回复: %s\n", atmosphereResult.SelectedReply)
			}

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

// callWorkflow 通用工作流调用方法
func (c *CozeWorkflowClient) callWorkflow(req interface{}) ([]StreamNode, error) {
	reqBody, err := json.Marshal(req)
	if err != nil {
		return nil, err
	}

	httpReq, err := http.NewRequest("POST", c.BaseURL, bytes.NewBuffer(reqBody))
	if err != nil {
		return nil, err
	}

	httpReq.Header.Set("Authorization", "Bearer "+c.APIToken)
	httpReq.Header.Set("Content-Type", "application/json")

	// 增加超时时间到120秒,并设置更长的读取超时
	client := &http.Client{
		Timeout: 120 * time.Second,
		Transport: &http.Transport{
			ResponseHeaderTimeout: 30 * time.Second,  // 响应头超时
			IdleConnTimeout:       90 * time.Second,  // 空闲连接超时
		},
	}

	log.Printf("📡 调用Coze工作流,开始时间: %s", time.Now().Format("15:04:05"))
	startTime := time.Now()

	resp, err := client.Do(httpReq)
	if err != nil {
		log.Printf("❌ 请求失败 (耗时 %.1fs): %v", time.Since(startTime).Seconds(), err)
		return nil, err
	}
	defer resp.Body.Close()

	log.Printf("✅ 收到响应头 (耗时 %.1fs), 状态码: %d", time.Since(startTime).Seconds(), resp.StatusCode)

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		return nil, fmt.Errorf("HTTP %d: %s", resp.StatusCode, string(body))
	}

	// 解析流式响应
	var nodes []StreamNode
	scanner := bufio.NewScanner(resp.Body)
	
	// 增加scanner缓冲区大小,避免行太长导致的问题
	buf := make([]byte, 0, 64*1024)
	scanner.Buffer(buf, 1024*1024)  // 1MB最大token大小
	
	lineCount := 0
	for scanner.Scan() {
		lineCount++
		line := scanner.Text()
		if !strings.HasPrefix(line, "data: ") {
			continue
		}

		dataStr := strings.TrimPrefix(line, "data: ")
		var node StreamNode
		if err := json.Unmarshal([]byte(dataStr), &node); err != nil {
			log.Printf("⚠️ 跳过解析错误的行 %d: %v", lineCount, err)
			continue
		}

		// 只保留有内容的Message节点
		if node.Content != "" && node.NodeType == "Message" {
			nodes = append(nodes, node)
		}
	}

	if err := scanner.Err(); err != nil {
		log.Printf("❌ 流式读取失败 (总耗时 %.1fs): %v", time.Since(startTime).Seconds(), err)
		return nil, err
	}

	log.Printf("✅ 工作流完成 (总耗时 %.1fs), 收到 %d 个Message节点", time.Since(startTime).Seconds(), len(nodes))
	return nodes, nil
}
