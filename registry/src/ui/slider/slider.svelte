<script lang="ts" module>
	import { tv } from '@registry/lib/utils';

	/**
	 * The rail of the progress bar with the thumb of the switch on it: a 6px track, the primary
	 * filling it up to the value, a white thumb floating on top. The track is a 16px strip with the
	 * rail drawn in its middle, so a press anywhere near the line reaches it. The thumb grows a
	 * step while it is held.
	 */
	export const sliderVariants = tv({
		slots: {
			root: 'flex flex-col gap-1 data-disabled:opacity-45',
			header: 'flex items-baseline justify-between gap-3',
			output: 'ms-auto shrink-0 text-body text-ink-muted tabular-nums',
			track: [
				'relative shrink-0 cursor-pointer data-disabled:cursor-not-allowed data-readonly:cursor-default',
				'before:absolute before:rounded-full before:bg-ink/8',
				// The thumbs travel 8px short of each end and the rail runs on to it, so a thumb at either
				// end stays inside the field, flush with its label.
				'data-[orientation=horizontal]:mx-2 data-[orientation=horizontal]:h-4',
				'data-[orientation=horizontal]:before:-inset-x-2 data-[orientation=horizontal]:before:top-1/2 data-[orientation=horizontal]:before:h-1.5 data-[orientation=horizontal]:before:-translate-y-1/2',
				'data-[orientation=vertical]:my-2 data-[orientation=vertical]:min-h-24 data-[orientation=vertical]:w-4 data-[orientation=vertical]:flex-1',
				'data-[orientation=vertical]:before:-inset-y-2 data-[orientation=vertical]:before:left-1/2 data-[orientation=vertical]:before:w-1.5 data-[orientation=vertical]:before:-translate-x-1/2'
			],
			fill: [
				// A copy of itself 8px back covers the rail the thumb travel stops short of; at a range's
				// lower end it falls under the thumb.
				'rounded-full bg-(--fill) [--fill:var(--primary)] data-invalid:[--fill:var(--danger-solid)]',
				'data-[orientation=horizontal]:shadow-[-8px_0_0_var(--fill)] rtl:data-[orientation=horizontal]:shadow-[8px_0_0_var(--fill)]',
				'data-[orientation=vertical]:shadow-[0_8px_0_var(--fill)]',
				'data-[orientation=horizontal]:top-1/2 data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:-translate-y-1/2',
				'data-[orientation=vertical]:left-1/2 data-[orientation=vertical]:w-1.5 data-[orientation=vertical]:-translate-x-1/2'
			],
			thumb: [
				'block size-4 rounded-full bg-white shadow-switch-thumb outline-hidden',
				'transition-[scale,box-shadow] duration-150 ease-out motion-reduce:transition-none',
				'data-dragging:scale-110',
				'data-focus-visible:shadow-[var(--shadow-switch-thumb),var(--shadow-focus)]',
				'data-invalid:shadow-[var(--shadow-switch-thumb),var(--shadow-invalid)]',
				'data-invalid:data-focus-visible:shadow-[var(--shadow-switch-thumb),var(--shadow-invalid-focus)]'
			]
		}
	});
</script>

<script lang="ts">
	import { Slider as SliderPrimitive } from '@human-kit/ui/slider';
	import type { ComponentProps } from 'svelte';
	import { cn } from '@registry/lib/utils';
	import { fieldLabelVariants, fieldMessageVariants } from '@registry/ui/field/recipes';

	type Props = Omit<ComponentProps<typeof SliderPrimitive.Root>, 'children'> & {
		/** The name over the track. Without it, name the slider with `aria-label`. */
		label?: string;
		/** A line under the track. */
		description?: string;
		/** Show the value at the end of the label's line. */
		showValue?: boolean;
		/** One name per thumb, for a range: ["Lowest", "Highest"]. */
		thumbLabels?: string[];
	};

	let {
		defaultValue,
		// The wrapper holds the value itself, starting from `defaultValue`: the primitive takes one
		// or the other, and a bound value would count as both.
		value = $bindable(defaultValue),
		label,
		description,
		showValue = true,
		thumbLabels,
		disabled = false,
		invalid = false,
		orientation = 'horizontal',
		class: className,
		element = $bindable(null),
		'aria-describedby': describedBy,
		...restProps
	}: Props = $props();

	const uid = $props.id();
	const descriptionId = `slider-${uid}-description`;

	const styles = sliderVariants();
	// One thumb for a number, one per number for a range.
	const thumbs = $derived.by(() => {
		return Array.isArray(value) ? value.length : 1;
	});
</script>

<SliderPrimitive.Root
	bind:value
	bind:element
	{disabled}
	{invalid}
	{orientation}
	aria-describedby={cn(description && descriptionId, describedBy) || undefined}
	class={styles.root({ class: className })}
	{...restProps}
>
	{#if label || showValue}
		<div class={styles.header()}>
			{#if label}
				<SliderPrimitive.Label class={fieldLabelVariants({ invalid })}
					>{label}</SliderPrimitive.Label
				>
			{/if}
			{#if showValue}
				<SliderPrimitive.Output class={styles.output()} />
			{/if}
		</div>
	{/if}
	<SliderPrimitive.Track class={styles.track()}>
		<SliderPrimitive.Fill class={styles.fill()} />
		{#each { length: thumbs }, index (index)}
			<SliderPrimitive.Thumb {index} aria-label={thumbLabels?.[index]} class={styles.thumb()} />
		{/each}
	</SliderPrimitive.Track>
	{#if description}
		<p id={descriptionId} class={fieldMessageVariants()}>{description}</p>
	{/if}
</SliderPrimitive.Root>
