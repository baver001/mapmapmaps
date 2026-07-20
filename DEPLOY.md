# 🚀 Быстрый деплой на Cloudflare Pages

## Способ 1: Через веб-интерфейс (самый простой)

1. **Подготовка файлов**
   - Убедитесь, что все файлы проекта готовы к загрузке

2. **Вход в Cloudflare**
   - Откройте https://dash.cloudflare.com/
   - Войдите в свой аккаунт

3. **Создание проекта**
   - Перейдите в раздел **Workers & Pages**
   - Выберите **Pages** → **Create a project**
   - Нажмите **Upload assets**

4. **Загрузка файлов**
   - Перетащите все файлы и папки проекта в окно загрузки:
     - `index.html`
     - `script.js`
     - `css/` (вся папка)
     - `image/` (вся папка)
     - `style.scss` (опционально)
   - Нажмите **Deploy site**

5. **Готово!**
   - После деплоя вы получите URL вида: `https://your-project.pages.dev`
   - Сайт будет доступен сразу

## Способ 2: Через Git (рекомендуется для обновлений)

1. **Создайте Git репозиторий**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <ваш-репозиторий-url>
   git push -u origin main
   ```

2. **Подключите к Cloudflare Pages**
   - В Cloudflare Dashboard → Pages → **Create a project**
   - Выберите **Connect to Git**
   - Авторизуйтесь и выберите ваш репозиторий
   - Настройки сборки:
     - **Framework preset**: None
     - **Build command**: (оставьте пустым)
     - **Build output directory**: `/`
   - Нажмите **Save and Deploy**

3. **Автоматические деплои**
   - Теперь каждый push в main ветку будет автоматически деплоиться

## Способ 3: Через Wrangler CLI

1. **Установите Wrangler**
   ```bash
   npm install -g wrangler
   ```

2. **Авторизуйтесь**
   ```bash
   wrangler login
   ```

3. **Деплой**
   ```bash
   wrangler pages deploy .
   ```

   Или используйте npm скрипт:
   ```bash
   npm install
   npm run deploy
   ```

## ⚙️ Настройка кастомного домена

1. В Cloudflare Pages → ваш проект → **Custom domains**
2. Нажмите **Set up a custom domain**
3. Введите ваш домен (например, `mapmapmaps.com`)
4. Следуйте инструкциям по настройке DNS записей
5. Cloudflare автоматически настроит SSL сертификат

## 📋 Чеклист перед деплоем

- [ ] Все файлы на месте (index.html, script.js, css/, image/)
- [ ] Пути к ресурсам правильные
- [ ] Токен Mapillary API работает
- [ ] Протестировано локально

## 🔍 Проверка после деплоя

1. Откройте ваш сайт
2. Проверьте загрузку панорамы
3. Проверьте работу всех функций:
   - Поиск местоположения
   - Замена панорамы
   - Открытие карты
4. Проверьте консоль браузера на ошибки (F12)

## 🐛 Решение проблем

**Проблема**: Ресурсы не загружаются (404)
- **Решение**: Убедитесь, что пути правильные. Используйте относительные пути `./` или абсолютные `/`

**Проблема**: CORS ошибки
- **Решение**: Cloudflare Pages автоматически обрабатывает CORS. Проверьте настройки API (Mapillary, Nominatim)

**Проблема**: Сайт не обновляется
- **Решение**: Очистите кеш Cloudflare или подождите несколько минут

## 📞 Поддержка

- Документация Cloudflare Pages: https://developers.cloudflare.com/pages/
- Документация Wrangler: https://developers.cloudflare.com/workers/wrangler/

