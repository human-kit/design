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

<!--
	The panel grows from the edge that faces the field, read from the side it opened on: from the
	centre, a tall panel's near edge slid toward the field while it faded in. The durations are
	set as `animation-duration`: a `duration-*` utility also sets the transition's, and the panel
	then slid each time its position was corrected.
-->
<SelectPrimitive.Popover
	class={cn(
		'rounded-card bg-overlay text-ink shadow-popover w-(--trigger-width) min-w-32 overflow-hidden',
		'data-entering:animate-in data-entering:fade-in-0 data-entering:zoom-in-98 data-entering:animation-duration-[120ms]',
		'data-exiting:animate-out data-exiting:fade-out-0 data-exiting:zoom-out-98 data-exiting:animation-duration-[100ms]',
		'data-[placement=bottom]:origin-top data-[placement=top]:origin-bottom',
		className
	)}
	{offset}
	{...restProps}
>
	<SelectPrimitive.List
		class={cn('flex max-h-60 flex-col gap-0.5 overflow-y-auto p-1 outline-hidden', listClass)}
	>
		{@render children?.()}
	</SelectPrimitive.List>
</SelectPrimitive.Popover>
