# Test Electron UI Launch
Write-Host "Testing FlowRadio UI..." -ForegroundColor Cyan

cd "$PSScriptRoot\flowradio-ui"

if (-Not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
}

Write-Host "Starting Electron..." -ForegroundColor Green
npm start
