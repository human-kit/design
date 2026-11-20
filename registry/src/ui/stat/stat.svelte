<script lang="ts" module>
	import { tv, type VariantProps } from '@registry/lib/utils';

	/**
	 * One number that matters, with what it counts and how it moved: "Transfers this month — 48,
	 * +12%". The number is the largest thing in it; the change says its direction in an arrow
	 * and in words, not by colour alone.
	 */
	export const statVariants = tv({
		slots: {
			root: 'flex min-w-0 flex-col gap-1 text-body',
			label: 'truncate text-ink-muted',
			row: 'flex flex-wrap items-baseline gap-x-2',
			value: 'text-title font-semibold tracking-tight text-ink tabular-nums',
			delta:
				'inline-flex items-center gap-0.5 text-small font-medium tabular-nums [&_svg]:size-3.5',
			description: 'text-small text-ink-subtle'
		},
		variants: {
			// The three a container comes in: the card, a grey fill, or nothing.
			variant: {
				outline: { root: 'rounded-card bg-surface p-4 shadow-card' },
				ghost: { root: 'rounded-card bg-hover/70 p-4' },
				plain: {}
			},
			trend: {
				up: { delta: 'text-success-ink' },
				down: { delta: 'text-danger-ink' },
				flat: { delta: 'text-ink-muted' }
			}
		},
		defaultVariants: { variant: 'outline', trend: 'flat' }
	});

	export type StatVariant = NonNullable<VariantProps<typeof statVariants>['variant']>;
	export type StatTrend = NonNullable<VariantProps<typeof statVariants>['trend']>;
</script>

<script lang="ts">
	import ArrowDownRight from '@lucide/svelte/icons/arrow-down-right';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = Omit<HTMLAttributes<HTMLDivElement>, 'class'> & {
		class?: string;
		variant?: StatVariant;
		/** What the number counts. */
		label: string;
		/** The number, formatted as it should read: "48", "62%", "$ 1.2M". */
		value: string;
		/** How it moved, formatted: "+12%". */
		delta?: string;
		/**
		 * Which way that is. Its colour says good or bad: up is green, unless `inverted`.
		 */
		trend?: StatTrend;
		/** Up is bad here (waiting time, cancellations): the colours swap, the arrows stay. */
		inverted?: boolean;
		/** Against what: "vs last month". */
		description?: string;
		/** The change's direction in words, read before `delta`. */
		trendLabels?: Record<StatTrend, string>;
	};

	let {
		variant = 'outline',
		label,
		value,
		delta,
		trend = 'flat',
		inverted = false,
		description,
		trendLabels = { up: 'Up', down: 'Down', flat: 'No change' },
		class: className,
		...restProps
	}: Props = $props();

	const tone = $derived<StatTrend>(
		inverted && trend !== 'flat' ? (trend === 'up' ? 'down' : 'up') : trend
	);
	const styles = $derived(statVariants({ variant, trend: tone }));
	const arrows = { up: ArrowUpRight, down: ArrowDownRight, flat: ArrowRight };
	const Arrow = $derived(arrows[trend]);
</script>

<div class={styles.root({ class: className })} {...restProps}>
	<span class={styles.label()}>{label}</span>
	<div class={styles.row()}>
		<span class={styles.value()}>{value}</span>
		{#if delta}
			<span class={styles.delta()}>
				<Arrow aria-hidden="true" />
				<span class="sr-only">{trendLabels[trend]}</span>
				{delta}
			</span>
		{/if}
	</div>
	{#if description}<span class={styles.description()}>{description}</span>{/if}
</div>
