<script lang="ts">
	import { Breadcrumbs as BreadcrumbsPrimitive } from '@human-kit/ui/breadcrumbs';
	import type { ComponentProps } from 'svelte';
	import { breadcrumbsVariants } from './breadcrumbs-variants';

	type Props = ComponentProps<typeof BreadcrumbsPrimitive.Item>;

	let { class: className, element = $bindable(null), ...restProps }: Props = $props();
</script>

<BreadcrumbsPrimitive.Item
	bind:element
	class={breadcrumbsVariants().item({ class: className })}
	{...restProps}
/>
