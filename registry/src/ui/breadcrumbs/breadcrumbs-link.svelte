<script lang="ts">
	import { Breadcrumbs as BreadcrumbsPrimitive } from '@human-kit/ui/breadcrumbs';
	import type { ComponentProps } from 'svelte';
	import { breadcrumbsVariants } from './breadcrumbs-variants';

	type Props = ComponentProps<typeof BreadcrumbsPrimitive.Link>;

	let { class: className, element = $bindable(null), ...restProps }: Props = $props();
</script>

<BreadcrumbsPrimitive.Link
	bind:element
	class={breadcrumbsVariants().link({ class: className })}
	{...restProps}
/>
