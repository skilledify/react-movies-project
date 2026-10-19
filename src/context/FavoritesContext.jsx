import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import M from 'materialize-css';

const STORAGE_KEY = 'react-movies:favorites';
const FavoritesContext = createContext(null);

function readStorage() {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		return raw ? JSON.parse(raw) : [];
	} catch {
		return [];
	}
}

export function FavoritesProvider({ children }) {
	const [favorites, setFavorites] = useState(readStorage);

	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
	}, [favorites]);

	const isFavorite = useCallback(
		(imdbID) => favorites.some((movie) => movie.imdbID === imdbID),
		[favorites]
	);

	
	const toggleFavorite = useCallback(
		(movie) => {
			const exists = favorites.some((item) => item.imdbID === movie.imdbID);
			setFavorites((prev) => {
				if (exists) {
					return prev.filter((item) => item.imdbID !== movie.imdbID);
				}
				const { imdbID, Title, Year, Poster, Type, imdbRating } = movie;
				return [{ imdbID, Title, Year, Poster, Type, imdbRating }, ...prev];
			});
			if (exists) {
				M.toast({ html: 'Удалено из избранного', classes: 'toast-muted' });
			} else {
				M.toast({ html: 'Добавлено в избранное ♥', classes: 'toast-accent' });
			}
		},
		[favorites]
	);

	const clearFavorites = useCallback(() => {
		setFavorites([]);
		M.toast({ html: 'Избранное очищено', classes: 'toast-muted' });
	}, []);

	const value = {
		favorites,
		isFavorite,
		toggleFavorite,
		clearFavorites,
	};

	return (
		<FavoritesContext.Provider value={value}>
			{children}
		</FavoritesContext.Provider>
	);
}

export function useFavorites() {
	const context = useContext(FavoritesContext);
	if (!context) {
		throw new Error('useFavorites должен использоваться внутри FavoritesProvider');
	}
	return context;
}
