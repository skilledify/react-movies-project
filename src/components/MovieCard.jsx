import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

const TYPE_LABELS = {
	movie: 'Фильм',
	series: 'Сериал',
	episode: 'Эпизод',
};

const FALLBACK_POSTER =
	'https://via.placeholder.com/300x450/1a1a2e/e94560?text=No+Poster';

export function MovieCard({ movie }) {
	const { imdbID, Title: title, Year: year, Type: type, Poster: poster } = movie;
	const { isFavorite, toggleFavorite } = useFavorites();
	const fav = isFavorite(imdbID);

	return (
		<div className="card movie-card">
			<div className="card-image">
				<Link to={`/movie/${imdbID}`} className="poster-link">
					<img
						src={poster !== 'N/A' ? poster : FALLBACK_POSTER}
						alt={title}
						loading="lazy"
					/>
					<span className="poster-overlay">
						<i className="material-icons">visibility</i>
						Подробнее
					</span>
				</Link>
				<span className={`type-chip chip ${type}`}>{TYPE_LABELS[type] || type}</span>
				<button
					className={`fav-btn btn-flat tooltipped ${fav ? 'is-fav' : ''}`}
					data-position="left"
					data-tooltip={fav ? 'Убрать из избранного' : 'В избранное'}
					aria-label="Избранное"
					onClick={() => toggleFavorite(movie)}
				>
					<i className="material-icons">{fav ? 'favorite' : 'favorite_border'}</i>
				</button>
			</div>
			<div className="card-content">
				<Link to={`/movie/${imdbID}`} className="card-title movie-title">
					<span title={title}>{title}</span>
				</Link>
				<p className="movie-meta">
					<i className="material-icons tiny">event</i> {year}
					{movie.imdbRating && movie.imdbRating !== 'N/A' && (
						<span className="rating right">
							<i className="material-icons tiny">star</i> {movie.imdbRating}
						</span>
					)}
				</p>
			</div>
		</div>
	);
}
