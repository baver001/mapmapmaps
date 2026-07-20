# MapMapMaps

Игра на угадывание местоположения по случайным панорамам улиц с использованием Mapillary API.

## 🚀 Деплой на Cloudflare Pages

### Вариант 1: Через веб-интерфейс Cloudflare

1. Зайдите на [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Перейдите в раздел **Pages**
3. Нажмите **Create a project**
4. Выберите **Upload assets**
5. Загрузите все файлы проекта:
   - `index.html`
   - `script.js`
   - `css/` (папка со стилями)
   - `image/` (папка с изображениями)
   - `style.scss` (исходный файл, опционально)
6. Нажмите **Deploy site**
7. После деплоя настройте кастомный домен (если нужно)

### Вариант 2: Через Git репозиторий

1. Создайте Git репозиторий (GitHub, GitLab, Bitbucket)
2. Загрузите код в репозиторий
3. В Cloudflare Dashboard → Pages → **Create a project**
4. Выберите **Connect to Git**
5. Подключите ваш репозиторий
6. Настройки сборки:
   - **Build command**: (оставьте пустым, проект статический)
   - **Build output directory**: `/` (корень проекта)
7. Нажмите **Save and Deploy**

### Вариант 3: Через Wrangler CLI

1. Установите Wrangler CLI:
   ```bash
   npm install -g wrangler
   ```

2. Авторизуйтесь:
   ```bash
   wrangler login
   ```

3. Деплой:
   ```bash
   wrangler pages deploy .
   ```

## 📁 Структура проекта

```
mapmapmaps.com/
├── index.html          # Главная страница
├── script.js           # Основная логика приложения
├── style.scss          # Исходные стили SCSS
├── css/
│   └── style.css       # Скомпилированные стили
├── image/              # Изображения и ресурсы
├── _redirects          # Правила редиректов для Cloudflare
└── wrangler.toml       # Конфигурация Wrangler
```

## ⚙️ Настройки

### Переменные окружения (если нужно)

Если вы хотите использовать переменные окружения для токена Mapillary:

1. В Cloudflare Pages → Settings → Environment Variables
2. Добавьте переменную `MAPILLARY_ACCESS_TOKEN`
3. Обновите `script.js` для использования переменной (требует сборки)

### Кастомный домен

1. В Cloudflare Pages → Custom domains
2. Добавьте ваш домен (например, `mapmapmaps.com`)
3. Следуйте инструкциям по настройке DNS

## 🔧 Требования

- Статический хостинг (Cloudflare Pages)
- Доступ к Mapillary API (токен уже включен в код)
- Современный браузер с поддержкой ES6+

## 📝 Примечания

- Проект полностью статический, не требует сборки
- Все пути в коде настроены для работы на Cloudflare Pages
- Файл `_redirects` обеспечивает правильную работу SPA

