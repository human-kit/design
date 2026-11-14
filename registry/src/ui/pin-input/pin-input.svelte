<script lang="ts" module>
	import { tv, type VariantProps } from '@registry/lib/utils';

	/** A boxed cell's ring darkens under the pointer, as the input's does. */
	const ringHover = 'hover:not-data-focused:not-data-invalid:not-data-readonly:shadow-field-hover';

	/**
	 * One box per character, each the input's own box, the character centred in it at a size read
	 * at a glance. The cell the next character goes to takes the focus ring.
	 */
	export const pinInputVariants = tv({
		slots: {
			root: 'flex w-fit items-center gap-1.5',
			cell: [
				'rounded-control text-center text-ink tabular-nums caret-transparent outline-hidden placeholder:text-ink-subtle',
				'shadow-field transition-[box-shadow,opacity] duration-150 ease-out',
				'data-focused:shadow-focus data-invalid:shadow-invalid data-invalid:data-focused:shadow-invalid-focus',
				'data-disabled:cursor-not-allowed data-disabled:opacity-45',
				'data-readonly:cursor-default data-readonly:bg-transparent data-readonly:not-data-focused:shadow-none'
			],
			// A short dash between two runs of cells, as a code is read aloud: "482 – 913".
			separator: 'h-px w-2 shrink-0 bg-ink-subtle'
		},
		variants: {
			variant: {
				// A faint grey of its own, as the input's default.
				default: { cell: `bg-ink/2 ${ringHover}` },
				// The white box, for a field on the page rather than on a card.
				surface: { cell: `bg-surface ${ringHover}` },
				// No box, one line under each character that says its state, as the input's underline.
				underline: {
					cell: [
						'rounded-none border-b border-line bg-transparent shadow-none',
						'hover:not-data-focused:not-data-invalid:not-data-readonly:border-ink/40',
						'data-readonly:not-data-focused:border-transparent',
						'data-focused:border-primary data-focused:shadow-focus-line',
						'data-invalid:border-danger-solid data-invalid:shadow-none data-invalid:data-focused:shadow-invalid-focus-line'
					]
				}
			},
			size: {
				sm: { cell: 'h-7 w-6.5 text-body font-medium' },
				default: { cell: 'h-9 w-8 text-heading font-medium' },
				lg: { root: 'gap-2', cell: 'h-11 w-10 text-title font-medium' }
			}
		},
		defaultVariants: { variant: 'default', size: 'default' }
	});

	export type PinInputVariant = NonNullable<VariantProps<typeof pinInputVariants>['variant']>;
	export type PinInputSize = NonNullable<VariantProps<typeof pinInputVariants>['size']>;
</script>

<script lang="ts">
	import { PinInput as PinInputPrimitive } from '@human-kit/ui/pin-input';
	import type { ComponentProps } from 'svelte';

	type Props = Omit<ComponentProps<typeof PinInputPrimitive.Root>, 'children'> & {
		variant?: PinInputVariant;
		size?: PinInputSize;
		/** A dash after this many cells, to read the code in two runs: 3 for "482 – 913". */
		split?: number;
		'aria-label'?: string;
		'aria-labelledby'?: string;
		'aria-describedby'?: string;
	};

	let {
		value = $bindable(),
		element = $bindable(null),
		length = 6,
		variant = 'default',
		size = 'default',
		split,
		class: className,
		...restProps
	}: Props = $props();

	const styles = $derived(pinInputVariants({ variant, size }));
</script>

<!--
	Name it with a `Field` (its label names the group) or with `aria-label`; with `otp` and no name
	it is called "Verification code". Each cell is named "Digit 2 of 6" by the primitive.
-->
<PinInputPrimitive.Root
	bind:value
	bind:element
	{length}
	class={styles.root({ class: className })}
	{...restProps}
>
	{#each { length }, index (index)}
		{#if split && index === split}
			<span class={styles.separator()} aria-hidden="true"></span>
		{/if}
		<PinInputPrimitive.Cell {index} class={styles.cell()} />
	{/each}
</PinInputPrimitive.Root>
