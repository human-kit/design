<script lang="ts">
	import { Drawer as DrawerPrimitive } from '@human-kit/ui/drawer';
	import type { ComponentProps } from 'svelte';
	import { cn } from '@registry/lib/utils';

	let { class: className, ...restProps }: ComponentProps<typeof DrawerPrimitive.Title> = $props();
</script>

<DrawerPrimitive.Title class={cn('text-emphasis text-ink font-medium', className)} {...restProps} />
