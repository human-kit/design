import { error } from '@sveltejs/kit';
import { demosOf } from '$lib/demos';
import { components } from '$lib/registry';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => components.map(({ name }) => ({ name }));

export const load: PageLoad = ({ params }) => {
	const entry = components.find(({ name }) => name === params.name);
	if (!entry) error(404, `No component "${params.name}".`);
	return { entry, demos: demosOf(entry.name) };
};
