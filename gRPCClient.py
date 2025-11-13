# gRPCClient.py

import grpc
import sys
import os
import time

# 导入编译后的 proto 文件
# 修正：确保路径能找到生成的 flowradio_pb2.py 和 flowradio_pb2_grpc.py
sys.path.append(os.path.join(os.path.dirname(__file__), 'proto'))
import proto.flowradio_pb2 as pb
import proto.flowradio_pb2_grpc as pb_grpc
# 默认的 Go 后端地址和端口
GO_BACKEND_ADDRESS = 'localhost:50051' 

class FlowRadioGRPCClient:
    """
    封装 FlowRadio gRPC 服务的客户端调用
    """
    def __init__(self, address=GO_BACKEND_ADDRESS):
        self.channel = grpc.insecure_channel(address)
        self.stub = pb_grpc.FlowRadioServiceStub(self.channel)
        print(f"gRPC Client initialized, connecting to {address}")

    def close(self):
        """ 关闭 gRPC channel """
        self.channel.close()

    def handle_user_prompt(self, prompt_text: str, context_scene: str) -> pb.PromptResponse:
        """
        同步调用 Go 后端的 HandleUserPrompt RPC
        注意：多轮对话历史由 Go 后端管理，前端只需发送本次 Prompt
        """
        # 注意：PromptRequest 结构中仍包含 conversation_history，但这里我们发送一个空列表
        request = pb.PromptRequest(
            prompt_text=prompt_text,
            context_scene=context_scene,
            # Go 后端将忽略这个空列表，但结构必须完整
            conversation_history=[] 
        )
        try:
            response = self.stub.HandleUserPrompt(request, timeout=30) 
            return response
        except grpc.RpcError as e:
            print(f"gRPC Error on HandleUserPrompt: {e}")
            raise

    def stream_updates(self, client_id: str):
        """ 返回一个可迭代的流对象，用于监听实时更新 """
        request = pb.StreamRequest(client_session_id=client_id)
        return self.stub.StreamUpdates(request)