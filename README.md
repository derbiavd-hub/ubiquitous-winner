# Твой Контентный Сочи — Лендинг

## Структура файлов

```
tvoy_kontentny_sochi/
├── index.html          ← главная страница
├── css/
│   └── style.css       ← все стили
├── js/
│   └── main.js         ← логика, форма, тема
├── images/             ← сюда добавляете ваши фото
│   ├── photographer.jpg     (фото автора в блоке "О фотографе")
│   ├── port-1.jpg           (Love Story)
│   ├── port-2.jpg           (Портрет)
│   ├── port-3.jpg           (Семья)
│   ├── port-4.jpg           (Беременность)
│   └── port-5.jpg           (Детская)
└── README.md
```

---

## Как добавить свои фотографии

### 1. Фото автора (блок "О фотографе")
В `css/style.css` найдите строки:
```css
/* Uncomment to add a real photo:
.about-image { background-image: url('../images/photographer.jpg'); ... }
.about-image-inner { display: none; }
*/
```
Уберите `/*` и `*/` — раскомментируйте.

### 2. Фото в портфолио
В `css/style.css` найдите:
```css
/* Add real photos like this:
.portfolio-item:nth-child(1) { background-image: url('../images/port-1.jpg'); ... }
*/
```
Уберите комментарий и добавьте все 5 фото.

---

## Где запускать бесплатно — GitHub Pages

### Шаг 1. Создайте аккаунт
- Зайдите на https://github.com
- Зарегистрируйтесь (бесплатно)

### Шаг 2. Создайте репозиторий
- Нажмите "New repository"
- Название: `tvoy-kontentny-sochi` (или любое)
- Выберите "Public"
- Нажмите "Create repository"

### Шаг 3. Загрузите файлы
- Нажмите "uploading an existing file"
- Перетащите ВСЮ папку (index.html, css/, js/, images/)
- Нажмите "Commit changes"

### Шаг 4. Включите GitHub Pages
- Зайдите в Settings → Pages
- Source: "Deploy from a branch"
- Branch: main / (root)
- Нажмите Save

### Шаг 5. Готово!
Через 2-3 минуты сайт доступен по адресу:
```
https://ваш-логин.github.io/tvoy-kontentny-sochi/
```

---

## Подключение формы к ВКонтакте

Когда настроите Python-сервер (Render.com), замените в `js/main.js`:
```javascript
const SERVER_URL = 'https://YOUR_SERVER.onrender.com/vk-notify';
// замените на ваш реальный URL, например:
const SERVER_URL = 'https://sochi-photo-bot.onrender.com/vk-notify';
```

---

## Что изменить под себя

| Что | Где |
|-----|-----|
| Ссылка ВКонтакте | index.html — ищите `vk.me/sochi_art_bot` |
| Цены на услуги | index.html — блок `services-grid` |
| Описание "О фотографе" | index.html — блок `about-text` |
| Статистика (500+ съёмок) | index.html — блок `stats` |
| Ссылки в футере | index.html — блок `footer-links` |
