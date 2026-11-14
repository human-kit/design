<script lang="ts" module>
	import { tv, type VariantProps } from '@registry/lib/utils';

	/**
	 * The colours a badge comes in. A badge says what it means through its colour, but the
	 * meaning is the app's: one app's "Pending" is orange, another's amber. Map each state to a
	 * tone once, in the app, and every badge of that state follows.
	 *
	 * Written out whole so Tailwind finds each class.
	 */
	const TONES = {
		gray: {
			soft: 'border-tone-gray-line bg-tone-gray-soft text-tone-gray-ink',
			dot: 'bg-tone-gray-solid'
		},
		blue: {
			soft: 'border-tone-blue-line bg-tone-blue-soft text-tone-blue-ink',
			dot: 'bg-tone-blue-solid'
		},
		cyan: {
			soft: 'border-tone-cyan-line bg-tone-cyan-soft text-tone-cyan-ink',
			dot: 'bg-tone-cyan-solid'
		},
		teal: {
			soft: 'border-tone-teal-line bg-tone-teal-soft text-tone-teal-ink',
			dot: 'bg-tone-teal-solid'
		},
		green: {
			soft: 'border-tone-green-line bg-tone-green-soft text-tone-green-ink',
			dot: 'bg-tone-green-solid'
		},
		amber: {
			soft: 'border-tone-amber-line bg-tone-amber-soft text-tone-amber-ink',
			dot: 'bg-tone-amber-solid'
		},
		orange: {
			soft: 'border-tone-orange-line bg-tone-orange-soft text-tone-orange-ink',
			dot: 'bg-tone-orange-solid'
		},
		red: {
			soft: 'border-tone-red-line bg-tone-red-soft text-tone-red-ink',
			dot: 'bg-tone-red-solid'
		},
		pink: {
			soft: 'border-tone-pink-line bg-tone-pink-soft text-tone-pink-ink',
			dot: 'bg-tone-pink-solid'
		},
		violet: {
			soft: 'border-tone-violet-line bg-tone-violet-soft text-tone-violet-ink',
			dot: 'bg-tone-violet-solid'
		}
	} as const;

	export type BadgeTone = keyof typeof TONES;
	export const badgeTones = Object.keys(TONES) as BadgeTone[];

	export const badgeVariants = tv({
		// A 15px line, not the caption's 16: with its border, the chip stands 19px, which fits a
		// table row and a line of text without growing either. Aligned on the baseline, so the
		// badge sits on the line of the sentence around it; the dot centres itself.
		base: 'inline-flex w-fit shrink-0 items-baseline gap-1.5 rounded-control text-caption leading-3.75 font-medium whitespace-nowrap',
		variants: {
			variant: {
				// The tone painted whole: its surface, its words and its edge.
				default: 'border py-px shadow-chip',
				// A chip like a button, the words in ink and the tone in a dot. For a list where
				// many badges sit together: a column of painted chips is loud.
				// Its edge is a ring outside the box, so one pixel less padding stands it as tall as
				// the bordered chip.
				outline: 'bg-surface py-px text-ink shadow-control',
				// No chip at all: the dot and the words. For a place that already is a box.
				text: 'text-ink'
			},
			size: {
				sm: '',
				default: ''
			},
			// The dot is drawn by the instance; here it only makes room for it.
			dot: {
				true: '',
				false: ''
			}
		},
		compoundVariants: [
			{ variant: 'default', size: 'sm', class: 'px-1.5' },
			{ variant: 'default', size: 'default', class: 'px-2' },
			{ variant: 'default', size: 'default', dot: true, class: 'pl-1.5' },
			// Tighter where the dot is: even padding around it left the words against the far edge.
			{ variant: 'outline', class: 'pr-2 pl-1.5' }
		],
		defaultVariants: { variant: 'default', size: 'default' }
	});

	export type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>['variant']>;
	export type BadgeSize = NonNullable<VariantProps<typeof badgeVariants>['size']>;

	/** The tone's classes for a chip of the given look: only `default` paints it whole. */
	export function badgeToneClass(tone: BadgeTone, variant: BadgeVariant) {
		return variant === 'default' ? TONES[tone].soft : '';
	}

	/** The saturated fill of a tone, for a mark too small to read at its soft step. */
	export function badgeDotClass(tone: BadgeTone) {
		return TONES[tone].dot;
	}
</script>

<script lang="ts">
	import { cn } from '@registry/lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = HTMLAttributes<HTMLSpanElement> & {
		variant?: BadgeVariant;
		tone?: BadgeTone;
		size?: BadgeSize;
		/** The tone's dot before the words. Only `default` can go without it. */
		dot?: boolean;
	};

	let {
		variant = 'default',
		tone = 'gray',
		size = 'default',
		dot = true,
		class: className,
		children,
		...restProps
	}: Props = $props();

	// Outside the chip, the dot is all that carries the tone.
	const withDot = $derived(dot || variant !== 'default');
</script>

<span
	class={badgeVariants({
		variant,
		size,
		dot: withDot,
		class: cn(badgeToneClass(tone, variant), className)
	})}
	{...restProps}
>
	{#if withDot}
		<!-- Only drawn: the words say what the badge means. -->
		<span
			class={cn('size-1 shrink-0 self-center rounded-full', badgeDotClass(tone))}
			aria-hidden="true"
		></span>
	{/if}
	{@render children?.()}
</span>
