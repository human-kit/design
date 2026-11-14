<script lang="ts" module>
	import { tv } from '@registry/lib/utils';

	/**
	 * A 1px rule in the line colour: across its parent when horizontal, as tall as the row when
	 * vertical. Given a `value`, it is a splitter: the pointer grabs a strip 9px wide around the
	 * line, the line doubles under it, and turns to the ring colour while dragged or focused from
	 * the keyboard.
	 */
	export const separatorVariants = tv({
		base: [
			'relative shrink-0 bg-line',
			'data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full',
			'data-[orientation=vertical]:w-px data-[orientation=vertical]:self-stretch',
			// A splitter: a wider, unseen strip to grab, so the pointer does not have to hit 1px.
			'data-movable:outline-hidden data-movable:transition-colors data-movable:duration-150',
			'data-movable:before:absolute data-movable:before:content-[""]',
			'data-movable:data-[orientation=vertical]:cursor-col-resize data-movable:data-[orientation=vertical]:before:-inset-x-1',
			'data-movable:data-[orientation=vertical]:before:inset-y-0',
			'data-movable:data-[orientation=horizontal]:cursor-row-resize data-movable:data-[orientation=horizontal]:before:-inset-y-1',
			'data-movable:data-[orientation=horizontal]:before:inset-x-0',
			// Under the pointer and while dragged the line doubles to 2px, grey then in the ring colour.
			// The second pixel is a shadow to one side, so the panes beside it do not move.
			'data-movable:data-[orientation=vertical]:shadow-[1px_0_0_var(--grip,transparent)]',
			'data-movable:data-[orientation=horizontal]:shadow-[0_1px_0_var(--grip,transparent)]',
			'data-movable:not-data-disabled:not-data-dragging:not-data-focus-visible:hover:bg-ink-subtle',
			'data-movable:not-data-disabled:not-data-dragging:not-data-focus-visible:hover:[--grip:var(--ink-subtle)]',
			'data-dragging:bg-ring data-dragging:[--grip:var(--ring)]',
			// Focus from the keys draws the same 2px line: a halo round a line reads as a bar.
			'data-focus-visible:bg-ring data-focus-visible:[--grip:var(--ring)]',
			'data-disabled:cursor-default'
		]
	});
</script>

<script lang="ts">
	import { Separator as SeparatorPrimitive } from '@human-kit/ui/separator';
	import type { ComponentProps } from 'svelte';

	type Props = ComponentProps<typeof SeparatorPrimitive>;

	let {
		class: className,
		value = $bindable(),
		element = $bindable(null),
		...restProps
	}: Props = $props();
</script>

<!--
	Mark it `decorative` when the content already breaks there, as between two sections with
	headings: a screen reader then skips it. A splitter needs a name (`aria-label="Resize list"`)
	and `aria-controls` pointing at the pane it sizes.
-->
<SeparatorPrimitive
	bind:element
	bind:value
	class={separatorVariants({ class: className })}
	{...restProps}
/>
