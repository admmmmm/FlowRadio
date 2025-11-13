import sys
# 切换到 PyQt6 库
from PyQt6.QtWidgets import (
    QApplication, QMainWindow, QWidget,
    QVBoxLayout, QHBoxLayout, QLabel,
    QLineEdit, QPushButton, QSlider,
    QScrollArea
)
# 导入 Qt 核心组件和枚举值
from PyQt6.QtCore import Qt, QTimer, QSize, pyqtSignal as Signal, QObject, QThreadPool
from PyQt6.QtGui import QFont, QIcon, QAction

# 导入 gRPC Worker 和 proto 消息 (确保这些文件在正确的位置)
from gRPCWorker import PromptWorker, WorkerSignals, StreamWorker
import proto.flowradio_pb2 as pb
from proto import flowradio_pb2_grpc as pb_grpc # 仅在需要时
# --- 1. 主窗口类定义 ---
class FlowRadioApp(QMainWindow):
    
    # 状态信号，用于接收实时流更新
    stream_update_signal = Signal(object) 
    
    def __init__(self):
        super().__init__()
        self.setWindowTitle("FlowRadio - 拟人化智能电台")
        self.setFixedSize(600, 800) 
        
        # 核心：状态管理 (简化为 Go 后端管理历史，前端只存状态)
        self.host_state = {
            'current_genre': 'lofi',    
            'current_memory': '',       # 存储 LLM 返回的最新 memory 摘要
        }

        # 加载 QSS 样式 (假设 QSS 文件在 qss/ 目录下)
        self.switch_theme('ios')

        central_widget = QWidget()
        self.setCentralWidget(central_widget)
        
        main_layout = QVBoxLayout(central_widget)
        main_layout.setContentsMargins(20, 20, 20, 20)
        main_layout.setSpacing(15)
        
        # 依次添加顶部、中部、底部区域
        self.top_widget = self._create_top_bar()
        self.middle_widget = self._create_middle_section()
        self.bottom_widget = self._create_bottom_bar()
        
        main_layout.addWidget(self.top_widget)
        main_layout.addWidget(self.middle_widget, 4) # 权重为4，占据更多空间
        main_layout.addWidget(self.bottom_widget, 1) # 权重为1
        
        # 连接信号与槽
        self._connect_signals()
        
        # 初始化线程池
        self.threadpool = QThreadPool.globalInstance()
        print(f"ThreadPool 初始化，最大线程数: {self.threadpool.maxThreadCount()}")
        
        # 启动 Stream Worker (实时监听 Go 后端推送)
        self._start_stream_worker()


    # --- 2. 顶部区域：DJ & 快捷键 ---
    def _create_top_bar(self):
        top_bar = QWidget()
        top_layout = QHBoxLayout(top_bar)
        top_layout.setContentsMargins(0, 0, 0, 0)
        
        # 1. 主持人信息 (左侧)
        dj_info_widget = QWidget()
        dj_info_layout = QVBoxLayout(dj_info_widget)
        
        self.dj_name_label = QLabel(" DJ Astro")
        self.dj_status_label = QLabel("Status: 🌌 准备就绪")
        
        self.dj_name_label.setObjectName("DjNameLabel")
        self.dj_status_label.setObjectName("DjStatusLabel")
        
        dj_info_layout.addWidget(self.dj_name_label)
        dj_info_layout.addWidget(self.dj_status_label)
        
        top_layout.addWidget(dj_info_widget)
        top_layout.addStretch(1) # 弹性空间
        
        # 2. 风格切换快捷键 (右侧)
        style_shortcuts_widget = QWidget()
        shortcuts_layout = QHBoxLayout(style_shortcuts_widget)
        shortcuts_layout.setSpacing(5)

        # 示例快捷键按钮
        self.btn_style_lofi = QPushButton("Lo-Fi")
        self.btn_style_ambient = QPushButton("Ambient")
        
        shortcuts_layout.addWidget(self.btn_style_lofi)
        shortcuts_layout.addWidget(self.btn_style_ambient)
        
        top_layout.addWidget(style_shortcuts_widget)
        
        return top_bar

    # --- 3. 中部区域：动态信息流与控制 ---
    def _create_middle_section(self):
        middle_section = QWidget()
        main_layout = QVBoxLayout(middle_section)
        main_layout.setContentsMargins(0, 0, 0, 0)

        # 1. 播放控制条 (顶部)
        controls_widget = QWidget()
        controls_layout = QHBoxLayout(controls_widget)
        controls_layout.setContentsMargins(0, 0, 0, 0)
        
        self.btn_play_pause = QPushButton("⏸️")
        self.btn_play_pause.setFixedSize(40, 40)
        
        self.volume_slider = QSlider(Qt.Orientation.Horizontal) 
        self.volume_slider.setRange(0, 100)
        self.volume_slider.setValue(50)
        
        controls_layout.addWidget(self.btn_play_pause)
        controls_layout.addWidget(QLabel("Vol:"))
        controls_layout.addWidget(self.volume_slider)
        
        main_layout.addWidget(controls_widget)
        
        # 2. 留言滚动区/动态文字显示区 (核心)
        self.message_area = QScrollArea()
        self.message_area.setObjectName("MessageScrollArea")
        self.message_area.setWidgetResizable(True)
        
        self.message_area.setHorizontalScrollBarPolicy(Qt.ScrollBarPolicy.ScrollBarAlwaysOff)

        # QScrollArea需要一个内容Widget
        self.message_content_widget = QWidget()
        self.message_content_widget.setObjectName("MessageContentWidget")
        self.message_layout = QVBoxLayout(self.message_content_widget)
        self.message_layout.setSpacing(8)
        
        self.message_layout.setAlignment(Qt.AlignmentFlag.AlignTop) 

        self.message_area.setWidget(self.message_content_widget)
        
        main_layout.addWidget(self.message_area)
        
        return middle_section
    
    # --- 4. 底部区域：听众来电与配置 ---
    def _create_bottom_bar(self):
        bottom_bar = QWidget()
        bottom_bar.setObjectName("BottomBarWidget")
        bottom_layout = QHBoxLayout(bottom_bar)
        
        # 1. 配置按钮 (左侧)
        self.btn_config = QPushButton("⚙️ 配置")
        self.btn_config.setObjectName("ConfigButton")
        bottom_layout.addWidget(self.btn_config)
        
        # 2. 留言框 (中间)
        self.input_prompt = QLineEdit()
        self.input_prompt.setPlaceholderText("输入您的需求，如：放点适合写代码的音乐...")
        self.input_prompt.setObjectName("PromptInput")
        bottom_layout.addWidget(self.input_prompt)
        
        # 3. 拨打按钮 (右侧)
        self.btn_call_in = QPushButton("📞 CALL IN")
        self.btn_call_in.setObjectName("CallInButton")
        self.btn_call_in.setFixedSize(120, 35)
        bottom_layout.addWidget(self.btn_call_in)
        
        return bottom_bar

    # --- 5. 信号与槽连接 ---
    def _connect_signals(self):
        # 拨打按钮点击事件
        self.btn_call_in.clicked.connect(self._handle_call_in)
        # 输入框回车事件 (按下回车也视为拨打)
        self.input_prompt.returnPressed.connect(self._handle_call_in)
        # 播放/暂停按钮点击事件
        self.btn_play_pause.clicked.connect(self._handle_play_pause)
        
        # 样式按钮点击示例
        self.btn_style_lofi.clicked.connect(lambda: self.add_message("系统：切换至 Lo-Fi 风格"))
        self.btn_style_lofi.clicked.connect(lambda: self.switch_theme('synthwave'))
        # Ambient 按钮切换回 iOS 风格
        self.btn_style_ambient.clicked.connect(lambda: self.switch_theme('ios'))

    def _handle_call_in(self):
        prompt_text = self.input_prompt.text().strip()
        if prompt_text:
            
            # 1. UI反馈：显示消息，清空输入框
            self.add_message(f"您：{prompt_text}", is_user=True)
            self.input_prompt.clear()
            
            # 2. 锁定UI，避免重复发送
            self.btn_call_in.setEnabled(False)
            self.btn_call_in.setText("连线中...")

            # 3. 创建 Worker 并连接信号
            # 假设当前上下文是 "Coding" (Vision模块未实现时的占位符)
            context_scene = "Coding" 
            
            # PromptWorker 现在只需发送本次输入
            worker = PromptWorker(prompt=prompt_text, context=context_scene) 
            
            # 连接 Worker 信号到 UI 的 Slot
            worker.signals.prompt_sent.connect(self._handle_prompt_sent)
            worker.signals.error.connect(self._handle_worker_error)
            # Worker 结束不代表 LLM 完成，故不连接 finished 到 unlock

            # 4. 启动 Worker
            self.threadpool.start(worker)
            
    # --- 新增 Stream Worker 启动和处理逻辑 ---
    def _start_stream_worker(self):
        """启动后台线程，持续监听 Go 后端推送的实时更新"""
        worker = StreamWorker()
        
        # 连接 Worker 的 update_received 信号到 UI 的处理槽
        worker.signals.update_received.connect(self._handle_stream_update) 
        worker.signals.error.connect(self._handle_worker_error)
        
        self.threadpool.start(worker)

    def _handle_stream_update(self, update_message: pb.UpdateMessage):
        """处理 Go 后端推送来的 UpdateMessage 实时数据"""
        
        update_type = update_message.type
        
        if update_type == pb.UpdateMessage.DJ_DECISION:
            # 解析决策负载
            decision = update_message.decision_data 
            
            primary_prompt = decision.music_prompts[0] if decision.music_prompts else self.host_state['current_genre']
            
            # 1. 更新 UI 脚本
            self.add_message(decision.dj_script, is_user=False)
            self.dj_status_label.setText(f"Status: 🎶 {primary_prompt} (理由: {decision.action_reason})")
            
            # 2. TODO: 播放音频 (使用 mpv 播放 decision.audio_data_bytes)
            
            # 3. 更新本地状态
            self.host_state['current_memory'] = decision.new_conversation_memory
            if decision.music_prompts and decision.music_prompts[0] != self.host_state['current_genre']:
                 self.host_state['current_genre'] = decision.music_prompts[0]
            
            # LLM 流程完成，解锁按钮
            self._unlock_call_in()

        elif update_type == pb.UpdateMessage.VIRTUAL_COMMENT:
            self.add_message(update_message.virtual_comment_text, is_user=False)
        
        elif update_type == pb.UpdateMessage.SYSTEM_STATUS:
            self._handle_worker_error(update_message.system_status_data.message)

    def _handle_prompt_sent(self, success: bool):
        """ 处理 Prompt 请求发送后的 Go 后端确认信息 """
        if success:
            # 仅显示状态，等待 StreamWorker 推送最终结果
            self.dj_status_label.setText("Status: 🎧 DJ Brain 正在处理...") 
        else:
            self.dj_status_label.setText("Status: ❌ Go 后端请求失败")
            self._unlock_call_in() # 请求失败，立即解锁

    def _handle_worker_error(self, error_message: str):
        """ 处理 gRPC 通信错误或 StreamWorker 错误 """
        self.add_message(f"系统错误: {error_message}", is_user=False)
        self.dj_status_label.setText("Status: ❌ 通信错误")
        self._unlock_call_in()

    def _unlock_call_in(self):
        """ 无论成功或失败，都在 Worker 结束后解锁按钮 """
        self.btn_call_in.setEnabled(True)
        self.btn_call_in.setText("📞 CALL IN")
        
    def _handle_play_pause(self):
        if self.btn_play_pause.text() == "⏸️":
            self.btn_play_pause.setText("▶️")
            self.dj_status_label.setText("Status: ⏸️ 暂停中")
            # TODO: 调用后端API暂停音乐
        else:
            self.btn_play_pause.setText("⏸️")
            self.dj_status_label.setText("Status: 🎶 正在播放")
            # TODO: 调用后端API播放音乐

    # --- 6. 核心功能：动态添加消息 ---
    def add_message(self, text, is_user=False):
        """动态添加一条消息到滚动区"""
        msg_label = QLabel(text)
        msg_label.setWordWrap(True)
        msg_label.setObjectName("UserMessage" if is_user else "SystemMessage")

        # 插入新消息
        self.message_layout.addWidget(msg_label)

        # 确保滚动条自动滚动到底部
        self.message_area.verticalScrollBar().setValue(self.message_area.verticalScrollBar().maximum())
        
    # --- 7. QSS 加载 ---
    def load_stylesheet(self, filepath):
        """从文件加载 QSS 样式"""
        try:
            with open(filepath, "r", encoding="utf-8") as f:
                self.setStyleSheet(f.read())
        except FileNotFoundError:
            print(f"警告：找不到样式文件 {filepath}，将使用默认样式。")
    
    def switch_theme(self, theme_name):
        """动态切换 UI 主题"""
        theme_map = {
            'ios': 'qss/ios_style.qss',
            'dark': 'qss/dark_style.qss',  # 之前的深色主题
            'synthwave': 'qss/synthwave_style.qss', # 新的 Synthwave 主题
            # TODO: 后续可添加 'lofi', 'ambient' 等主题
        }
        
        filename = theme_map.get(theme_name, 'ios_style.qss') # 找不到则回退
        self.load_stylesheet(filename)

# --- 8. 应用启动 ---
if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = FlowRadioApp()
    
    # 示例：启动后添加几条消息
    window.add_message("欢迎收听 FlowRadio！我是 DJ Astro。", is_user=False)
    window.add_message("当前环境：编程中。为您自动推荐 Lo-Fi 音乐。", is_user=False)
    
    window.show()
    sys.exit(app.exec())