@echo off
setlocal

set TARGET_DIR=%~1
if "%TARGET_DIR%"=="" set TARGET_DIR=QUANTIA_FRONTEND

if not exist "%TARGET_DIR%\\.git" (
  echo No existe %TARGET_DIR%. Ejecuta primero install_build_windows.bat
  exit /b 1
)

cd /d "%TARGET_DIR%"
echo Actualizando repo...
git pull

echo Instalando dependencias...
npm install --force

echo Iniciando Vite...
npm run dev -- --host
endlocal
