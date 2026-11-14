<script lang="ts" module>
	import { cn, tv, type VariantProps } from '@registry/lib/utils';

	/** A boxed field's ring darkens under the pointer, as a button's edge does. */
	const ringHover =
		'data-hovered:not-data-focused:not-data-invalid:not-data-readonly:shadow-field-hover';

	/** The box of an input, grown to hold paragraphs: the same ring, focus and states. */
	export const textareaVariants = tv({
		base: [
			// No handle: the box grows with what is typed, so a handle would only fight it.
			'block w-full min-w-0 resize-none rounded-control px-2 py-1.5 text-body leading-5 text-ink outline-hidden placeholder:text-ink-subtle',
			'shadow-field transition-[box-shadow,border-color,opacity] duration-150 ease-out',
			'data-focused:shadow-focus data-invalid:shadow-invalid data-invalid:data-focused:shadow-invalid-focus',
			'data-disabled:cursor-not-allowed data-disabled:opacity-45',
			// A text that cannot be changed reads as a text: no box and no ring until it has the
			// focus. Its words keep their place, so it does not move when the box comes.
			'data-readonly:cursor-default data-readonly:bg-transparent data-readonly:not-data-focused:shadow-none'
		],
		variants: {
			variant: {
				// A faint grey of its own: on a card, a white field reads as nothing but its outline.
				default: `bg-ink/2 ${ringHover}`,
				// The white box, for a field on the page rather than on a card.
				surface: `bg-surface ${ringHover}`,
				// No box, one line under the text. For a surface that already is a box.
				underline: [
					'rounded-none border-b border-line bg-transparent px-0 shadow-none',
					'data-hovered:not-data-focused:not-data-readonly:border-ink/40',
					'data-readonly:not-data-focused:border-transparent',
					'data-focused:border-primary data-focused:shadow-focus-line',
					'data-invalid:border-danger-solid data-invalid:shadow-none data-invalid:data-focused:shadow-invalid-focus-line'
				]
			}
		},
		defaultVariants: { variant: 'default' }
	});

	export type TextareaVariant = NonNullable<VariantProps<typeof textareaVariants>['variant']>;
</script>

<script lang="ts">
	import { TextArea as TextareaPrimitive } from '@human-kit/ui/textarea';
	import type { ComponentProps } from 'svelte';

	type Props = ComponentProps<typeof TextareaPrimitive> & {
		variant?: TextareaVariant;
	};

	let {
		variant = 'default',
		// It grows with its text from three lines, and scrolls past twelve: a note never hides
		// its end, and a long one does not push the form off the screen.
		autoResize = true,
		minRows = 3,
		maxRows = 12,
		class: className,
		value = $bindable(),
		element = $bindable(null),
		...restProps
	}: Props = $props();
</script>

<TextareaPrimitive
	bind:value
	bind:element
	{autoResize}
	{minRows}
	{maxRows}
	class={textareaVariants({ variant, class: cn(className) })}
	{...restProps}
/>
