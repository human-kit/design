<script lang="ts" module>
	import { tv, type VariantProps } from '@registry/lib/utils';

	/** The box's ring darkens under the pointer, as the input's does. */
	const ringHover = 'hover:not-data-focus-within:not-data-readonly:shadow-field-hover';

	/**
	 * The date picker's box holding two dates, the start and the end, with a dash between them
	 * and the button that opens the months at its end. The part being typed takes the primary
	 * fill, as selected text does. The months are the calendar's, two of them side by side, so a
	 * stretch that crosses a month is picked in one view.
	 */
	export const dateRangePickerVariants = tv({
		slots: {
			root: [
				'flex w-full min-w-0 items-center gap-1 rounded-control ps-1.5 pe-0.5 text-body text-ink',
				'shadow-field transition-[box-shadow,background-color,opacity] duration-150 ease-out',
				'data-focus-within:shadow-focus',
				// Either date spells no date, or a `Field` marks the range invalid: each input shows
				// it in `data-invalid`.
				'has-[[data-date-range-picker-input][data-invalid]]:shadow-invalid has-[[data-date-range-picker-input][data-invalid]]:data-focus-within:shadow-invalid-focus',
				'data-disabled:cursor-not-allowed data-disabled:opacity-45',
				'data-readonly:bg-transparent data-readonly:not-data-focus-within:shadow-none'
			],
			input: 'flex h-full shrink-0 items-center tabular-nums outline-hidden',
			dash: 'shrink-0 px-1 text-ink-subtle select-none',
			segment: [
				'rounded-[3px] px-0.5 outline-hidden',
				'data-placeholder:text-ink-subtle data-[type=literal]:px-0 data-[type=literal]:text-ink-subtle',
				'data-focused:bg-primary data-focused:text-on-primary data-placeholder:data-focused:text-on-primary'
			],
			trigger: [
				'ms-auto grid shrink-0 cursor-pointer place-items-center rounded-[calc(var(--radius-control)-2px)] text-ink-subtle outline-hidden',
				'transition-colors duration-150 data-hovered:bg-hover data-hovered:text-ink data-pressed:text-ink',
				'data-focus-visible:shadow-focus disabled:cursor-not-allowed',
				'[&_svg]:pointer-events-none [&_svg]:size-3.5'
			],
			// The panel grows from the corner that faces the box.
			popover: [
				'z-50 overflow-hidden rounded-card bg-overlay p-1.5 text-ink shadow-popover outline-hidden',
				'data-entering:animate-in data-entering:fade-in-0 data-entering:zoom-in-98 data-entering:animation-duration-[100ms]',
				'data-exiting:animate-out data-exiting:fade-out-0 data-exiting:zoom-out-98 data-exiting:animation-duration-[100ms]',
				'data-[placement=bottom-start]:origin-top-left data-[placement=bottom-end]:origin-top-right',
				'data-[placement=top-start]:origin-bottom-left data-[placement=top-end]:origin-bottom-right',
				'data-[placement=bottom]:origin-top data-[placement=top]:origin-bottom'
			]
		},
		variants: {
			variant: {
				// A faint grey of its own, as the input's default.
				default: { root: `bg-ink/2 ${ringHover}` },
				// The white box, for a field on the page rather than on a card.
				surface: { root: `bg-surface ${ringHover}` },
				// No box until it is used: grey under the pointer, the ring on focus.
				ghost: {
					root: 'bg-transparent shadow-none hover:not-data-focus-within:not-data-readonly:bg-hover'
				},
				// No box, one line under the text that says its state.
				underline: {
					root: [
						'rounded-none border-b border-line bg-transparent ps-0 shadow-none',
						'hover:not-data-focus-within:not-data-readonly:border-ink/40',
						'data-readonly:not-data-focus-within:border-transparent',
						'data-focus-within:border-primary data-focus-within:shadow-focus-line',
						'has-[[data-date-range-picker-input][data-invalid]]:border-danger-solid has-[[data-date-range-picker-input][data-invalid]]:shadow-none',
						'has-[[data-date-range-picker-input][data-invalid]]:data-focus-within:shadow-invalid-focus-line'
					]
				}
			},
			size: {
				// The height of the small button.
				sm: { root: 'h-6', trigger: 'size-5' },
				// The height of the default button, so the field lines up with the ones beside it.
				default: { root: 'h-6.5', trigger: 'size-5.5' },
				// The input's large height, the text kept at the body size.
				lg: { root: 'h-7.5 ps-2', trigger: 'size-6.5 [&_svg]:size-4' }
			}
		},
		compoundVariants: [{ variant: 'underline', size: 'lg', class: { root: 'ps-0' } }],
		defaultVariants: { variant: 'default', size: 'default' }
	});

	export type DateRangePickerVariant = NonNullable<
		VariantProps<typeof dateRangePickerVariants>['variant']
	>;
	export type DateRangePickerSize = NonNullable<
		VariantProps<typeof dateRangePickerVariants>['size']
	>;
</script>

<script lang="ts">
	import { DateRangePicker as DateRangePickerPrimitive } from '@human-kit/ui/daterangepicker';
	import CalendarIcon from '@lucide/svelte/icons/calendar';
	import ChevronLeft from '@lucide/svelte/icons/chevron-left';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
	import type { ComponentProps } from 'svelte';
	import { buttonVariants } from '@registry/ui/button';
	import { calendarVariants } from '@registry/ui/calendar';

	type Props = ComponentProps<typeof DateRangePickerPrimitive.Root> & {
		variant?: DateRangePickerVariant;
		size?: DateRangePickerSize;
		/** Marks both dates as refused, for a `Field` with an error. */
		invalid?: boolean;
		'aria-describedby'?: string;
		/** The names of the two dates, read aloud. */
		startLabel?: string;
		endLabel?: string;
		/** The names of the hidden inputs that carry the two dates in a form. */
		startName?: string;
		endName?: string;
		/** How many months the panel shows side by side. */
		visibleMonths?: number;
		/** The names of the buttons, read aloud. */
		triggerLabel?: string;
		previousLabel?: string;
		nextLabel?: string;
	};

	let {
		value = $bindable(),
		open = $bindable(),
		variant = 'default',
		size = 'default',
		invalid = false,
		'aria-describedby': describedBy,
		startLabel = 'Start date',
		endLabel = 'End date',
		startName,
		endName,
		visibleMonths = 2,
		triggerLabel = 'Choose dates',
		previousLabel = 'Previous month',
		nextLabel = 'Next month',
		class: className,
		...restProps
	}: Props = $props();

	const styles = $derived(dateRangePickerVariants({ variant, size }));
	const month = calendarVariants({ variant: 'ghost' });
	const navButton = buttonVariants({
		variant: 'ghost',
		size: 'icon-sm',
		class: 'rtl:-scale-x-100'
	});
</script>

<!-- Name the range with `aria-label` on the root; each date has its own name. -->
<DateRangePickerPrimitive.Root
	bind:value
	bind:open
	class={styles.root({ class: className })}
	{...restProps}
>
	<DateRangePickerPrimitive.Input
		part="start"
		name={startName}
		aria-label={startLabel}
		aria-describedby={describedBy}
		aria-invalid={invalid || undefined}
		class={styles.input()}
	>
		{#snippet children(segment)}
			<DateRangePickerPrimitive.Segment part="start" {segment} class={styles.segment()} />
		{/snippet}
	</DateRangePickerPrimitive.Input>
	<span class={styles.dash()} aria-hidden="true">–</span>
	<DateRangePickerPrimitive.Input
		part="end"
		name={endName}
		aria-label={endLabel}
		aria-describedby={describedBy}
		aria-invalid={invalid || undefined}
		class={styles.input()}
	>
		{#snippet children(segment)}
			<DateRangePickerPrimitive.Segment part="end" {segment} class={styles.segment()} />
		{/snippet}
	</DateRangePickerPrimitive.Input>
	<DateRangePickerPrimitive.Trigger aria-label={triggerLabel} class={styles.trigger()}>
		<CalendarIcon aria-hidden="true" />
	</DateRangePickerPrimitive.Trigger>
	<!-- The panel hangs from the button, which sits 2px inside the box: its end lines up with the
		box end, and 6px below the button is 4px below the box. -->
	<DateRangePickerPrimitive.Popover placement="bottom-end" offset={6} class={styles.popover()}>
		<DateRangePickerPrimitive.Calendar
			{visibleMonths}
			monthHeadingStyle="month-year"
			class={month.root()}
		>
			<div class={month.header()}>
				<DateRangePickerPrimitive.Heading class={month.heading()} />
				<div class={month.nav()}>
					<DateRangePickerPrimitive.TriggerPrevious aria-label={previousLabel} class={navButton}>
						<ChevronLeft aria-hidden="true" />
					</DateRangePickerPrimitive.TriggerPrevious>
					<DateRangePickerPrimitive.TriggerNext aria-label={nextLabel} class={navButton}>
						<ChevronRight aria-hidden="true" />
					</DateRangePickerPrimitive.TriggerNext>
				</div>
			</div>
			<DateRangePickerPrimitive.Grid class={month.grid()}>
				<DateRangePickerPrimitive.GridHeader>
					{#snippet children(day, longDay)}
						<DateRangePickerPrimitive.HeaderCell class={month.headerCell()} aria-label={longDay}>
							{day}
						</DateRangePickerPrimitive.HeaderCell>
					{/snippet}
				</DateRangePickerPrimitive.GridHeader>
				<DateRangePickerPrimitive.GridBody>
					{#snippet children(date)}
						<DateRangePickerPrimitive.BodyCell {date} class={month.cell()} />
					{/snippet}
				</DateRangePickerPrimitive.GridBody>
			</DateRangePickerPrimitive.Grid>
		</DateRangePickerPrimitive.Calendar>
	</DateRangePickerPrimitive.Popover>
</DateRangePickerPrimitive.Root>
