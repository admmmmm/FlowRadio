# 启动完整的 FlowRadio UI
Write-Host "🚀 Starting FlowRadio UI..." -ForegroundColor Cyan
Write-Host ""
Write-Host "确保 Live2D 服务已启动在 http://localhost:5173" -ForegroundColor Yellow
Write-Host ""

# 检查 Live2D 是否运行
try {
    $connection = New-Object System.Net.Sockets.TcpClient
    $connection.Connect("localhost", 5173)
    $connection.Close()
    Write-Host "✓ Live2D service is running on port 5173" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Live2D service not detected on port 5173" -ForegroundColor Yellow
    Write-Host "   Please start it first with:" -ForegroundColor White
    Write-Host "   cd D:\dev\FlowRadio\live2d" -ForegroundColor Gray
    Write-Host "   npm run dev" -ForegroundColor Gray
    Write-Host ""
    $continue = Read-Host "Continue anyway? (y/N)"
    if ($continue -ne "y") {
        exit
    }
}

Write-Host ""
Write-Host "Starting Electron UI..." -ForegroundColor Cyan

cd D:\dev\FlowRadio\flowradio-ui
npm run dev
