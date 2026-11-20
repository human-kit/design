import { tv, type VariantProps } from '@registry/lib/utils';

/**
 * Facts about one thing, each a term and its value: "Date of birth — 12 March 1988". The parts
 * read the list's layout through the `dl` group.
 */
export const descriptionListVariants = tv({
	base: 'group/dl flex flex-col text-body',
	variants: {
		layout: {
			// The terms in a column of their own, the values beside them.
			horizontal: '',
			// Each term over its value, for a narrow column.
			vertical: 'gap-2.5'
		},
		// A thin line between the facts, for a long list read row by row.
		divided: { true: '', false: '' }
	},
	compoundVariants: [{ layout: 'horizontal', divided: false, class: 'gap-0' }],
	defaultVariants: { layout: 'horizontal', divided: false }
});

export const descriptionListItemVariants = tv({
	base: [
		// Horizontal: a row 24px tall at least, the kit's row; 32 with the lines, a section row.
		'group-data-[layout=horizontal]/dl:grid group-data-[layout=horizontal]/dl:grid-cols-[var(--dl-term,8rem)_minmax(0,1fr)]',
		'group-data-[layout=horizontal]/dl:gap-x-4 group-data-[layout=horizontal]/dl:py-0.5',
		'group-data-[layout=vertical]/dl:flex group-data-[layout=vertical]/dl:flex-col group-data-[layout=vertical]/dl:gap-0.5',
		'group-data-[divided=true]/dl:not-last:border-b group-data-[divided=true]/dl:border-line',
		// 5.5px each side: with the 1px line, 32 in all.
		'group-data-[divided=true]/dl:group-data-[layout=horizontal]/dl:py-[5.5px]',
		'group-data-[divided=true]/dl:group-data-[layout=vertical]/dl:not-last:pb-2.5'
	]
});

export const descriptionListTermVariants = tv({
	base: 'min-w-0 text-ink-muted group-data-[layout=vertical]/dl:text-small'
});

export const descriptionListDetailsVariants = tv({ base: 'min-w-0 text-ink' });

export type DescriptionListLayout = NonNullable<
	VariantProps<typeof descriptionListVariants>['layout']
>;
