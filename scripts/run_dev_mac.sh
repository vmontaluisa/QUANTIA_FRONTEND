#!/usr/bin/env bash
set -euo pipefail

TARGET_DIR="${1:-QUANTIA_FRONTEND}"

if [ ! -d "$TARGET_DIR/.git" ]; then
  echo "No existe $TARGET_DIR. Ejecuta primero install_build_mac.sh"
  exit 1
fi

cd "$TARGET_DIR"
echo "Actualizando repo..."
git pull

echo "Instalando dependencias..."
npm install --legacy-peer-deps

echo "Iniciando Vite..."
npm run dev -- --host
