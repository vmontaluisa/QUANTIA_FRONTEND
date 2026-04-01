@echo off
setlocal

set REPO_URL=https://github.com/vmontaluisa/QUANTIA_FRONTEND.git
set BRANCH_NAME=codex/quantia-frontend
set COMMIT_MSG=%~1
if "%COMMIT_MSG%"=="" set COMMIT_MSG=Update frontend

set SCRIPT_DIR=%~dp0
set ROOT_DIR=%SCRIPT_DIR%..\..
cd /d "%ROOT_DIR%"

where git >nul 2>nul
if errorlevel 1 (
  echo git no encontrado. Instala git y vuelve a ejecutar.
  exit /b 1
)

git remote get-url quantia_frontend >nul 2>nul
if errorlevel 1 (
  git remote add quantia_frontend %REPO_URL%
)

git diff --quiet -- FRONT_END
if not errorlevel 1 (
  goto split_push
)

git add FRONT_END
git commit -m "%COMMIT_MSG%"

:split_push
git show-ref --verify --quiet refs/heads/%BRANCH_NAME%
if not errorlevel 1 (
  git branch -D %BRANCH_NAME%
)

git subtree split -P FRONT_END -b %BRANCH_NAME%
git push quantia_frontend %BRANCH_NAME%:main

echo Push completado.
endlocal
