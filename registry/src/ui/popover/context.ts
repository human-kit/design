import { getContext, setContext } from 'svelte';

/** The ids a panel names and describes itself by, filled in by a title and a description. */
export type PopoverLabels = {
	titleId: string;
	descriptionId: string;
	hasTitle: boolean;
	hasDescription: boolean;
};

const KEY = Symbol('popover-labels');

export function setPopoverLabels(labels: PopoverLabels) {
	setContext(KEY, labels);
}

export function getPopoverLabels(): PopoverLabels | undefined {
	return getContext<PopoverLabels | undefined>(KEY);
}
