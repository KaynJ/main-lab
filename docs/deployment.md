# 用 GitHub Pages 发布本命实验室

项目是无构建步骤的静态网页，入口为 `web/index.html`。仓库中的 `.github/workflows/pages.yml` 会先运行测试，再将 `web/` 发布到 GitHub Pages。无需购买服务器、安装 GitHub Desktop 或设置额外密钥。

## 首次上线

1. 打开 [仓库的 Pages 设置](https://github.com/KaynJ/main-lab/settings/pages)。在 **Build and deployment → Source** 中选择 **GitHub Actions**。无需另外选择模板或创建第二份工作流。
2. 在项目的 PowerShell 窗口依次执行以下命令，上传本次部署配置：

```powershell
Set-Location -LiteralPath 'E:\CODEX项目——外置大脑\游戏心理定位'
git add .github/workflows/pages.yml README.md docs/deployment.md docs/product.md
git commit -m "配置 GitHub Pages 自动部署"
git push
```

3. 打开 [Actions 页面](https://github.com/KaynJ/main-lab/actions)，查看 **Deploy Main Lab to GitHub Pages**。全部步骤成功后，会在运行详情中显示部署网址；等待期间不必重复上传。
4. 使用 GitHub 显示的网址访问页面。按默认项目站点规则，预计是 **https://kaynj.github.io/main-lab/**；最终以 Pages 设置或工作流输出的网址为准。

完成上述步骤前，这个预计网址可能返回 404。创建部署配置不代表已经发布成功。

## 以后更新

在本地修改并验证后执行：

```powershell
git add .
git commit -m "说明本次修改"
git push
```

推送到 `main` 会自动测试、重新部署。测试失败时工作流停止，先修复问题再提交。修改提交说明为本次实际内容；没有新改动时无需重复提交。若只想重试部署，可在 Actions 中打开此工作流，选择 **Run workflow**，分支选 `main`。

## 上线后检查

- 首页标题、用户头像和六款游戏背景正常显示。
- 完成 12 题后生成报告，峡谷与海克斯两部分可用。
- 乌迪尔能展示觉醒 R 与物理 Q 两条路线，图片与国内学习入口正常。
- Markdown 报告能下载；手机上没有横向滚动。

网页使用相对路径，适用于 `/main-lab/` 子目录。发布的是 `web/` 内的文件，本地启动器、日志和 Node 静态服务器不参与线上运行。问卷仍在浏览器本地计算，答案不会因启用 Pages 而上传。

## 常见问题

- **找不到 Pages**：使用有仓库管理权限的账号；本项目创建时选择的是公开仓库。
- **Configure GitHub Pages 步骤报错**：先确认 Source 已选择 GitHub Actions，再到 Actions 重新运行。
- **工作流失败**：打开红色运行记录，查看第一个失败步骤的日志。
- **页面显示 README，或网址带 `/web/`**：检查工作流的上传目录是否为 `web`，并使用 Pages 给出的网址。
- **刚部署完成仍看到旧内容**：先确认最新提交对应的运行成功，再刷新页面。

依据：[GitHub Pages 自定义工作流](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)、[配置发布来源](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)。
