<script lang="ts">
	import { Menu as MenuPrimitive } from '@human-kit/ui/menu';
	import type { ComponentProps } from 'svelte';
	import { cn } from '@registry/lib/utils';

	let { class: className, ...restProps }: ComponentProps<typeof MenuPrimitive.GroupLabel> =
		$props();
</script>

<!-- The name of the rows under it, starting where their text does. -->
<MenuPrimitive.GroupLabel
	class={cn('text-caption text-ink-subtle px-1.5 pt-1 pb-0.5 font-medium', className)}
	{...restProps}
/>
