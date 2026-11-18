<script lang="ts" module>
	import { tv } from '@registry/lib/utils';

	export const radioVariants = tv({
		slots: {
			radio: [
				'relative inline-flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-full outline-hidden select-none',
				// The circle is 16px, the target 24px: the band around it presses it too (WCAG 2.5.8).
				"before:absolute before:-inset-1 before:content-['']",
				'transition-[background-color,box-shadow] duration-75 ease-out',
				// Empty, it is a field: the ring of an input, darker under the pointer. Chosen, it is
				// the primary colour, as a ticked checkbox is.
				'bg-surface shadow-field hover:shadow-field-hover',
				'data-checked:bg-primary data-checked:shadow-primary data-checked:hover:bg-primary-hover',
				// The colour says the state, the halo says the focus.
				'data-focus-visible:shadow-focus',
				'group-data-invalid/radio-group:shadow-invalid group-data-invalid/radio-group:data-focus-visible:shadow-invalid-focus',
				'data-disabled:cursor-not-allowed data-disabled:opacity-45',
				// Read-only keeps its answer and its focus, and stops looking pressable.
				'group-data-readonly/radio-group:cursor-default group-data-readonly/radio-group:hover:shadow-field',
				'group-data-readonly/radio-group:data-checked:hover:bg-primary'
			],
			dot: 'pointer-events-none size-1.5 rounded-full bg-on-primary'
		}
	});
</script>

<script lang="ts">
	import {
		RadioGroup as RadioGroupPrimitive,
		getRadioGroupContext
	} from '@human-kit/ui/radio-group';
	import type { ComponentProps } from 'svelte';
	import { cn } from '@registry/lib/utils';
	import { fieldLabelVariants, fieldMessageVariants } from '@registry/ui/field/recipes';

	type Props = Omit<ComponentProps<typeof RadioGroupPrimitive.Item>, 'children'> & {
		/** The words beside the circle. Without them, name the option with `aria-label`. */
		label?: string;
		/** A line under the label. */
		description?: string;
	};

	let {
		value,
		label,
		description,
		id,
		disabled = false,
		element = $bindable(null),
		'aria-labelledby': labelledBy,
		'aria-describedby': describedBy,
		class: className,
		...restProps
	}: Props = $props();

	const group = getRadioGroupContext();
	const uid = $props.id();
	// The primitive puts this id on its hidden input, so `<label for>` reaches the radio.
	const controlId = $derived(id ?? `radio-${uid}`);
	const labelId = $derived(`${controlId}-label`);
	const descriptionId = $derived(`${controlId}-description`);
	const isDisabled = $derived(disabled || Boolean(group?.isRadioDisabled(value)));

	const styles = radioVariants();
</script>

{#snippet radio(radioClass?: string)}
	<RadioGroupPrimitive.Item
		bind:element
		{value}
		{disabled}
		id={controlId}
		aria-labelledby={cn(label && labelId, labelledBy) || undefined}
		aria-describedby={cn(description && descriptionId, describedBy) || undefined}
		class={styles.radio({ class: radioClass })}
		{...restProps}
	>
		<RadioGroupPrimitive.Indicator class={styles.dot()} />
	</RadioGroupPrimitive.Item>
{/snippet}

{#if label}
	<!-- The circle sits on the first line of the label, so a label that wraps keeps it at the top. -->
	<div class={cn('flex w-fit gap-2', className)}>
		<span class="flex h-4.75 items-center">{@render radio()}</span>
		<div class="flex min-w-0 flex-col gap-0.5">
			<label
				id={labelId}
				for={controlId}
				class={fieldLabelVariants({
					disabled: isDisabled,
					class: isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'
				})}>{label}</label
			>
			{#if description}
				<p id={descriptionId} class={fieldMessageVariants({ class: isDisabled && 'opacity-45' })}>
					{description}
				</p>
			{/if}
		</div>
	</div>
{:else}
	{@render radio(className)}
{/if}
