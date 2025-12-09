import requests
import json
import time
import os

# Configuration
API_TOKEN = "pat_Wa6zkuduQfdqSxHsSOuT2i1gDuvliVTOTHUYPwflStO9ycxGdvXFp7N4PCLjoM9L"
WORKFLOW_ID = "7581397947751333888"
APP_ID = "7581311542793125922"
API_URL = "https://api.coze.cn/v1/workflow/stream_run"

HEADERS = {
    "Authorization": f"Bearer {API_TOKEN}",
    "Content-Type": "application/json",
    "Accept": "text/event-stream"
}

def run_scenario(scenario_name, user_input):
    print(f"\n{'='*20} Running Scenario: {scenario_name} {'='*20}")
    print(f"Input: {user_input}")
    
    data = {
        "workflow_id": WORKFLOW_ID,
        "parameters": {
            "CONVERSATION_NAME": "Default",
            "USER_INPUT": user_input
        }
    }
    
    try:
        response = requests.post(API_URL, headers=HEADERS, json=data, stream=True)
        print(f"Response Status: {response.status_code}")
        
        if response.status_code != 200:
            print(f"Error: {response.text}")
            return

        for line in response.iter_lines():
            if line:
                decoded_line = line.decode('utf-8')
                if decoded_line.startswith("data:"):
                    json_str = decoded_line[5:].strip()
                    print(f"DEBUG DATA: {json_str[:100]}...") # Debug print
                    try:
                        node = json.loads(json_str)
                        if "node_title" in node:
                            title = node["node_title"]
                            content = node.get("content", "")
                            
                            print(f"\n[Node: {title}]")
                            
                            # Check for Fast Ack
                            if "fast_ack" in title.lower() or "urgent" in title.lower() or "快速回复" in title:
                                print("⚡ FAST ACK DETECTED!")
                                print(content)
                                
                            # Check for Host Output
                            elif title == "输出" or title == "输出_1":
                                print(f"🗣️ Host Output ({title}):")
                                print(content[:100] + "..." if len(content) > 100 else content)
                                
                            # Check for Music Params (usually in 'output' or specific debug node)
                            elif "music" in title.lower() or "音乐" in title:
                                print("🎵 Music Params Candidate:")
                                print(content)
                                
                            # Check for End
                            elif node.get("node_type") == "End":
                                print("🏁 Workflow Ended")
                        else:
                             # Print other events like 'id', 'event' if they are in the json? 
                             # Actually Coze stream format is `event: ... \n data: ...`
                             # My script only looks at `data:`.
                             # Sometimes data is just a status update.
                             pass
                                
                    except json.JSONDecodeError:
                        print(f"Raw Data: {json_str}")

                        
    except Exception as e:
        print(f"Exception: {e}")

if __name__ == "__main__":
    # Scenario 1: Chat
    run_scenario("1. Chat", "主播晚上好，我们来聊聊天吧。")
    
    # Wait a bit
    time.sleep(2)
    
    # Scenario 2: Music Request
    run_scenario("2. Music Request", "主播，我想听爵士乐。")
