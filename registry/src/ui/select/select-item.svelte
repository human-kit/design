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

<!--
	A row is quiet at rest, like a ghost button, and comes up to ink under the pointer or the
	keyboard and while it is chosen. The check leads the row in a column of its own, so the text
	starts at the same place whether the row is chosen or not. Its corner is the panel's less the
	panel's padding, so the lit row nests in it.
-->
<SelectPrimitive.Item
	class={cn(
		'rounded-control relative grid h-6 shrink-0 cursor-default grid-cols-[0.875rem_minmax(0,1fr)] items-center gap-1.5 pr-1.5 pl-1',
		'text-body text-ink-muted outline-hidden transition-colors select-none',
		'data-focused:bg-hover data-focused:text-ink data-selected:text-ink',
		// The list moves the focus between rows with the arrow keys, thus the shade above is
		// also the keyboard's. The ring says it when the keyboard put it there.
		'data-focus-visible:shadow-focus',
		'data-disabled:pointer-events-none data-disabled:opacity-45',
		'[&_svg]:pointer-events-none [&_svg]:size-3.5 [&_svg]:shrink-0',
		className
	)}
	{...restProps}
>
	<span class="text-ink-muted col-start-1 flex items-center">
		<SelectPrimitive.ItemIndicator class="flex">
			<Check />
		</SelectPrimitive.ItemIndicator>
	</span>
	<span class="col-start-2 truncate">{@render children?.()}</span>
</SelectPrimitive.Item>
