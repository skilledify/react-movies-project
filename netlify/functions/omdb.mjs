/**
 * Netlify Function: прокси к OMDb API.
 *
 * Ключ OMDb хранится только в переменных окружения Netlify (OMDB_API_KEY)
 * и никогда не попадает в браузер или в клиентский бандл.
 *
 * Поддерживаемые параметры (OMDb): s, i, y, type, plot, page.
 * Эндпоинт: https://<site>.netlify.app/api/omdb
 */

const OMDB_URL = 'https://www.omdbapi.com/';
const ALLOWED_TYPES = new Set(['movie', 'series', 'episode', 'game']);
const ALLOWED_PLOTS = new Set(['short', 'full']);
const MAX_QUERY_LENGTH = 120;
const MAX_PAGE = 100;

const CORS_HEADERS = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type',
	'Access-Control-Max-Age': '86400',
};

function jsonResponse(statusCode, payload) {
	return new Response(JSON.stringify(payload), {
		status: statusCode,
		headers: {
			...CORS_HEADERS,
			'Content-Type': 'application/json; charset=utf-8',
			'Cache-Control': 'no-store',
		},
	});
}

function readParam(query, name) {
	const value = query?.[name];
	if (typeof value !== 'string') return undefined;
	const trimmed = value.trim();
	return trimmed === '' ? undefined : trimmed;
}

function validateParams(query) {
	const params = {};
	const imdbId = readParam(query, 'i');
	const title = readParam(query, 's');

	if (imdbId) {
		if (!/^tt\d{7,8}$/.test(imdbId)) {
			throw new Error('Некорректный IMDb ID');
		}
		params.i = imdbId;
	} else if (title) {
		if (title.length > MAX_QUERY_LENGTH) {
			throw new Error('Слишком длинный поисковый запрос');
		}
		params.s = title;
	} else {
		throw new Error('Не указан параметр поиска (s или i)');
	}

	const year = readParam(query, 'y');
	if (year) {
		if (!/^\d{4}$/.test(year)) {
			throw new Error('Некорректный год');
		}
		params.y = year;
	}

	const type = readParam(query, 'type');
	if (type) {
		if (!ALLOWED_TYPES.has(type)) {
			throw new Error('Некорректный тип');
		}
		params.type = type;
	}

	const plot = readParam(query, 'plot');
	if (plot) {
		if (!ALLOWED_PLOTS.has(plot)) {
			throw new Error('Некорректный режим описания');
		}
		params.plot = plot;
	}

	const page = readParam(query, 'page');
	if (page) {
		const pageNumber = Number.parseInt(page, 10);
		if (!Number.isInteger(pageNumber) || pageNumber < 1 || pageNumber > MAX_PAGE) {
			throw new Error('Некорректный номер страницы');
		}
		params.page = String(pageNumber);
	}

	return params;
}

async function fetchFromOmdb(params) {
	const url = new URL(OMDB_URL);
	url.searchParams.set('apikey', process.env.OMDB_API_KEY || '');
	Object.entries(params).forEach(([key, value]) => {
		url.searchParams.set(key, value);
	});

	const response = await fetch(url.toString());
	const raw = await response.text();

	let data;
	try {
		data = JSON.parse(raw);
	} catch {
		throw new Error('OMDb вернул некорректный ответ');
	}

	return { status: response.status, data };
}


export default async (request) => {
	const url = new URL(request.url);

	if (request.method === 'OPTIONS') {
		return new Response('', { status: 204, headers: CORS_HEADERS });
	}

	if (request.method !== 'GET') {
		return jsonResponse(405, { Response: 'False', Error: 'Метод не поддерживается' });
	}

	let params;
	try {
		params = validateParams(Object.fromEntries(url.searchParams));
	} catch (error) {
		return jsonResponse(400, { Response: 'False', Error: error.message });
	}

	if (!process.env.OMDB_API_KEY) {
		return jsonResponse(500, {
			Response: 'False',
			Error: 'OMDB_API_KEY не настроен на сервере',
		});
	}

	try {
		const { status, data } = await fetchFromOmdb(params);

		if (status === 401) {
			return jsonResponse(502, {
				Response: 'False',
				Error: 'OMDb отклонил ключ API',
			});
		}

		return new Response(JSON.stringify(data), {
			status: 200,
			headers: {
				...CORS_HEADERS,
				'Content-Type': 'application/json; charset=utf-8',
				'Cache-Control': 'public, max-age=300',
			},
		});
	} catch {
		return jsonResponse(502, { Response: 'False', Error: 'OMDb недоступен' });
	}
};
