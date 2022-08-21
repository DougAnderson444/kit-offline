import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	build: {
		minify: false,
		sourcemap: true,
		optimization: {
			minimize: false
		}
	},
	optimization: {
		minimize: false
	}
};

export default config;
