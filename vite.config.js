import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const BASE = '/react-movies-project/';

function spaFallbackPlugin() {
	return {
		name: 'spa-fallback',
		closeBundle() {
			const indexPath = resolve(__dirname, 'dist/index.html');
			if (!existsSync(indexPath)) return;

			const html = readFileSync(indexPath, 'utf8');
			writeFileSync(resolve(__dirname, 'dist/404.html'), html);

			if (existsSync(resolve(__dirname, 'public/_redirects'))) {
				copyFileSync(
					resolve(__dirname, 'public/_redirects'),
					resolve(__dirname, 'dist/_redirects')
				);
			}
		},
	};
}

export default defineConfig({
	plugins: [react(), spaFallbackPlugin()],
	base: BASE,
	server: {
		port: 5173,
		open: true,
	},
	preview: {
		port: 4173,
	},
	build: {
		outDir: 'dist',
		sourcemap: false,
		target: 'es2019',
		cssCodeSplit: true,
		reportCompressedSize: true,
		chunkSizeWarningLimit: 700,
		rollupOptions: {
			output: {
				manualChunks: {
					react: ['react', 'react-dom', 'react-router-dom'],
					materialize: ['materialize-css'],
				},
			},
		},
	},
});
