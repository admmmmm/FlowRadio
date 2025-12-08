# 测试 Electron UI - 保持窗口打开
Write-Host "🖥️  Starting FlowRadio UI Test..." -ForegroundColor Cyan
Write-Host ""

cd D:\dev\FlowRadio\flowradio-ui

Write-Host "Running: npm run test" -ForegroundColor Yellow
Write-Host "This will open an Electron window with:" -ForegroundColor Gray
Write-Host "  - Black background" -ForegroundColor Gray
Write-Host "  - Green test rectangle" -ForegroundColor Gray
Write-Host "  - Animated text" -ForegroundColor Gray
Write-Host "  - DevTools (F12) automatically opened" -ForegroundColor Gray
Write-Host ""
Write-Host "If you don't see the window, check:" -ForegroundColor Yellow
Write-Host "  1. Is it behind other windows?" -ForegroundColor White
Write-Host "  2. Check terminal output for errors" -ForegroundColor White
Write-Host "  3. Try Alt+Tab to find the window" -ForegroundColor White
Write-Host ""

npm run test

Write-Host ""
Write-Host "Electron window should now be open!" -ForegroundColor Green
Write-Host "Press any key to exit..." -ForegroundColor Cyan
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
