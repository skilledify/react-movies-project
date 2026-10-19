<div align="center">

# 🎬 React Movies

**Современный каталог фильмов и сериалов на React 19 + Vite**

[![React](https://img.shields.io/badge/React-19.0-61dafb?logo=react&logoColor=black&style=for-the-badge)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6.4-646cff?logo=vite&logoColor=white&style=for-the-badge)](https://vite.dev)
[![Materialize](https://img.shields.io/badge/Materialize-1.0-ee6e73?logo=materialize&logoColor=white&style=for-the-badge)](https://materializecss.com)
[![Router](https://img.shields.io/badge/React_Router-7.6-CA4245?logo=reactrouter&logoColor=white&style=for-the-badge)](https://reactrouter.com)
[![License](https://img.shields.io/badge/License-MIT-e94560?style=for-the-badge)](LICENSE)

[🌐 Live Demo](https://skilledify.github.io/react-movies-project) · [🐛 Issues](https://github.com/skilledify/react-movies-project/issues) · [⭐ Star](https://github.com/skilledify/react-movies-project/stargazers)

</div>

---

## 📖 О проекте

**React Movies** — это SPA-приложение для поиска фильмов, сериалов и игр по базе [OMDb API](https://www.omdbapi.com). Интерфейс полностью русифицирован, адаптивен и поддерживает переключение между тёмной и светлой темами.

Проект создан на **React 19** с использованием **Vite** в качестве сборщика и **Materialize CSS** как UI-библиотеки. Тема оформления реализована на чистом CSS с помощью дизайн-токенов (CSS custom properties) — без сторонних UI-китов и CSS-in-JS.

| 🌙 Тёмная тема | ☀️ Светлая тема |
|:---:|:---:|
| Тема по умолчанию | Переключается в один клик |

---

## ✨ Возможности

### 🔍 Поиск и фильтры

- **Живой поиск** с задержкой ввода (debounce 600 мс) — запрос уходит только после паузы в наборе
- **Валидация ввода** — поиск принимает только латинские буквы, цифры и базовую пунктуацию; при вводе кириллицы показывается подсказка, а запрос блокируется
- **Фильтр по типу** — фильмы, сериалы, игры или все тайтлы сразу
- **Фильтр по году** — выпадающий список за последние 60 лет
- **Понятные сообщения** об ошибках ввода под полем поиска

### 🎨 Темы и интерфейс

- **Две темы оформления** — тёмная и светлая, переключение в один клик из шапки
- **Умная инициализация** — тема определяется по системным настройкам пользователя (`prefers-color-scheme`), а выбор сохраняется в `localStorage`
- **Плавные переходы** — анимация смены цветов при переключении темы
- **Адаптивность** — от мобильных экранов до широких мониторов, включая боковое выдвижное меню с кнопкой закрытия
- **Хлебные крошки** на странице фильма и в разделе «Избранное»

### ❤️ Избранное

- **Добавление в один клик** — сердечко прямо на карточке фильма
- **Сохранение в `localStorage`** — избранное не теряется между сессиями
- **Счётчик в шапке** — бейдж с количеством сохранённых тайтлов
- **Очистка списка** — одной кнопкой с подтверждением в виде toast-уведомления
- **Toast-уведомления** при добавлении, удалении и очистке

### 📄 Страница фильма

- **Полная информация** — режиссёр, актёры, сценарий, страна, язык, рейтинг, награды, кассовые сборы
- **Рейтинг IMDb** в виде цветного круга: зелёный (7.5+), жёлтый (5+), красный (ниже 5)
- **Похожие тайтлы** — автоматический подбор по названию
- **Хлебные крошки** с навигацией

### 🧭 Навигация

- **Липкая шапка** с размытием фона при скролле
- **Случайный фильм** — одна кнопка открывает случайный тайтл из подборки
- **Плавная прокрутка** вверх при смене страницы
- **Чистые URL** — используется `BrowserRouter` без `#`, с поддержкой GitHub Pages

### 🛠 Технические детали

- **Код-сплиттинг** — React, React Router и Materialize вынесены в отдельные чанки
- **SPA-fallback** — автогенерация `404.html` и `_redirects` для корректной работы прямых ссылок
- **Скелетоны** — плавные заглушки вместо спиннера при загрузке
- **Обработка ошибок** — понятные сообщения вместо «что-то пошло не так»

---

## 🛠 Технологии

| Технология | Версия | Назначение |
|:---|:---:|:---|
| **React** | 19.0 | UI-библиотека и рендеринг |
| **React Router DOM** | 7.6 | Клиентская маршрутизация |
| **Materialize CSS** | 1.0 | Компонентная библиотека и каркас |
| **Vite** | 6.4 | Dev-сервер и сборка |
| **@vitejs/plugin-react** | 4.4 | Трансформация JSX и Fast Refresh |
| **gh-pages** | 6.3 | Публикация на GitHub Pages |

---


## 🚀 Быстрый старт

### Предварительные требования

- **Node.js** версии 18.0 или новее ([скачать](https://nodejs.org/))
- **npm** (поставляется вместе с Node.js)

### Установка

```bash
git clone https://github.com/skilledify/react-movies-project.git
cd react-movies-project
npm install
```

### Настройка API-ключа

Проект использует [OMDb API](https://www.omdbapi.com/apikey.aspx). Получите бесплатный ключ и создайте файл `.env` в корне проекта:

```bash
cp .env.example .env
```

Откройте `.env` и подставьте свой ключ:

```env
VITE_OMDB_API_KEY=your_api_key_here
```

> **Важно:** префикс `VITE_` обязателен — переменные без него не попадают в клиентскую сборку.

### Запуск в режиме разработки

```bash
npm run dev
```

Приложение откроется по адресу [http://localhost:5173/react-movies-project/](http://localhost:5173/react-movies-project/) с горячей перезагрузкой (HMR).

### Сборка для продакшена

```bash
npm run build
```

Готовые файлы появятся в каталоге `dist/`. Сборка автоматически:

- разносит зависимости по отдельным чанкам (`react`, `materialize`, `index`)
- минифицирует JS и CSS
- генерирует `404.html` для SPA-fallback на GitHub Pages
- копирует `_redirects` для Netlify и аналогичных хостингов

### Локальный просмотр продакшен-сборки

```bash
npm run preview
```

Проверить собранную версию можно на [http://localhost:4173/react-movies-project/](http://localhost:4173/react-movies-project/).

---

## 📜 Доступные скрипты

| Команда | Описание |
|:---|:---|
| `npm run dev` | Запускает dev-сервер Vite с горячей перезагрузкой |
| `npm run build` | Собирает оптимизированный продакшен-бандл в `dist/` |
| `npm run preview` | Локально запускает собранную версию |
| `npm run predeploy` | Автоматическая сборка перед деплоем |
| `npm run deploy` | Публикация `dist/` на GitHub Pages |

---

## 📁 Структура проекта

```
react-movies-project/
├── public/
│   ├── _redirects          # SPA-fallback для Netlify
│   ├── favicon.ico         # Иконка сайта
│   ├── logo192.png         # Иконка для Apple Touch
│   └── robots.txt          # Правила индексации
│
├── src/
│   ├── api/
│   │   └── omdb.js         # HTTP-клиент OMDb API
│   ├── components/
│   │   ├── Footer.jsx      # Подвал сайта
│   │   ├── MovieCard.jsx   # Карточка фильма
│   │   ├── Movies.jsx      # Сетка карточек
│   │   ├── Navbar.jsx      # Шапка, меню, переключатель темы

## 🎓 Архитектура и подходы

### Дизайн-токены вместо «магических» цветов

Все цвета, тени и градиенты вынесены в CSS-переменные в `:root` и `html[data-theme='light']`. Переключение темы меняет **только** атрибут `data-theme` на `<html>` — остальные правила CSS не дублируются.

```css
:root,
html[data-theme='dark'] {
	--bg: #0d1117;
	--surface: #1c2333;
	--text: #e6edf3;
	--accent: #e94560;
}
```

### Управление состоянием

- **Локальное состояние** — `useState` для данных страниц
- **Контекст** — `FavoritesContext` для избранного, доступный через `useFavorites()`
- **Мемоизация** — `useCallback` для стабильных ссылок на обработчики

### Работа с API

Все запросы проходят через единый модуль `src/api/omdb.js`, который:

- формирует URL через `URLSearchParams` (безопасная кодировка параметров)
- выбрасывает пустые параметры, чтобы не отправлять мусор на сервер
- приводит ответ `Response: "False"` к понятной ошибке с текстом от OMDb

### Дебаунс и защита от «гонки» запросов

Ввод обрабатывается с задержкой в 600 мс, а в `MovieDetails` используется флаг `cancelled`, чтобы устаревший ответ не перезаписал состояние после перехода на другую страницу.

---

## 🚀 Деплой

### GitHub Pages (рекомендуется)

В проекте уже настроен скрипт `gh-pages`:

```bash
npm run deploy
```

Команда соберёт проект и опубликует содержимое `dist/` в ветку `gh-pages`.

> **Важно:** в `vite.config.js` указан `base: '/react-movies-project/'`. Если переименуете репозиторий — измените это значение, а также `basename` в `src/App.jsx`.

Для работы прямых ссылок (`/favorites`, `/movie/tt0111161`) плагин `spa-fallback` автоматически создаёт `dist/404.html` — GitHub Pages отдаст его вместо ошибки 404, и приложение подхватит маршрут на клиенте.

### Netlify / Vercel

- **Сборка:** `npm run build`
- **Каталог публикации:** `dist`

Файл `public/_redirects` уже содержит правило SPA-fallback и будет скопирован в `dist/` автоматически.

### Любой другой статический хостинг

```bash
npm run build
```

Затем загрузите содержимое папки `dist/` в корень сайта.

---

## 🐛 Обратная связь

Нашли баг или есть идея? Буду рад помощи!

1. Создайте [Issue](https://github.com/skilledify/react-movies-project/issues/new) с описанием проблемы
2. Или отправьте Pull Request с исправлением

---

## 📄 Лицензия

Проект распространяется под лицензией [MIT](LICENSE).

> Данные о фильмах предоставляются [OMDb API](https://www.omdbapi.com). Постеры принадлежат их правообладателям и используются в ознакомительных целях.

---

<div align="center">

**Сделано с ❤️ на React**

[![React](https://img.shields.io/badge/React-19.0-61dafb?logo=react&logoColor=black)](https://react.dev)
[![Made with Vite](https://img.shields.io/badge/Built_with-Vite-646cff?logo=vite&logoColor=white)](https://vite.dev)

</div>

│   │   ├── Pagination.jsx  # Постраничная навигация
│   │   ├── Preloader.jsx   # Прелоадер и скелетоны
│   │   └── Search.jsx      # Панель поиска и фильтров
│   ├── constants/
│   │   └── trending.js     # Подборка популярных тайтлов
│   ├── context/
│   │   └── FavoritesContext.jsx  # Контекст избранного (localStorage)
│   ├── hooks/
│   │   └── useDebouncedValue.js  # Хук задержки значения
│   ├── pages/
│   │   ├── Favorites.jsx   # Страница «Избранное»
│   │   ├── Home.jsx        # Главная страница
│   │   └── MovieDetails.jsx# Страница фильма
│   ├── App.jsx             # Корневой компонент и маршруты
│   ├── index.css           # Дизайн-токены и все стили
│   └── main.jsx            # Точка входа
│
├── .env.example            # Шаблон переменных окружения
├── .gitignore              # Правила игнорирования для Git
├── index.html              # HTML-шаблон и мета-теги
├── package.json            # Зависимости и скрипты
├── vite.config.js          # Конфигурация сборки
└── README.md
```

---
