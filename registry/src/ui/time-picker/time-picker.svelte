<script lang="ts" module>
	import { tv, type VariantProps } from '@registry/lib/utils';

	/*
	 * The root of the time picker sets no state of its own: the parts group, its direct child,
	 * holds focus, error, disabled and read-only. The box reads them through `has-[>…]`.
	 */

	/** The box's ring darkens under the pointer, as the input's does. */
	const ringHover =
		'hover:not-has-[>[role=group][data-focus-within]]:not-has-[>[role=group][data-readonly]]:shadow-field-hover';

	/**
	 * The date picker's twin: the same box with the hours and the minutes as parts to type, and a
	 * button at its end that opens the wheels. A band behind the wheels marks the chosen row; the
	 * wheels fade at the top and the bottom, so what is past the band reads as more of the wheel.
	 */
	export const timePickerVariants = tv({
		slots: {
			root: [
				'flex w-full min-w-0 items-center gap-1 rounded-control ps-1.5 pe-0.5 text-body text-ink',
				'shadow-field transition-[box-shadow,background-color,opacity] duration-150 ease-out',
				'has-[>[role=group][data-focus-within]]:shadow-focus',
				'has-[>[role=group][data-invalid]]:shadow-invalid',
				'has-[>[role=group][data-invalid][data-focus-within]]:shadow-invalid-focus',
				'has-[>[role=group][data-disabled]]:cursor-not-allowed has-[>[role=group][data-disabled]]:opacity-45',
				'has-[>[role=group][data-readonly]]:bg-transparent has-[>[role=group][data-readonly]]:not-has-[>[role=group][data-focus-within]]:shadow-none'
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
				'z-50 overflow-hidden rounded-card bg-overlay p-1 text-ink shadow-popover outline-hidden',
				'data-entering:animate-in data-entering:fade-in-0 data-entering:zoom-in-98 data-entering:animation-duration-[100ms]',
				'data-exiting:animate-out data-exiting:fade-out-0 data-exiting:zoom-out-98 data-exiting:animation-duration-[100ms]',
				'data-[placement=bottom-start]:origin-top-left data-[placement=bottom-end]:origin-top-right',
				'data-[placement=top-start]:origin-bottom-left data-[placement=top-end]:origin-bottom-right',
				'data-[placement=bottom]:origin-top data-[placement=top]:origin-bottom'
			],
			wheels: 'relative',
			// Behind the wheels and not inside them: the columns scroll, and a marker inside one
			// would go away with the scroll.
			band: 'pointer-events-none absolute inset-x-0 top-1/2 h-6 -translate-y-1/2 rounded-control bg-hover',
			clock:
				'relative flex items-center mask-[linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]',
			separator: 'text-ink-subtle',
			// Seven rows of the kit's 24px: the chosen one in the middle, three on each side.
			column: [
				'h-42 w-10 overflow-y-auto rounded-control outline-hidden',
				'[scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
			],
			// No fill on the chosen row: the band already marks it. Ink and weight lift it.
			item: [
				'flex h-6 cursor-default items-center justify-center text-ink-subtle tabular-nums transition-ink',
				'hover:text-ink data-selected:font-medium data-selected:text-ink',
				// The keyboard focus of a column: a ring inside the chosen row, as a ring outside it would be
				// cut by the scroll.
				'rounded-control in-data-focus-visible:data-selected:inset-ring-[1.5px] in-data-focus-visible:data-selected:inset-ring-primary',
				'data-disabled:cursor-not-allowed data-disabled:opacity-45'
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
					root: 'bg-transparent shadow-none hover:not-has-[>[role=group][data-focus-within]]:not-has-[>[role=group][data-readonly]]:bg-hover'
				},
				// No box, one line under the text that says its state.
				underline: {
					root: [
						'rounded-none border-b border-line bg-transparent ps-0 shadow-none',
						'hover:not-has-[>[role=group][data-focus-within]]:not-has-[>[role=group][data-readonly]]:border-ink/40',
						'has-[>[role=group][data-focus-within]]:border-primary has-[>[role=group][data-focus-within]]:shadow-focus-line',
						'has-[>[role=group][data-invalid]]:border-danger-solid has-[>[role=group][data-invalid]]:shadow-none',
						'has-[>[role=group][data-invalid][data-focus-within]]:shadow-invalid-focus-line',
						'has-[>[role=group][data-readonly]]:not-has-[>[role=group][data-focus-within]]:border-transparent'
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

	export type TimePickerVariant = NonNullable<VariantProps<typeof timePickerVariants>['variant']>;
	export type TimePickerSize = NonNullable<VariantProps<typeof timePickerVariants>['size']>;
</script>

<script lang="ts">
	import { TimePicker as TimePickerPrimitive } from '@human-kit/ui/timepicker';
	import ClockIcon from '@lucide/svelte/icons/clock';
	import type { ComponentProps } from 'svelte';

	type Props = ComponentProps<typeof TimePickerPrimitive.Root> & {
		variant?: TimePickerVariant;
		size?: TimePickerSize;
		/** Marks the field as refusing its value, for a `Field` with an error. */
		invalid?: boolean;
		'aria-labelledby'?: string;
		'aria-describedby'?: string;
		/** The id and the name of the hidden input that carries the value in a form. */
		id?: string;
		name?: string;
		/** The names of the button and of the panel, read aloud. */
		triggerLabel?: string;
		panelLabel?: string;
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
		triggerLabel = 'Choose a time',
		panelLabel = 'Time',
		class: className,
		...restProps
	}: Props = $props();

	const styles = $derived(timePickerVariants({ variant, size }));
</script>

<!--
	Name it with `aria-label`, or with a `Field`: the field's label names the parts through
	`aria-labelledby`.
-->
<TimePickerPrimitive.Root
	bind:value
	bind:open
	class={styles.root({ class: className })}
	{...restProps}
>
	<TimePickerPrimitive.Input
		{id}
		{name}
		aria-label={ariaLabel}
		aria-labelledby={labelledBy}
		aria-describedby={describedBy}
		aria-invalid={invalid || undefined}
		class={styles.input()}
	>
		{#snippet children(segment)}
			<TimePickerPrimitive.Segment {segment} class={styles.segment()} />
		{/snippet}
	</TimePickerPrimitive.Input>
	<TimePickerPrimitive.Trigger aria-label={triggerLabel} class={styles.trigger()}>
		<ClockIcon aria-hidden="true" />
	</TimePickerPrimitive.Trigger>
	<!-- The panel hangs from the button, which sits 2px inside the box: its end lines up with the
		box end, and 6px below the button is 4px below the box. -->
	<TimePickerPrimitive.Popover
		placement="bottom-end"
		offset={6}
		aria-label={panelLabel}
		class={styles.popover()}
	>
		<div class={styles.wheels()}>
			<div class={styles.band()} aria-hidden="true"></div>
			<TimePickerPrimitive.Clock class={styles.clock()}>
				{#snippet column(col)}
					{#if col.type === 'minute' || col.type === 'second'}
						<span class={styles.separator()} aria-hidden="true">:</span>
					{/if}
					<TimePickerPrimitive.WheelColumn type={col.type} class={styles.column()}>
						{#snippet children(option, selected)}
							<TimePickerPrimitive.WheelItem
								type={col.type}
								{option}
								{selected}
								class={styles.item()}
							/>
						{/snippet}
					</TimePickerPrimitive.WheelColumn>
				{/snippet}
			</TimePickerPrimitive.Clock>
		</div>
	</TimePickerPrimitive.Popover>
</TimePickerPrimitive.Root>
