<script lang="ts" module>
	import { cn, tv, type VariantProps } from '@registry/lib/utils';

	/** A boxed field's ring darkens under the pointer, as a button's edge does. */
	const ringHover =
		'data-hovered:not-data-focused:not-data-invalid:not-data-readonly:shadow-field-hover';

	export const inputVariants = tv({
		base: [
			'w-full min-w-0 truncate rounded-control text-body text-ink outline-hidden placeholder:text-ink-subtle',
			// A ring and a fall instead of a border: a field sits at the height of the outline
			// buttons beside it. The ring is the only thing that changes, so it is the only thing
			// that transitions. Focus shows on any focus, not only from the keyboard: the caret
			// lands in the field either way.
			'shadow-field transition-[box-shadow,border-color,opacity] duration-150 ease-out',
			'data-focused:shadow-focus data-invalid:shadow-invalid data-invalid:data-focused:shadow-invalid-focus',
			'data-disabled:cursor-not-allowed data-disabled:opacity-45',
			// A value that cannot be changed reads as a value, not as a place to type: no box and
			// no ring, until the focus lands on it. `data-readonly`, not `:read-only`, which a
			// disabled field matches too.
			'data-readonly:cursor-default data-readonly:bg-transparent data-readonly:not-data-focused:shadow-none'
		],
		variants: {
			variant: {
				// A faint grey of its own: on a card, a white field reads as nothing but its outline.
				default: `bg-ink/2 ${ringHover}`,
				// The white box, for a field on the page rather than on a card.
				surface: `bg-surface ${ringHover}`,
				// Reads as the text it holds until it is used: no box, the ring only on focus. For a
				// value edited in place, in a row that would jump if a box came and went around it.
				ghost:
					'h-auto bg-transparent px-1 py-0 shadow-none data-hovered:not-data-readonly:bg-hover',
				// No box, one line under the value that says its state. For a value on a surface that
				// already is a box, where a boxed field draws a frame inside a frame.
				underline: [
					'rounded-none border-b border-line bg-transparent px-0 shadow-none',
					'data-hovered:not-data-focused:not-data-readonly:border-ink/40',
					'data-readonly:not-data-focused:border-transparent',
					// The line thickens with the focus: it is this variant's halo, the same in error.
					'data-focused:border-primary data-focused:shadow-[0_1px_0_var(--primary)]',
					'data-invalid:border-danger-solid data-invalid:shadow-none data-invalid:data-focused:shadow-[0_1px_0_var(--danger-solid)]'
				]
			},
			size: {
				// The height of the small button: for a toolbar or a dense row.
				sm: 'h-6 px-2',
				// The height of the default button, so a field and the buttons beside it line up.
				default: 'h-6.5 px-2',
				// The value a record is read by, written as its title: a name, a lot. As wide as what
				// it holds, the placeholder while empty, and growing as it is typed, never past its
				// column: a title drawn the whole width puts what stands beside it far off.
				lg: 'h-7.5 w-auto max-w-full px-2.5 text-heading font-[450] field-sizing-content placeholder:font-normal'
			}
		},
		compoundVariants: [
			// The variant decides the padding of these two, not the size: the text starts where
			// the line does, and a ghost field keeps close to the text around it.
			{ variant: 'underline', class: 'px-0' },
			{ variant: 'ghost', class: 'h-auto px-1' }
		],
		defaultVariants: {
			variant: 'default',
			size: 'default'
		}
	});

	export type InputVariant = NonNullable<VariantProps<typeof inputVariants>['variant']>;
	export type InputSize = NonNullable<VariantProps<typeof inputVariants>['size']>;
</script>

<script lang="ts">
	import { Input as InputPrimitive } from '@human-kit/ui/input';
	import type { ComponentProps } from 'svelte';

	type Props = Omit<ComponentProps<typeof InputPrimitive>, 'size'> & {
		variant?: InputVariant;
		size?: InputSize;
	};

	let {
		variant = 'default',
		size = 'default',
		class: className,
		value = $bindable(),
		element = $bindable(null),
		...restProps
	}: Props = $props();
</script>

<InputPrimitive
	bind:value
	bind:element
	class={inputVariants({ variant, size, class: cn(className) })}
	{...restProps}
/>
