<script lang="ts">
	import { Select as SelectPrimitive } from '@human-kit/ui/select';
	import type { ComponentProps } from 'svelte';
	import { cn } from '@registry/lib/utils';

	type Props = ComponentProps<typeof SelectPrimitive.Popover> & {
		/** The CSS class names of the list inside the popover. */
		listClass?: string;
	};

	let { class: className, listClass, offset = 4, children, ...restProps }: Props = $props();
</script>

<SelectPrimitive.Popover
	class={cn(
		'bg-overlay text-ink w-(--trigger-width) min-w-32 overflow-hidden rounded-md border p-1 shadow-md duration-100',
		'data-entering:animate-in data-entering:fade-in-0 data-entering:zoom-in-95 data-exiting:animate-out data-exiting:fade-out-0 data-exiting:zoom-out-95',
		className
	)}
	{offset}
	{...restProps}
>
	<SelectPrimitive.List class={cn('max-h-72 overflow-y-auto outline-hidden', listClass)}>
		{@render children?.()}
	</SelectPrimitive.List>
</SelectPrimitive.Popover>
