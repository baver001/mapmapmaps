# Секреты MapMapMaps

## Production (VPS) — автоматически

Токен хранится в **GitHub Actions Secrets** (`MAPILLARY_ACCESS_TOKEN`).  
При каждом деплое CI записывает его в `/var/www/mapmapmaps/.env.local` на сервере.

**Настройка один раз:** см. **`DEPLOY_SIMPLE.md`** или:

```bash
cp deploy.config.example.json deploy.config.json   # VPS host, user, путь к SSH key
cp .dev.vars.example .dev.vars                     # Mapillary token
npm run setup:github-secrets
git push origin main
```

Дальше только push — руками на VPS ничего не нужно.

## Local

`.dev.vars` в корне (не в git):

```
MAPILLARY_ACCESS_TOKEN=MLY|your_client_id|your_token
```

```bash
npm start          # VPS-like server
npm run dev        # Wrangler (опционально)
```

## Seeds

```bash
npm run seeds
```

Токен берётся из `.dev.vars` или окружения.

## Важно

- Не коммитить `.dev.vars` / `deploy.config.json`.
- Client token Mapillary всё равно отдаётся браузеру через `?action=config` (SDK).
- Подробный VPS-гайд: `DEPLOY_VPS.md` (nginx, troubleshooting).
