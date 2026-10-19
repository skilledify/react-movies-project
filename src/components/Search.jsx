import { useEffect, useRef, useState } from 'react';
import M from 'materialize-css';
import { useDebouncedValue } from '../hooks/useDebouncedValue';

const TYPES = [
	{ value: 'all', label: 'Все' },
	{ value: 'movie', label: 'Фильмы' },
	{ value: 'series', label: 'Сериалы' },
	{ value: 'game', label: 'Игры' },
];

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 60 }, (_, i) => CURRENT_YEAR - i);

/**
 * Панель поиска: дебаунс-поиск по тексту + фильтры по типу и году.
 * Отдаёт родителю { query, type, year } каждый раз, когда что-то меняется.
 */
export function Search({ onSearch }) {
	const [query, setQuery] = useState('');
	const [type, setType] = useState('all');
	const [year, setYear] = useState('');
	const [validationError, setValidationError] = useState('');
	const typeSelectRef = useRef(null);
	const yearSelectRef = useRef(null);
	const isFirstRender = useRef(true);
	const debouncedQuery = useDebouncedValue(query, 600);

	// Только английские буквы, цифры, пробелы, дефис, апостроф и точка
	const ENGLISH_ONLY_REGEX = /^[a-zA-Z0-9\s\-'\.]*$/;

	const validateQuery = (value) => {
		if (!value) {
			setValidationError('');
			return true;
		}
		if (!ENGLISH_ONLY_REGEX.test(value)) {
			setValidationError('Вводите только английские буквы и цифры');
			return false;
		}
		setValidationError('');
		return true;
	};

	// Materialize select требует ручной инициализации
	useEffect(() => {
		const instances = [
			M.FormSelect.init(typeSelectRef.current),
			M.FormSelect.init(yearSelectRef.current),
		];
		return () => instances.forEach((instance) => instance && instance.destroy());
	}, []);

	useEffect(() => {
		// Пропускаем первый рендер: Home сам делает стартовый запрос
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}
		// Блокируем поиск при ошибке валидации
		if (!validateQuery(debouncedQuery)) {
			return;
		}
		onSearch({ query: debouncedQuery, type, year });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedQuery, type, year]);

	return (
		<div className="search-panel card z-depth-1">
			<div className="search-row row">
				<div className="input-field col s12 m6 l5">
					<i className="material-icons prefix">search</i>
					<input
						id="search-input"
						type="search"
						value={query}
						placeholder="Например: Interstellar"
						autoComplete="off"
						onChange={(event) => setQuery(event.target.value)}
					/>
					<label htmlFor="search-input" className="active">
						Поиск по названию
					</label>
					{validationError && (
						<span className="helper-text" data-error="true" style={{ color: "var(--accent)" }}>
							{validationError}
						</span>
					)}
					{query && (
						<button
							className="btn-flat clear-btn tooltipped"
							data-position="right"
							data-tooltip="Очистить"
							aria-label="Очистить поиск"
							onClick={() => setQuery('')}
						>
							<i className="material-icons">close</i>
						</button>
					)}
				</div>
				<div className="input-field col s12 m3 l4">
					<select
						id="type-select"
						ref={typeSelectRef}
						value={type}
						onChange={(event) => setType(event.target.value)}
					>
						{TYPES.map((item) => (
							<option key={item.value} value={item.value}>
								{item.label}
							</option>
						))}
					</select>
					<label htmlFor="type-select" className="active">
						Тип
					</label>
				</div>
				<div className="input-field col s12 m3 l3">
					<select
						id="year-select"
						ref={yearSelectRef}
						value={year}
						onChange={(event) => setYear(event.target.value)}
					>
						<option value="">Любой год</option>
						{YEARS.map((item) => (
							<option key={item} value={item}>
								{item}
							</option>
						))}
					</select>
					<label htmlFor="year-select" className="active">
						Год
					</label>
				</div>
			</div>
		</div>
	);
}

