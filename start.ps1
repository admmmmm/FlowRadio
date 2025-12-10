# FlowRadio Startup Script (PowerShell)
# Encoding: UTF-8 with BOM

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "     FlowRadio Startup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Load .env file if exists
$envFile = Join-Path $PSScriptRoot ".env"
if (Test-Path $envFile) {
    Write-Host "Loading .env file..." -ForegroundColor Cyan
    Get-Content $envFile | ForEach-Object {
        if ($_ -match '^\s*([^#][^=]*)\s*=\s*(.*)$') {
            $key = $matches[1].Trim()
            $value = $matches[2].Trim()
            # Remove quotes if present
            $value = $value -replace '^"(.*)"$', '$1'
            $value = $value -replace "^'(.*)'$", '$1'
            [System.Environment]::SetEnvironmentVariable($key, $value, [System.EnvironmentVariableTarget]::Process)
            Write-Host "  Set $key" -ForegroundColor Gray
        }
    }
    Write-Host ""
}

# Map .env variables to Go backend expected names
if ($env:COZE_MAIN_WORKFLOW_ID) {
    $env:MAIN_WORKFLOW_ID = $env:COZE_MAIN_WORKFLOW_ID
}
# Set default APP_IDs if not provided
if (-not $env:MAIN_APP_ID) {
    $env:MAIN_APP_ID = "default"
}

# Check environment variables
Write-Host "Checking environment variables..." -ForegroundColor Yellow

$hasErrors = $false

if (-Not $env:GEMINI_API_KEY) {
    Write-Host "X Missing GEMINI_API_KEY (Required)" -ForegroundColor Red
    Write-Host "  Get it from: https://aistudio.google.com/app/apikey" -ForegroundColor White
    Write-Host ""
    $hasErrors = $true
}

# Check if Coze is configured (optional but recommended)
if ($env:COZE_API_TOKEN) {
    Write-Host "✓ COZE_API_TOKEN configured - Using Coze AI workflows" -ForegroundColor Green
    Write-Host "  Mode: Coze + Lyria (Recommended)" -ForegroundColor Cyan
    Write-Host ""
} else {
    Write-Host "! COZE_API_TOKEN not set - Using fallback LLM mode" -ForegroundColor Yellow
    Write-Host "  Get Coze token from: https://www.coze.cn/open/oauth/pats" -ForegroundColor White
    Write-Host "  Mode: Volcano LLM + Lyria (Basic)" -ForegroundColor Cyan
    Write-Host ""
    
    # If using fallback mode, check for VOLCANO_API_KEY
    if (-Not $env:VOLCANO_API_KEY) {
        Write-Host "X Missing VOLCANO_API_KEY (Required for fallback mode)" -ForegroundColor Red
        Write-Host "  Get it from: https://console.volcengine.com/ark/region:ark+cn-beijing/endpoint" -ForegroundColor White
        Write-Host ""
        $hasErrors = $true
    }
}

if ($hasErrors) {
    Write-Host "Tip: Create .env file to configure API Keys" -ForegroundColor Yellow
    Write-Host "See .env.example for reference" -ForegroundColor Yellow
    Write-Host ""
    $continue = Read-Host "Continue anyway? (y/N)"
    if ($continue -ne "y") {
        exit
    }
}

Write-Host "OK Environment check passed" -ForegroundColor Green
Write-Host ""

# 1. Start Lyria Service
Write-Host "Step 1/4: Starting Lyria Music Service..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot'; python lyria_service.py"
Start-Sleep -Seconds 2

# 2. Start Go Backend
Write-Host "Step 2/4: Starting Go WebSocket Backend..." -ForegroundColor Yellow
Write-Host "  Running from source (go run .)..." -ForegroundColor Cyan

Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend'; `
`$env:GEMINI_API_KEY='$env:GEMINI_API_KEY'; `
`$env:COZE_API_TOKEN='$env:COZE_API_TOKEN'; `
`$env:VOLCANO_API_KEY='$env:VOLCANO_API_KEY'; `
`$env:MAIN_WORKFLOW_ID='$env:MAIN_WORKFLOW_ID'; `
`$env:MAIN_APP_ID='$env:MAIN_APP_ID'; go run ."
Start-Sleep -Seconds 3

# 3. Start Live2D Service
Write-Host "Step 3/5: Starting Live2D Service..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\live2d'; npm run dev"
Start-Sleep -Seconds 3

# 4. Start Bilibili Crawler
Write-Host "Step 4/5: Starting Bilibili Crawler..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\bili-coze-panel'; node crawler.js"
Start-Sleep -Seconds 3

# 5. Start FlowRadio UI (Electron)
Write-Host "Step 5/5: Starting FlowRadio UI..." -ForegroundColor Yellow
cd "$PSScriptRoot\flowradio-ui"

# Check if dependencies are installed
if (-Not (Test-Path "node_modules")) {
    Write-Host "Installing Node.js dependencies..." -ForegroundColor Cyan
    npm install
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "     All Services Started!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Services running on:" -ForegroundColor Yellow
Write-Host "  - Lyria Service: http://localhost:8000" -ForegroundColor White
Write-Host "  - Go Backend: ws://localhost:8080/ws" -ForegroundColor White
Write-Host "  - Live2D Service: http://localhost:5173" -ForegroundColor White
Write-Host "  - Bilibili Crawler: http://localhost:3000" -ForegroundColor White
Write-Host "  - FlowRadio UI: launching..." -ForegroundColor White
Write-Host ""

Set-Location "$PSScriptRoot\flowradio-ui"
npm run dev
