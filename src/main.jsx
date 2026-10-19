import React from 'react';
import { createRoot } from 'react-dom/client';
import 'materialize-css/dist/css/materialize.min.css';
import './index.css';
import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
