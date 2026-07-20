# ⚡ Быстрый деплой через Wrangler

## Шаг 1: Установка Wrangler

```bash
npm install -g wrangler
```

Или локально:
```bash
npm install
```

## Шаг 2: Авторизация

```bash
wrangler login
```

## Шаг 3: Деплой

```bash
npm run deploy
```

Или напрямую:
```bash
wrangler pages deploy . --project-name=mapmapmaps
```

## ✅ Готово!

После деплоя проект будет доступен по адресу:
`https://mapmapmaps.pages.dev`

---

**Примечание:** Если проект еще не создан в Cloudflare Pages, Wrangler создаст его автоматически при первом деплое.

