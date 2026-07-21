# Деплой MapMapMaps

Два способа. **Проще без GitHub Secrets — autopull на VPS** (рекомендуем, если сайт уже на сервере).

---

## A. Autopull на VPS (рекомендуется)

Сервер каждые **2 минуты** смотрит `main` на GitHub; при новом коммите — `git pull` + restart.  
**GitHub Actions и SSH-ключи не нужны.** Репозиторий публичный — для `git fetch` токен не требуется.

### Один раз на VPS (под root или через sudo)

```bash
cd /var/www/mapmapmaps 2>/dev/null || true
# если репо ещё нет — скрипт сам клонирует

export MAPILLARY_ACCESS_TOKEN='MLY|YOUR_CLIENT|YOUR_TOKEN'
sudo -E bash -c "$(curl -fsSL https://raw.githubusercontent.com/baver001/mapmapmaps/main/deploy/vps/install-autopull.sh)"
```

Или если репо уже есть локально:

```bash
export MAPILLARY_ACCESS_TOKEN='MLY|…'
sudo -E bash deploy/vps/install-autopull.sh
```

Проверка:

```bash
systemctl status mapmapmaps mapmapmaps-autopull.timer
curl -s http://127.0.0.1:8787/api/mapillary?action=stats
```

Дальше: **`git push origin main`** → через ≤2 мин на сайте новая версия.

Файлы: `deploy/vps/autopull.sh`, `mapmapmaps-autopull.timer`, `install-autopull.sh`.

---

## B. GitHub Actions → SSH (опционально)

Мгновенный деплой на push, но нужны secrets:

| Secret | |
|--------|--|
| `VPS_HOST` | IP/хост |
| `VPS_USER` | SSH user |
| `VPS_SSH_KEY` | приватный ключ |
| `MAPILLARY_ACCESS_TOKEN` | Mapillary |

Локально:

```bash
cp deploy.config.example.json deploy.config.json
npm run setup:github-secrets
```

Workflow **Deploy VPS** — только **Run workflow** в Actions (нужны `VPS_HOST`, `VPS_USER`, `VPS_SSH_KEY`).  
Для обычного цикла используй **autopull** (раздел A).

---

## Локальная разработка

```bash
cp .dev.vars.example .dev.vars
npm start    # :8787
npm run dev  # Wrangler (опционально)
```

nginx example: `deploy/vps/nginx-mapmapmaps.conf.example`
