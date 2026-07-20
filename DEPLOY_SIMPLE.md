# Простой деплой на VPS

**Идея:** один раз настроить GitHub Secrets → дальше только `git push` в `main`.  
Токен Mapillary кладётся в Secrets (client token, не payment) — на сервер он попадает автоматически.

## Один раз (≈5 минут)

### 1. VPS

- Ubuntu/Debian с **Node 20+** (`node -v`)
- SSH-пользователь с **sudo** (для systemd)
- **nginx** уже смотрит на сайт — оставь прокси на `127.0.0.1:8787` (пример: `deploy/vps/nginx-mapmapmaps.conf.example`)

### 2. Секреты в GitHub

Репозиторий → **Settings → Secrets and variables → Actions → New repository secret**

| Secret | Значение |
|--------|----------|
| `MAPILLARY_ACCESS_TOKEN` | `MLY\|…\|…` из Mapillary |
| `VPS_HOST` | IP или домен сервера |
| `VPS_USER` | SSH user |
| `VPS_SSH_KEY` | приватный ключ (полное содержимое `id_rsa`) |

Опционально: `VPS_PORT` (если не 22).

**Автозаливка из `.dev.vars` (локально):**

```bash
npm run setup:github-secrets
```

Нужны: файл `.dev.vars` с токеном и `deploy.config.json` (скопируй из `deploy.config.example.json`).

### 3. Push

```bash
git push origin main
```

Workflow **Deploy VPS** сам:

- клонирует `/var/www/mapmapmaps` (если пусто);
- `git pull`;
- пишет `/var/www/mapmapmaps/.env.local` с токеном;
- перезапускает `mapmapmaps` (systemd).

Проверка на сервере:  
`curl -s http://127.0.0.1:8787/api/mapillary?action=stats`

## Локально

```bash
cp .dev.vars.example .dev.vars   # токен
npm start                        # http://127.0.0.1:8787
```

## Смена токена

Обнови secret `MAPILLARY_ACCESS_TOKEN` в GitHub → **Run workflow** «Deploy VPS» или любой push в `main`.

## Подробности

- nginx / TLS: `deploy/vps/nginx-mapmapmaps.conf.example`
- старый ручной вариант: `deploy/vps/setup-secret.sh` (не нужен при CI)
