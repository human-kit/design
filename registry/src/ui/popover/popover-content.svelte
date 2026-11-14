<script lang="ts">
	import { Popover as PopoverPrimitive } from '@human-kit/ui/popover';
	import type { ComponentProps } from 'svelte';
	import { cn } from '@registry/lib/utils';
	import { setPopoverLabels } from './context';

	let {
		class: className,
		offset = 4,
		placement = 'bottom-start',
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby,
		'aria-describedby': ariaDescribedby,
		children,
		...restProps
	}: ComponentProps<typeof PopoverPrimitive.Content> = $props();

	const uid = $props.id();
	const labels = $state({
		titleId: `${uid}-title`,
		descriptionId: `${uid}-description`,
		hasTitle: false,
		hasDescription: false
	});
	setPopoverLabels(labels);

	// A panel is a dialog, and a dialog needs a name: its title gives it one unless it has its own.
	const labelledby = $derived(
		ariaLabelledby ?? (ariaLabel === undefined && labels.hasTitle ? labels.titleId : undefined)
	);
	const describedby = $derived(
		ariaDescribedby ?? (labels.hasDescription ? labels.descriptionId : undefined)
	);
</script>

<!--
	The panel of a menu or a select, with room for what it holds: 12px around, 288px wide. It
	grows from the edge that faces the trigger, read from the side it opened on. The durations are
	set as `animation-duration`: a `duration-*` utility also sets the transition's, and the panel
	then slid each time its position was corrected.
-->
<PopoverPrimitive.Content
	{offset}
	{placement}
	aria-label={ariaLabel}
	aria-labelledby={labelledby}
	aria-describedby={describedby}
	class={cn(
		'rounded-card bg-overlay text-body text-ink shadow-popover z-50 flex w-72 max-w-[calc(100vw-1rem)] flex-col gap-3 p-3 outline-hidden',
		'data-entering:animate-in data-entering:fade-in-0 data-entering:zoom-in-98 data-entering:animation-duration-[120ms]',
		'data-exiting:animate-out data-exiting:fade-out-0 data-exiting:zoom-out-98 data-exiting:animation-duration-[100ms]',
		'data-[placement=bottom]:origin-top data-[placement=left]:origin-right data-[placement=right]:origin-left data-[placement=top]:origin-bottom',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</PopoverPrimitive.Content>
