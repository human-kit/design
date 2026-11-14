<script lang="ts" module>
	import { tv, type VariantProps } from '@registry/lib/utils';

	/** The box's ring darkens under the pointer, as the input's does. */
	const ringHover = 'hover:not-focus-within:not-data-invalid:not-data-readonly:shadow-field-hover';

	/**
	 * The box of the input, with a minus and a plus at its start and the number at its end, so a
	 * column of them lines up by its units and the buttons stay put while it grows. The buttons sit
	 * 2px inside the box, square, quiet until the pointer is on them; they take no tab stop, since
	 * the arrow keys step the number. The ring follows the focus anywhere in the box.
	 */
	export const numberFieldVariants = tv({
		slots: {
			group: [
				'flex w-full min-w-0 items-center gap-px rounded-control ps-0.5 text-body',
				'shadow-field transition-[box-shadow,opacity] duration-150 ease-out',
				'focus-within:shadow-focus data-invalid:shadow-invalid data-invalid:focus-within:shadow-invalid-focus',
				'data-disabled:cursor-not-allowed data-disabled:opacity-45',
				'data-readonly:bg-transparent data-readonly:not-focus-within:shadow-none'
			],
			input: [
				'h-full min-w-0 flex-1 bg-transparent ps-1.5 pe-2 text-end text-ink tabular-nums outline-hidden placeholder:text-ink-subtle',
				'data-disabled:cursor-not-allowed data-readonly:cursor-default'
			],
			stepper: [
				'grid shrink-0 cursor-pointer place-items-center rounded-[calc(var(--radius-control)-2px)] text-ink-muted outline-hidden',
				'transition-colors duration-150 data-hovered:bg-hover data-hovered:text-ink data-pressed:bg-ink/8',
				'data-disabled:cursor-not-allowed data-disabled:text-ink-subtle data-disabled:bg-transparent',
				'data-readonly:hidden [&_svg]:pointer-events-none [&_svg]:size-3.5'
			]
		},
		variants: {
			variant: {
				// A faint grey of its own, as the input's default.
				default: { group: `bg-ink/2 ${ringHover}` },
				// The white box, for a field on the page rather than on a card.
				surface: { group: `bg-surface ${ringHover}` },
				// Reads as the number it holds until it is used: no box, grey under the pointer, the
				// ring only on focus.
				ghost: {
					group: 'bg-transparent shadow-none hover:not-focus-within:not-data-readonly:bg-hover'
				},
				// No box, one line under the number that says its state, as the input's underline.
				underline: {
					group: [
						'rounded-none border-b border-line bg-transparent ps-0 shadow-none',
						'hover:not-focus-within:not-data-readonly:border-ink/40',
						'data-readonly:not-focus-within:border-transparent',
						'focus-within:border-primary focus-within:shadow-focus-line',
						'data-invalid:border-danger-solid data-invalid:shadow-none data-invalid:focus-within:shadow-invalid-focus-line'
					],
					input: 'pe-0'
				}
			},
			size: {
				// The height of the small button.
				sm: { group: 'h-6', stepper: 'size-5' },
				// The height of the default button, so the field lines up with the ones beside it.
				default: { group: 'h-6.5', stepper: 'size-5.5' },
				// The input's large height, the number kept at the body size: a number is not a title.
				lg: { group: 'h-7.5', stepper: 'size-6.5' }
			}
		},
		defaultVariants: { variant: 'default', size: 'default' }
	});

	export type NumberFieldVariant = NonNullable<VariantProps<typeof numberFieldVariants>['variant']>;
	export type NumberFieldSize = NonNullable<VariantProps<typeof numberFieldVariants>['size']>;
</script>

<script lang="ts">
	import { NumberField as NumberFieldPrimitive } from '@human-kit/ui/numberfield';
	import Minus from '@lucide/svelte/icons/minus';
	import Plus from '@lucide/svelte/icons/plus';
	import type { ComponentProps } from 'svelte';

	type Props = Omit<ComponentProps<typeof NumberFieldPrimitive.Root>, 'children'> & {
		variant?: NumberFieldVariant;
		size?: NumberFieldSize;
		/** Goes on the input, so a `<label for>` (or a `Field`) names it. */
		id?: string;
		placeholder?: string;
		'aria-label'?: string;
		'aria-labelledby'?: string;
		'aria-describedby'?: string;
		/** The minus and the plus. Leave them out where the number is mostly typed. */
		steppers?: boolean;
	};

	let {
		value = $bindable(),
		variant = 'default',
		size = 'default',
		id,
		placeholder,
		'aria-label': ariaLabel,
		'aria-labelledby': labelledBy,
		'aria-describedby': describedBy,
		steppers = true,
		class: className,
		...restProps
	}: Props = $props();

	const styles = $derived(numberFieldVariants({ variant, size }));
</script>

<NumberFieldPrimitive.Root bind:value {...restProps}>
	<NumberFieldPrimitive.Group class={styles.group({ class: className })}>
		{#if steppers}
			<NumberFieldPrimitive.Decrement class={styles.stepper()}
				><Minus /></NumberFieldPrimitive.Decrement
			>
			<NumberFieldPrimitive.Increment class={styles.stepper()}
				><Plus /></NumberFieldPrimitive.Increment
			>
		{/if}
		<NumberFieldPrimitive.Input
			{id}
			{placeholder}
			aria-label={ariaLabel}
			aria-labelledby={labelledBy}
			aria-describedby={describedBy}
			class={styles.input()}
		/>
	</NumberFieldPrimitive.Group>
</NumberFieldPrimitive.Root>
