<script lang="ts" module>
	import { tv, type VariantProps } from '@registry/lib/utils';

	/** The box's ring darkens under the pointer, as the input's does. */
	const ringHover = 'hover:not-data-focus-within:not-data-readonly:shadow-field-hover';

	/**
	 * The input's box holding a date typed part by part, with a button at its end that opens the
	 * month. The part being typed takes the primary fill, as selected text does, so the eye finds
	 * it in the row of numbers. The month is the calendar's, alone in a popover.
	 */
	export const datePickerVariants = tv({
		slots: {
			root: [
				'flex w-full min-w-0 items-center gap-1 rounded-control ps-1.5 pe-0.5 text-body text-ink',
				'shadow-field transition-[box-shadow,background-color,opacity] duration-150 ease-out',
				'data-focus-within:shadow-focus',
				// A draft that spells no date, or a `Field` with an error, which the parts group shows in `data-invalid`.
				'data-invalid:shadow-invalid data-invalid:data-focus-within:shadow-invalid-focus',
				'has-[[role=group][data-invalid]]:shadow-invalid has-[[role=group][data-invalid]]:data-focus-within:shadow-invalid-focus',
				'data-disabled:cursor-not-allowed data-disabled:opacity-45',
				'data-readonly:bg-transparent data-readonly:not-data-focus-within:shadow-none'
			],
			input: 'flex h-full min-w-0 flex-1 items-center tabular-nums outline-hidden',
			segment: [
				'rounded-[3px] px-0.5 outline-hidden',
				'data-placeholder:text-ink-subtle data-[type=literal]:px-0 data-[type=literal]:text-ink-subtle',
				'data-focused:bg-primary data-focused:text-on-primary data-placeholder:data-focused:text-on-primary'
			],
			trigger: [
				'grid shrink-0 cursor-pointer place-items-center rounded-[calc(var(--radius-control)-2px)] text-ink-subtle outline-hidden',
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
						'data-invalid:border-danger-solid data-invalid:shadow-none data-invalid:data-focus-within:shadow-invalid-focus-line',
						'has-[[role=group][data-invalid]]:border-danger-solid has-[[role=group][data-invalid]]:shadow-none',
						'has-[[role=group][data-invalid]]:data-focus-within:shadow-invalid-focus-line'
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

	export type DatePickerVariant = NonNullable<VariantProps<typeof datePickerVariants>['variant']>;
	export type DatePickerSize = NonNullable<VariantProps<typeof datePickerVariants>['size']>;
</script>

<script lang="ts">
	import { DatePicker as DatePickerPrimitive } from '@human-kit/ui/datepicker';
	import CalendarIcon from '@lucide/svelte/icons/calendar';
	import ChevronLeft from '@lucide/svelte/icons/chevron-left';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
	import type { ComponentProps } from 'svelte';
	import { buttonVariants } from '@registry/ui/button';
	import { calendarVariants } from '@registry/ui/calendar';

	type Props = ComponentProps<typeof DatePickerPrimitive.Root> & {
		variant?: DatePickerVariant;
		size?: DatePickerSize;
		/** Marks the field as refusing its value, for a `Field` with an error. */
		invalid?: boolean;
		'aria-labelledby'?: string;
		'aria-describedby'?: string;
		/** The id and the name of the hidden input that carries the value in a form. */
		id?: string;
		name?: string;
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
		'aria-label': ariaLabel,
		'aria-labelledby': labelledBy,
		'aria-describedby': describedBy,
		id,
		name,
		triggerLabel = 'Choose a date',
		previousLabel = 'Previous month',
		nextLabel = 'Next month',
		class: className,
		...restProps
	}: Props = $props();

	const styles = $derived(datePickerVariants({ variant, size }));
	const month = calendarVariants({ variant: 'ghost' });
	const navButton = buttonVariants({
		variant: 'ghost',
		size: 'icon-sm',
		class: 'rtl:-scale-x-100'
	});
</script>

<!--
	Name it with `aria-label`, or with a `Field`: the field's label names the parts through
	`aria-labelledby`.
-->
<DatePickerPrimitive.Root
	bind:value
	bind:open
	class={styles.root({ class: className })}
	{...restProps}
>
	<DatePickerPrimitive.Input
		{id}
		{name}
		aria-label={ariaLabel}
		aria-labelledby={labelledBy}
		aria-describedby={describedBy}
		aria-invalid={invalid || undefined}
		class={styles.input()}
	>
		{#snippet children(segment)}
			<DatePickerPrimitive.Segment {segment} class={styles.segment()} />
		{/snippet}
	</DatePickerPrimitive.Input>
	<DatePickerPrimitive.Trigger aria-label={triggerLabel} class={styles.trigger()}>
		<CalendarIcon aria-hidden="true" />
	</DatePickerPrimitive.Trigger>
	<!-- The panel hangs from the button, which sits 2px inside the box: its end lines up with the
		box end, and 6px below the button is 4px below the box. -->
	<DatePickerPrimitive.Popover placement="bottom-end" offset={6} class={styles.popover()}>
		<DatePickerPrimitive.Calendar monthHeadingStyle="month-year" class={month.root()}>
			<div class={month.header()}>
				<DatePickerPrimitive.Heading class={month.heading()} />
				<div class={month.nav()}>
					<DatePickerPrimitive.TriggerPrevious aria-label={previousLabel} class={navButton}>
						<ChevronLeft aria-hidden="true" />
					</DatePickerPrimitive.TriggerPrevious>
					<DatePickerPrimitive.TriggerNext aria-label={nextLabel} class={navButton}>
						<ChevronRight aria-hidden="true" />
					</DatePickerPrimitive.TriggerNext>
				</div>
			</div>
			<DatePickerPrimitive.Grid class={month.grid()}>
				<DatePickerPrimitive.GridHeader>
					{#snippet children(day, longDay)}
						<DatePickerPrimitive.HeaderCell class={month.headerCell()} aria-label={longDay}>
							{day}
						</DatePickerPrimitive.HeaderCell>
					{/snippet}
				</DatePickerPrimitive.GridHeader>
				<DatePickerPrimitive.GridBody>
					{#snippet children(date)}
						<DatePickerPrimitive.BodyCell {date} class={month.cell()} />
					{/snippet}
				</DatePickerPrimitive.GridBody>
			</DatePickerPrimitive.Grid>
		</DatePickerPrimitive.Calendar>
	</DatePickerPrimitive.Popover>
</DatePickerPrimitive.Root>
