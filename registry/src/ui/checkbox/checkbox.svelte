<script lang="ts" module>
	import { tv } from '@registry/lib/utils';

	export const checkboxVariants = tv({
		slots: {
			root: [
				'group/checkbox relative inline-flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-check outline-hidden select-none',
				// The box is 16px, the target 24px: the band around it presses it too (WCAG 2.5.8).
				"before:absolute before:-inset-1 before:content-['']",
				'transition-[background-color,box-shadow] duration-75 ease-out',
				// Empty, it is a field: the ring of an input, darker under the pointer.
				'bg-surface shadow-field hover:shadow-field-hover',
				// Ticked, it is the primary colour, since the tick is the answer it gives.
				'data-checked:bg-primary data-checked:text-on-primary data-checked:shadow-primary data-checked:hover:bg-primary-hover',
				'data-indeterminate:bg-primary data-indeterminate:text-on-primary data-indeterminate:shadow-primary data-indeterminate:hover:bg-primary-hover',
				// The colour says the state, the halo says the focus.
				'data-focus-visible:shadow-focus',
				'data-invalid:shadow-invalid data-invalid:data-focus-visible:shadow-invalid-focus',
				// A group with an error turns every box red, as it does with one alone.
				'group-data-invalid/checkbox-group:shadow-invalid group-data-invalid/checkbox-group:data-focus-visible:shadow-invalid-focus',
				'data-disabled:cursor-not-allowed data-disabled:opacity-45',
				// Read-only keeps its state and its focus, and stops looking pressable.
				'data-readonly:cursor-default data-readonly:hover:shadow-field',
				'data-readonly:data-checked:hover:bg-primary data-readonly:data-indeterminate:hover:bg-primary'
			],
			// Both marks are drawn and the state picks one, so an uncontrolled box shows the right one.
			check: 'pointer-events-none size-3 stroke-3 group-data-indeterminate/checkbox:hidden',
			dash: 'pointer-events-none hidden size-3 stroke-3 group-data-indeterminate/checkbox:block'
		}
	});
</script>

<script lang="ts">
	import { Checkbox as CheckboxPrimitive } from '@human-kit/ui/checkbox';
	import { getCheckboxGroupContext } from '@human-kit/ui/checkbox-group';
	import Check from '@lucide/svelte/icons/check';
	import Minus from '@lucide/svelte/icons/minus';
	import type { ComponentProps } from 'svelte';
	import { cn } from '@registry/lib/utils';
	import { fieldLabelVariants, fieldMessageVariants } from '@registry/ui/field/recipes';

	type Props = Omit<ComponentProps<typeof CheckboxPrimitive.Root>, 'children'> & {
		/** The words beside the box. Without them, name the box with `aria-label`. */
		label?: string;
		/** A line under the label. */
		description?: string;
		/** The value is wrong: the box turns red. */
		invalid?: boolean;
	};

	let {
		checked = $bindable(),
		indeterminate = $bindable(),
		element = $bindable(null),
		label,
		description,
		invalid = false,
		id,
		disabled = false,
		'aria-labelledby': labelledBy,
		'aria-describedby': describedBy,
		class: className,
		...restProps
	}: Props = $props();

	const uid = $props.id();
	// The primitive puts this id on its hidden input, so `<label for>` reaches the box.
	const controlId = $derived(id ?? `checkbox-${uid}`);
	const labelId = $derived(`${controlId}-label`);
	const descriptionId = $derived(`${controlId}-description`);

	// In a group, the group's disabled reaches the box; the label follows it.
	const group = getCheckboxGroupContext();
	const isDisabled = $derived(disabled || Boolean(group?.isDisabled));

	const styles = checkboxVariants();
</script>

{#snippet box(boxClass?: string)}
	<!--
		In a group the group holds the ticks and reports them through its own value, so the box's
		own state is not taken back: a write there would make the server draw the group twice.
	-->
	<CheckboxPrimitive.Root
		bind:checked={() => checked, (next) => !group && (checked = next)}
		bind:indeterminate={() => indeterminate, (next) => !group && (indeterminate = next)}
		bind:element
		id={controlId}
		{disabled}
		aria-labelledby={cn(label && labelId, labelledBy) || undefined}
		aria-describedby={cn(description && descriptionId, describedBy) || undefined}
		aria-invalid={invalid || undefined}
		data-invalid={invalid || undefined}
		class={styles.root({ class: boxClass })}
		{...restProps}
	>
		<CheckboxPrimitive.Indicator>
			<Check class={styles.check()} />
			<Minus class={styles.dash()} />
		</CheckboxPrimitive.Indicator>
	</CheckboxPrimitive.Root>
{/snippet}

{#if label}
	<!-- The box sits on the first line of the label, so a label that wraps keeps it at the top. -->
	<div class={cn('flex w-fit gap-2', className)}>
		<span class="flex h-4.75 items-center">{@render box()}</span>
		<div class="flex min-w-0 flex-col gap-0.5">
			<label
				id={labelId}
				for={controlId}
				class={fieldLabelVariants({
					invalid,
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
	{@render box(className)}
{/if}
