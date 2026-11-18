<script lang="ts">
	import { Drawer as DrawerPrimitive } from '@human-kit/ui/drawer';
	import type { ComponentProps } from 'svelte';
	import { cn } from '@registry/lib/utils';

	let {
		class: className,
		children,
		...restProps
	}: ComponentProps<typeof DrawerPrimitive.Body> = $props();
</script>

<!-- What the panel holds. It alone scrolls, and a scroll that reaches its end stops there instead
     of moving the page behind. -->
<DrawerPrimitive.Body
	class={cn('flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-3 pt-1 pb-4', className)}
	{...restProps}
>
	{@render children?.()}
</DrawerPrimitive.Body>
