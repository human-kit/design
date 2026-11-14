<script lang="ts">
	import { Menu as MenuPrimitive } from '@human-kit/ui/menu';
	import type { ComponentProps } from 'svelte';
	import { cn } from '@registry/lib/utils';

	let { class: className, ...restProps }: ComponentProps<typeof MenuPrimitive.Group> = $props();
</script>

<MenuPrimitive.Group class={cn('flex flex-col gap-0.5', className)} {...restProps} />
