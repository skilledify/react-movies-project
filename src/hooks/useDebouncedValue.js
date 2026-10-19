import { useEffect, useState } from 'react';

/**
 * Возвращает значение, которое меняется только после того,
 * как источник оставался неизменным `delay` мс.
 */
export function useDebouncedValue(value, delay = 500) {
	const [debounced, setDebounced] = useState(value);

	useEffect(() => {
		const timer = setTimeout(() => setDebounced(value), delay);
		return () => clearTimeout(timer);
	}, [value, delay]);

	return debounced;
}
