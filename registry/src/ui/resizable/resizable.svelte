<script lang="ts" module>
	import { tv } from '@registry/lib/utils';

	/**
	 * Two panels side by side, or one over the other, and a line between them that is dragged
	 * to share the space: a list and its detail. The line is a separator the keyboard moves too:
	 * the arrows by 2%, Shift and an arrow by 10%, Home and End to the limits.
	 */
	export const resizableVariants = tv({
		slots: {
			root: 'flex min-h-0 min-w-0 data-[orientation=vertical]:flex-col',
			panel: 'min-h-0 min-w-0 overflow-hidden',
			// A 1px line with a wider strip round it to catch the pointer. It darkens under the
			// pointer and while dragged, and takes the ring's colour on focus.
			handle: [
				'relative z-10 shrink-0 bg-line outline-hidden transition-colors duration-150',
				'hover:bg-ink/25 focus-visible:bg-ring data-dragging:bg-ink/35',
				'after:absolute after:content-[""]',
				'data-[orientation=horizontal]:w-px data-[orientation=horizontal]:cursor-col-resize',
				'data-[orientation=horizontal]:after:inset-y-0 data-[orientation=horizontal]:after:-inset-x-1.5',
				'data-[orientation=vertical]:h-px data-[orientation=vertical]:cursor-row-resize',
				'data-[orientation=vertical]:after:inset-x-0 data-[orientation=vertical]:after:-inset-y-1.5'
			]
		}
	});
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		/** The first panel's share, in percent. */
		size?: number;
		min?: number;
		max?: number;
		/** `horizontal`: side by side. `vertical`: one over the other. */
		orientation?: 'horizontal' | 'vertical';
		/** The handle's name, read aloud: what it resizes. */
		label?: string;
		start: Snippet;
		end: Snippet;
		onSizeChange?: (size: number) => void;
		class?: string;
	};

	let {
		size = $bindable(50),
		min = 15,
		max = 85,
		orientation = 'horizontal',
		label = 'Resize the panels',
		start,
		end,
		onSizeChange,
		class: className
	}: Props = $props();

	const styles = resizableVariants();
	let root = $state<HTMLDivElement | null>(null);
	let dragging = $state(false);

	function set(next: number) {
		const clamped = Math.round(Math.min(max, Math.max(min, next)) * 10) / 10;
		if (clamped === size) return;
		size = clamped;
		onSizeChange?.(clamped);
	}

	function onPointerDown(event: PointerEvent) {
		if (event.button !== 0) return;
		event.preventDefault();
		(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
		(event.currentTarget as HTMLElement).focus();
		dragging = true;
	}

	function onPointerMove(event: PointerEvent) {
		if (!dragging || !root) return;
		const box = root.getBoundingClientRect();
		const rtl = getComputedStyle(root).direction === 'rtl';
		const share =
			orientation === 'horizontal'
				? ((rtl ? box.right - event.clientX : event.clientX - box.left) / box.width) * 100
				: ((event.clientY - box.top) / box.height) * 100;
		set(share);
	}

	function onKeydown(event: KeyboardEvent) {
		const step = event.shiftKey ? 10 : 2;
		const horizontal = orientation === 'horizontal';
		const rtl = root ? getComputedStyle(root).direction === 'rtl' : false;
		const sign = horizontal && rtl ? -1 : 1;
		const keys: Record<string, () => void> = {
			[horizontal ? 'ArrowLeft' : 'ArrowUp']: () => set(size - step * sign),
			[horizontal ? 'ArrowRight' : 'ArrowDown']: () => set(size + step * sign),
			Home: () => set(min),
			End: () => set(max)
		};
		if (!keys[event.key]) return;
		event.preventDefault();
		keys[event.key]();
	}
</script>

<div bind:this={root} data-orientation={orientation} class={styles.root({ class: className })}>
	<div class={styles.panel()} style:flex="0 0 {size}%">
		{@render start()}
	</div>
	<!-- A window splitter: its value is the first panel's share. A focusable separator is a
	     widget in ARIA, which the linter does not know. -->
	<!-- svelte-ignore a11y_no_noninteractive_tabindex, a11y_no_noninteractive_element_interactions -->
	<div
		role="separator"
		tabindex="0"
		aria-label={label}
		aria-orientation={orientation === 'horizontal' ? 'vertical' : 'horizontal'}
		aria-valuenow={size}
		aria-valuemin={min}
		aria-valuemax={max}
		data-orientation={orientation}
		data-dragging={dragging || undefined}
		class={styles.handle()}
		onpointerdown={onPointerDown}
		onpointermove={onPointerMove}
		onpointerup={() => (dragging = false)}
		onpointercancel={() => (dragging = false)}
		onkeydown={onKeydown}
	></div>
	<div class={styles.panel({ class: 'flex-1' })}>
		{@render end()}
	</div>
</div>
