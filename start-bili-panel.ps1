$env:BILI_DIR = "bili-coze-panel"

if (-not (Test-Path "$env:BILI_DIR\node_modules")) {
    Write-Host "Installing dependencies..."
    Push-Location $env:BILI_DIR
    npm install
    Pop-Location
}

if (-not (Test-Path "$env:BILI_DIR\.env")) {
    Write-Host "Creating .env from template..."
    
    # Simple parsing of root .env
    $envContent = Get-Content .env
    $cozeToken = ""
    $workflowId = ""
    $appId = ""

    foreach ($line in $envContent) {
        if ($line -match "^COZE_API_TOKEN=(.*)") { $cozeToken = $matches[1].Trim() }
        if ($line -match "^MAIN_WORKFLOW_ID=(.*)") { $workflowId = $matches[1].Trim() }
        if ($line -match "^MAIN_APP_ID=(.*)") { $appId = $matches[1].Trim() }
    }
    
    $content = @"
BILI_ROOM_ID=21652183
SESSDATA=
COZE_API_TOKEN=$cozeToken
COZE_WORKFLOW_ID=$workflowId
COZE_APP_ID=$appId
DASHBOARD_PORT=3000
"@
    Set-Content "$env:BILI_DIR\.env" $content
    Write-Host "⚠️ Created $env:BILI_DIR\.env. Please edit it to set BILI_ROOM_ID and SESSDATA." -ForegroundColor Yellow
}

Write-Host "Starting Bili-Coze-Panel..."
Push-Location $env:BILI_DIR
node crawler.js
Pop-Location