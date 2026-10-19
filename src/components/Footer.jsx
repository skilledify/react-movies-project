import { Link } from 'react-router-dom';

export function Footer() {
	return (
		<footer className="page-footer">
			<div className="container footer-inner">
				<div className="row">
					<div className="col s12 m4">
						<h5 className="footer-brand">
							<i className="material-icons">movie_filter</i> React Movies
						</h5>
						<p className="grey-text text-lighten-4">
							Каталог фильмов, сериалов и игр на React, Vite и Materialize CSS.
							Данные предоставлены OMDb API.
						</p>
					</div>
					<div className="col s6 m2 offset-m2">
						<h5 className="footer-title">Навигация</h5>
						<ul>
							<li><Link to="/">Главная</Link></li>
							<li><Link to="/favorites">Избранное</Link></li>
						</ul>
					</div>
					<div className="col s6 m4">
						<h5 className="footer-title">Полезные ссылки</h5>
						<ul>
							<li>
								<a href="https://www.omdbapi.com/" target="_blank" rel="noreferrer">
									OMDb API
								</a>
							</li>
							<li>
								<a
									href="https://react.dev/"
									target="_blank"
									rel="noreferrer"
								>
									React Docs
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div className="footer-copyright">
				<div className="container">
					© {new Date().getFullYear()} React Movies
					<span className="right grey-text text-lighten-4">
						Made with <i className="tiny material-icons">favorite</i> on Vite + React
					</span>
				</div>
			</div>
		</footer>
	);
}
