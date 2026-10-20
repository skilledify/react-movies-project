import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { MovieDetails } from './pages/MovieDetails';
import { Favorites } from './pages/Favorites';
import { NotFound } from './pages/NotFound';
import { FavoritesProvider } from './context/FavoritesContext';

function ScrollToTop() {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, [pathname]);

	return null;
}

function App() {
	return (
		<FavoritesProvider>
			<BrowserRouter basename="/react-movies-project/">
				<ScrollToTop />
				<div className="app-shell">
					<Navbar />
					<main className="app-main">
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/movie/:imdbID" element={<MovieDetails />} />
							<Route path="/favorites" element={<Favorites />} />
							<Route path="*" element={<NotFound />} />
						</Routes>
					</main>
					<Footer />
				</div>
			</BrowserRouter>
		</FavoritesProvider>
	);
}

export default App;
