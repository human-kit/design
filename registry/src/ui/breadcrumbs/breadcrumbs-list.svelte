<script lang="ts">
	import { Breadcrumbs as BreadcrumbsPrimitive } from '@human-kit/ui/breadcrumbs';
	import type { ComponentProps } from 'svelte';
	import { breadcrumbsVariants } from './breadcrumbs-variants';

	type Props = ComponentProps<typeof BreadcrumbsPrimitive.List>;

	let { class: className, element = $bindable(null), ...restProps }: Props = $props();
</script>

<BreadcrumbsPrimitive.List
	bind:element
	class={breadcrumbsVariants().list({ class: className })}
	{...restProps}
/>
