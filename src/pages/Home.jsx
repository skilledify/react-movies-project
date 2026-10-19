import { useCallback, useEffect, useRef, useState } from 'react';
import { Search } from '../components/Search';
import { Movies } from '../components/Movies';
import { Preloader } from '../components/Preloader';
import { Pagination } from '../components/Pagination';
import { searchMovies } from '../api/omdb';
import { TRENDING } from '../constants/trending';

export function Home() {
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [page, setPage] = useState(1);
	const [total, setTotal] = useState(0);
	const [searched, setSearched] = useState(false); // был ли хоть один поиск
	const [hero, setHero] = useState(null);

	// Последние применённые фильтры — для пагинации
	const requestRef = useRef({ query: '', type: 'all', year: '' });

	const fetchMovies = useCallback(async (filters, targetPage) => {
		setLoading(true);
		setError(null);
		try {
			const data = await searchMovies(filters.query, {
				type: filters.type,
				year: filters.year,
				page: targetPage,
			});
			setMovies(data.Search || []);
			setTotal(Number(data.totalResults) || 0);
		} catch (err) {
			setMovies([]);
			setTotal(0);
			setError(err.message);
		} finally {
			setLoading(false);
		}
	}, []);

	// Рандомный «герой» из трендовых. Автопоиска нет:
	// стартовая страница остаётся пустой до первого действия пользователя.
	useEffect(() => {
		const randomTrend = TRENDING[Math.floor(Math.random() * TRENDING.length)];
		searchMovies(randomTrend)
			.then((data) => {
				const items = data.Search || [];
				setHero(items[Math.floor(Math.random() * Math.min(items.length, 10))]);
			})
			.catch(() => setHero(null));
	}, []);

	const handleSearch = useCallback(
		(filters) => {
			requestRef.current = filters;
			setPage(1);
			if (!filters.query.trim()) {
				// Пустой запрос — возвращаем чистую стартовую страницу
				setMovies([]);
				setTotal(0);
				setError(null);
				setLoading(false);
				setSearched(false);
				return;
			}
			setSearched(true);
			fetchMovies(filters, 1);
		},
		[fetchMovies]
	);

	const handlePageChange = useCallback(
		(nextPage) => {
			setPage(nextPage);
			fetchMovies(requestRef.current, nextPage);
			window.scrollTo({ top: 0, behavior: 'smooth' });
		},
		[fetchMovies]
	);

	const handleTrending = (title) => {
		const filters = { query: title, type: 'all', year: '' };
		requestRef.current = filters;
		setPage(1);
		setSearched(true);
		fetchMovies(filters, 1);
	};

	return (
		<section className="container content">
			{/* Hero-баннер */}
			<div className="hero card z-depth-2">
				<div className="hero-content">
					<span className="hero-badge chip">Подборка недели</span>
					<h4>Находите любимые фильмы и сериалы</h4>
					<p>
						Более 100 000 тайтлов в каталоге: поиск, фильтры по типу и году,
						рейтинги и избранное — всё в одном месте.
					</p>
					{hero && (
						<p className="grey-text text-lighten-3 hero-trending">
							Сейчас ищут: <b className="accent-text">{hero.Title}</b>
						</p>
					)}
					<div className="trending-row">
						{TRENDING.map((title) => (
							<button
								key={title}
								className="btn-flat waves-effect waves-light trending-chip"
								onClick={() => handleTrending(title)}
							>
								{title}
							</button>
						))}
					</div>
				</div>
				<div className="hero-stripe" aria-hidden="true" />
			</div>

			<Search onSearch={handleSearch} />

			{searched && (
				<div className="results-head">
					<h5 className="results-title">Результаты поиска</h5>
					{total > 0 && (
						<span className="results-count">
							Найдено: {total.toLocaleString('ru-RU')}
						</span>
					)}
				</div>
			)}

			{error && !loading && (
				<div className="card-panel error-panel">
					<i className="material-icons left">error_outline</i>
					{error}
				</div>
			)}

			{loading ? (
				<Preloader label="Ищем фильмы…" />
			) : searched ? (
				<Movies movies={movies} />
			) : (
				<div className="empty-state">
					<i className="material-icons">search</i>
					<h5>Начните поиск</h5>
					<p>Введите название фильма в строке поиска или выберите тему выше</p>
				</div>
			)}

			<Pagination page={page} total={total} onChange={handlePageChange} />
		</section>
	);
}

