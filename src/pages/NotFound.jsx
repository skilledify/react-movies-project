import { Link, useLocation } from 'react-router-dom';
import { TRENDING } from '../constants/trending';

const SUGGESTIONS = [
	{
		icon: 'movie_filter',
		title: 'Каталог фильмов',
		text: 'Более 100 000 тайтлов: ищите по названию, типу и году выхода.',
		to: '/',
	},
	{
		icon: 'favorite',
		title: 'Избранное',
		text: 'Сохранённые фильмы и сериалы ждут вас в личной коллекции.',
		to: '/favorites',
	},
	{
		icon: 'search',
		title: 'Начать поиск',
		text: 'Откройте поиск и найдите фильм по названию — мы покажем рейтинг и описание.',
		to: '/?focus=search',
	},
];

export function NotFound() {
	const { pathname } = useLocation();

	return (
		<section className="container content not-found-page">
			<nav className="breadcrumbs">
				<Link to="/">Главная</Link>
				<i className="material-icons tiny">chevron_right</i>
				<span>Страница не найдена</span>
			</nav>

			<div className="not-found-card card z-depth-1">
				<div className="not-found-code" aria-hidden="true">
					<span>4</span>
					<i className="material-icons">movie_filter</i>
					<span>4</span>
				</div>

				<h3 className="not-found-title">Такой страницы не нашлось</h3>
				<p className="not-found-text">
					Похоже, этот тайтл давно ушёл из проката. Страница
					<code className="not-found-path">{pathname}</code> не существует или была
					переименована.
				</p>

				<div className="not-found-actions">
					<Link to="/" className="btn accent-btn">
						<i className="material-icons left">home</i>На главную
					</Link>
					<Link to="/favorites" className="btn-flat waves-effect">
						<i className="material-icons left">favorite_border</i>В избранное
					</Link>
				</div>
			</div>

			<div className="results-head">
				<h5 className="results-title">
					<i className="material-icons left">explore</i>
					<span>Куда пойти дальше</span>
				</h5>
			</div>

			<div className="not-found-grid">
				{SUGGESTIONS.map((item) => (
					<Link
						key={item.title}
						to={item.to}
						className="not-found-tile card z-depth-1"
					>
						<i className="material-icons not-found-tile-icon">{item.icon}</i>
						<h6>{item.title}</h6>
						<p>{item.text}</p>
					</Link>
				))}
			</div>

			<div className="not-found-trending">
				<span className="not-found-trending-label">Популярные подборки:</span>
				<div className="trending-row">
					{TRENDING.map((title) => (
						<Link
							key={title}
							to={`/?q=${encodeURIComponent(title)}`}
							className="btn-flat waves-effect not-found-chip"
						>
							{title}
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}

