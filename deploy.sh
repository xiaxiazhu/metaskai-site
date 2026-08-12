#!/usr/bin/env bash
set -euo pipefail

# Deploy this static site to the Ubuntu server.
# Usage:
#   ./deploy.sh
#   ./deploy.sh ubuntu@119.45.6.42 /var/www/html

REMOTE_HOST="${1:-ubuntu@111.231.4.97}"
REMOTE_DIR="${2:-/var/www/metaskai-site}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

FILES=(
  "index.html"
  "about.html"
  "styles.css"
  "script.js"
  "assets"
)

echo "Deploying to ${REMOTE_HOST}:${REMOTE_DIR}"

ssh "${REMOTE_HOST}" "mkdir -p '${REMOTE_DIR}'"

rsync -avz --delete \
  --exclude '.git/' \
  --exclude '.DS_Store' \
  --exclude '._*' \
  "${FILES[@]/#/${SCRIPT_DIR}/}" \
  "${REMOTE_HOST}:${REMOTE_DIR}/"

ssh "${REMOTE_HOST}" "
  if command -v nginx >/dev/null 2>&1; then
    sudo nginx -t && sudo systemctl reload nginx
  fi
"

echo "Deploy complete."
