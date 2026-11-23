import { getContext, setContext } from 'svelte';
import { segment } from '@registry/lib/segment';
import { tv, type VariantProps } from '@registry/lib/utils';

/**
 * Two ways to draw a set of tabs:
 * - `line`: a strip of titles over a rule, the picked one in ink with a line under it. For the
 *   sections of a page or a card.
 * - `segment`: a few options on a sunken rail, the picked one lifted on a chip. For switching
 *   between views of the same thing, such as a list and a calendar.
 *
 * The line and the chip are the indicator, measured in the browser and slid from tab to tab.
 * Until the page hydrates it has no size, so the picked tab draws its own; the list says when the
 * indicator takes over (`data-indicator-ready`).
 *
 * The list does not scroll: a scrolling box clips what is drawn outside it, and the focus halo is.
 * A strip too long for its place is better split, or put in a scrolling box with room around it.
 */
export const tabsVariants = tv({
	slots: {
		list: 'relative flex max-w-full items-center',
		tab: [
			'relative z-10 inline-flex shrink-0 cursor-default items-center justify-center gap-1.5 whitespace-nowrap',
			'text-body font-medium text-ink-muted outline-hidden select-none',
			'transition-[color,box-shadow,background-color] duration-150',
			'data-hovered:text-ink data-selected:text-ink',
			'data-focus-visible:shadow-focus',
			'data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-45',
			"[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_svg:not([class*='text-'])]:text-ink-subtle",
			'data-selected:[&_svg]:text-ink-muted'
		],
		count: 'font-normal text-ink-subtle tabular-nums',
		indicator: [
			'pointer-events-none absolute z-0 data-hidden:opacity-0',
			'left-(--active-tab-left) w-(--active-tab-width)',
			segment.slide
		],
		panel: 'outline-hidden focus-visible:shadow-focus'
	},
	variants: {
		variant: {
			line: {
				// The line runs along the rule, as wide as the word: the tab's side padding is room for
				// the focus halo, and the line steps in by it. 16px between two words, padding included.
				list: 'w-full gap-2 border-b border-line data-indicator-ready:*:after:hidden',
				tab: [
					'h-9 rounded-control px-1',
					'after:absolute after:inset-x-1 after:bottom-0 after:h-0.5 after:rounded-full after:bg-primary',
					'after:opacity-0 data-selected:after:opacity-100'
				],
				indicator: [
					// Over the tabs, so the focus halo of the picked one doesn't cover it.
					'bottom-0 z-20 h-0.5 rounded-full bg-primary',
					'left-[calc(var(--active-tab-left)+--spacing(1))] w-[calc(var(--active-tab-width)-(--spacing(2)))]'
				],
				panel: 'rounded-control pt-4'
			},
			segment: {
				// The rail and the chip of lib/segment, as the segmented toggle group draws them. 26px
				// high in all, with a button's text, so it sits in a toolbar beside one.
				list: ['w-fit', segment.rail, segment.handedOver],
				// Before the indicator, the picked tab is the chip, lift and all, as the indicator will
				// draw it: the server's paint does not change once the indicator takes over.
				tab: ['h-5.5 px-2 text-small [&_svg]:size-3.5', segment.chip, segment.picked],
				indicator: ['top-(--active-tab-top) h-(--active-tab-height)', segment.chip, segment.lifted],
				panel: 'rounded-control pt-3'
			}
		}
	},
	defaultVariants: { variant: 'line' }
});

export type TabsVariant = NonNullable<VariantProps<typeof tabsVariants>['variant']>;

const KEY = Symbol('tabs-variant');

/** The root tells its parts which look to draw. */
export function setTabsVariant(read: () => TabsVariant) {
	setContext(KEY, read);
}

export function getTabsVariant(): TabsVariant {
	return getContext<(() => TabsVariant) | undefined>(KEY)?.() ?? 'line';
}
