#!/usr/bin/env bash
# Run ON the VPS once (or via SSH one-liner). Public repo → no GitHub token for pull.
# Usage:
#   curl -fsSL .../install-autopull.sh | sudo MAPILLARY_ACCESS_TOKEN='MLY|…' bash
#   or: sudo MAPILLARY_ACCESS_TOKEN='…' bash deploy/vps/install-autopull.sh
set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/mapmapmaps}"
REPO_URL="${REPO_URL:-https://github.com/baver001/mapmapmaps.git}"
BRANCH="${BRANCH:-main}"
RUN_USER="${SUDO_USER:-${USER}}"

if [[ "${EUID}" -ne 0 ]]; then
  echo "Run with sudo"
  exit 1
fi

if [[ -z "${MAPILLARY_ACCESS_TOKEN:-}" ]]; then
  echo "Set MAPILLARY_ACCESS_TOKEN env var"
  exit 1
fi

echo "RUN_USER=${RUN_USER}" > /etc/mapmapmaps/deploy.conf
chmod 644 /etc/mapmapmaps/deploy.conf

if ! command -v node >/dev/null 2>&1; then
  echo "Install Node.js 20+ first"
  exit 1
fi

if [[ ! -d "${APP_DIR}/.git" ]]; then
  mkdir -p "${APP_DIR}"
  git clone "${REPO_URL}" "${APP_DIR}"
  chown -R "${RUN_USER}:${RUN_USER}" "${APP_DIR}"
fi

install -d -m 700 /etc/mapmapmaps
cat > /etc/mapmapmaps/mapmapmaps.env <<EOF
MAPILLARY_ACCESS_TOKEN=${MAPILLARY_ACCESS_TOKEN}
HOST=127.0.0.1
PORT=8787
EOF
chmod 600 /etc/mapmapmaps/mapmapmaps.env

# Keep app copy in sync for manual runs; systemd uses /etc/mapmapmaps for token
tee "${APP_DIR}/.env.local" >/dev/null <<EOF
MAPILLARY_ACCESS_TOKEN=${MAPILLARY_ACCESS_TOKEN}
HOST=127.0.0.1
PORT=8787
EOF
chmod 600 "${APP_DIR}/.env.local"
chown "${RUN_USER}:${RUN_USER}" "${APP_DIR}/.env.local"

cd "${APP_DIR}"
sudo -u "${RUN_USER}" git fetch origin "${BRANCH}"
sudo -u "${RUN_USER}" git reset --hard "origin/${BRANCH}"

cp "${APP_DIR}/deploy/vps/mapmapmaps.service" /etc/systemd/system/mapmapmaps.service
cp "${APP_DIR}/deploy/vps/mapmapmaps-autopull.service" /etc/systemd/system/mapmapmaps-autopull.service
cp "${APP_DIR}/deploy/vps/mapmapmaps-autopull.timer" /etc/systemd/system/mapmapmaps-autopull.timer

systemctl daemon-reload
systemctl enable --now mapmapmaps
systemctl enable --now mapmapmaps-autopull.timer

echo ""
echo "OK: mapmapmaps + autopull timer (every 2 min)"
echo "Check: systemctl status mapmapmaps mapmapmaps-autopull.timer"
echo "Test:  curl -s http://127.0.0.1:8787/api/mapillary?action=stats"
