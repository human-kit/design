import { tv } from '@registry/lib/utils';

/**
 * Things that happened, in order: each with its mark, a title, when, and what. A line joins the
 * marks; the column the marks stand in is as wide as one line of body text is tall, so a mark
 * sits centred on its title.
 */
export const timelineVariants = tv({
	slots: {
		root: 'group/timeline flex flex-col text-body',
		item: 'group/item grid grid-cols-[1.25rem_minmax(0,1fr)] gap-x-2.5',
		rail: 'flex flex-col items-center',
		// 20px, a body line: the dot or the icon tile is centred in it.
		markBox: 'grid h-5 place-items-center',
		dot: 'size-2 rounded-full',
		// The tile an icon stands on: the control's edge in `outline`, the hover grey in `ghost`.
		icon: [
			'grid size-5 place-items-center rounded-full text-ink-subtle [&_svg]:size-3',
			'group-data-[variant=outline]/timeline:bg-surface group-data-[variant=outline]/timeline:shadow-control',
			'group-data-[variant=ghost]/timeline:bg-hover'
		],
		// From under the mark to the next one, 4px clear of each.
		line: 'my-1 w-px flex-1 bg-line group-last/item:hidden',
		content: 'flex min-w-0 flex-col gap-0.5 pb-5 group-last/item:pb-0',
		header: 'flex flex-wrap items-baseline gap-x-2',
		title: 'font-medium text-ink',
		time: 'text-small text-ink-subtle tabular-nums',
		description: 'text-ink-muted'
	}
});

/** How an icon's tile is drawn; the dots are the same in both. */
export type TimelineVariant = 'outline' | 'ghost';
