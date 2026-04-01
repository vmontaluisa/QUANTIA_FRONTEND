#!/usr/bin/env bash
set -euo pipefail

REPO_URL="https://github.com/vmontaluisa/QUANTIA_FRONTEND.git"
TARGET_DIR="${1:-QUANTIA_FRONTEND}"

if ! command -v git >/dev/null 2>&1; then
  echo "git no encontrado. Instala git y vuelve a ejecutar."
  exit 1
fi
if ! command -v node >/dev/null 2>&1; then
  echo "node no encontrado. Instala Node.js y vuelve a ejecutar."
  exit 1
fi
if ! command -v npm >/dev/null 2>&1; then
  echo "npm no encontrado. Instala Node.js y vuelve a ejecutar."
  exit 1
fi

if [ ! -d "$TARGET_DIR/.git" ]; then
  echo "Clonando repo en $TARGET_DIR..."
  git clone "$REPO_URL" "$TARGET_DIR"
fi

cd "$TARGET_DIR"
echo "Actualizando repo..."
git pull

echo "Instalando dependencias..."
npm install

echo "Compilando (Vite build)..."
npm run build

echo "Listo."
