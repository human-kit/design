import { tv } from '@registry/lib/utils';

/**
 * Rows of data in columns. Rows are 32px, a hairline between them; the header is a muted line
 * of names over a rule. The grey of the kit marks the row under the pointer, when a row can be
 * pressed, and the chosen ones. The keyboard's ring is drawn inside a cell or a row: the table
 * scrolls, so one outside would be cut.
 */
export const tableVariants = tv({
	slots: {
		frame: 'w-full overflow-auto',
		table: 'w-full border-separate border-spacing-0 text-body text-ink',
		header: '',
		body: '',
		footer: '',
		row: [
			'group/row transition-colors duration-150 ease-out outline-hidden',
			// A row that a press chooses or opens greys under the pointer.
			'not-data-disabled:data-actionable:hover:bg-hover data-selected:bg-hover',
			'not-data-disabled:in-data-[selection-mode=single]:hover:bg-hover not-data-disabled:in-data-[selection-mode=multiple]:hover:bg-hover',
			'data-focus-visible:outline-solid data-focus-visible:outline-[1.5px] data-focus-visible:-outline-offset-[1.5px] data-focus-visible:outline-primary',
			'data-disabled:text-ink-subtle'
		],
		// The rule under each row is drawn by its cells; the last row of the body has none, the
		// card's edge closes it.
		cell: [
			'h-8 border-b border-line px-3 text-start align-middle whitespace-nowrap outline-hidden',
			'[.table-check+&]:ps-2 group-last/row:border-b-0 in-[tfoot]:border-t in-[tfoot]:border-b-0 in-[tfoot]:font-medium',
			'data-focus-visible:outline-solid data-focus-visible:outline-[1.5px] data-focus-visible:-outline-offset-[1.5px] data-focus-visible:outline-primary'
		],
		head: [
			'relative h-8 border-b border-line px-3 text-start align-middle font-medium whitespace-nowrap text-ink-muted outline-hidden [.table-check+&]:ps-2',
			'data-focus-visible:outline-solid data-focus-visible:outline-[1.5px] data-focus-visible:-outline-offset-[1.5px] data-focus-visible:outline-primary'
		],
		// The column's name is the button: the arrows beside it say which way, faint until used.
		sort: [
			'-mx-1 inline-flex h-6 cursor-pointer items-center gap-1 rounded-control px-1 font-medium outline-hidden',
			'transition-colors duration-150 ease-out hover:bg-hover hover:text-ink data-sorted:text-ink',
			'[&_svg]:size-3.5 [&_svg]:shrink-0'
		],
		sortIcon: 'text-ink-subtle',
		// A grip at the column's end, 8px wide, the rule drawn by the primitive in its middle.
		resizer: [
			'absolute inset-y-1.5 -end-1 z-1 flex w-2 cursor-col-resize justify-center text-ink-subtle outline-hidden',
			'hover:text-ink data-resizing:text-primary data-focus-visible:text-primary'
		],
		// The 16px box in a 32px row has 8px over and under it, so it gets 8px at its sides too:
		// from the edge, and to the next column's text, whose cell drops to 8px after it.
		check: 'table-check w-6 ps-2 pe-0 [&>[data-table-checkbox]]:flex',
		empty: '[&>td]:h-24 [&>td]:text-center [&>td]:text-ink-subtle',
		section: [
			'outline-hidden [&>td]:h-8 [&>td]:border-b [&>td]:border-line [&>td]:bg-ink/2 [&>td]:px-3',
			'[&>td]:text-caption [&>td]:font-medium [&>td]:text-ink-muted',
			'[&>td]:data-focus-visible:outline-solid [&>td]:data-focus-visible:outline-[1.5px] [&>td]:data-focus-visible:-outline-offset-[1.5px] [&>td]:data-focus-visible:outline-primary'
		]
	},
	variants: {
		variant: {
			// A card of its own around the rows.
			outline: { frame: 'rounded-card bg-surface shadow-card' },
			// Rows straight on the surface it sits on, for a table inside a card or a panel.
			ghost: {}
		}
	},
	defaultVariants: { variant: 'outline' }
});

export const tableStyles = tableVariants();
