# 🚀 Деплой через Wrangler CLI

## Быстрый старт

### 1. Установка Wrangler

```bash
npm install -g wrangler
```

Или локально в проект:
```bash
npm install
```

### 2. Авторизация в Cloudflare

```bash
wrangler login
```

Это откроет браузер для авторизации через Cloudflare.

### 3. Деплой проекта

```bash
npm run deploy
```

Или напрямую:
```bash
wrangler pages deploy . --project-name=mapmapmaps
```

## Команды

### Основной деплой (production)
```bash
npm run deploy
```

### Превью деплой
```bash
npm run deploy:preview
```

### Локальная разработка
```bash
npm run dev
```

## Настройка проекта

Проект уже настроен в `wrangler.toml`:
- **Название проекта**: `mapmapmaps`
- **Output directory**: `.` (корень проекта)
- **Compatibility date**: `2024-01-01`

## Переменные окружения (опционально)

Если нужно использовать переменные окружения для токена Mapillary:

1. Создайте файл `.dev.vars` (для локальной разработки):
```
MAPILLARY_ACCESS_TOKEN=MLY|your_client_id|your_token
```

2. Для production добавьте переменные в Cloudflare Dashboard:
   - Pages → ваш проект → Settings → Environment Variables
   - Добавьте `MAPILLARY_ACCESS_TOKEN`

3. Обновите `script.js` для использования переменной (если нужно)

## Проверка деплоя

После деплоя вы получите URL вида:
- Production: `https://mapmapmaps.pages.dev`
- Preview: `https://<hash>.mapmapmaps.pages.dev`

## Настройка кастомного домена

1. В Cloudflare Dashboard → Pages → `mapmapmaps`
2. Перейдите в **Custom domains**
3. Нажмите **Set up a custom domain**
4. Введите `mapmapmaps.com`
5. Следуйте инструкциям по настройке DNS

## Troubleshooting

**Ошибка авторизации:**
```bash
wrangler logout
wrangler login
```

**Ошибка деплоя:**
- Убедитесь, что вы авторизованы: `wrangler whoami`
- Проверьте права доступа к аккаунту Cloudflare
- Убедитесь, что проект `mapmapmaps` существует в Cloudflare Pages

**Проверка статуса:**
```bash
wrangler pages project list
```

