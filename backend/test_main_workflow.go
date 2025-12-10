package main

import (
	"encoding/json"
	"fmt"
)

// 改名为 runTest 以避免与 main.go 中的 main 函数冲突
// 运行此测试请使用: go run test_main_workflow.go coze_client.go
func runTest() {
	// 设置环境变量 (如果需要)
	// os.Setenv("COZE_API_TOKEN", "your_token_here")

	client := NewCozeClient()

	fmt.Println("🚀 开始测试 Main 工作流...")

	// 模拟输入
	userInput := "请做一个挥手的动作"
	username := "Tester"
	
	// 回调函数打印流式节点
	callback := func(event string, node *StreamNode) {
		fmt.Printf("\n📦 [Stream Node] %s (%s)\n", node.NodeTitle, node.NodeType)
		fmt.Printf("Content: %s\n", node.Content)
	}

	result, err := client.CallMainWorkflow(userInput, username, "", true, callback)
	if err != nil {
		fmt.Printf("❌ 调用失败: %v\n", err)
		return
	}

	fmt.Println("\n✅ 工作流完成，结果:")
	jsonResult, _ := json.MarshalIndent(result, "", "  ")
	fmt.Println(string(jsonResult))
}
