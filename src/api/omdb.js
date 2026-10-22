/**
 * HTTP-клиент OMDb.
 *
 * Запросы идут через серверный прокси (Netlify Function), поэтому
 * API-ключ OMDb никогда не попадает в браузер и в бандл.
 * Адрес прокси задаётся переменной VITE_OMDB_API_URL (это публичный URL,
 * секретом он не является).
 */
const DEFAULT_API_URL = 'https://react-movies-project-api.netlify.app/api/omdb';

// В dev-режиме ходим через относительный путь (его проксирует Vite -> netlify dev),
// в production — по абсолютному URL опубликованной функции.
const RAW_API_URL =
	import.meta.env.VITE_OMDB_API_URL ||
	(import.meta.env.DEV ? '/api/omdb' : DEFAULT_API_URL);

const API_URL = RAW_API_URL.replace(/\/+$/, '');

function buildUrl(params) {
	const url = API_URL.startsWith('/')
		? new URL(API_URL, window.location.origin)
		: new URL(API_URL);

	Object.entries(params).forEach(([key, value]) => {
		if (value !== undefined && value !== null && value !== '') {
			url.searchParams.set(key, value);
		}
	});

	return url;
}

async function request(params) {
	let response;
	try {
		response = await fetch(buildUrl(params));
	} catch {
		throw new Error('Сервер-прокси недоступен');
	}

	if (!response.ok) {
		throw new Error(`Ошибка сети: ${response.status}`);
	}

	const data = await response.json();
	if (data.Response === 'False') {
		throw new Error(data.Error || 'Ничего не найдено');
	}
	return data;
}

export function searchMovies(query, { type = 'all', year = '', page = 1 } = {}) {
	return request({
		s: query,
		type: type === 'all' ? '' : type,
		y: year,
		page,
	});
}

export function getMovieDetails(imdbID) {
	return request({ i: imdbID, plot: 'full' });
}

export function getSimilarMovies(title) {
	return request({ s: title }).catch(() => ({ Search: [] }));
}
