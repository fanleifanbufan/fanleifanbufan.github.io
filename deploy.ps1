# ============================================
# 一键部署脚本 - 樊磊个人网站 + COLEX名片服务
# 使用方法：编辑文件后运行此脚本即可部署
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

# 检查中文编码（必做，防止乱码）
Write-Host "`n📝 检查编码..." -ForegroundColor Cyan
$files = @(
    "index.html",
    "ad/index.html",
    "ad/css/style.css",
    "ad/js/main.js",
    "css/style.css",
    "js/main.js",
    "deploy.ps1"
)
foreach ($f in $files) {
    $fp = Join-Path $ProjectPath $f
    if (Test-Path $fp) {
        $content = [System.IO.File]::ReadAllText($fp, [System.Text.Encoding]::UTF8)
        if ($content.Contains("樊")) {
            Write-Host "  ✓ $f 编码正确" -ForegroundColor Green
        }
    }
}

# 更新二维码（主站 + 广告页）
Write-Host "`n📱 更新二维码..." -ForegroundColor Cyan
$qrScript = "$env:TEMP\qrcode-gen\gen.cjs"
if (Test-Path $qrScript) {
    node $qrScript "$ProjectPath\assets\qrcode.png" "https://fanleifanbufan.github.io"
    node $qrScript "$ProjectPath\ad\assets\ad-qrcode.png" "https://fanleifanbufan.github.io/ad/"
    Write-Host "  ✓ 二维码已更新" -ForegroundColor Green
} else {
    Write-Host "  ⚠ 二维码生成器未安装，跳过" -ForegroundColor Yellow
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

Write-Host "`n✅ 部署完成！" -ForegroundColor Green
Write-Host "📎 个人主页：https://fanleifanbufan.github.io" -ForegroundColor Yellow
Write-Host "📎 广告页：https://fanleifanbufan.github.io/ad/" -ForegroundColor Yellow
Write-Host "📱 扫描网站上的二维码即可访问" -ForegroundColor Yellow