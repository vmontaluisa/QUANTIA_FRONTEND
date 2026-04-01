@echo off
setlocal

echo Actualizando repo...
git pull


echo Iniciando Vite...
call npm run dev -- --host
if errorlevel 1 (
  echo Fallo npm run dev.
)
endlocal
