<script lang="ts" module>
	import { tv, type VariantProps } from '@registry/lib/utils';

	/**
	 * A month to pick a day or a stretch of days from. The month heads it and the two arrows sit
	 * after it, bare until the pointer reaches them. A chosen day is an answer, so it takes the
	 * primary fill, as a ticked box does; the days between the two ends of a stretch take the
	 * grey of a hover and join into one band.
	 */
	export const calendarVariants = tv({
		slots: {
			root: 'w-fit text-body text-ink',
			header: 'flex h-8 items-center justify-between gap-2 ps-2 pe-0.5',
			heading: 'min-w-0 truncate font-medium first-letter:uppercase',
			nav: 'flex items-center gap-0.5',
			// The months side by side; the gaps between the rows of a month are 2px, and the days of a
			// row touch, so a stretch is one band.
			grid: [
				'flex gap-4 select-none',
				'[&_table]:border-separate [&_table]:border-spacing-x-0 [&_table]:border-spacing-y-0.5'
			],
			headerCell: 'h-6 w-7 text-center text-caption font-normal text-ink-subtle',
			cell: [
				'relative grid size-7 cursor-default place-items-center rounded-control tabular-nums outline-hidden transition-ink',
				'data-hovered:bg-hover data-pressed:bg-hover data-focus-visible:shadow-focus',
				// Today: a dot under the number.
				"data-today:after:pointer-events-none data-today:after:absolute data-today:after:bottom-0.5 data-today:after:size-1 data-today:after:rounded-full data-today:after:bg-primary data-today:after:content-['']",
				'data-selected:bg-primary data-selected:text-on-primary data-selected:shadow-primary data-selected:data-hovered:bg-primary-hover',
				'data-today:data-selected:after:bg-on-primary',
				// Between the two ends: the band, square where it meets its neighbours.
				'data-in-range:not-data-range-start:not-data-range-end:rounded-none data-in-range:not-data-range-start:not-data-range-end:bg-hover',
				'data-in-range:not-data-range-start:not-data-range-end:text-ink data-in-range:not-data-range-start:not-data-range-end:shadow-none',
				'data-range-start:not-data-range-end:rounded-e-none data-range-end:not-data-range-start:rounded-s-none',
				// A day of the month around it, and a day that cannot be taken: quiet, no strike
				// through, as a month that is mostly taken reads as an error with one.
				'data-outside-month:text-ink-subtle',
				'data-disabled:cursor-not-allowed data-disabled:text-ink-subtle data-disabled:opacity-45 data-disabled:data-hovered:bg-transparent'
			]
		},
		variants: {
			variant: {
				// The month alone, for a popover or a card that already has a box.
				ghost: {},
				// On a card of its own, for a month standing on the page.
				outline: { root: 'rounded-card bg-surface p-1.5 shadow-card' }
			}
		},
		defaultVariants: { variant: 'outline' }
	});

	export type CalendarVariant = NonNullable<VariantProps<typeof calendarVariants>['variant']>;
</script>

<script lang="ts">
	import { Calendar as CalendarPrimitive } from '@human-kit/ui/calendar';
	import ChevronLeft from '@lucide/svelte/icons/chevron-left';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
	import type { ComponentProps } from 'svelte';
	import { buttonVariants } from '@registry/ui/button';

	type Props = ComponentProps<typeof CalendarPrimitive.Root> & {
		variant?: CalendarVariant;
		/** How the weekdays over the columns are written. */
		weekdayStyle?: 'narrow' | 'short' | 'long';
		/** The names of the two arrows, read aloud. */
		previousLabel?: string;
		nextLabel?: string;
	};

	let {
		value = $bindable(),
		variant = 'outline',
		weekdayStyle = 'short',
		previousLabel = 'Previous month',
		nextLabel = 'Next month',
		class: className,
		...restProps
	}: Props = $props();

	const styles = $derived(calendarVariants({ variant }));
	const navButton = buttonVariants({
		variant: 'ghost',
		size: 'icon-sm',
		class: 'rtl:-scale-x-100'
	});
</script>

<!-- The value is a day or a stretch, as `selectionMode` says; the root checks the pair. -->
<CalendarPrimitive.Root
	bind:value={() => value as never, (next) => (value = next)}
	monthHeadingStyle="month-year"
	class={styles.root({ class: className })}
	{...restProps}
>
	<div class={styles.header()}>
		<CalendarPrimitive.Heading class={styles.heading()} />
		<div class={styles.nav()}>
			<CalendarPrimitive.TriggerPrevious aria-label={previousLabel} class={navButton}>
				<ChevronLeft aria-hidden="true" />
			</CalendarPrimitive.TriggerPrevious>
			<CalendarPrimitive.TriggerNext aria-label={nextLabel} class={navButton}>
				<ChevronRight aria-hidden="true" />
			</CalendarPrimitive.TriggerNext>
		</div>
	</div>
	<CalendarPrimitive.Grid {weekdayStyle} class={styles.grid()}>
		<CalendarPrimitive.GridHeader>
			{#snippet children(day, longDay)}
				<CalendarPrimitive.HeaderCell class={styles.headerCell()} aria-label={longDay}>
					{day}
				</CalendarPrimitive.HeaderCell>
			{/snippet}
		</CalendarPrimitive.GridHeader>
		<CalendarPrimitive.GridBody>
			{#snippet children(date)}
				<CalendarPrimitive.BodyCell {date} class={styles.cell()} />
			{/snippet}
		</CalendarPrimitive.GridBody>
	</CalendarPrimitive.Grid>
</CalendarPrimitive.Root>
