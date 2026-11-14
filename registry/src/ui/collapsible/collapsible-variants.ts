import { getContext, setContext } from 'svelte';
import { tv, type VariantProps } from '@registry/lib/utils';

/**
 * A button that shows and hides what follows it, with a chevron at its start, and the panel
 * opening under it on its own height.
 * - `ghost`: a quiet row of text in the flow of the page, no box.
 * - `outline`: on a card of its own, as the accordion's, for a section on the page.
 */
export const collapsibleVariants = tv({
	slots: {
		root: 'flex flex-col',
		trigger: [
			'group/collapsible-trigger flex cursor-pointer items-center gap-1.5 text-left',
			'text-body font-medium text-ink outline-hidden transition-[background-color,box-shadow] duration-150',
			'data-hovered:bg-hover data-disabled:cursor-not-allowed data-disabled:opacity-45'
		],
		chevron: [
			'size-3.5 shrink-0 text-ink-subtle transition-transform duration-200 ease-out motion-reduce:transition-none',
			'group-data-hovered/collapsible-trigger:text-ink-muted group-data-open/collapsible-trigger:rotate-90',
			'rtl:-scale-x-100'
		],
		// The primitive measures the content into `--collapsible-panel-height` and marks the start
		// and the end of the motion, so a real height is animated.
		panel: [
			'h-(--collapsible-panel-height) overflow-hidden transition-[height,opacity] duration-200 ease-out',
			'data-starting-style:h-0 data-starting-style:opacity-0 data-ending-style:h-0 data-ending-style:opacity-0',
			'motion-reduce:transition-none'
		],
		// The text starts under the trigger's words, past the chevron.
		content: 'text-body text-ink-muted'
	},
	variants: {
		variant: {
			// A ghost button's row, its text where the text around it starts: the fill under the
			// pointer reaches 8px past it on each side.
			ghost: {
				trigger: '-mx-2 h-6.5 w-fit rounded-control px-2 data-focus-visible:shadow-focus',
				content: 'ps-5 pt-1'
			},
			// The box clips what the row draws outside it, so the row's halo is drawn inward, on the
			// box's corners: all four while closed, the top two while the panel hangs under it.
			outline: {
				root: 'overflow-hidden rounded-card bg-surface shadow-card',
				trigger: [
					'h-8 w-full px-3 data-focus-visible:shadow-focus-inset',
					'rounded-card data-open:rounded-b-none'
				],
				content: 'ps-8 pe-3 pb-2.5'
			}
		}
	},
	defaultVariants: { variant: 'ghost' }
});

export type CollapsibleVariant = NonNullable<VariantProps<typeof collapsibleVariants>['variant']>;

const KEY = Symbol('collapsible-variant');

export function setCollapsibleVariant(read: () => CollapsibleVariant) {
	setContext(KEY, read);
}

export function getCollapsibleVariant(): CollapsibleVariant {
	return getContext<(() => CollapsibleVariant) | undefined>(KEY)?.() ?? 'ghost';
}
