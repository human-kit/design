<script lang="ts" module>
	import { tv, type VariantProps } from '@registry/lib/utils';

	/**
	 * A key to press, written in a line of text: "Press ⌘ K to search". A combination is one
	 * `<kbd>` holding a chip for each key, as the HTML spec writes it.
	 */
	export const kbdVariants = tv({
		slots: {
			group: 'inline-flex items-center align-baseline font-sans',
			// 16px, 18 with the outline's edges: 2px short of the 20px line of body text, so a key
			// on one line never touches a key on the next.
			key: [
				'inline-grid h-4 min-w-4 place-items-center rounded-[4px] px-1',
				'font-sans text-caption leading-none font-medium text-ink-muted'
			]
		},
		variants: {
			variant: {
				// A chip with the control's edge, so it reads as something on the keyboard. 4px
				// between the chips of a combination: their edges are rings outside them, and 2px
				// read as one bar.
				outline: { group: 'gap-1', key: 'bg-surface shadow-control' },
				// The hover grey and no edge: quieter, for a hint that sits beside other words, or on
				// a surface that already has edges of its own.
				ghost: { group: 'gap-0.5', key: 'bg-hover' }
			}
		},
		defaultVariants: { variant: 'outline' }
	});

	export type KbdVariant = NonNullable<VariantProps<typeof kbdVariants>['variant']>;
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = Omit<HTMLAttributes<HTMLElement>, 'class' | 'children'> & {
		variant?: KbdVariant;
		/** The keys of a combination, each in its own chip: `['⌘', 'K']`. */
		keys?: string[];
		/** One key, in place of `keys`. */
		children?: Snippet;
		class?: string;
	};

	let { variant = 'outline', keys, children, class: className, ...restProps }: Props = $props();

	const styles = $derived(kbdVariants({ variant }));
</script>

{#if keys?.length}
	<kbd class={styles.group({ class: className })} {...restProps}>
		{#each keys as key, index (index)}
			<kbd class={styles.key()}>{key}</kbd>
		{/each}
	</kbd>
{:else}
	<kbd class={styles.key({ class: className })} {...restProps}>{@render children?.()}</kbd>
{/if}
