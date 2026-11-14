<script lang="ts" module>
	import { tv, type VariantProps } from '@registry/lib/utils';

	/**
	 * A thin track with the primary filling it from the start edge. Above it, when there is one,
	 * the label and the value on one line: the label in ink, the value quieter at the end.
	 *
	 * With no known end (`value={null}`) a stretch of the primary crosses the track again and
	 * again. Where motion is reduced it stands still, the whole track a faint primary instead.
	 */
	export const progressVariants = tv({
		slots: {
			root: 'flex w-full flex-col gap-1.5',
			header: 'flex items-baseline justify-between gap-3 text-small',
			label: 'min-w-0 truncate font-medium text-ink',
			value: 'ms-auto shrink-0 text-ink-muted tabular-nums',
			track: 'w-full rounded-full bg-ink/8',
			indicator: [
				'rounded-full bg-primary transition-[width] duration-300 ease-out motion-reduce:transition-none',
				'data-indeterminate:absolute data-indeterminate:inset-y-0 data-indeterminate:w-2/5',
				'data-indeterminate:animate-progress-slide',
				'motion-reduce:data-indeterminate:w-full motion-reduce:data-indeterminate:animate-none motion-reduce:data-indeterminate:opacity-30'
			]
		},
		variants: {
			size: {
				sm: { track: 'h-1' },
				default: { track: 'h-1.5' }
			}
		},
		defaultVariants: { size: 'default' }
	});

	export type ProgressSize = NonNullable<VariantProps<typeof progressVariants>['size']>;
</script>

<script lang="ts">
	import { Progress as ProgressPrimitive } from '@human-kit/ui/progress';
	import type { ComponentProps } from 'svelte';

	type Props = Omit<ComponentProps<typeof ProgressPrimitive.Root>, 'children'> & {
		/** What is in progress ("Exporting records"). Without it, name the bar with `aria-label`. */
		label?: string;
		/** Show the value at the end of the label's line. Off with no label, or no known end. */
		showValue?: boolean;
		size?: ProgressSize;
	};

	let {
		label,
		showValue = true,
		size = 'default',
		value,
		class: className,
		element = $bindable(null),
		context = $bindable(),
		...restProps
	}: Props = $props();

	const styles = $derived(progressVariants({ size }));
	const valueShown = $derived(showValue && value !== null);
</script>

<ProgressPrimitive.Root
	bind:element
	bind:context
	{value}
	class={styles.root({ class: className })}
	{...restProps}
>
	{#if label || valueShown}
		<div class={styles.header()}>
			{#if label}
				<ProgressPrimitive.Label class={styles.label()}>{label}</ProgressPrimitive.Label>
			{/if}
			{#if valueShown}
				<ProgressPrimitive.Value class={styles.value()} />
			{/if}
		</div>
	{/if}
	<ProgressPrimitive.Track class={styles.track()}>
		<ProgressPrimitive.Indicator class={styles.indicator()} />
	</ProgressPrimitive.Track>
</ProgressPrimitive.Root>
