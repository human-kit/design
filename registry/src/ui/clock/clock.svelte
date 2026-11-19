<script lang="ts" module>
	import { tv, type VariantProps } from '@registry/lib/utils';

	/**
	 * A time on wheels, out of a field: the time picker's panel standing on its own. A band behind
	 * the wheels marks the chosen row, and the wheels fade at the top and the bottom, so what is
	 * past the band reads as more of the wheel.
	 */
	export const clockVariants = tv({
		slots: {
			root: 'inline-flex flex-col gap-1 text-body text-ink data-disabled:opacity-45',
			frame: 'w-fit',
			// The band is the root's own overlay, sent behind the columns: in its own stacking
			// context, so it stays over the card's fill.
			clock: [
				'relative isolate flex items-center',
				'mask-[linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]'
			],
			band: '-z-1 h-6 rounded-control bg-hover',
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
				// The keyboard focus of a column: the kit's focus drawn inward on the chosen row, as one
				// outside it would be cut by the scroll.
				'rounded-control in-data-focus-visible:data-selected:shadow-focus-inset',
				'data-disabled:cursor-not-allowed data-disabled:opacity-45'
			]
		},
		variants: {
			variant: {
				// A card of its own around the wheels.
				outline: { frame: 'rounded-card bg-surface p-1 shadow-card' },
				// The wheels straight on the surface they sit on, for a clock inside a card or a panel.
				ghost: {}
			}
		},
		defaultVariants: { variant: 'outline' }
	});

	export type ClockVariant = NonNullable<VariantProps<typeof clockVariants>['variant']>;
</script>

<script lang="ts">
	import { Clock as ClockPrimitive } from '@human-kit/ui/clock';
	import type { ClockRootProps } from '@human-kit/ui/clock';
	import { fieldLabelVariants } from '@registry/ui/field/recipes';

	type Props = ClockRootProps & {
		variant?: ClockVariant;
		/** The name over the clock. Without it, name the clock with `aria-label`. */
		label?: string;
	};

	let {
		value = $bindable(),
		variant = 'outline',
		label,
		disabled = false,
		class: className,
		...restProps
	}: Props = $props();

	const styles = $derived(clockVariants({ variant }));
	const labelId = $props.id();
</script>

<div class={styles.root({ class: className })} data-disabled={disabled || undefined}>
	{#if label}
		<span id={labelId} class={fieldLabelVariants()}>{label}</span>
	{/if}
	<div class={styles.frame()}>
		<ClockPrimitive.Root
			bind:value
			{disabled}
			aria-labelledby={label ? labelId : undefined}
			class={styles.clock()}
			{...restProps}
		>
			{#snippet column(col)}
				{#if col.type === 'minute' || col.type === 'second'}
					<span class={styles.separator()} aria-hidden="true">:</span>
				{/if}
				<ClockPrimitive.WheelColumn type={col.type} class={styles.column()}>
					{#snippet children(option, selected)}
						<ClockPrimitive.WheelItem type={col.type} {option} {selected} class={styles.item()} />
					{/snippet}
				</ClockPrimitive.WheelColumn>
			{/snippet}
			<ClockPrimitive.Axis class={styles.band()} />
		</ClockPrimitive.Root>
	</div>
</div>
