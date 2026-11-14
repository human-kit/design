import { tv } from '@registry/lib/utils';

/**
 * The trail of pages above the current one, in the body's size: the pages before it quiet, the
 * one the user is on in full ink. A small chevron between two pages, quieter still. A long trail
 * folds its middle into a "…" button the size of the text line.
 */
export const breadcrumbsVariants = tv({
	slots: {
		list: 'flex flex-wrap items-center gap-2 text-body text-ink-muted',
		item: 'inline-flex items-center gap-2',
		link: [
			'relative outline-hidden transition-colors duration-150',
			'[&[href]]:hover:text-ink',
			// The ring keeps 2px of air round the words, drawn by a pseudo-element so it takes no room.
			'after:pointer-events-none after:absolute after:-inset-x-1 after:-inset-y-0.5 after:rounded-md focus-visible:after:shadow-focus',
			'data-current:font-medium data-current:text-ink',
			'data-disabled:text-ink-subtle'
		],
		separator: 'inline-flex shrink-0 text-ink-subtle [&_svg]:size-3.5',
		ellipsis: [
			'grid size-5 cursor-pointer place-items-center rounded-md text-ink-muted outline-hidden',
			'transition-colors duration-150 data-hovered:bg-hover data-hovered:text-ink',
			'data-focus-visible:shadow-focus [&_svg]:size-4'
		]
	}
});
