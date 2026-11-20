<script lang="ts" module>
	import { tv, type VariantProps } from '@registry/lib/utils';

	/**
	 * A region that scrolls on its own: the browser's scrolling, kept, with a thin bar in the
	 * kit's grey. With `fade`, the content thins out at an edge it continues past, so the cut
	 * reads as more to come. When it overflows it takes the keyboard's focus, so the arrows
	 * scroll it too.
	 */
	export const scrollAreaVariants = tv({
		base: [
			'min-h-0 min-w-0 rounded-[inherit] outline-hidden [scrollbar-width:thin]',
			'[scrollbar-color:color-mix(in_oklch,var(--ink)_22%,transparent)_transparent]',
			'focus-visible:shadow-focus-inset'
		],
		variants: {
			orientation: {
				vertical: 'overflow-x-hidden overflow-y-auto',
				horizontal: 'overflow-x-auto overflow-y-hidden',
				both: 'overflow-auto'
			},
			fade: { true: '', false: '' }
		},
		compoundVariants: [
			{
				orientation: ['vertical', 'horizontal'],
				fade: true,
				class:
					'[--fade-end:0px] [--fade-start:0px] data-more-end:[--fade-end:1.5rem] data-more-start:[--fade-start:1.5rem]'
			},
			{
				orientation: 'vertical',
				fade: true,
				class:
					'mask-[linear-gradient(to_bottom,transparent,black_var(--fade-start),black_calc(100%-var(--fade-end)),transparent)]'
			},
			{
				orientation: 'horizontal',
				fade: true,
				class:
					'mask-[linear-gradient(to_right,transparent,black_var(--fade-start),black_calc(100%-var(--fade-end)),transparent)]'
			}
		],
		defaultVariants: { orientation: 'vertical', fade: false }
	});

	export type ScrollAreaOrientation = NonNullable<
		VariantProps<typeof scrollAreaVariants>['orientation']
	>;
</script>

<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = Omit<HTMLAttributes<HTMLDivElement>, 'class'> & {
		class?: string;
		orientation?: ScrollAreaOrientation;
		/** Thins the content out at an edge it goes on past. Not for `both`. */
		fade?: boolean;
		/** The region's name, read when the keyboard reaches it. */
		label?: string;
		element?: HTMLDivElement | null;
	};

	let {
		orientation = 'vertical',
		fade = false,
		label,
		element = $bindable(null),
		class: className,
		children,
		onscroll,
		...restProps
	}: Props = $props();

	let overflows = $state(false);
	let moreStart = $state(false);
	let moreEnd = $state(false);

	function measure() {
		if (!element) return;
		const horizontal = orientation === 'horizontal';
		const position = Math.abs(horizontal ? element.scrollLeft : element.scrollTop);
		const size = horizontal ? element.clientWidth : element.clientHeight;
		const total = horizontal ? element.scrollWidth : element.scrollHeight;
		overflows =
			element.scrollHeight > element.clientHeight + 1 ||
			element.scrollWidth > element.clientWidth + 1;
		moreStart = position > 1;
		moreEnd = position + size < total - 1;
	}

	$effect(() => {
		if (!element) return;
		measure();
		const observer = new ResizeObserver(measure);
		observer.observe(element);
		for (const child of element.children) observer.observe(child);
		return () => observer.disconnect();
	});
</script>

<!-- Focusable only while it overflows, so the keys scroll it: a region with nothing to scroll
     is no stop for Tab. -->
<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div
	bind:this={element}
	role={label ? 'region' : undefined}
	aria-label={label}
	tabindex={overflows ? 0 : undefined}
	data-more-start={moreStart || undefined}
	data-more-end={moreEnd || undefined}
	class={scrollAreaVariants({ orientation, fade, class: className })}
	onscroll={(event) => {
		measure();
		onscroll?.(event);
	}}
	{...restProps}
>
	{@render children?.()}
</div>
