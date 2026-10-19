/**
 * Пагинация по 10 результатов (лимит OMDb API).
 * Строит окно страниц вокруг текущей.
 */
export function Pagination({ page, total, onChange }) {
	const perPage = 10;
	const totalPages = Math.min(Math.ceil(total / perPage), 100); // API отдаёт максимум 1000 результатов

	if (totalPages <= 1) return null;

	const pages = [];
	const start = Math.max(1, page - 2);
	const end = Math.min(totalPages, start + 4);
	for (let i = Math.max(1, end - 4); i <= end; i += 1) {
		pages.push(i);
	}

	return (
		<ul className="pagination center-align">
			<li className={`waves-effect ${page === 1 ? 'disabled' : ''}`}>
				<button
					disabled={page === 1}
					onClick={() => onChange(page - 1)}
					aria-label="Предыдущая страница"
				>
					<i className="material-icons">chevron_left</i>
				</button>
			</li>
			{start > 1 && (
				<>
					<li>
						<button onClick={() => onChange(1)}>1</button>
					</li>
					{start > 2 && <li className="disabled"><span>…</span></li>}
				</>
			)}
			{pages.map((item) => (
				<li key={item} className={`waves-effect ${item === page ? 'active' : ''}`}>
					<button onClick={() => onChange(item)}>{item}</button>
				</li>
			))}
			{end < totalPages && (
				<>
					{end < totalPages - 1 && <li className="disabled"><span>…</span></li>}
					<li>
						<button onClick={() => onChange(totalPages)}>{totalPages}</button>
					</li>
				</>
			)}
			<li className={`waves-effect ${page === totalPages ? 'disabled' : ''}`}>
				<button
					disabled={page === totalPages}
					onClick={() => onChange(page + 1)}
					aria-label="Следующая страница"
				>
					<i className="material-icons">chevron_right</i>
				</button>
			</li>
		</ul>
	);
}
