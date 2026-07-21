#!/usr/bin/env bash
set -euo pipefail
APP_DIR="${APP_DIR:-/var/www/mapmapmaps}"
BRANCH="${BRANCH:-main}"
CONF=/etc/mapmapmaps/deploy.conf
RUN_USER=root
if [[ -f "${CONF}" ]]; then
  # shellcheck disable=SC1090
  source "${CONF}"
fi

cd "${APP_DIR}"
sudo -u "${RUN_USER}" git fetch origin "${BRANCH}" 2>/dev/null || exit 0
LOCAL=$(sudo -u "${RUN_USER}" git rev-parse HEAD)
REMOTE=$(sudo -u "${RUN_USER}" git rev-parse "origin/${BRANCH}")
if [[ "${LOCAL}" != "${REMOTE}" ]]; then
  sudo -u "${RUN_USER}" git reset --hard "origin/${BRANCH}"
  systemctl restart mapmapmaps
  logger -t mapmapmaps-autopull "Deployed ${REMOTE:0:8}"
fi
