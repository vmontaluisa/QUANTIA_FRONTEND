#!/usr/bin/env bash
set -euo pipefail


echo "Actualizando repo..."
git pull


echo "Iniciando Vite..."
npm run dev -- --host || echo "Fallo npm run dev."
