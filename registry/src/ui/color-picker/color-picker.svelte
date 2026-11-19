<script lang="ts" module>
	import { cn, tv } from '@registry/lib/utils';

	/** A checkerboard under a colour with an alpha, so a see-through colour reads as one. */
	const checker =
		'bg-[conic-gradient(var(--color-ink)/0.08_25%,transparent_0_50%,var(--color-ink)/0.08_0_75%,transparent_0)] bg-size-[8px_8px]';

	/** A white pill on a strip: it has no colour of its own, so the strip shows on both sides. */
	const pill = [
		'h-4 w-2 rounded-full bg-white shadow-[0_0_0_1px_rgb(0_0_0/0.15),0_1px_2px_rgb(0_0_0/0.3)]',
		'transition-[scale,box-shadow] duration-150 ease-out motion-reduce:transition-none data-dragging:scale-110',
		'data-focus-visible:shadow-[0_0_0_1px_rgb(0_0_0/0.15),0_0_0_3px_var(--color-primary)]'
	];

	/**
	 * One colour, in a card: a square of saturation and brightness across its whole top, a hue
	 * strip and, with `alpha`, an alpha strip under it, then the hex field with the colour at its
	 * start. Every thumb is a native slider underneath, so the arrows, Page Up and Down, Home and
	 * End work on each.
	 */
	export const colorPickerVariants = tv({
		slots: {
			root: 'flex w-62 flex-col gap-1 text-body text-ink data-disabled:opacity-45',
			card: 'flex flex-col overflow-hidden rounded-card bg-surface shadow-card',
			// The square, edge to edge: the card's corners round it. White to the hue across, black
			// up from the foot.
			area: [
				'h-36 w-full shrink-0 cursor-crosshair',
				'bg-[linear-gradient(to_top,#000,transparent),linear-gradient(to_right,#fff,var(--color-picker-hue-color))]',
				'rtl:bg-[linear-gradient(to_top,#000,transparent),linear-gradient(to_left,#fff,var(--color-picker-hue-color))]',
				'data-disabled:cursor-not-allowed data-readonly:cursor-default'
			],
			// A white ring around the colour it stands on, with a hairline so it shows on white too.
			areaThumb: [
				'size-3.5 rounded-full bg-(--color-picker-value) ring-2 ring-white shadow-[0_0_0_3px_rgb(0_0_0/0.12),0_1px_3px_rgb(0_0_0/0.3)]',
				'transition-[scale,box-shadow] duration-150 ease-out motion-reduce:transition-none data-dragging:scale-110',
				'data-focus-visible:shadow-[0_0_0_3px_var(--color-primary),0_1px_3px_rgb(0_0_0/0.3)]'
			],
			body: 'flex flex-col gap-2.5 p-3',
			// A 12px strip. The pills stop 4px short of each end, half their width, so one at either
			// end stays on the strip; the paint runs on under them, on a layer 4px wider each side.
			strip: [
				'relative mx-1 h-3 cursor-pointer data-disabled:cursor-not-allowed data-readonly:cursor-default',
				"before:absolute before:inset-y-0 before:-inset-x-1 before:rounded-full before:content-['']",
				'before:bg-(image:--strip) before:bg-size-(--strip-size) before:inset-ring before:inset-ring-ink/10'
			],
			hue: [
				'[--strip:linear-gradient(to_right,#f00,#ff0,#0f0,#0ff,#00f,#f0f,#f00)]',
				'rtl:[--strip:linear-gradient(to_left,#f00,#ff0,#0f0,#0ff,#00f,#f0f,#f00)]'
			],
			alpha: [
				'[--strip:linear-gradient(to_right,var(--color-picker-slider-start),var(--color-picker-slider-end)),conic-gradient(var(--color-ink)/0.08_25%,transparent_0_50%,var(--color-ink)/0.08_0_75%,transparent_0)]',
				'rtl:[--strip:linear-gradient(to_left,var(--color-picker-slider-start),var(--color-picker-slider-end)),conic-gradient(var(--color-ink)/0.08_25%,transparent_0_50%,var(--color-ink)/0.08_0_75%,transparent_0)]',
				'[--strip-size:100%_100%,8px_8px]'
			],
			stripThumb: pill,
			row: 'flex items-center gap-1',
			// The field holds the colour at its start, so what is typed and what it makes sit
			// together. A label, so a press on the colour lands in the input.
			field: 'flex flex-1 items-center gap-1.5 ps-1',
			preview: cn(
				'relative size-4 shrink-0 overflow-hidden rounded-[4px] inset-ring inset-ring-ink/10',
				checker
			),
			previewFill: 'absolute inset-0 bg-(--color-picker-swatch-color)',
			hex: 'h-full min-w-0 flex-1 bg-transparent font-mono text-ink uppercase outline-hidden',
			percent: 'shrink-0 text-ink-subtle tabular-nums',
			swatches: 'flex flex-wrap gap-1.5',
			swatch: [
				'size-5 cursor-pointer rounded-full bg-(--color-picker-swatch-color) inset-ring inset-ring-ink/10 outline-hidden',
				'transition-shadow duration-150 ease-out',
				// The chosen one wears a ring, a gap of the card between.
				'data-selected:shadow-[0_0_0_2px_var(--color-surface),0_0_0_3.5px_var(--color-ink)]',
				'data-focus-visible:shadow-[0_0_0_2px_var(--color-surface),0_0_0_3.5px_var(--color-primary)]',
				'data-disabled:cursor-not-allowed'
			]
		}
	});
</script>

<script lang="ts">
	import { ColorPicker as ColorPickerPrimitive, parseColor } from '@human-kit/ui/color-picker';
	import Pipette from '@lucide/svelte/icons/pipette';
	import type { ComponentProps } from 'svelte';
	import { buttonVariants } from '@registry/ui/button';
	import { fieldLabelVariants } from '@registry/ui/field/recipes';
	import { inputVariants } from '@registry/ui/input';

	type Props = Omit<ComponentProps<typeof ColorPickerPrimitive.Root>, 'children'> & {
		/** The name over the picker. Without it, name the picker with `aria-label`. */
		label?: string;
		/** Colours to take with one press, under the field. */
		swatches?: string[];
		/** The button that takes a colour from the screen, where the browser has one. */
		eyeDropper?: boolean;
	};

	let {
		defaultValue,
		// The wrapper holds the value itself, starting from `defaultValue`: the primitive takes one
		// or the other, and a bound value would count as both.
		value = $bindable(defaultValue ?? '#4f46e5'),
		label,
		swatches,
		eyeDropper = true,
		alpha = false,
		invalid = false,
		class: className,
		...restProps
	}: Props = $props();

	const styles = colorPickerVariants();
	const field = inputVariants({ variant: 'default', size: 'sm' });
	const iconButton = buttonVariants({ variant: 'ghost', size: 'icon-sm' });

	// The alpha as a share, beside the hex: the strip is where it is changed.
	const alphaPercent = $derived(Math.round((parseColor(value ?? '')?.a ?? 1) * 100));
</script>

<ColorPickerPrimitive.Root
	bind:value
	{alpha}
	{invalid}
	class={styles.root({ class: className })}
	{...restProps}
>
	{#if label}
		<ColorPickerPrimitive.Label class={fieldLabelVariants({ invalid })}>
			{label}
		</ColorPickerPrimitive.Label>
	{/if}
	<div class={styles.card()}>
		<ColorPickerPrimitive.Area class={styles.area()}>
			<ColorPickerPrimitive.AreaThumb class={styles.areaThumb()} />
		</ColorPickerPrimitive.Area>
		<div class={styles.body()}>
			<ColorPickerPrimitive.Slider channel="hue" class={cn(styles.strip(), styles.hue())}>
				<ColorPickerPrimitive.SliderThumb class={styles.stripThumb()} />
			</ColorPickerPrimitive.Slider>
			{#if alpha}
				<ColorPickerPrimitive.Slider channel="alpha" class={cn(styles.strip(), styles.alpha())}>
					<ColorPickerPrimitive.SliderThumb class={styles.stripThumb()} />
				</ColorPickerPrimitive.Slider>
			{/if}
			<div class={styles.row()}>
				<label class={cn(field, styles.field())}>
					<ColorPickerPrimitive.Preview class={styles.preview()}>
						<span class={styles.previewFill()}></span>
					</ColorPickerPrimitive.Preview>
					<ColorPickerPrimitive.HexField class={styles.hex()} aria-label="Hex" />
					{#if alpha}
						<span class={styles.percent()} aria-hidden="true">{alphaPercent}%</span>
					{/if}
				</label>
				{#if eyeDropper}
					<!-- A browser with no eye dropper gets no button: a control that does nothing is noise. -->
					<ColorPickerPrimitive.EyeDropper
						class={cn(iconButton, 'data-unsupported:hidden')}
						aria-label="Pick a colour from the screen"
					>
						<Pipette aria-hidden="true" />
					</ColorPickerPrimitive.EyeDropper>
				{/if}
			</div>
			{#if swatches?.length}
				<ColorPickerPrimitive.SwatchList class={styles.swatches()} aria-label="Swatches">
					{#each swatches as color (color)}
						<ColorPickerPrimitive.Swatch {color} class={styles.swatch()} />
					{/each}
				</ColorPickerPrimitive.SwatchList>
			{/if}
		</div>
	</div>
</ColorPickerPrimitive.Root>
