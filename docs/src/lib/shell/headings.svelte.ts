import { getContext, setContext } from 'svelte';

export type Heading = { id: string; text: string; depth: 2 | 3 };

/**
 * The headings of the page, for the outline. Each heading enters the list as it is created, in
 * the order of the page, so the server renders the outline with the page: the pane comes before
 * the outline's rail in the markup. Nothing is read back from the DOM.
 */
export class Headings {
	// Raw: the headings are replaced, never changed, and removal compares them by identity.
	list = $state.raw<Heading[]>([]);

	add(heading: Heading) {
		this.list = [...this.list, heading];
		return () => {
			this.list = this.list.filter((other) => other !== heading);
		};
	}
}

const KEY = Symbol('headings');

export const setHeadings = (headings: Headings) => setContext(KEY, headings);
export const getHeadings = () => getContext<Headings | undefined>(KEY);
