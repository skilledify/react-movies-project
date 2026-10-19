import React from 'react';
import { createRoot } from 'react-dom/client';
import 'materialize-css/dist/css/materialize.min.css';
import './index.css';
import App from './App';
import { applyTheme, getInitialTheme } from './theme';

// Применяем тему до первого рендера — иконка и theme-color
// не «мигают» неправильным цветом при загрузке страницы.
applyTheme(getInitialTheme());

const root = createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
