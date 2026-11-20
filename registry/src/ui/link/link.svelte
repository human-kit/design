<script lang="ts" module>
	import { tv, type VariantProps } from '@registry/lib/utils';

	/**
	 * A link inside a line of text: underlined, so it is found without colour, on a thin line
	 * that firms up under the pointer. Off to another site, it says so with an arrow and in
	 * words, and opens in a new tab.
	 */
	export const linkVariants = tv({
		base: [
			'rounded-[2px] underline decoration-1 underline-offset-[3px] outline-hidden',
			'transition-[color,text-decoration-color] duration-150 focus-visible:shadow-focus',
			'[&_svg]:ms-0.5 [&_svg]:inline [&_svg]:size-[0.85em] [&_svg]:align-[-0.05em]'
		],
		variants: {
			variant: {
				// The ink of the text around it, the line in a lighter grey.
				default: 'text-ink decoration-ink/30 hover:decoration-ink',
				// For a link among quiet words: muted, its line only under the pointer.
				muted: 'text-ink-muted decoration-transparent hover:text-ink hover:decoration-ink/60'
			}
		},
		defaultVariants: { variant: 'default' }
	});

	export type LinkVariant = NonNullable<VariantProps<typeof linkVariants>['variant']>;
</script>

<script lang="ts">
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	type Props = Omit<HTMLAnchorAttributes, 'class'> & {
		class?: string;
		href: string;
		variant?: LinkVariant;
		/** Off to another site: a new tab, an arrow, and words that say so. */
		external?: boolean;
		externalLabel?: string;
	};

	let {
		href,
		variant = 'default',
		external = false,
		externalLabel = '(opens in a new tab)',
		class: className,
		children,
		...restProps
	}: Props = $props();
</script>

<a
	{href}
	target={external ? '_blank' : undefined}
	rel={external ? 'noopener noreferrer' : undefined}
	class={linkVariants({ variant, class: className })}
	{...restProps}
	>{@render children?.()}{#if external}<ArrowUpRight aria-hidden="true" /><span class="sr-only"
			>{externalLabel}</span
		>{/if}</a
>
