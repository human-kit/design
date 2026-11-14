<script lang="ts" module>
	/** What the field hands its control: spread it on the control, `<Input {...control} />`. */
	export type FieldControlProps = {
		id: string;
		invalid: boolean;
		required: boolean;
		disabled: boolean;
		'aria-describedby'?: string;
	};
</script>

<script lang="ts">
	import { cn } from '@registry/lib/utils';
	import type { Snippet } from 'svelte';
	import FieldDescription from './field-description.svelte';
	import FieldError from './field-error.svelte';
	import FieldLabel from './field-label.svelte';

	type Props = {
		/** The name over the control. */
		label?: string;
		/** A hint under the control. An error takes its place while there is one. */
		description?: string;
		/** What is wrong with the value. Turns the label and the control red. */
		error?: string;
		required?: boolean;
		disabled?: boolean;
		/** The control's id. One is made up when none is given. */
		id?: string;
		class?: string;
		/**
		 * The control. It receives its id, its state and the id of the line under it, so the
		 * label names it and a screen reader reads the hint or the error with it.
		 */
		children: Snippet<[FieldControlProps]>;
	};

	let {
		label,
		description,
		error,
		required = false,
		disabled = false,
		id,
		class: className,
		children
	}: Props = $props();

	const uid = $props.id();
	const controlId = $derived(id ?? `field-${uid}`);
	const invalid = $derived(Boolean(error));
	const messageId = $derived(`${controlId}-message`);
	const hasMessage = $derived(Boolean(error || description));

	const control = $derived<FieldControlProps>({
		id: controlId,
		invalid,
		required,
		disabled,
		'aria-describedby': hasMessage ? messageId : undefined
	});
</script>

<div class={cn('flex min-w-0 flex-col', className)}>
	{#if label}
		<FieldLabel for={controlId} {invalid} {disabled} {required} class="mb-1">{label}</FieldLabel>
	{/if}
	{@render children(control)}
	{#if error}
		<FieldError id={messageId} class="mt-1">{error}</FieldError>
	{:else if description}
		<FieldDescription id={messageId} class="mt-1">{description}</FieldDescription>
	{/if}
</div>
