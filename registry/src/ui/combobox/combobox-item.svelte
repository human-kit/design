<script lang="ts">
	import { ComboBox as ComboboxPrimitive } from '@human-kit/ui/combobox';
	import Check from '@lucide/svelte/icons/check';
	import type { ComponentProps } from 'svelte';
	import { cn } from '@registry/lib/utils';

	let {
		class: className,
		children,
		...restProps
	}: ComponentProps<typeof ComboboxPrimitive.Item> = $props();
</script>

<!--
	The select's row: quiet at rest, up to ink under the pointer or the keyboard and while it is
	chosen, the check in a column of its own so the text starts at one place.
-->
<ComboboxPrimitive.Item
	class={cn(
		'rounded-control relative grid h-6 shrink-0 cursor-default grid-cols-[0.875rem_minmax(0,1fr)] items-center gap-1.5 pr-1.5 pl-1',
		'text-body text-ink-muted transition-ink outline-hidden select-none',
		'data-focused:bg-hover data-focused:text-ink data-selected:text-ink',
		'data-focus-visible:shadow-focus',
		'data-disabled:pointer-events-none data-disabled:opacity-45',
		'[&_svg]:pointer-events-none [&_svg]:size-3.5 [&_svg]:shrink-0',
		className
	)}
	{...restProps}
>
	<span class="text-ink-muted col-start-1 flex items-center">
		<ComboboxPrimitive.ItemIndicator class="flex data-[state=unchecked]:hidden">
			<Check />
		</ComboboxPrimitive.ItemIndicator>
	</span>
	<span class="col-start-2 truncate">{@render children?.()}</span>
</ComboboxPrimitive.Item>
