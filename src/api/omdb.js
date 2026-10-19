const API_KEY = import.meta.env.VITE_OMDB_API_KEY || 'c8a24847';
const BASE_URL = 'https://www.omdbapi.com/';

async function request(params) {
	const url = new URL(BASE_URL);
	url.searchParams.set('apikey', API_KEY);
	Object.entries(params).forEach(([key, value]) => {
		if (value !== undefined && value !== null && value !== '') {
			url.searchParams.set(key, value);
		}
	});

	const response = await fetch(url);
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
