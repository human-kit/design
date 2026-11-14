<script lang="ts">
	import { Tabs as TabsPrimitive } from '@human-kit/ui/tabs';
	import type { ComponentProps } from 'svelte';
	import { getTabsVariant, tabsVariants } from './tabs-variants';

	let {
		class: className,
		children,
		element = $bindable(null),
		...restProps
	}: ComponentProps<typeof TabsPrimitive.Panel> = $props();

	const variant = getTabsVariant();
	const styles = $derived(tabsVariants({ variant }));
</script>

<!-- The panel takes the focus after its tab (Tab from the list), so its content is one key away. -->
<TabsPrimitive.Panel bind:element class={styles.panel({ class: className })} {...restProps}>
	{@render children?.()}
</TabsPrimitive.Panel>
