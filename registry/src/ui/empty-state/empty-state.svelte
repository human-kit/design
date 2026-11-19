<script lang="ts" module>
	import { tv, type VariantProps } from '@registry/lib/utils';

	/**
	 * What a list, a table or a page says while it has nothing to show: a mark, a title, a line
	 * on why, and the action that fills it. Centred in the space the content would take.
	 */
	export const emptyStateVariants = tv({
		slots: {
			root: 'flex w-full flex-col items-center justify-center text-center',
			// The mark sits on a small control tile, so a thin icon does not float alone.
			icon: 'grid shrink-0 place-items-center rounded-control bg-surface text-ink-subtle shadow-control',
			title: 'font-medium text-ink',
			description: 'max-w-80 text-ink-muted',
			actions: 'flex flex-wrap justify-center gap-1.5'
		},
		variants: {
			variant: {
				// Bare, for the body of a table, a panel or a page that is already a surface.
				ghost: {},
				// A card of its own, for a page section that would otherwise be blank.
				outline: { root: 'rounded-card bg-surface shadow-card' }
			},
			size: {
				// Inside a list or a popover: no mark, one line of help.
				sm: {
					root: 'gap-0.5 px-3 py-4 text-small',
					icon: 'hidden',
					actions: 'mt-2'
				},
				default: {
					root: 'gap-1 px-6 py-8 text-body',
					icon: 'mb-2 size-8 [&_svg]:size-4',
					title: 'text-emphasis',
					actions: 'mt-3'
				}
			}
		},
		defaultVariants: { variant: 'ghost', size: 'default' }
	});

	export type EmptyStateVariant = NonNullable<VariantProps<typeof emptyStateVariants>['variant']>;
	export type EmptyStateSize = NonNullable<VariantProps<typeof emptyStateVariants>['size']>;
</script>

<script lang="ts">
	import Inbox from '@lucide/svelte/icons/inbox';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'class'> & {
		class?: string;
		variant?: EmptyStateVariant;
		size?: EmptyStateSize;
		title?: string;
		/** The line on why it is empty, or what will appear here. */
		children?: Snippet;
		/** Buttons that fill it: `<Button size="sm">`. */
		actions?: Snippet;
		/** Your own mark in place of the tray. Not drawn at `sm`. */
		icon?: Snippet;
	};

	let {
		variant = 'ghost',
		size = 'default',
		title,
		children,
		actions,
		icon,
		class: className,
		...restProps
	}: Props = $props();

	const styles = $derived(emptyStateVariants({ variant, size }));
</script>

<div class={styles.root({ class: className })} {...restProps}>
	{#if size !== 'sm'}
		<span class={styles.icon()} aria-hidden="true">
			{#if icon}{@render icon()}{:else}<Inbox />{/if}
		</span>
	{/if}
	{#if title}<p class={styles.title()}>{title}</p>{/if}
	{#if children}<div class={styles.description()}>{@render children()}</div>{/if}
	{#if actions}<div class={styles.actions()}>{@render actions()}</div>{/if}
</div>
