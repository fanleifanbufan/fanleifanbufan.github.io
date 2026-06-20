# 樊磊 · 个人网站项目

## 📁 项目结构

```
个人主页/
├── index.html              # 个人简历主页（暗色高级感）
├── css/style.css           # 主站样式
├── js/main.js              # 主站交互
├── assets/
│   ├── portrait.jpg        # 个人照片
│   └── qrcode.png          # 主站二维码
│
├── ad/
│   ├── index.html           # COLEX 名片服务推广页（极简风）
│   ├── css/style.css        # 广告页样式
│   ├── js/main.js           # 广告页交互
│   └── assets/
│       ├── hero-bg.mp4      # 视频背景（电脑端）
│       ├── ad-qrcode.png    # 广告页二维码
│       └── (qrcode.png)     # 引用主站二维码
│
├── deploy.ps1              # 🚀 一键部署脚本
├── PROJECT_README.md       # 本文件
└── .nojekyll               # GitHub Pages 配置
```

## 🌐 访问地址

| 站点 | 地址 |
|------|------|
| 个人主页 | https://fanleifanbufan.github.io |
| COLEX 广告页 | https://fanleifanbufan.github.io/ad/ |

## ⚙️ 部署方法

### 方式一：自动部署（推荐）
1. 双击运行 `deploy.ps1`
2. 输入 GitHub Token（第一次）
3. 自动检查编码 → 更新二维码 → 推送到 GitHub

### 方式二：手动部署
1. 修改文件（注意保存为 UTF-8 编码）
2. 在项目目录打开 Git Bash
3. 执行：
   ```
   git add -A
   git commit -m "更新说明"
   git push
   ```

## ⚠️ 重要注意事项

1. **编码问题**：编辑 HTML 文件后必须保持 UTF-8 编码，否则中文会乱码
   - 推荐使用 Node.js 写入文件：`fs.writeFileSync(path, content, "utf8")`
   - 或在 PowerShell 中：`[System.IO.File]::WriteAllText(path, content, [System.Text.Encoding]::UTF8)`
   - 不要使用 `Get-Content` + `Set-Content` 组合（会破坏中文编码）

2. **GitHub Token**：
   - 需要创建「经典 Token」（不是细粒度 PAT）
   - 勾选 `repo`（仓库权限）和 `admin:repo_hook`
   - Token 以 `ghp_` 开头

3. **GitHub Pages**：
   - 主站：已配置好，推送到 main 分支即可自动部署
   - 等待 1-2 分钟部署生效

## 📝 版本记录

- 2026-06-19：初版搭建，个人简历主站上线
- 2026-06-20：新增 COLEX 广告推广页
  - 三档定价套餐（199/399/699）
  - 视频背景 + 手机端 CSS 浮动光晕
  - 完整响应式布局
  - FAQ 折叠问答