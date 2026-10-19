/**
 * Единая логика темы приложения: data-theme, favicon и theme-color.
 * Цвета синхронизированы с переменными в src/index.css.
 */

export const THEME_KEY = 'react-movies:theme';

export const THEME_COLORS = {
	dark: '#0d1117',
	light: '#f4f6fb',
};

export const FAVICONS = {
	dark: './favicon-dark.svg',
	light: './favicon-light.svg',
};

/**
 * Рендерит иконку (favicon) под текущую тему приложения.
 * Динамическая ссылка заменяет статическую из index.html,
 * иначе браузер может показать сразу две иконки.
 */
export function applyFavicon(theme) {
	const href = FAVICONS[theme] || FAVICONS.dark;

	let link = document.querySelector('link[data-theme-favicon]');
	if (!link) {
		// Переиспользуем статическую SVG-иконку из index.html,
		// чтобы не было двух конкурирующих <link rel="icon">.
		link =
			document.querySelector('link[rel="icon"][type="image/svg+xml"]') ||
			document.createElement('link');
		link.dataset.themeFavicon = 'true';
		if (!link.isConnected) document.head.appendChild(link);
	}
	link.rel = 'icon';
	link.type = 'image/svg+xml';
	link.href = href;
	// Динамическая иконка должна идти раньше статических ссылок из index.html,
	// иначе браузер отдаст предпочтение первой найденной.
	if (link.parentNode === document.head && document.head.firstChild !== link) {
		document.head.prepend(link);
	}
}

/** Обновляет theme-color под текущую тему приложения. */
export function applyThemeColor(theme) {
	const color = THEME_COLORS[theme] || THEME_COLORS.dark;

	let meta = document.querySelector('meta[name="theme-color"][data-app-theme]');
	if (!meta) {
		meta = document.createElement('meta');
		meta.name = 'theme-color';
		meta.dataset.appTheme = 'true';
		document.head.appendChild(meta);
	}
	meta.content = color;
	// Динамический theme-color должен идти раньше статических из index.html.
	if (meta.parentNode === document.head && document.head.firstChild !== meta) {
		document.head.prepend(meta);
	}
}

/** Применяет тему к документу (data-theme + favicon + theme-color). */
export function applyTheme(theme) {
	document.documentElement.setAttribute('data-theme', theme);
	applyFavicon(theme);
	applyThemeColor(theme);
}

export function getInitialTheme() {
	const stored = localStorage.getItem(THEME_KEY);
	if (stored === 'light' || stored === 'dark') return stored;
	return window.matchMedia('(prefers-color-scheme: light)').matches
		? 'light'
		: 'dark';
}
