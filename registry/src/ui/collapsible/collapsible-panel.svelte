<script lang="ts">
	import { Collapsible as CollapsiblePrimitive } from '@human-kit/ui/collapsible';
	import type { ComponentProps } from 'svelte';
	import { collapsibleVariants, getCollapsibleVariant } from './collapsible-variants';

	let {
		class: className,
		forceMount = true,
		children,
		element = $bindable(null),
		...restProps
	}: ComponentProps<typeof CollapsiblePrimitive.Panel> = $props();

	const variant = getCollapsibleVariant();
	const styles = $derived(collapsibleVariants({ variant }));
</script>

<!--
	Kept in the page while closed (`forceMount`), hidden: it opens with its motion the first time
	too, and a page drawn on the server already holds it.
-->
<CollapsiblePrimitive.Panel bind:element {forceMount} class={styles.panel()} {...restProps}>
	<div class={styles.content({ class: className })}>
		{@render children?.()}
	</div>
</CollapsiblePrimitive.Panel>
