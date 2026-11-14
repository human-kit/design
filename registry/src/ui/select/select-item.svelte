<script lang="ts">
	import { Select as SelectPrimitive } from '@human-kit/ui/select';
	import Check from '@lucide/svelte/icons/check';
	import type { ComponentProps } from 'svelte';
	import { cn } from '@registry/lib/utils';

	let {
		class: className,
		children,
		...restProps
	}: ComponentProps<typeof SelectPrimitive.Item> = $props();
</script>

<SelectPrimitive.Item
	class={cn(
		'relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none',
		'data-focused:bg-accent data-focused:text-accent-foreground',
		'data-disabled:pointer-events-none data-disabled:opacity-50',
		// The list moves the focus between options with the arrow keys, thus the highlight
		// above is the keyboard focus. The ring marks it when it comes from the keyboard.
		'data-focus-visible:outline-ring data-focus-visible:outline-2 data-focus-visible:-outline-offset-2 data-focus-visible:outline-solid',
		'[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
		className
	)}
	{...restProps}
>
	{@render children?.()}
	<SelectPrimitive.ItemIndicator class="absolute right-2 flex size-4 items-center justify-center">
		<Check />
	</SelectPrimitive.ItemIndicator>
</SelectPrimitive.Item>
