import { getContext, setContext } from 'svelte';
import { tv, type VariantProps } from '@registry/lib/utils';

/**
 * A stack of rows that each open on what they hold, ruled off from one another.
 * - `card`: on a card of its own, for a page.
 * - `flush`: the rules only, for a place that already frames it, such as a dialog's body.
 */
export const accordionVariants = tv({
	slots: {
		root: 'flex flex-col divide-y divide-line',
		header: 'flex',
		// The row lights under the pointer as a menu's row does. Its halo is drawn inward: the
		// card clips what a row draws outside it.
		trigger: [
			'group/accordion-trigger flex h-8 w-full cursor-pointer items-center justify-between gap-3 px-3 text-left',
			'text-body font-medium text-ink outline-hidden transition-[background-color,box-shadow] duration-150',
			'data-hovered:bg-hover data-focus-visible:shadow-focus-inset',
			'data-disabled:cursor-not-allowed data-disabled:opacity-45'
		],
		chevron: [
			'size-4 shrink-0 text-ink-subtle transition-transform duration-150 ease-out motion-reduce:transition-none',
			'group-data-hovered/accordion-trigger:text-ink-muted group-data-open/accordion-trigger:rotate-180'
		],
		// The primitive measures the content into `--accordion-panel-height` and marks the start
		// and the end of the motion, so a real height is animated.
		panel: [
			'h-(--accordion-panel-height) overflow-hidden transition-[height,opacity] duration-150 ease-out',
			'data-starting-style:h-0 data-starting-style:opacity-0 data-ending-style:h-0 data-ending-style:opacity-0',
			'motion-reduce:transition-none'
		],
		content: 'px-3 pt-0.5 pb-2.5 text-body text-ink-muted'
	},
	variants: {
		variant: {
			card: { root: 'overflow-hidden rounded-card bg-surface shadow-card' },
			// The rules only. Each row lights within them, rounded as a menu's row, its text and its
			// chevron 8px in, and 2px clear of the rules above and below; with no card to clip it, the
			// halo goes back outside. The panel's text starts where the row's does.
			flush: {
				header: 'py-0.5',
				trigger: 'h-7 rounded-control px-2 data-focus-visible:shadow-focus',
				content: 'px-2'
			}
		}
	},
	defaultVariants: { variant: 'card' }
});

export type AccordionVariant = NonNullable<VariantProps<typeof accordionVariants>['variant']>;

const KEY = Symbol('accordion-variant');

export function setAccordionVariant(read: () => AccordionVariant) {
	setContext(KEY, read);
}

export function getAccordionVariant(): AccordionVariant {
	return getContext<(() => AccordionVariant) | undefined>(KEY)?.() ?? 'card';
}
