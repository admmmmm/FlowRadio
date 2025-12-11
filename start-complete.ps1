# FlowRadio Complete Startup Script (PowerShell)
# 启动所有服务：Lyria + Go Backend + Live2D + New UI
# Encoding: UTF-8 with BOM

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  FlowRadio Complete System Startup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Load .env file if exists
$envFile = Join-Path $PSScriptRoot ".env"
if (Test-Path $envFile) {
    Write-Host "📋 Loading .env file..." -ForegroundColor Cyan
    Get-Content $envFile | ForEach-Object {
        if ($_ -match '^\s*([^#][^=]*)\s*=\s*(.*)$') {
            $key = $matches[1].Trim()
            $value = $matches[2].Trim()
            # Remove quotes if present
            $value = $value -replace '^"(.*)"$', '$1'
            $value = $value -replace "^'(.*)'$", '$1'
            [System.Environment]::SetEnvironmentVariable($key, $value, [System.EnvironmentVariableTarget]::Process)
            Write-Host "  ✓ Set $key" -ForegroundColor Gray
        }
    }
    Write-Host ""
}
# 1. Start Lyria Service
Write-Host "🎵 [1/4] Starting Lyria Music Service..." -ForegroundColor Yellow
Write-Host "        Port: http://localhost:8000" -ForegroundColor Gray
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$PSScriptRoot'; python lyria_service.py"
Start-Sleep -Seconds 3

# 2. Start Go Backend
Write-Host "🔧 [2/4] Starting Go WebSocket Backend..." -ForegroundColor Yellow
Write-Host "        Port: ws://localhost:8080/ws" -ForegroundColor Gray
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$PSScriptRoot\backend'; go run ."
Start-Sleep -Seconds 4

# 3. Start Live2D Service (Vite Dev Server)
Write-Host "🎎 [3/4] Starting Live2D Service..." -ForegroundColor Yellow
Write-Host "        Port: http://localhost:5173" -ForegroundColor Gray

# Check if dependencies are installed
if (-Not (Test-Path "$PSScriptRoot\live2d_latest\node_modules")) {
    Write-Host "        Installing Live2D dependencies..." -ForegroundColor Cyan
    cd "$PSScriptRoot\live2d_latest"
    npm install
    cd $PSScriptRoot
}

Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$PSScriptRoot\live2d_latest'; npm run dev"
Write-Host "        Waiting for Vite to start..." -ForegroundColor Gray
Start-Sleep -Seconds 5

# 4. Start FlowRadio UI (Electron)
Write-Host "🖥️  [4/4] Starting FlowRadio UI (Electron)..." -ForegroundColor Yellow

# Check if dependencies are installed
if (-Not (Test-Path "$PSScriptRoot\flowradio-ui\node_modules")) {
    Write-Host "        Installing UI dependencies..." -ForegroundColor Cyan
    cd "$PSScriptRoot\flowradio-ui"
    npm install
    cd $PSScriptRoot
}

Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$PSScriptRoot\flowradio-ui'; npm start"
Start-Sleep -Seconds 2

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  ✅ All Services Started!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "📡 Services running on:" -ForegroundColor Yellow
Write-Host "   🎵 Lyria Music:    http://localhost:8000" -ForegroundColor White
Write-Host "   🔧 Go Backend:     ws://localhost:8080/ws" -ForegroundColor White
Write-Host "   🎎 Live2D:         http://localhost:5173" -ForegroundColor White
Write-Host "   🖥️  Electron UI:    launching..." -ForegroundColor White
Write-Host ""
Write-Host "💡 Tip: Press Ctrl+C in any window to stop that service" -ForegroundColor Cyan
Write-Host ""
