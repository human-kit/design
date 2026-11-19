<script lang="ts" module>
	import { tv, type VariantProps } from '@registry/lib/utils';

	/**
	 * A row of stars. Each star is two copies of the same shape: a faint one underneath, and the
	 * amber one on top, cut by `--rating-item-fill`, so a half value shows half a star. The pointer
	 * fills the stars up to it before a press, and the output beside the label follows it.
	 */
	export const ratingVariants = tv({
		slots: {
			root: 'flex flex-col gap-1 data-disabled:opacity-45',
			header: 'flex items-baseline justify-between gap-3',
			output: 'ms-auto shrink-0 text-body text-ink-muted tabular-nums',
			// With half steps the whole row is one slider and takes the ring; with whole steps each
			// star is a radio and takes its own.
			items: [
				'-ms-0.5 flex w-fit items-center rounded-control transition-shadow duration-150 ease-out',
				'in-[[role=slider][data-focus-visible]]:shadow-focus'
			],
			item: [
				'relative grid shrink-0 cursor-pointer place-items-center rounded-control p-0.5 outline-hidden',
				'transition-[scale,box-shadow] duration-150 ease-out motion-reduce:transition-none',
				'active:scale-90 data-focus-visible:shadow-focus',
				'data-disabled:cursor-not-allowed data-readonly:cursor-default data-readonly:active:scale-100'
			],
			// Faded as a whole, not by its colour: a see-through colour doubles where the stroke laps
			// over the fill and draws an edge.
			empty: 'fill-current stroke-current stroke-[1.5] text-ink opacity-7',
			// The filled copy, cut from the far end back to the fill; mirrored when the text runs
			// right to left.
			full: [
				'absolute fill-current stroke-current stroke-[1.5] text-warning-solid',
				'[clip-path:inset(0_calc((1-var(--rating-item-fill))*100%)_0_0)]',
				'rtl:[clip-path:inset(0_0_0_calc((1-var(--rating-item-fill))*100%))]'
			]
		},
		variants: {
			size: {
				sm: { empty: 'size-4', full: 'size-4' },
				default: { empty: 'size-5', full: 'size-5' },
				lg: { empty: 'size-6', full: 'size-6' }
			}
		},
		defaultVariants: { size: 'default' }
	});

	export type RatingSize = NonNullable<VariantProps<typeof ratingVariants>['size']>;
</script>

<script lang="ts">
	import { Rating as RatingPrimitive } from '@human-kit/ui/rating';
	import Star from '@lucide/svelte/icons/star';
	import type { ComponentProps } from 'svelte';
	import { cn } from '@registry/lib/utils';
	import { fieldLabelVariants, fieldMessageVariants } from '@registry/ui/field/recipes';

	type Props = Omit<ComponentProps<typeof RatingPrimitive.Root>, 'children'> & {
		size?: RatingSize;
		/** The name over the stars. Without it, name the rating with `aria-label`. */
		label?: string;
		/** A line under the stars. */
		description?: string;
		/** Show the value at the end of the label's line. */
		showValue?: boolean;
	};

	let {
		defaultValue,
		// The wrapper holds the value itself, starting from `defaultValue`: the primitive takes one
		// or the other, and a bound value would count as both.
		value = $bindable(defaultValue ?? 0),
		size = 'default',
		count = 5,
		label,
		description,
		showValue = false,
		invalid = false,
		class: className,
		element = $bindable(null),
		'aria-describedby': describedBy,
		...restProps
	}: Props = $props();

	const uid = $props.id();
	const descriptionId = `rating-${uid}-description`;

	const styles = $derived(ratingVariants({ size }));
</script>

<RatingPrimitive.Root
	bind:value
	bind:element
	{count}
	{invalid}
	aria-describedby={cn(description && descriptionId, describedBy) || undefined}
	class={styles.root({ class: className })}
	{...restProps}
>
	{#if label || showValue}
		<div class={styles.header()}>
			{#if label}
				<RatingPrimitive.Label class={fieldLabelVariants({ invalid })}
					>{label}</RatingPrimitive.Label
				>
			{/if}
			{#if showValue}
				<RatingPrimitive.Output class={styles.output()} />
			{/if}
		</div>
	{/if}
	<div class={styles.items()}>
		{#each { length: count }, index (index)}
			<RatingPrimitive.Item {index} class={styles.item()}>
				<Star class={styles.empty()} aria-hidden="true" />
				<Star class={styles.full()} aria-hidden="true" />
			</RatingPrimitive.Item>
		{/each}
	</div>
	{#if description}
		<p id={descriptionId} class={fieldMessageVariants()}>{description}</p>
	{/if}
</RatingPrimitive.Root>
