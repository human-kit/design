<script lang="ts">
	import { Breadcrumbs as BreadcrumbsPrimitive } from '@human-kit/ui/breadcrumbs';
	import Ellipsis from '@lucide/svelte/icons/ellipsis';
	import type { ComponentProps } from 'svelte';
	import Separator from './breadcrumbs-separator.svelte';
	import { breadcrumbsVariants } from './breadcrumbs-variants';

	type Props = ComponentProps<typeof BreadcrumbsPrimitive.Ellipsis>;

	let {
		class: className,
		children,
		separator: customSeparator,
		element = $bindable(null),
		...restProps
	}: Props = $props();

	const styles = breadcrumbsVariants();
</script>

<!-- Put it after the first item. It shows only while the trail is folded, and unfolds it. -->
<BreadcrumbsPrimitive.Ellipsis
	bind:element
	class={styles.ellipsis({ class: className })}
	itemClass={styles.item()}
	{...restProps}
>
	{#snippet separator()}
		{#if customSeparator}{@render customSeparator()}{:else}<Separator />{/if}
	{/snippet}
	{#if children}{@render children()}{:else}<Ellipsis />{/if}
</BreadcrumbsPrimitive.Ellipsis>
