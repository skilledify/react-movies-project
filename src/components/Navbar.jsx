import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import M from 'materialize-css';
import { useFavorites } from '../context/FavoritesContext';
import { searchMovies } from '../api/omdb';
import { TRENDING } from '../constants/trending';

const THEME_KEY = 'react-movies:theme';

function getInitialTheme() {
	const stored = localStorage.getItem(THEME_KEY);
	if (stored === 'light' || stored === 'dark') return stored;
	return window.matchMedia('(prefers-color-scheme: light)').matches
		? 'light'
		: 'dark';
}

export function Navbar() {
	const sidenavRef = useRef(null);
	const [theme, setTheme] = useState(getInitialTheme);
	const [picking, setPicking] = useState(false);
	const { favorites } = useFavorites();
	const { pathname } = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme);
		localStorage.setItem(THEME_KEY, theme);
	}, [theme]);

	
	useEffect(() => {
		M.Sidenav.init(sidenavRef.current, { edge: 'right' });
		M.Tooltip.init(document.querySelectorAll('.tooltipped'));
	}, []);

	
	useEffect(() => {
		const instance = M.Sidenav.getInstance(sidenavRef.current);
		if (instance && instance.isOpen) instance.close();
	}, [pathname]);

	const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

	
	const handleRandomMovie = useCallback(
		async (event) => {
			event.preventDefault();
			if (picking) return;
			
			const sidenav = M.Sidenav.getInstance(sidenavRef.current);
			if (sidenav && sidenav.isOpen) sidenav.close();
			setPicking(true);
			try {
				const query = TRENDING[Math.floor(Math.random() * TRENDING.length)];
				const data = await searchMovies(query);
				const items = data.Search || [];
				if (items.length === 0) {
					M.toast({ html: 'Случайный фильм не найден', classes: 'toast-muted' });
					return;
				}
				const pick = items[Math.floor(Math.random() * Math.min(items.length, 10))];
				navigate(`/movie/${pick.imdbID}`);
			} catch (err) {
				M.toast({
					html: err.message || 'Не удалось выбрать случайный фильм',
					classes: 'toast-muted',
				});
			} finally {
				setPicking(false);
			}
		},
		[navigate, picking]
	);

	return (
		<>
			<nav className="app-nav transparent z-depth-0">
				<div className="nav-wrapper container">
					<Link to="/" className="brand-logo">
						<i className="material-icons brand-icon">movie_filter</i>
						<span>
							React<span className="accent-text">Movies</span>
						</span>
					</Link>
					<ul className="right hide-on-med-and-down">
						<li>
							<NavLink to="/" end className={({ isActive }) => (isActive ? 'active-link' : '')}>
								<i className="material-icons left">home</i>Главная
							</NavLink>
						</li>
						<li>
							<NavLink to="/favorites" className={({ isActive }) => (isActive ? 'active-link' : '')}>
								<i className="material-icons left">favorite</i>Избранное
								{favorites.length > 0 && (
									<span className="fav-badge new badge white" data-badge-caption="">
										{favorites.length}
									</span>
								)}
							</NavLink>
						</li>
						<li className={picking ? 'disabled-action' : ''}>
							<a href="#!" onClick={handleRandomMovie}>
								<i className="material-icons left">casino</i>Случайный фильм
							</a>
						</li>	</ul>

	<button
		className="btn-flat waves-light theme-toggle tooltipped"
		data-position="bottom"
		data-tooltip={theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
		onClick={toggleTheme}
		aria-label="Переключить тему"
	>
		<i className="material-icons">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</i>
	</button>

					<a
						href="#!"
						data-target="mobile-menu"
						className="sidenav-trigger right hide-on-large-only"
					>
						<i className="material-icons">menu</i>
					</a>
				</div>
			</nav>

			<ul className="sidenav" id="mobile-menu" ref={sidenavRef}>
				<li className="sidenav-header">
					<div className="user-view">
						<div className="background gradient-block"></div>
						<i className="material-icons circle avatarka">movie_filter</i>
						<span className="white-text name">React Movies</span>
						<span className="white-text email">каталог фильмов и сериалов</span>
					</div>
					<button
						className="sidenav-close-btn btn-flat waves-effect"
						onClick={() => {
							const instance = M.Sidenav.getInstance(sidenavRef.current);
							if (instance) instance.close();
						}}
						aria-label="Закрыть меню"
					>
						<i className="material-icons">close</i>
					</button>
				</li>
				<li>
					<NavLink to="/" end>
						<i className="material-icons">home</i>Главная
					</NavLink>
				</li>
				<li>
					<NavLink to="/favorites">
						<i className="material-icons">favorite</i>Избранное ({favorites.length})
					</NavLink>
				</li>
				<li className={picking ? 'disabled-action' : ''}>
					<a href="#!" onClick={handleRandomMovie}>
						<i className="material-icons">casino</i>Случайный фильм
					</a>
				</li></ul>
		</>
	);
}
