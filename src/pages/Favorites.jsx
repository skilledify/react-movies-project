import { Link } from 'react-router-dom';
import { MovieCard } from '../components/MovieCard';
import { useFavorites } from '../context/FavoritesContext';

export function Favorites() {
	const { favorites, clearFavorites } = useFavorites();

	return (
		<section className="container content">
			<nav className="breadcrumbs">
				<Link to="/">Главная</Link>
				<i className="material-icons tiny">chevron_right</i>
				<span>Избранное</span>
			</nav>
			<div className="results-head">
				<h5 className="results-title">
					<i className="material-icons left">favorite</i>
					<span className="results-count">Всего: {favorites.length}</span>
				</h5>
				{favorites.length > 0 && (
					<button
						className="btn-flat waves-effect clear-fav-btn"
						onClick={clearFavorites}
					>
						<i className="material-icons left">delete_sweep</i>Очистить список
					</button>
				)}
			</div>

			{favorites.length ? (
				<div className="movies">
					{favorites.map((movie) => (
						<MovieCard key={movie.imdbID} movie={movie} />
					))}
				</div>
			) : (
				<div className="empty-state">
					<i className="material-icons">favorite_border</i>
					<h5>В избранном пока пусто</h5>
					<p>Нажимайте на сердечко в карточке, чтобы сохранить тайтл</p>
					<Link to="/" className="btn accent-btn">
						<i className="material-icons left">search</i>Перейти к поиску
					</Link>
				</div>
			)}
		</section>
	);
}
