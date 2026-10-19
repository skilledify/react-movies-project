export function Preloader({ label = 'Загрузка…' }) {
	return (
		<div className="preloader-box">
			<div className="preloader-spinner preloader-wrapper big active">
				<div className="spinner-layer spinner-accent-only">
					<div className="circle-clipper left">
						<div className="circle" />
					</div>
					<div className="gap-patch">
						<div className="circle" />
					</div>
					<div className="circle-clipper right">
						<div className="circle" />
					</div>
				</div>
			</div>
			<p className="preloader-label">{label}</p>
		</div>
	);
}

/** Пульсирующая карточка-заглушка для сетки результатов. */
export function MovieSkeleton() {
	return (
		<div className="card movie-card skeleton-card">
			<div className="card-image skeleton-poster shimmer" />
			<div className="card-content">
				<div className="skeleton-line shimmer" style={{ width: '80%' }} />
				<div className="skeleton-line shimmer" style={{ width: '45%' }} />
			</div>
		</div>
	);
}
