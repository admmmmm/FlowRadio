package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strings"
	"time"
)

// LLMResponseData 用于解析 LLM 返回的 JSON 结构 (必须匹配 System Prompt 的要求)
type LLMResponseData struct {
	DjScript string `json:"dj_script"`
	
	// 关键修改：替换 NewGenre 为支持 Magenta 的多风格数组
	MusicPrompts []string `json:"music_prompts"`   // 例如：["Lo-Fi 沉稳节奏", "钢琴独奏"]
	PromptWeights []float32 `json:"prompt_weights"` // 例如：[1.0, 0.4]

	ActionReason string `json:"action_reason"`
	StyleRecommendation string `json:"style_recommendation"` // 暂时保留，用于 UI 主题切换
	
	// 用于多轮对话的记忆
	ConversationMemory string `json:"conversation_memory"` 
}

// DoubaoProxy 结构体封装 API 配置
type DoubaoProxy struct {
	baseURL string
	apiKey  string
	// 存储 System Prompt 模板
	systemPromptTemplate string
}

// NewDoubaoProxy 创建并初始化 LLM 客户端
// 接收 systemPromptFilePath 用于读取模板文件
func NewDoubaoProxy(systemPromptFilePath string) *DoubaoProxy {
	apiKey := os.Getenv("VOLCANO_API_KEY") 
	if apiKey == "" {
		log.Fatal("Fatal: VOLCANO_API_KEY 环境变量未设置。")
	}
	
	// 读取 System Prompt 模板
	templateBytes, err := os.ReadFile(systemPromptFilePath)
	if err != nil {
		log.Fatalf("Fatal: 无法读取 System Prompt 文件: %v", err)
	}

	return &DoubaoProxy{
		baseURL: "https://ark.cn-beijing.volces.com/api/v3/chat/completions", 
		apiKey:  apiKey,
		systemPromptTemplate: string(templateBytes),
	}
}

// --------------------------------------------------------------------------------
// 核心函数：多轮对话版本
// --------------------------------------------------------------------------------

// AnalyzeAndGenerate 调用 LLM API 进行意图解析和脚本生成
// 接收完整的对话历史 (messages 结构体)
func (p *DoubaoProxy) AnalyzeAndGenerate(
	ctx context.Context, 
	promptText string, 
	contextScene string, 
	hostPersonality string, 
	callType string,
	// 多轮对话历史：key是role(user/assistant), value是content
	history []map[string]string) (LLMResponseData, error) { 
	
	
	// 1. 构造 System Prompt (替换占位符)
	// 这个模板现在是一个完整的指令集，不再是简单的角色定义
	finalSystemPrompt := fmt.Sprintf(
		p.systemPromptTemplate, 
		hostPersonality,       // %s 1: 主持人个性
		contextScene,          // %s 2: 当前情境
		callType,              // %s 3: 用户输入类型
	)

	// 2. 构造完整的 messages 数组 (用于 HTTP 请求体)
	messages := make([]map[string]string, 0)
	
	// A. 注入 System Prompt 作为第一条消息
	messages = append(messages, map[string]string{"role": "system", "content": finalSystemPrompt})
	
	// B. 注入历史对话 (Go 后端应确保历史是干净的 user/assistant 交互)
	for _, msg := range history {
		messages = append(messages, msg)
	}

	// C. 注入本次的用户输入
	messages = append(messages, map[string]string{"role": "user", "content": promptText})


	// 3. 构造请求体
	requestBody := map[string]interface{}{
		"model": "doubao-seed-1-6-lite-251015", 
		"messages": messages,
		"temperature": 0.8,
		// "response_format": map[string]string{"type": "json_object"}, 
	}

	jsonBody, _ := json.Marshal(requestBody)
	
	// 4. 构造 HTTP 请求
	req, err := http.NewRequestWithContext(ctx, "POST", p.baseURL, bytes.NewBuffer(jsonBody))
	if err != nil {
		return LLMResponseData{}, fmt.Errorf("创建请求失败: %w", err)
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+p.apiKey) 

	// 5. 发送请求并获取响应
	client := &http.Client{Timeout: 30 * time.Second} 
	resp, err := client.Do(req)
	if err != nil {
		return LLMResponseData{}, fmt.Errorf("HTTP 请求失败: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		bodyBytes, _ := io.ReadAll(resp.Body)
		return LLMResponseData{}, fmt.Errorf("API 返回错误状态码: %d, 响应: %s", resp.StatusCode, string(bodyBytes))
	}

	// 6. 提取 LLM 生成的文本 (标准 Chat API 响应结构)
	content := ""
	var apiResponse map[string]interface{}
	if err := json.NewDecoder(resp.Body).Decode(&apiResponse); err != nil {
		return LLMResponseData{}, fmt.Errorf("解析 API 响应失败: %w", err)
	}
	// 提取 content 逻辑（保持 robust）
	if choices, ok := apiResponse["choices"].([]interface{}); ok && len(choices) > 0 {
		if choice, ok := choices[0].(map[string]interface{}); ok {
			if message, ok := choice["message"].(map[string]interface{}); ok {
				if c, ok := message["content"].(string); ok {
					content = c
				}
			}
		}
	}
	if content == "" {
		return LLMResponseData{}, fmt.Errorf("LLM 响应内容为空或格式异常")
	}

	// 7. 解析最终的 JSON 结果
	cleanContent := cleanJSONString(content) 
	var result LLMResponseData
	if err := json.Unmarshal([]byte(cleanContent), &result); err != nil {
		log.Printf("LLM 返回的 JSON 解析失败: %v, 原始文本: %s", err, content)
		return LLMResponseData{}, fmt.Errorf("LLM 返回格式错误，请检查 Prompt Engineering")
	}
	
	return result, nil
}

// 辅助函数: 清理 LLM 返回的 JSON 字符串 (移除 ```json ... ``` 标记)
func cleanJSONString(s string) string {
	s = strings.TrimSpace(s)
	// 移除常见的 Markdown JSON 标记
	if strings.HasPrefix(s, "```json") {
		s = s[7:]
	}
	if strings.HasSuffix(s, "```") {
		s = s[:len(s)-3]
	}
	s = strings.TrimSpace(s)
	return s
}