@echo off
setlocal

set REPO_URL=https://github.com/vmontaluisa/QUANTIA_FRONTEND.git
set TARGET_DIR=%~1
if "%TARGET_DIR%"=="" set TARGET_DIR=QUANTIA_FRONTEND

where git >nul 2>nul
if errorlevel 1 (
  echo git no encontrado. Instala git y vuelve a ejecutar.
  exit /b 1
)
where node >nul 2>nul
if errorlevel 1 (
  echo node no encontrado. Instala Node.js y vuelve a ejecutar.
  exit /b 1
)
where npm >nul 2>nul
if errorlevel 1 (
  echo npm no encontrado. Instala Node.js y vuelve a ejecutar.
  exit /b 1
)

if not exist "%TARGET_DIR%\\.git" (
  echo Clonando repo en %TARGET_DIR%...
  git clone "%REPO_URL%" "%TARGET_DIR%"
)

cd /d "%TARGET_DIR%"
echo Actualizando repo...
git pull

echo Instalando dependencias...
npm install --force


echo Compilando (Vite build)...
npm run build

echo Listo.
endlocal
