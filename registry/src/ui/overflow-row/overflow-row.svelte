<script lang="ts" module>
	import { cn, tv } from '@registry/lib/utils';
	import { badgeVariants } from '@registry/ui/badge';

	/**
	 * Items on one line, as many as fit; the rest counted in a chip at the end. With `getLabel`,
	 * the chip is a button whose tooltip names what it hides, so the hidden items stay one press
	 * or one hover away.
	 */
	export const overflowRowVariants = tv({
		slots: {
			// The primitive clips the row sideways, which would cut the chips' edges and the focus halo
			// at its ends: 4px of padding holds them, and as much negative margin keeps the row in line.
			root: '-mx-1 flex min-w-0 items-center gap-1 px-1',
			// The plain badge, the count in muted ink: it reads as one more item of the row.
			more: cn(
				badgeVariants({ variant: 'outline', dot: false }),
				'text-ink-muted tabular-nums outline-hidden transition-[color,box-shadow] duration-150 ease-out'
			),
			moreButton: 'cursor-default hover:text-ink focus-visible:shadow-focus'
		}
	});
</script>

<script lang="ts" generics="T">
	import { OverflowRow as OverflowRowPrimitive } from '@human-kit/ui/overflow-row';
	import type { OverflowRowProps } from '@human-kit/ui/overflow-row';
	import { Tooltip } from '@registry/ui/tooltip';

	type Props = Omit<OverflowRowProps<T>, 'overflow' | 'class'> & {
		/** The name of an item, for the chip's tooltip and for screen readers. */
		getLabel?: (item: T) => string;
		/** The words read after the count: "3 more". */
		moreLabel?: string;
		class?: string;
	};

	let { items, getLabel, moreLabel = 'more', class: className, ...restProps }: Props = $props();

	const styles = overflowRowVariants();
	let chip = $state<HTMLButtonElement | null>(null);
</script>

<OverflowRowPrimitive {items} class={styles.root({ class: className })} {...restProps}>
	{#snippet overflow({ count, visible, total })}
		<!-- The primitive measures a copy of this chip with every item hidden: only the real one,
			with fewer shown than there are, takes the tooltip's anchor. -->
		{#if getLabel && visible < total}
			{@const hidden = items.slice(visible).map(getLabel).join(', ')}
			<button
				type="button"
				bind:this={chip}
				class={[styles.more(), styles.moreButton()]}
				aria-label="{count} {moreLabel}: {hidden}"
			>
				+{count}
			</button>
			<Tooltip anchor={chip} text={hidden} />
		{:else}
			<span class={styles.more()}>
				<span aria-hidden="true">+{count}</span>
				<span class="sr-only">{count} {moreLabel}</span>
			</span>
		{/if}
	{/snippet}
</OverflowRowPrimitive>
