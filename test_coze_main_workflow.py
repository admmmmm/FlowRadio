import requests
import json
import os
import sys

# Configuration
WORKFLOW_ID = "7581487516789735476"
# Try to get token from env or use the one found in source code
API_TOKEN = os.environ.get("COZE_API_TOKEN", "pat_Wa6zkuduQfdqSxHsSOuT2i1gDuvliVTOTHUYPwflStO9ycxGdvXFp7N4PCLjoM9L")

url = "https://api.coze.cn/v1/workflow/stream_run"

# Test Payload
payload = {
    "workflow_id": WORKFLOW_ID,
    "parameters": {
        "USER_INPUT": "主播，你觉得炸鸡好吃吗？",
        "CONVERSATION_NAME": "Default",
        "User_name": "Tester",
        "Chat_trigger": True,
        "danmu": [
            {
                "name": "Tester",
                "text": "主播，你觉得炸鸡好吃吗？",
                "weight": 1
            }
        ]
    }
}

headers = {
    "Authorization": f"Bearer {API_TOKEN}",
    "Content-Type": "application/json"
}

print(f"🚀 Launching Coze Workflow Request...")
print(f"ID: {WORKFLOW_ID}")
print("-" * 50)

try:
    response = requests.post(url, headers=headers, json=payload, stream=True)
    response.raise_for_status()

    print("📡 Receiving Stream Response...")
    
    for line in response.iter_lines():
        if line:
            decoded_line = line.decode('utf-8')
            if decoded_line.startswith("data:"):
                data_str = decoded_line[5:].strip()
                try:
                    data = json.loads(data_str)
                    
                    node_title = data.get("node_title", "Unknown")
                    content = data.get("content", "")
                    
                    print(f"\n📦 [Node: {node_title}]")
                    print(f"📄 Content (Raw): {content}")
                    
                    # Try to parse content as JSON to see structure
                    try:
                        json_content = json.loads(content)
                        print(f"   ---> JSON Parsed: {json.dumps(json_content, indent=2, ensure_ascii=False)}")
                    except:
                        pass
                        
                except json.JSONDecodeError:
                    pass
                    
except Exception as e:
    print(f"❌ Error: {e}")
