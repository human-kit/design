import type { Component } from 'svelte';

type Playground = { default: Component; covers: string[] };

const modules = import.meta.glob<Playground>('./playgrounds/*.svelte', { eager: true });

/** The playground of a component, if it has one: its panel sets the props of a live preview. */
export function playgroundOf(component: string): Playground | undefined {
	return modules[`./playgrounds/${component}.svelte`];
}
