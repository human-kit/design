import { error } from '@sveltejs/kit';
import { demosOf } from '$lib/demos';
import { isBold } from '$lib/playground/bold.svelte';
import { LOOKS } from '$lib/playground/looks';
import { components } from '$lib/registry';
import type { PageLoad } from './$types';

// Not linked, thus not crawled: 'auto' keeps the build from asking for it to be prerendered.
export const prerender = 'auto';

/** The Button page as the docs draw it, with the playground in the look the URL names. */
export const load: PageLoad = ({ params }) => {
	if (!(params.look in LOOKS) && !isBold(params.look)) error(404, `No look "${params.look}".`);
	const entry = components.find(({ name }) => name === 'button');
	if (!entry) error(404, 'No Button.');
	return { look: params.look, entry, demos: demosOf(entry.name) };
};
