<script lang="ts" module>
	import { getContext, setContext } from 'svelte';
	import { segment } from '@registry/lib/segment';
	import { tv } from '@registry/lib/utils';
	import type { ToggleSize, ToggleVariant } from '@registry/ui/toggle';

	type Orientation = 'horizontal' | 'vertical';
	/** A toggle's own looks, and `segment`, which only a group has. */
	export type ToggleGroupVariant = ToggleVariant | 'segment';
	type Look = { variant: ToggleGroupVariant; size: ToggleSize; orientation: Orientation };

	const KEY = Symbol('toggle-group-look');

	/** The look the group gives its toggles. */
	export function getToggleGroupLook(): Look {
		return (
			getContext<(() => Look) | undefined>(KEY)?.() ?? {
				variant: 'ghost',
				size: 'default',
				orientation: 'horizontal'
			}
		);
	}

	/**
	 * The toggles of a group make one piece: no gap between them, the corners only at its two ends.
	 * In `outline` the piece is one box with one edge, ruled inside between its toggles; the toggles
	 * themselves are drawn bare, so two edges never meet.
	 *
	 * In `segment` it is the rail and chips of lib/segment, as the segmented tabs draw them: a
	 * value picked, where tabs pick a view. For a choice of one on a grey panel, where the hover
	 * grey of a picked toggle would melt into the panel. The toggles are 4px shorter, for the rail.
	 */
	export const toggleGroupVariants = tv({
		slots: {
			root: 'flex w-fit items-center rounded-control',
			item: 'rounded-none data-focus-visible:z-10',
			indicator: 'hidden'
		},
		variants: {
			variant: {
				ghost: {},
				outline: { root: 'bg-surface shadow-control', item: 'border-line' },
				segment: {
					// Once the chip is measured it slides under the picked toggle, which stops drawing
					// its own look. Until then (and with several picked) each picked one draws it.
					root: ['relative', segment.rail, segment.handedOver],
					item: [
						'z-10',
						segment.chip,
						segment.picked,
						// On the rail the hover grey would not show: the label's ink is the hover.
						'data-hovered:not-data-pressed:not-data-selected:bg-transparent data-pressed:bg-transparent'
					],
					indicator: [
						'pointer-events-none absolute z-0 block data-hidden:opacity-0',
						'top-(--chip-top) left-(--chip-left) h-(--chip-height) w-(--chip-width)',
						segment.chip,
						segment.lifted,
						segment.slide
					]
				}
			},
			size: { default: {}, sm: {}, icon: {}, 'icon-sm': {} },
			orientation: {
				horizontal: {},
				vertical: { root: 'flex-col items-stretch' }
			}
		},
		compoundVariants: [
			// Joined into one piece, the corners only at its two ends. Chips on a rail keep all four.
			{
				variant: ['ghost', 'outline'],
				orientation: 'horizontal',
				class: { item: 'first:rounded-l-control last:rounded-r-control' }
			},
			{
				variant: ['ghost', 'outline'],
				orientation: 'vertical',
				class: { item: 'first:rounded-t-control last:rounded-b-control' }
			},
			{ variant: 'segment', size: 'default', class: { item: 'h-5.5' } },
			{ variant: 'segment', size: 'sm', class: { item: 'h-5' } },
			{ variant: 'segment', size: 'icon', class: { item: 'size-5.5' } },
			{ variant: 'segment', size: 'icon-sm', class: { item: 'size-5' } },
			{ variant: 'outline', orientation: 'horizontal', class: { item: 'not-first:border-l' } },
			{ variant: 'outline', orientation: 'vertical', class: { item: 'not-first:border-t' } }
		],
		defaultVariants: { variant: 'ghost', orientation: 'horizontal' }
	});
</script>

<script lang="ts">
	import { ToggleGroup as ToggleGroupPrimitive } from '@human-kit/ui/toggle-group';
	import type { ComponentProps } from 'svelte';

	type Props = ComponentProps<typeof ToggleGroupPrimitive.Root> & {
		variant?: ToggleGroupVariant;
		size?: ToggleSize;
	};

	let {
		variant = 'ghost',
		size = 'default',
		orientation = 'horizontal',
		value = $bindable(),
		class: className,
		element = $bindable(null),
		...restProps
	}: Props = $props();

	setContext(KEY, () => ({ variant, size, orientation }));

	const styles = $derived(toggleGroupVariants({ variant, orientation, size }));

	// In `segment`, with one to pick, a chip of its own slides from toggle to toggle, as the
	// segmented tabs' does. It is measured on the client, under the picked toggle, again whenever
	// the pick or a size changes.
	const sliding = $derived(variant === 'segment' && restProps.selectionMode !== 'multiple');
	let chip = $state<{ left: number; top: number; width: number; height: number } | null>(null);

	$effect(() => {
		const root = element;
		if (!sliding || !root) return;

		let frame = 0;
		const measure = () => {
			frame = 0;
			const picked = root.querySelector<HTMLElement>(':scope > [data-selected]');
			chip = picked
				? {
						left: picked.offsetLeft,
						top: picked.offsetTop,
						width: picked.offsetWidth,
						height: picked.offsetHeight
					}
				: null;
		};
		const schedule = () => {
			if (frame === 0) frame = requestAnimationFrame(measure);
		};

		schedule();
		const picks = new MutationObserver(schedule);
		picks.observe(root, { subtree: true, attributeFilter: ['data-selected'] });
		const sizes = new ResizeObserver(schedule);
		sizes.observe(root);
		return () => {
			cancelAnimationFrame(frame);
			picks.disconnect();
			sizes.disconnect();
		};
	});
</script>

{#snippet withChip()}
	<span
		class={styles.indicator()}
		aria-hidden="true"
		data-hidden={!chip || undefined}
		style:--chip-left={chip && `${chip.left}px`}
		style:--chip-top={chip && `${chip.top}px`}
		style:--chip-width={chip && `${chip.width}px`}
		style:--chip-height={chip && `${chip.height}px`}
	></span>
	{@render restProps.children?.()}
{/snippet}

<!--
	One stop for the keyboard: the arrows move between the toggles. Name the group
	(`aria-label="Text style"`). With `selectionMode="single"` it picks one, as a radio would; for
	views of the same thing a segmented set of tabs reads better.
-->
<ToggleGroupPrimitive.Root
	bind:element
	bind:value
	{orientation}
	class={styles.root({ class: className })}
	data-indicator-ready={(sliding && chip !== null) || undefined}
	{...restProps}
	children={sliding ? withChip : restProps.children}
/>
