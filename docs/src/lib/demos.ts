import type { Component } from 'svelte';

type Demo = { name: string; component: Component; source: string };

const components = import.meta.glob<Component>('./demos/*/*.svelte', {
	eager: true,
	import: 'default'
});
const sources = import.meta.glob<string>('./demos/*/*.svelte', {
	eager: true,
	query: '?raw',
	import: 'default'
});

/** The demos of a component, in the order of the file names in `DEMO_ORDER`, then the rest. */
const DEMO_ORDER = [
	'basic',
	'variants',
	'intent',
	'sizes',
	'icon',
	'invalid',
	'pending',
	'placeholder'
];

export function demosOf(component: string): Demo[] {
	return Object.keys(components)
		.filter((path) => path.startsWith(`./demos/${component}/`))
		.map((path) => ({
			name: path.slice(path.lastIndexOf('/') + 1, -'.svelte'.length),
			component: components[path],
			source: sources[path]
				.replaceAll("'@registry/ui/", "'$lib/components/ui/")
				.replaceAll("'@registry/lib/", "'$lib/")
		}))
		.sort((a, b) => {
			const ia = DEMO_ORDER.indexOf(a.name);
			const ib = DEMO_ORDER.indexOf(b.name);
			return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
		});
}
