#!/usr/bin/env bash
# Одноразовая настройка секрета на VPS (запуск на сервере от root или через sudo).
set -euo pipefail

ENV_DIR="/etc/mapmapmaps"
ENV_FILE="${ENV_DIR}/mapmapmaps.env"

if [[ "${1:-}" == "" ]]; then
  echo "Usage: sudo bash deploy/vps/setup-secret.sh 'MLY|client|token'"
  echo "   or: MAPILLARY_ACCESS_TOKEN='MLY|...' sudo -E bash deploy/vps/setup-secret.sh"
  exit 1
fi

TOKEN="${MAPILLARY_ACCESS_TOKEN:-$1}"

mkdir -p "${ENV_DIR}"
umask 077
cat > "${ENV_FILE}" <<EOF
MAPILLARY_ACCESS_TOKEN=${TOKEN}
HOST=127.0.0.1
PORT=8787
EOF
chmod 600 "${ENV_FILE}"
chown root:root "${ENV_FILE}"

echo "Wrote ${ENV_FILE} (mode 600)."
echo "Restart service: sudo systemctl restart mapmapmaps"
