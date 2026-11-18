<script lang="ts">
	import { Drawer as DrawerPrimitive } from '@human-kit/ui/drawer';
	import type { ComponentProps } from 'svelte';
	import { cn } from '@registry/lib/utils';

	let { class: className, ...restProps }: ComponentProps<typeof DrawerPrimitive.Description> =
		$props();
</script>

<DrawerPrimitive.Description
	class={cn('text-body text-ink-muted leading-4.75', className)}
	{...restProps}
/>
