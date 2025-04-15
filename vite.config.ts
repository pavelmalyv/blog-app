import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { checker } from 'vite-plugin-checker';

// https://vite.dev/config/
export default defineConfig({
	base: '/blog-app/',
	resolve: {
		alias: {
			'@': '/src',
			'@components': '/src/components',
			'@hooks': '/src/hooks',
			'@styles': '/src/styles',
		},
	},
	plugins: [
		checker({
			typescript: true,
			eslint: {
				lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
				useFlatConfig: true,
			},
			stylelint: {
				lintCommand: 'stylelint ./src/**/*.{css,scss}',
			},
		}),
		react(),
	],
});
