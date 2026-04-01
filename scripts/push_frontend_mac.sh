#!/usr/bin/env bash
set -euo pipefail

REPO_URL="https://github.com/vmontaluisa/QUANTIA_FRONTEND.git"
BRANCH_NAME="codex/quantia-frontend"
COMMIT_MSG="${1:-Update frontend}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"

cd "$ROOT_DIR"

if ! command -v git >/dev/null 2>&1; then
  echo "git no encontrado. Instala git y vuelve a ejecutar."
  exit 1
fi

if ! git remote get-url quantia_frontend >/dev/null 2>&1; then
  git remote add quantia_frontend "$REPO_URL"
fi

# Commit solo si hay cambios en FRONT_END
if ! git diff --quiet -- FRONT_END; then
  git add FRONT_END
  git commit -m "$COMMIT_MSG"
fi

if git show-ref --verify --quiet "refs/heads/$BRANCH_NAME"; then
  git branch -D "$BRANCH_NAME"
fi

git subtree split -P FRONT_END -b "$BRANCH_NAME"
git push quantia_frontend "$BRANCH_NAME":main

echo "Push completado."
