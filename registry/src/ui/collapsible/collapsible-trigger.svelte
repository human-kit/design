<script lang="ts">
	import { Collapsible as CollapsiblePrimitive } from '@human-kit/ui/collapsible';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
	import type { ComponentProps } from 'svelte';
	import { collapsibleVariants, getCollapsibleVariant } from './collapsible-variants';

	let {
		class: className,
		children,
		element = $bindable(null),
		...restProps
	}: ComponentProps<typeof CollapsiblePrimitive.Trigger> = $props();

	const variant = getCollapsibleVariant();
	const styles = $derived(collapsibleVariants({ variant }));
</script>

<!-- The chevron points at the text while closed and down at the panel while open. -->
<CollapsiblePrimitive.Trigger
	bind:element
	class={styles.trigger({ class: className })}
	{...restProps}
>
	<ChevronRight class={styles.chevron()} aria-hidden="true" />
	{@render children?.()}
</CollapsiblePrimitive.Trigger>
