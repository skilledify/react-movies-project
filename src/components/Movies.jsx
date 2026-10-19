import { MovieCard } from './MovieCard';
import { MovieSkeleton } from './Preloader';

export function Movies({ movies = [], loading = false }) {
	if (loading) {
		return (
			<div className="movies">
				{Array.from({ length: 8 }, (_, index) => (
					<MovieSkeleton key={index} />
				))}
			</div>
		);
	}

	if (!movies.length) {
		return (
			<div className="empty-state">
				<i className="material-icons">search_off</i>
				<h5>Ничего не найдено</h5>
				<p>Попробуйте изменить запрос или фильтры поиска</p>
			</div>
		);
	}

	return (
		<div className="movies">
			{movies.map((movie) => (
				<MovieCard key={movie.imdbID} movie={movie} />
			))}
		</div>
	);
}
