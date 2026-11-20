import { tv, type VariantProps } from '@registry/lib/utils';

/**
 * A box that holds one subject: a header with its title, the content, and a footer for its
 * actions. The sections are spaced by the card, so each one only sets its sides; the parts read
 * the card's variant and size through the `card` group, and a card inside a card keeps its own.
 */
export const cardVariants = tv({
	base: 'group/card flex flex-col text-body text-ink',
	variants: {
		variant: {
			outline: 'rounded-card bg-surface shadow-card',
			// A grey fill and no edge: a quieter box, for a subject that sits inside a card or beside
			// boxed ones. The hover grey, thinned, so a ghost button's hover still shows on it.
			ghost: 'rounded-card bg-hover/70',
			// Nothing at all: the same sections, flush with the edge of what holds them, for a subject
			// on a surface that already frames it.
			plain: ''
		},
		size: {
			sm: 'gap-2',
			default: 'gap-3'
		}
	},
	compoundVariants: [
		{ variant: ['outline', 'ghost'], size: 'sm', class: 'py-3' },
		{ variant: ['outline', 'ghost'], size: 'default', class: 'py-4' }
	],
	defaultVariants: { variant: 'outline', size: 'default' }
});

// The same inset on the sides as the card has above and below, so its padding is even.
const section = [
	'group-data-[size=sm]/card:px-3 group-data-[size=default]/card:px-4',
	'group-data-[variant=plain]/card:px-0'
];

export const cardHeaderVariants = tv({
	// The action takes the right column beside the title and the description.
	base: [...section, 'grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-3 gap-y-0.5']
});

export const cardTitleVariants = tv({
	base: 'col-start-1 font-medium text-ink group-data-[size=default]/card:text-emphasis'
});

export const cardDescriptionVariants = tv({ base: 'col-start-1 text-ink-muted' });

// As tall as the title's line, its buttons centred in it whatever their size: they hang out
// of it by a pixel or two, and the header does not grow.
export const cardActionVariants = tv({
	base: [
		'col-start-2 row-start-1 flex items-center gap-1',
		'group-data-[size=sm]/card:h-5 group-data-[size=default]/card:h-5.5'
	]
});

export const cardContentVariants = tv({ base: section });

export const cardFooterVariants = tv({ base: [...section, 'flex items-center gap-1.5'] });

export type CardVariant = NonNullable<VariantProps<typeof cardVariants>['variant']>;
export type CardSize = NonNullable<VariantProps<typeof cardVariants>['size']>;
