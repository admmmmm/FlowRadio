# gRPCWorker.py

from PyQt6.QtCore import QObject, QRunnable, pyqtSignal as Signal, QThreadPool
from gRPCClient import FlowRadioGRPCClient # 导入客户端
import proto.flowradio_pb2 as pb
import uuid # 用于生成唯一的 Client ID

# =========================================================================
# 信号类
# =========================================================================
class WorkerSignals(QObject):
    finished = Signal()                 
    error = Signal(str)                 
    prompt_sent = Signal(bool)          
    update_received = Signal(object)    # 新增：接收 UpdateMessage 对象的信号

# =========================================================================
# 1. PromptWorker (同步调用 HandleUserPrompt)
# =========================================================================
class PromptWorker(QRunnable):
    def __init__(self, prompt: str, context: str):
        super().__init__()
        self.prompt = prompt
        self.context = context
        self.signals = WorkerSignals()
        
    def run(self):
        client = None
        try:
            client = FlowRadioGRPCClient()
            
            # 调用 gRPC (同步阻塞)
            response = client.handle_user_prompt(self.prompt, self.context)
            
            self.signals.prompt_sent.emit(response.success)
            
            if not response.success:
                 self.signals.error.emit(f"Go Backend 拒绝请求: {response.message}")

        except Exception as e:
            self.signals.error.emit(f"gRPC 通信失败: {e}")
            
        finally:
            if client:
                client.close()
            self.signals.finished.emit()


# =========================================================================
# 2. StreamWorker (异步持续监听 StreamUpdates)
# =========================================================================
class StreamWorker(QRunnable):
    def __init__(self):
        super().__init__()
        self.signals = WorkerSignals()
        self.client_id = str(uuid.uuid4())
        
    def run(self):
        client = None
        try:
            client = FlowRadioGRPCClient()
            stream_iterator = client.stream_updates(self.client_id)
            
            print(f"StreamWorker started. Client ID: {self.client_id}")

            # 持续监听流
            for update_message in stream_iterator:
                # 将接收到的 proto 消息对象通过信号发送给 UI 主线程
                self.signals.update_received.emit(update_message)
            
            # 如果流断开，则循环结束
            self.signals.error.emit("实时流断开连接，请检查 Go 后端。")

        except Exception as e:
            self.signals.error.emit(f"实时流监听失败: {e}")
            
        finally:
            if client:
                client.close()
            self.signals.finished.emit()