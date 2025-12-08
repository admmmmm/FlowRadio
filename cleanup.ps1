# FlowRadio 清理脚本
# 删除旧的UI和临时文件

Write-Host "========================================" -ForegroundColor Yellow
Write-Host "  FlowRadio Cleanup Script" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Yellow
Write-Host ""

$filesToDelete = @(
    # 旧的 Electron UI
    "electron-ui",
    
    # 临时文档
    "CSP-FIX.md",
    "FIXES-SUMMARY.md",
    "LIVE2D-FIX.md",
    "QUICKSTART-COMPLETE.md",
    "README-COMPLETE.md",
    "START-GUIDE.md",
    
    # 测试脚本
    "test-ui-simple.ps1",
    "test-ui.ps1",
    "start-ui.ps1",
    "start-all.ps1",
    "start-complete.ps1"
)

Write-Host "将要删除以下文件/目录：" -ForegroundColor Cyan
foreach ($item in $filesToDelete) {
    $fullPath = Join-Path $PSScriptRoot $item
    if (Test-Path $fullPath) {
        Write-Host "  ✓ $item" -ForegroundColor White
    } else {
        Write-Host "  - $item (不存在)" -ForegroundColor Gray
    }
}

Write-Host ""
$confirm = Read-Host "确认删除？(y/N)"

if ($confirm -eq "y" -or $confirm -eq "Y") {
    Write-Host ""
    Write-Host "开始清理..." -ForegroundColor Yellow
    
    foreach ($item in $filesToDelete) {
        $fullPath = Join-Path $PSScriptRoot $item
        if (Test-Path $fullPath) {
            try {
                Remove-Item -Path $fullPath -Recurse -Force
                Write-Host "  ✓ 已删除: $item" -ForegroundColor Green
            } catch {
                Write-Host "  ✗ 删除失败: $item - $_" -ForegroundColor Red
            }
        }
    }
    
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  清理完成！" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
} else {
    Write-Host "已取消清理" -ForegroundColor Yellow
}
