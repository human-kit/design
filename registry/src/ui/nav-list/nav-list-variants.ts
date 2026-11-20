import { tv } from '@registry/lib/utils';

/**
 * The links of a sidebar: rows as tall as a button, an icon, the name and maybe a count; the
 * page you are on in the kit's neutral selection. Groups take a quiet heading.
 */
export const navListVariants = tv({
	slots: {
		root: 'flex flex-col gap-4 text-body',
		group: 'flex flex-col gap-px',
		heading: 'flex h-6.5 items-center px-2 text-small font-medium text-ink-subtle',
		item: [
			'flex h-6.5 w-full min-w-0 cursor-pointer items-center gap-2 rounded-control px-2 text-start text-ink-muted outline-hidden',
			'transition-colors duration-150 hover:bg-hover hover:text-ink focus-visible:shadow-focus',
			'aria-[current=page]:bg-hover aria-[current=page]:font-medium aria-[current=page]:text-ink',
			'[&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-ink-subtle aria-[current=page]:[&_svg]:text-ink'
		],
		label: 'min-w-0 flex-1 truncate',
		count: 'shrink-0 text-small text-ink-subtle tabular-nums'
	}
});
