<script lang="ts">
	import { Autocomplete as AutocompletePrimitive } from '@human-kit/ui/autocomplete';
	import Check from '@lucide/svelte/icons/check';
	import type { ComponentProps } from 'svelte';
	import { cn } from '@registry/lib/utils';

	let {
		class: className,
		children,
		...restProps
	}: ComponentProps<typeof AutocompletePrimitive.Item> = $props();
</script>

<!--
	The select's row: quiet at rest, up to ink under the pointer or the arrows and while it is
	chosen, the check in a column of its own so the text starts at one place. The highlight is
	the grey alone: the focus stays in the search row, which already carries the ring.
-->
<AutocompletePrimitive.Item
	class={cn(
		'rounded-control relative grid h-6 shrink-0 cursor-default grid-cols-[0.875rem_minmax(0,1fr)] items-center gap-1.5 pr-1.5 pl-1',
		'text-body text-ink-muted transition-ink outline-hidden select-none',
		// The highlight shows only while one types or points: the list keeps a highlighted row
		// even when nobody is using it, and a grey row then reads as chosen.
		'data-hovered:bg-hover data-hovered:text-ink in-focus-within:data-focused:bg-hover in-focus-within:data-focused:text-ink',
		'data-selected:text-ink',
		'data-disabled:pointer-events-none data-disabled:opacity-45',
		'[&_svg]:pointer-events-none [&_svg]:size-3.5 [&_svg]:shrink-0',
		className
	)}
	{...restProps}
>
	<span class="text-ink-muted col-start-1 flex items-center">
		<AutocompletePrimitive.ItemIndicator class="flex data-[state=unchecked]:hidden">
			<Check />
		</AutocompletePrimitive.ItemIndicator>
	</span>
	<span class="col-start-2 truncate">{@render children?.()}</span>
</AutocompletePrimitive.Item>
