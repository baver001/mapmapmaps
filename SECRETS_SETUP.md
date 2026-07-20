# Секреты MapMapMaps

Нужен один бесплатный **Mapillary Client Token** (dashboard → Developers → Client Token).

## Production (Cloudflare Pages)

```bash
npx wrangler pages secret put MAPILLARY_ACCESS_TOKEN --project-name=mapmapmaps
```

Вставьте токен (формат `MLY|…|…`). Проверка:

```bash
npx wrangler pages secret list --project-name=mapmapmaps
```

## Local (`npm run dev`)

Создайте `.dev.vars` в корне (файл в `.gitignore`):

```
MAPILLARY_ACCESS_TOKEN=MLY|your_client_id|your_token
```

Шаблон: `.dev.vars.example`.

## Seeds (360° pool)

```bash
npm run seeds
```

Пишет `data/seeds.json` (только spherical). Нужен тот же `MAPILLARY_ACCESS_TOKEN`.

## Важно

- Токен **не** коммитить в git и не вставлять в `script.js`.
- Random раунды идут из seeds; live Mapillary — только fallback.
- Viewer получает token через `?action=config` (ограничение Mapillary JS SDK).
- Платных API нет: Mapillary free + OSM tiles + Cloudflare Pages.
