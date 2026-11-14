<script lang="ts">
	import { Tabs as TabsPrimitive } from '@human-kit/ui/tabs';
	import type { Component, ComponentProps } from 'svelte';
	import { getTabsVariant, tabsVariants } from './tabs-variants';

	type Props = ComponentProps<typeof TabsPrimitive.Tab> & {
		/** An icon before the label. */
		icon?: Component;
		/** How many items the panel holds, beside the label. Zero is left out. */
		count?: number;
	};

	let {
		icon: Icon,
		count,
		class: className,
		children,
		element = $bindable(null),
		...restProps
	}: Props = $props();

	const variant = getTabsVariant();
	const styles = $derived(tabsVariants({ variant }));
</script>

<TabsPrimitive.Tab bind:element class={styles.tab({ class: className })} {...restProps}>
	{#if Icon}<Icon aria-hidden="true" />{/if}
	{@render children?.()}
	{#if count}<span class={styles.count()}>{count}</span>{/if}
</TabsPrimitive.Tab>
