<script lang="ts" module>
	import { tv } from '@registry/lib/utils';

	/**
	 * A dark label beside what it describes, lit along its top: short, never anything to press.
	 * Ink on the canvas colour, so it is dark on a light page and light on a dark one.
	 */
	export const tooltipVariants = tv({
		slots: {
			content: [
				// As wide as its words up to 256px, then it wraps: not squeezed by the edge it floats near.
				'z-50 inline-flex w-max max-w-64 items-baseline gap-1.5 rounded-control bg-ink px-2 py-1 text-caption leading-4 font-medium text-canvas shadow-tooltip',
				'data-entering:animate-in data-entering:fade-in-0 data-entering:animation-duration-[100ms]',
				'data-exiting:animate-out data-exiting:fade-out-0 data-exiting:animation-duration-[80ms]'
			],
			// The keys that do the same, quieter than the text.
			shortcut: 'shrink-0 font-normal text-canvas/65 tabular-nums'
		}
	});
</script>

<script lang="ts">
	import { Tooltip as TooltipPrimitive } from '@human-kit/ui/tooltip';
	import type { ComponentProps } from 'svelte';

	type ContentProps = ComponentProps<typeof TooltipPrimitive.Content>;

	type Props = {
		/** What the tooltip says: a description of the control, not its name. */
		text: string;
		/** The keys that do the same, written after the text: "⌘ B". */
		shortcut?: string;
		/**
		 * The element it describes. Any element that takes the focus: the tooltip listens to it
		 * rather than wrapping it, so the element keeps its own component. Get it with
		 * `bind:element`.
		 */
		anchor: HTMLElement | null;
		placement?: ContentProps['placement'];
		offset?: number;
		/** Milliseconds from the pointer resting on the element to the open. A focus from the keyboard opens at once. */
		delay?: number;
		disabled?: boolean;
		class?: string;
	};

	let {
		text,
		shortcut,
		anchor,
		placement = 'top',
		offset = 6,
		delay,
		disabled = false,
		class: className
	}: Props = $props();

	const styles = tooltipVariants();
</script>

<TooltipPrimitive.Root triggerRef={anchor} {delay} {disabled}>
	<TooltipPrimitive.Content {placement} {offset} class={styles.content({ class: className })}>
		{text}
		{#if shortcut}
			<span class={styles.shortcut()}>{shortcut}</span>
		{/if}
	</TooltipPrimitive.Content>
</TooltipPrimitive.Root>
