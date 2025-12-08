# FlowRadio 完整启动脚本 - 带状态检查
# 确保所有服务正常启动后再启动下一个

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  FlowRadio Complete System Startup" -ForegroundColor Cyan
Write-Host "  带服务状态检查" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 函数：检查端口是否可用
function Test-Port {
    param([int]$Port)
    try {
        $connection = New-Object System.Net.Sockets.TcpClient
        $connection.Connect("localhost", $Port)
        $connection.Close()
        return $true
    } catch {
        return $false
    }
}

# 函数：等待端口就绪
function Wait-ForPort {
    param(
        [int]$Port,
        [string]$ServiceName,
        [int]$TimeoutSeconds = 30
    )
    
    Write-Host "  ⏳ Waiting for $ServiceName (port $Port)..." -ForegroundColor Yellow -NoNewline
    
    $elapsed = 0
    while (-not (Test-Port -Port $Port) -and $elapsed -lt $TimeoutSeconds) {
        Start-Sleep -Seconds 1
        $elapsed++
        Write-Host "." -ForegroundColor Yellow -NoNewline
    }
    
    if (Test-Port -Port $Port) {
        Write-Host " ✅ Ready!" -ForegroundColor Green
        return $true
    } else {
        Write-Host " ❌ Timeout!" -ForegroundColor Red
        return $false
    }
}

# 加载环境变量
$envFile = Join-Path $PSScriptRoot ".env"
if (Test-Path $envFile) {
    Write-Host "📋 Loading .env file..." -ForegroundColor Cyan
    Get-Content $envFile | ForEach-Object {
        if ($_ -match '^\s*([^#][^=]*)\s*=\s*(.*)$') {
            $key = $matches[1].Trim()
            $value = $matches[2].Trim()
            $value = $value -replace '^"(.*)"$', '$1'
            $value = $value -replace "^'(.*)'$", '$1'
            [System.Environment]::SetEnvironmentVariable($key, $value, [System.EnvironmentVariableTarget]::Process)
            Write-Host "  ✓ Set $key" -ForegroundColor Gray
        }
    }
    Write-Host ""
}

# 检查环境变量
Write-Host "🔍 Checking environment variables..." -ForegroundColor Yellow
$hasErrors = $false

if (-Not $env:GEMINI_API_KEY) {
    Write-Host "  ❌ Missing GEMINI_API_KEY" -ForegroundColor Red
    $hasErrors = $true
} else {
    Write-Host "  ✓ GEMINI_API_KEY configured" -ForegroundColor Green
}

if ($hasErrors) {
    Write-Host ""
    Write-Host "💡 Create .env file with required API keys (see .env.example)" -ForegroundColor Yellow
    $continue = Read-Host "Continue anyway? (y/N)"
    if ($continue -ne "y") {
        exit
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Starting Services" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 1. Start Lyria Service
Write-Host "🎵 [1/4] Starting Lyria Music Service..." -ForegroundColor Yellow
Write-Host "        Port: http://localhost:8000" -ForegroundColor Gray

$lyriaCmd = "Write-Host '🎵 Lyria Music Service' -ForegroundColor Magenta; " +
            "Write-Host '======================' -ForegroundColor Magenta; " +
            "Write-Host ''; " +
            "Set-Location '$PSScriptRoot'; " +
            "python lyria_service.py"

Start-Process powershell -ArgumentList "-NoExit", "-Command", $lyriaCmd

if (Wait-ForPort -Port 8000 -ServiceName "Lyria" -TimeoutSeconds 10) {
    Write-Host "  ✅ Lyria started successfully" -ForegroundColor Green
} else {
    Write-Host "  ⚠️  Lyria may not be ready, continuing..." -ForegroundColor Yellow
}
Write-Host ""

# 2. Start Go Backend
Write-Host "🔧 [2/4] Starting Go WebSocket Backend..." -ForegroundColor Yellow
Write-Host "        Port: ws://localhost:8080/ws" -ForegroundColor Gray

$goCmd = "Write-Host '🔧 Go WebSocket Backend' -ForegroundColor Cyan; " +
         "Write-Host '=======================' -ForegroundColor Cyan; " +
         "Write-Host ''; " +
         "Set-Location '$PSScriptRoot\backend'; " +
         "go run ."

Start-Process powershell -ArgumentList "-NoExit", "-Command", $goCmd

if (Wait-ForPort -Port 8080 -ServiceName "Go Backend" -TimeoutSeconds 15) {
    Write-Host "  ✅ Go Backend started successfully" -ForegroundColor Green
} else {
    Write-Host "  ⚠️  Go Backend may not be ready, continuing..." -ForegroundColor Yellow
}
Write-Host ""

# 3. Start Live2D Service
Write-Host "🎎 [3/4] Starting Live2D Service..." -ForegroundColor Yellow
Write-Host "        Port: http://localhost:5173" -ForegroundColor Gray

# Check dependencies
if (-Not (Test-Path "$PSScriptRoot\live2d\node_modules")) {
    Write-Host "        Installing Live2D dependencies..." -ForegroundColor Cyan
    Push-Location "$PSScriptRoot\live2d"
    npm install
    Pop-Location
}

$live2dCmd = "Write-Host '🎎 Live2D Service' -ForegroundColor Green; " +
             "Write-Host '=================' -ForegroundColor Green; " +
             "Write-Host ''; " +
             "Set-Location '$PSScriptRoot\live2d'; " +
             "npm run dev"

Start-Process powershell -ArgumentList "-NoExit", "-Command", $live2dCmd

if (Wait-ForPort -Port 5173 -ServiceName "Live2D" -TimeoutSeconds 15) {
    Write-Host "  ✅ Live2D started successfully" -ForegroundColor Green
} else {
    Write-Host "  ❌ Live2D failed to start!" -ForegroundColor Red
    Write-Host "  Please check the Live2D service window for errors" -ForegroundColor Yellow
    Write-Host ""
    $continue = Read-Host "Continue to start UI anyway? (y/N)"
    if ($continue -ne "y") {
        Write-Host ""
        Write-Host "Startup cancelled. Please fix Live2D issues and try again." -ForegroundColor Yellow
        exit
    }
}
Write-Host ""

# 4. Start FlowRadio UI
Write-Host "🖥️  [4/4] Starting FlowRadio UI (Electron)..." -ForegroundColor Yellow

# Check dependencies
if (-Not (Test-Path "$PSScriptRoot\flowradio-ui\node_modules")) {
    Write-Host "        Installing UI dependencies..." -ForegroundColor Cyan
    Push-Location "$PSScriptRoot\flowradio-ui"
    npm install
    Pop-Location
}

$uiCmd = "Write-Host '🖥️  FlowRadio Electron UI' -ForegroundColor Blue; " +
         "Write-Host '=======================' -ForegroundColor Blue; " +
         "Write-Host ''; " +
         "Set-Location '$PSScriptRoot\flowradio-ui'; " +
         "npm start"

Start-Process powershell -ArgumentList "-NoExit", "-Command", $uiCmd

Start-Sleep -Seconds 3

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  ✅ All Services Started!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "📡 Services Status:" -ForegroundColor Yellow
Write-Host ""

if (Test-Port -Port 8000) {
    Write-Host "   ✅ Lyria Music:    http://localhost:8000" -ForegroundColor Green
} else {
    Write-Host "   ❌ Lyria Music:    NOT RUNNING" -ForegroundColor Red
}

if (Test-Port -Port 8080) {
    Write-Host "   ✅ Go Backend:     ws://localhost:8080/ws" -ForegroundColor Green
} else {
    Write-Host "   ❌ Go Backend:     NOT RUNNING" -ForegroundColor Red
}

if (Test-Port -Port 5173) {
    Write-Host "   ✅ Live2D:         http://localhost:5173" -ForegroundColor Green
} else {
    Write-Host "   ❌ Live2D:         NOT RUNNING" -ForegroundColor Red
}

Write-Host "   🖥️  Electron UI:    Check if window opened" -ForegroundColor White
Write-Host ""
Write-Host "💡 Tips:" -ForegroundColor Cyan
Write-Host "   - If Live2D shows 'NOT RUNNING', check the Live2D window for errors" -ForegroundColor White
Write-Host "   - If Electron UI doesn't open, check the UI window for errors" -ForegroundColor White
Write-Host "   - Press Ctrl+C in any service window to stop that service" -ForegroundColor White
Write-Host "   - Press F12 in Electron window to open DevTools" -ForegroundColor White
Write-Host ""
