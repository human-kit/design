<script lang="ts" module>
	import { tv, type VariantProps } from '@registry/lib/utils';

	/**
	 * The steps of a process and where it stands: the ones done carry a tick in the kit's
	 * primary, as a checked box does; the current one is ringed in it; the ones ahead are plain.
	 * It shows the way, it does not move along it: the page sets `current`.
	 */
	export const stepperVariants = tv({
		slots: {
			root: 'flex text-body',
			step: 'flex min-w-0',
			// 20px, one line of body text tall, so the label beside it sits centred on it.
			marker: [
				'grid size-5 shrink-0 place-items-center rounded-full text-caption font-medium tabular-nums',
				'[&_svg]:size-3'
			],
			text: 'flex min-w-0 flex-col',
			label: 'truncate',
			description: 'text-small text-ink-muted',
			connector: 'shrink-0 bg-line'
		},
		variants: {
			orientation: {
				horizontal: {
					root: 'w-full items-start gap-2',
					// Every step but the last stretches, and its line fills what is left of it.
					step: 'items-start gap-2 not-last:flex-1',
					connector: 'mt-2.5 h-px min-w-4 flex-1'
				},
				vertical: {
					root: 'flex-col',
					// The marker and the line under it in one column, the words in the other.
					step: 'gap-2.5',
					text: '[li:not(:last-child)>&]:pb-4',
					connector: 'mx-auto my-1 min-h-3 w-px flex-1'
				}
			},
			status: {
				// The line out of a step done is drawn in the primary too: the way covered so far.
				done: { marker: 'bg-primary text-on-primary', label: 'text-ink', connector: 'bg-primary' },
				current: {
					marker: 'bg-surface text-primary ring-1 ring-primary',
					label: 'font-medium text-ink'
				},
				upcoming: { marker: 'bg-surface text-ink-subtle shadow-control', label: 'text-ink-muted' }
			}
		},
		defaultVariants: { orientation: 'horizontal', status: 'upcoming' }
	});

	export type StepperOrientation = NonNullable<VariantProps<typeof stepperVariants>['orientation']>;
	export type StepperStatus = NonNullable<VariantProps<typeof stepperVariants>['status']>;
	export type StepperStep = { label: string; description?: string };
</script>

<script lang="ts">
	import Check from '@lucide/svelte/icons/check';
	import type { HTMLOlAttributes } from 'svelte/elements';

	type Props = Omit<HTMLOlAttributes, 'class'> & {
		steps: StepperStep[];
		/** The step in progress, from 0. Past the last one, every step is done. */
		current?: number;
		orientation?: StepperOrientation;
		/** What a screen reader hears after a step's label, for the ones done and ahead. */
		doneLabel?: string;
		upcomingLabel?: string;
		class?: string;
	};

	let {
		steps,
		current = 0,
		orientation = 'horizontal',
		doneLabel = 'completed',
		upcomingLabel = 'not started',
		class: className,
		...restProps
	}: Props = $props();

	const styles = $derived(stepperVariants({ orientation }));
	const statusOf = (index: number): StepperStatus =>
		index < current ? 'done' : index === current ? 'current' : 'upcoming';
</script>

<ol class={styles.root({ class: className })} data-orientation={orientation} {...restProps}>
	{#each steps as step, index (index)}
		{@const status = statusOf(index)}
		{@const s = stepperVariants({ orientation, status })}
		<li
			class={s.step()}
			data-status={status}
			aria-current={status === 'current' ? 'step' : undefined}
		>
			{#if orientation === 'vertical'}
				<div class="flex flex-col">
					<span class={s.marker()} aria-hidden="true">
						{#if status === 'done'}<Check strokeWidth={2.5} />{:else}{index + 1}{/if}
					</span>
					{#if index < steps.length - 1}<span class={s.connector()}></span>{/if}
				</div>
			{:else}
				<span class={s.marker()} aria-hidden="true">
					{#if status === 'done'}<Check strokeWidth={2.5} />{:else}{index + 1}{/if}
				</span>
			{/if}
			<div class={s.text()}>
				<span class={s.label()}>
					{step.label}
					{#if status !== 'current'}
						<span class="sr-only">, {status === 'done' ? doneLabel : upcomingLabel}</span>
					{/if}
				</span>
				{#if step.description}<span class={s.description()}>{step.description}</span>{/if}
			</div>
			{#if orientation === 'horizontal' && index < steps.length - 1}
				<span class={s.connector()} aria-hidden="true"></span>
			{/if}
		</li>
	{/each}
</ol>
