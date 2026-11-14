<script lang="ts">
	import { Tabs as TabsPrimitive } from '@human-kit/ui/tabs';
	import { onMount, type ComponentProps } from 'svelte';
	import { getTabsVariant, tabsVariants } from './tabs-variants';

	let {
		class: className,
		children,
		element = $bindable(null),
		...restProps
	}: ComponentProps<typeof TabsPrimitive.List> = $props();

	const variant = getTabsVariant();
	const styles = $derived(tabsVariants({ variant }));

	// The indicator is measured on the client: from then on the picked tab stops drawing its own.
	let ready = $state(false);
	onMount(() => (ready = true));
</script>

<!-- Name the list with `aria-label` when nothing on the page already says what the tabs split. -->
<TabsPrimitive.List
	bind:element
	class={styles.list({ class: className })}
	data-indicator-ready={ready || undefined}
	{...restProps}
>
	<TabsPrimitive.Indicator class={styles.indicator()} />
	{@render children?.()}
</TabsPrimitive.List>
