import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		// The site is fully prerendered. The runtime is fixed, thus a local Node.js that Vercel
		// does not support can still build it.
		adapter: adapter({ runtime: 'nodejs22.x' }),
		alias: {
			// The registry sources import each other through `@registry/*`. The CLI rewrites these
			// paths to the aliases of the project when it copies a file.
			'@registry': '../registry/src'
		},
		prerender: {
			entries: [
				'*',
				'/docs/components/button',
				'/docs/components/dialog',
				'/docs/components/select'
			]
		}
	}
};

export default config;
