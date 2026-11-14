<script lang="ts">
	import { RadioGroup as RadioGroupPrimitive } from '@human-kit/ui/radio-group';
	import type { ComponentProps } from 'svelte';
	import { cn } from '@registry/lib/utils';
	import {
		fieldLabelVariants,
		fieldMessageVariants,
		fieldRequiredMarkClass
	} from '@registry/ui/field/recipes';

	type Props = ComponentProps<typeof RadioGroupPrimitive.Root> & {
		/** The question the options answer. Without it, name the group with `aria-label`. */
		label?: string;
		/** A hint under the options. An error takes its place while there is one. */
		description?: string;
		/** What is wrong with the answer. Turns the label and every option red. */
		error?: string;
	};

	let {
		value = $bindable(),
		label,
		description,
		error,
		orientation = 'vertical',
		disabled = false,
		required = false,
		'aria-labelledby': labelledBy,
		'aria-describedby': describedBy,
		class: className,
		children,
		...restProps
	}: Props = $props();

	const uid = $props.id();
	const labelId = `radio-group-${uid}-label`;
	const messageId = `radio-group-${uid}-message`;
	const invalid = $derived(Boolean(error));
	const message = $derived(error ?? description);
</script>

<!--
	The label is a span the group names itself by, not a `<label>`: a `<label>` names one control,
	and the name of a set is its question. The id is given on the group here, so it is there on
	the first paint rather than at hydration.
-->
<div class={cn('flex min-w-0 flex-col', className)}>
	{#if label}
		<span id={labelId} class={fieldLabelVariants({ invalid, disabled, class: 'mb-2' })}
			>{label}{#if required}<span class={fieldRequiredMarkClass} aria-hidden="true">&nbsp;⋆</span
				>{/if}</span
		>
	{/if}
	<RadioGroupPrimitive.Root
		bind:value
		{orientation}
		{disabled}
		{required}
		aria-labelledby={cn(label && labelId, labelledBy) || undefined}
		aria-describedby={cn(message && messageId, describedBy) || undefined}
		aria-invalid={invalid || undefined}
		data-invalid={invalid || undefined}
		class={cn(
			'group/radio-group flex',
			orientation === 'horizontal' ? 'flex-row flex-wrap gap-x-5 gap-y-2' : 'flex-col gap-2.5'
		)}
		{...restProps}
	>
		{@render children?.()}
	</RadioGroupPrimitive.Root>
	{#if message}
		<p
			id={messageId}
			class={fieldMessageVariants({
				tone: error ? 'error' : 'hint',
				class: cn('mt-2', disabled && 'opacity-45')
			})}
		>
			{message}
		</p>
	{/if}
</div>
