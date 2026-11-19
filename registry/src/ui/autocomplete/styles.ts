import { tv } from '@registry/lib/utils';

/**
 * A list that is always in sight, with a search field at its head that filters it as one types.
 * It has no card of its own: it sits inside a panel, a card or a popover. The focus stays in the
 * search field; the arrows move a highlight through the rows.
 */
export const autocompleteVariants = tv({
	slots: {
		root: 'flex min-w-0 flex-col text-body text-ink',
		// A field of its own, grey under the pointer and ringed on focus. It sits 4px in, as the
		// rows do, so its halo fits; its magnifier and text stand over the rows' check and text.
		search: [
			'mx-1 mt-1 flex h-6.5 shrink-0 items-center gap-1.5 rounded-control ps-1 pe-1.5',
			'transition-[box-shadow,background-color] duration-150',
			'hover:not-focus-within:bg-hover focus-within:shadow-focus',
			'has-[input:disabled]:cursor-not-allowed has-[input:disabled]:opacity-45'
		],
		icon: 'pointer-events-none size-3.5 shrink-0 text-ink-subtle',
		input: [
			'h-full min-w-0 flex-1 truncate bg-transparent text-ink outline-hidden placeholder:text-ink-subtle',
			'disabled:cursor-not-allowed'
		],
		list: 'flex max-h-60 flex-col gap-0.5 overflow-y-auto p-1 outline-hidden',
		empty: 'flex h-6 items-center ps-6 pe-1.5 text-ink-subtle select-none'
	}
});

export const autocompleteStyles = autocompleteVariants();
