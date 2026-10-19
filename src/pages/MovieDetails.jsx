import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getMovieDetails, getSimilarMovies } from '../api/omdb';
import { Preloader } from '../components/Preloader';
import { MovieCard } from '../components/MovieCard';
import { useFavorites } from '../context/FavoritesContext';

const FALLBACK_POSTER =
	'https://via.placeholder.com/300x450/1a1a2e/e94560?text=No+Poster';

/** Строка «ключ: значение», скрывает пустые поля OMDb. */
function InfoRow({ icon, label, value }) {
	if (!value || value === 'N/A') return null;
	return (
		<li>
			<i className="material-icons info-icon">{icon}</i>
			<div>
				<span className="info-label">{label}</span>
				<span className="info-value">{value}</span>
			</div>
		</li>
	);
}

export function MovieDetails() {
	const { imdbID } = useParams();
	const [movie, setMovie] = useState(null);
	const [similar, setSimilar] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const { isFavorite, toggleFavorite } = useFavorites();

	useEffect(() => {
		let cancelled = false;
		setLoading(true);
		setError(null);
		setMovie(null);
		setSimilar([]);

		getMovieDetails(imdbID)
			.then((data) => {
				if (cancelled) return;
				setMovie(data);
				return getSimilarMovies(data.Title).then((similarData) => {
					if (cancelled) return;
					setSimilar(
						(similarData.Search || [])
							.filter((item) => item.imdbID !== imdbID)
							.slice(0, 4)
					);
				});
			})
			.catch((err) => {
				if (!cancelled) setError(err.message);
			})
			.finally(() => {
				if (!cancelled) setLoading(false);
			});

		return () => {
			cancelled = true;
		};
	}, [imdbID]);

	if (loading) {
		return (
			<section className="container content">
				<Preloader label="Загружаем карточку…" />
			</section>
		);
	}

	if (error || !movie) {
		return (
			<section className="container content">
				<div className="card-panel error-panel">
					<i className="material-icons left">error_outline</i>
					{error || 'Тайтл не найден'}
				</div>
				<div className="center-align">
					<Link to="/" className="btn accent-btn">
						<i className="material-icons left">arrow_back</i>На главную
					</Link>
				</div>
			</section>
		);
	}

	const fav = isFavorite(movie.imdbID);
	const ratedClass =
		movie.imdbRating && Number(movie.imdbRating) >= 7.5
			? 'rating-high'
			: Number(movie.imdbRating) >= 5
				? 'rating-mid'
				: 'rating-low';

	return (
		<section className="container content details-page">
			<nav className="breadcrumbs">
				<Link to="/">Главная</Link>
				<i className="material-icons tiny">chevron_right</i>
				<span>{movie.Title}</span>
			</nav>

			<div className="card details-card z-depth-1">
				<div className="details-poster">
					<img
						src={movie.Poster !== 'N/A' ? movie.Poster : FALLBACK_POSTER}
						alt={movie.Title}
					/>
				</div>
				<div className="details-info">
					<div className="details-head">
						<div>
							<h3>{movie.Title}</h3>
							<p className="details-subtitle">
								{movie.Year}
								{movie.Runtime && movie.Runtime !== 'N/A' && <> • {movie.Runtime}</>}
								{movie.Genre && movie.Genre !== 'N/A' && <> • {movie.Genre}</>}
							</p>
						</div>
						{movie.imdbRating && movie.imdbRating !== 'N/A' && (
							<div className={`rating-circle ${ratedClass}`}>
								<span className="rating-value">{movie.imdbRating}</span>
								<span className="rating-caption">IMDb</span>
							</div>
						)}
					</div>

					{movie.Plot && movie.Plot !== 'N/A' && (
						<p className="details-plot">{movie.Plot}</p>
					)}

					<button
						className={`btn fav-toggle ${fav ? 'red darken-1' : 'accent-btn'}`}
						onClick={() => toggleFavorite(movie)}
					>
						<i className="material-icons left">
							{fav ? 'favorite' : 'favorite_border'}
						</i>
						{fav ? 'В избранном' : 'Добавить в избранное'}
					</button>

					<ul className="details-list">
						<InfoRow icon="theaters" label="Режиссёр" value={movie.Director} />
						<InfoRow icon="groups" label="В ролях" value={movie.Actors} />
						<InfoRow icon="edit_note" label="Сценарий" value={movie.Writer} />
						<InfoRow icon="public" label="Страна" value={movie.Country} />
						<InfoRow icon="language" label="Язык" value={movie.Language} />
						<InfoRow icon="star_half" label="Рейтинг" value={movie.Rated} />
						<InfoRow icon="emoji_events" label="Награды" value={movie.Awards} />
						<InfoRow icon="local_movies" label="Кассовые сборы" value={movie.BoxOffice} />
					</ul>
				</div>
			</div>

			{similar.length > 0 && (
				<>
					<div className="results-head">
						<h5 className="results-title">Похожие тайтлы</h5>
					</div>
					<div className="movies">
						{similar.map((item) => (
							<MovieCard key={item.imdbID} movie={item} />
						))}
					</div>
				</>
			)}
		</section>
	);
}
