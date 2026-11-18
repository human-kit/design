<script lang="ts" module>
	import { tv, type VariantProps } from '@registry/lib/utils';

	/**
	 * No border: a translucent rail and a white thumb that floats on it. Pressed, the thumb
	 * stretches towards where it is going: off it grows to the right from its place, on it steps
	 * back by as much as it grows so its right edge stays. It lands on a curve that settles
	 * rather than stops.
	 */
	export const switchVariants = tv({
		slots: {
			root: [
				'relative inline-flex shrink-0 cursor-pointer items-center rounded-full pl-0.5 outline-hidden select-none',
				'bg-ink/16 shadow-switch-rail transition-[background-color,box-shadow,opacity] duration-200 ease-out',
				'data-checked:bg-primary data-checked:shadow-switch-on',
				// The colour says the state, the halo says the focus.
				'data-focus-visible:shadow-focus',
				'data-invalid:shadow-invalid data-invalid:data-focus-visible:shadow-invalid-focus',
				'data-disabled:cursor-not-allowed data-disabled:opacity-45',
				'data-readonly:cursor-default'
			],
			thumb: [
				'pointer-events-none block rounded-full bg-white shadow-switch-thumb',
				'transition-[translate,width] duration-260 ease-(--ease-drawer) motion-reduce:transition-none'
			]
		},
		// Read-only keeps its focus, but the thumb no longer reaches for the other side.
		variants: {
			size: {
				// Its rail stands 20px: on the line of a label, it is no taller than the text.
				default: {
					root: 'h-5 w-9',
					thumb: [
						'size-4 data-checked:translate-x-4',
						'data-pressed:not-data-readonly:w-5 data-checked:data-pressed:not-data-readonly:translate-x-3'
					]
				},
				// The height of the default button, for a setting in a toolbar.
				lg: {
					root: 'h-6 w-10',
					thumb: [
						'size-5 data-checked:translate-x-4',
						'data-pressed:not-data-readonly:w-6 data-checked:data-pressed:not-data-readonly:translate-x-3'
					]
				}
			}
		},
		defaultVariants: { size: 'default' }
	});

	export type SwitchSize = NonNullable<VariantProps<typeof switchVariants>['size']>;
</script>

<script lang="ts">
	import { Switch as SwitchPrimitive } from '@human-kit/ui/switch';
	import type { ComponentProps } from 'svelte';
	import { cn } from '@registry/lib/utils';
	import { fieldLabelVariants, fieldMessageVariants } from '@registry/ui/field/recipes';

	type Props = Omit<ComponentProps<typeof SwitchPrimitive.Root>, 'children'> & {
		size?: SwitchSize;
		/** The words beside the switch. Without them, name it with `aria-label`. */
		label?: string;
		/** A line under the label. */
		description?: string;
		/** The value is wrong: the rail gets a red ring. */
		invalid?: boolean;
	};

	let {
		checked = $bindable(),
		element = $bindable(null),
		size = 'default',
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
	// The primitive puts this id on its hidden input, so `<label for>` reaches the switch.
	const controlId = $derived(id ?? `switch-${uid}`);
	const labelId = $derived(`${controlId}-label`);
	const descriptionId = $derived(`${controlId}-description`);

	const styles = $derived(switchVariants({ size }));
</script>

{#snippet control(controlClass?: string)}
	<SwitchPrimitive.Root
		bind:checked
		bind:element
		id={controlId}
		{disabled}
		aria-labelledby={cn(label && labelId, labelledBy) || undefined}
		aria-describedby={cn(description && descriptionId, describedBy) || undefined}
		aria-invalid={invalid || undefined}
		data-invalid={invalid || undefined}
		class={styles.root({ class: controlClass })}
		{...restProps}
	>
		<SwitchPrimitive.Thumb class={styles.thumb()} />
	</SwitchPrimitive.Root>
{/snippet}

{#if label}
	<!-- The switch sits on the first line of the label, so a label that wraps keeps it at the top. -->
	<div class={cn('flex w-fit gap-2', className)}>
		<span class="flex h-4.75 items-center">{@render control()}</span>
		<div class="flex min-w-0 flex-col gap-0.5">
			<label
				id={labelId}
				for={controlId}
				class={fieldLabelVariants({
					invalid,
					disabled,
					class: disabled ? 'cursor-not-allowed' : 'cursor-pointer'
				})}>{label}</label
			>
			{#if description}
				<p id={descriptionId} class={fieldMessageVariants({ class: disabled && 'opacity-45' })}>
					{description}
				</p>
			{/if}
		</div>
	</div>
{:else}
	{@render control(className)}
{/if}
