#!/usr/bin/env bash
# Runs ON the VPS (from GitHub Actions over SSH). Idempotent.
set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/mapmapmaps}"
REPO_URL="${REPO_URL:-https://github.com/baver001/mapmapmaps.git}"
BRANCH="${BRANCH:-main}"

if [[ -z "${MAPILLARY_ACCESS_TOKEN:-}" ]]; then
  echo "MAPILLARY_ACCESS_TOKEN is empty"
  exit 1
fi

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js not found. Install Node 20+ on the VPS first."
  exit 1
fi

if [[ ! -d "${APP_DIR}/.git" ]]; then
  sudo mkdir -p "${APP_DIR}"
  sudo git clone "${REPO_URL}" "${APP_DIR}"
  sudo chown -R "${USER}:${USER}" "${APP_DIR}"
fi

cd "${APP_DIR}"
git fetch origin "${BRANCH}"
git reset --hard "origin/${BRANCH}"

sudo tee "${APP_DIR}/.env.local" >/dev/null <<EOF
MAPILLARY_ACCESS_TOKEN=${MAPILLARY_ACCESS_TOKEN}
HOST=127.0.0.1
PORT=8787
EOF
sudo chmod 600 "${APP_DIR}/.env.local"

sudo cp "${APP_DIR}/deploy/vps/mapmapmaps.service" /etc/systemd/system/mapmapmaps.service
sudo systemctl daemon-reload
sudo systemctl enable mapmapmaps
sudo systemctl restart mapmapmaps
sudo systemctl is-active --quiet mapmapmaps

echo "Deploy OK — mapmapmaps active ($(node -v))"
