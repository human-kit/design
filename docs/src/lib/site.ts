import { components } from '$lib/registry';

/** The address the site is served from. Canonical links, the sitemap and llms.txt are absolute. */
export const ORIGIN = 'https://design.human-kit.com';

/** Every page a search engine should know about, in the order of the docs. */
export const PAGES = [
	'/',
	'/docs/installation',
	'/docs/theming',
	...components.map(({ name }) => `/docs/components/${name}`)
];
