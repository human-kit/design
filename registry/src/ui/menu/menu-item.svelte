<script lang="ts" module>
	import { tv } from '@registry/lib/utils';

	/**
	 * A row of a menu. It answers the pointer and the keyboard through `data-highlighted`, the
	 * menu's own navigation, not `:hover`: the two move together, and only one row is lit. Quiet
	 * at rest like a ghost button, up to ink when lit; its icon stays a step lighter, so the word
	 * leads. Its corner is the panel's less the panel's padding, so the lit row nests in it.
	 */
	export const menuItemVariants = tv({
		slots: {
			row: [
				'relative flex h-6 shrink-0 cursor-default items-center gap-2 rounded-control px-1.5 text-body text-ink-muted outline-hidden transition-ink select-none',
				'data-highlighted:bg-hover data-highlighted:text-ink',
				'data-disabled:pointer-events-none data-disabled:opacity-45',
				'[&_svg]:pointer-events-none [&_svg]:size-3.5 [&_svg]:shrink-0 [&_svg]:text-ink-subtle data-highlighted:[&_svg]:text-ink-muted'
			],
			label: 'min-w-0 flex-1 truncate',
			// The keys that do the same, at the far end, quieter than the row.
			shortcut: 'ml-4 shrink-0 text-caption text-ink-subtle tabular-nums'
		},
		variants: {
			intent: {
				neutral: {},
				// A row that destroys or cannot be undone. Leaving (sign out) is not this.
				danger: {
					row: 'text-danger-ink data-highlighted:bg-danger-solid/10 data-highlighted:text-danger-ink [&_svg]:text-danger-ink data-highlighted:[&_svg]:text-danger-ink'
				}
			}
		},
		defaultVariants: { intent: 'neutral' }
	});
</script>

<script lang="ts">
	import { Menu as MenuPrimitive } from '@human-kit/ui/menu';
	import type { Component, ComponentProps } from 'svelte';

	type Props = ComponentProps<typeof MenuPrimitive.Item> & {
		/** The icon before the label. */
		icon?: Component<Record<string, unknown>>;
		/** The keys that do the same: "Ctrl D". */
		shortcut?: string;
		/** `danger` for an action that destroys or cannot be undone. */
		intent?: 'neutral' | 'danger';
	};

	let {
		icon: Icon,
		shortcut,
		intent = 'neutral',
		class: className,
		children,
		element = $bindable(null),
		...restProps
	}: Props = $props();

	const styles = $derived(menuItemVariants({ intent }));
</script>

<MenuPrimitive.Item bind:element class={styles.row({ class: className })} {...restProps}>
	{#if Icon}<Icon />{/if}
	<span class={styles.label()}>{@render children?.()}</span>
	{#if shortcut}
		<span class={styles.shortcut()}>{shortcut}</span>
	{/if}
</MenuPrimitive.Item>
