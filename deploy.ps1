# ============================================
# 一键部署脚本 - 樊磊个人简历网站
# 使用方法：编辑完文件后运行此脚本即可部署
# ============================================

param([string]$Token = "")

$ErrorActionPreference = "Stop"
$ProjectPath = "D:\Users\Administrator\Documents\个人主页"
$RepoName = "fanleifanbufan.github.io"

# 读取 Token
if (-not $Token) {
    $tokenFile = Join-Path $ProjectPath ".git_token"
    if (Test-Path $tokenFile) {
        $Token = Get-Content $tokenFile -Raw -Encoding UTF8 | ForEach-Object { $_.Trim() }
        Write-Host "✓ 已读取保存的 Token" -ForegroundColor Green
    } else {
        $Token = Read-Host "请输入 GitHub Token (https://github.com/settings/tokens)"
        $save = Read-Host "保存 Token 到本地？(y/n)"
        if ($save -eq "y") {
            $Token | Set-Content -Path $tokenFile -Encoding UTF8 -NoNewline
            Write-Host "✓ Token 已保存" -ForegroundColor Green
        }
    }
}

# 检查中文编码
Write-Host "`n📝 检查编码..." -ForegroundColor Cyan
$htmlFile = Join-Path $ProjectPath "index.html"
$content = [System.IO.File]::ReadAllText($htmlFile, [System.Text.Encoding]::UTF8)
if ($content.Contains("樊")) {
    Write-Host "  ✓ 编码正确" -ForegroundColor Green
} else {
    Write-Host "  ⚠ 编码异常，尝试修复..." -ForegroundColor Yellow
    [System.IO.File]::WriteAllBytes($htmlFile, [System.IO.File]::ReadAllBytes($htmlFile))
    Write-Host "  ✓ 已修复" -ForegroundColor Green
}

# 更新二维码
Write-Host "`n📱 更新二维码..." -ForegroundColor Cyan
$qrScript = "$env:TEMP\qrcode-gen\gen.cjs"
if (Test-Path $qrScript) {
    node $qrScript "$ProjectPath\assets\qrcode.png" "https://fanleifanbufan.github.io"
    Write-Host "  ✓ 二维码已更新" -ForegroundColor Green
}

# 部署到 GitHub
Write-Host "`n🚀 部署中..." -ForegroundColor Cyan
Set-Location $ProjectPath
git config user.email "lei_179481361@qq.com" 2>$null
git config user.name "fanleifanbufan" 2>$null
git add -A
git commit -m "更新于 $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
git push "https://$($Token)@github.com/fanleifanbufan/$($RepoName).git" main 2>&1
Write-Host "  ✓ 推送成功！" -ForegroundColor Green

Write-Host "`n✅ 完成！网址：https://fanleifanbufan.github.io" -ForegroundColor Yellow
