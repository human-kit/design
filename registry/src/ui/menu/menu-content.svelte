<script lang="ts">
	import { Menu as MenuPrimitive } from '@human-kit/ui/menu';
	import type { ComponentProps } from 'svelte';
	import { cn } from '@registry/lib/utils';

	let {
		class: className,
		offset = 4,
		children,
		...restProps
	}: ComponentProps<typeof MenuPrimitive.Content> = $props();
</script>

<!--
	The panel of a select: the same surface, shadow and entrance. It grows from the edge that
	faces the trigger, read from the side it opened on (the primitive gives the side only). The
	durations are set as `animation-duration`: a `duration-*` utility also sets the transition's,
	and the panel then slid each time its position was corrected.
	Past 320px a long row is cut with an ellipsis rather than stretching the panel.
-->
<MenuPrimitive.Content
	{offset}
	class={cn(
		'rounded-card bg-overlay text-ink shadow-popover z-50 flex max-w-80 min-w-48 flex-col gap-0.5 overflow-hidden p-1 outline-hidden',
		'data-entering:animate-in data-entering:fade-in-0 data-entering:zoom-in-98 data-entering:animation-duration-[120ms]',
		'data-exiting:animate-out data-exiting:fade-out-0 data-exiting:zoom-out-98 data-exiting:animation-duration-[100ms]',
		'data-[placement=bottom]:origin-top data-[placement=left]:origin-right data-[placement=right]:origin-left data-[placement=top]:origin-bottom',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</MenuPrimitive.Content>
