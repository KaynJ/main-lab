@echo off
chcp 65001 >nul
where node >nul 2>nul
if errorlevel 1 (
  echo 请先安装 Node.js 20 或更新版本，再打开此文件。
  pause
  exit /b 1
)
node "%~dp0launch.mjs"
if errorlevel 1 (
  echo 启动失败。请检查上面的错误信息。
)
echo.
echo 浏览器访问 http://127.0.0.1:4173/
pause
