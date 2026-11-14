<script lang="ts">
	import { Menu as MenuPrimitive } from '@human-kit/ui/menu';
	import type { ComponentProps } from 'svelte';
	import { cn } from '@registry/lib/utils';

	let { class: className, ...restProps }: ComponentProps<typeof MenuPrimitive.Separator> = $props();
</script>

<!-- Edge to edge of the panel, through its padding. -->
<MenuPrimitive.Separator class={cn('bg-line -mx-1 my-0.5 h-px', className)} {...restProps} />
