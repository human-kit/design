<script lang="ts">
	import { Breadcrumbs as BreadcrumbsPrimitive } from '@human-kit/ui/breadcrumbs';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
	import type { ComponentProps } from 'svelte';
	import { breadcrumbsVariants } from './breadcrumbs-variants';

	type Props = ComponentProps<typeof BreadcrumbsPrimitive.Separator>;

	let { class: className, children, ...restProps }: Props = $props();
</script>

<!-- A chevron that points the way the trail reads: it turns round on a right-to-left page. -->
<BreadcrumbsPrimitive.Separator
	class={breadcrumbsVariants().separator({ class: className })}
	{...restProps}
>
	{#if children}{@render children()}{:else}<ChevronRight class="rtl:-scale-x-100" />{/if}
</BreadcrumbsPrimitive.Separator>
