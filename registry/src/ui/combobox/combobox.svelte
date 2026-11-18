<script lang="ts" module>
	import { tv, type VariantProps } from '@registry/lib/utils';

	/** The box's ring darkens under the pointer, as the input's does. */
	const ringHover = 'hover:not-focus-within:not-data-readonly:shadow-field-hover';

	/**
	 * The input's box with a button at its end that opens the list and, once there is something
	 * to clear, a cross before it. The text filters the list; the list opens under the box at its
	 * width. Neither button takes a tab stop: the arrow keys open the list and Escape clears it.
	 */
	export const comboboxVariants = tv({
		slots: {
			root: [
				'flex w-full min-w-0 items-center rounded-control ps-2 pe-0.5 text-body',
				'shadow-field transition-[box-shadow,background-color,opacity] duration-150 ease-out',
				// The root takes no attribute of its own, thus the error is read off the input.
				'focus-within:shadow-focus has-aria-invalid:shadow-invalid has-aria-invalid:focus-within:shadow-invalid-focus',
				'data-disabled:cursor-not-allowed data-disabled:opacity-45',
				'data-readonly:bg-transparent data-readonly:not-focus-within:shadow-none'
			],
			input: [
				'h-full min-w-0 flex-1 truncate bg-transparent pe-1 text-ink outline-hidden placeholder:text-ink-subtle',
				'disabled:cursor-not-allowed read-only:cursor-default'
			],
			button: [
				'grid shrink-0 cursor-pointer place-items-center rounded-[calc(var(--radius-control)-2px)] text-ink-subtle outline-hidden',
				'transition-colors duration-150 data-hovered:bg-hover data-hovered:text-ink data-pressed:text-ink',
				'[&_svg]:pointer-events-none [&_svg]:size-3.5'
			],
			// Gone while there is nothing to clear; its room stays, so the text does not move.
			clear: 'data-disabled:invisible',
			chevron: 'transition-transform duration-150 motion-reduce:transition-none',
			// The panel grows from the edge that faces the box. `animation-duration`, never
			// `duration-*`: that utility also sets the transition's, and the panel then slid each time
			// its position was corrected.
			popover: [
				'z-50 w-(--trigger-width) min-w-32 overflow-hidden rounded-card bg-overlay text-ink shadow-popover outline-hidden',
				'data-entering:animate-in data-entering:fade-in-0 data-entering:zoom-in-98 data-entering:animation-duration-[100ms]',
				'data-exiting:animate-out data-exiting:fade-out-0 data-exiting:zoom-out-98 data-exiting:animation-duration-[100ms]',
				'data-[placement=bottom]:origin-top data-[placement=top]:origin-bottom'
			],
			list: [
				'flex max-h-60 flex-col gap-0.5 overflow-y-auto p-1 outline-hidden',
				// What shows when the text matches nothing: a quiet line where the rows would be.
				'[&_[data-empty-placeholder]]:flex [&_[data-empty-placeholder]]:h-6 [&_[data-empty-placeholder]]:items-center',
				'[&_[data-empty-placeholder]]:px-1.5 [&_[data-empty-placeholder]]:text-ink-subtle'
			]
		},
		variants: {
			variant: {
				// A faint grey of its own, as the input's default.
				default: { root: `bg-ink/2 ${ringHover}` },
				// The white box, for a field on the page rather than on a card.
				surface: { root: `bg-surface ${ringHover}` },
				// No box until it is used: grey under the pointer, the ring on focus.
				ghost: {
					root: 'bg-transparent shadow-none hover:not-focus-within:not-data-readonly:bg-hover'
				},
				// No box, one line under the text that says its state, as the input's underline.
				underline: {
					root: [
						'rounded-none border-b border-line bg-transparent ps-0 shadow-none',
						'hover:not-focus-within:not-data-readonly:border-ink/40',
						'data-readonly:not-focus-within:border-transparent',
						'focus-within:border-primary focus-within:shadow-focus-line',
						'has-aria-invalid:border-danger-solid has-aria-invalid:shadow-none has-aria-invalid:focus-within:shadow-invalid-focus-line'
					]
				}
			},
			size: {
				// The height of the small button.
				sm: { root: 'h-6', button: 'size-5' },
				// The height of the default button, so the field lines up with the ones beside it.
				default: { root: 'h-6.5', button: 'size-5.5' },
				// The input's large height, the text kept at the body size.
				lg: { root: 'h-7.5 ps-2.5', button: 'size-6.5 [&_svg]:size-4' }
			}
		},
		compoundVariants: [{ variant: 'underline', size: 'lg', class: { root: 'ps-0' } }],
		defaultVariants: { variant: 'default', size: 'default' }
	});

	export type ComboboxVariant = NonNullable<VariantProps<typeof comboboxVariants>['variant']>;
	export type ComboboxSize = NonNullable<VariantProps<typeof comboboxVariants>['size']>;
</script>

<script lang="ts">
	import { ComboBox as ComboboxPrimitive } from '@human-kit/ui/combobox';
	import ChevronDown from '@lucide/svelte/icons/chevron-down';
	import X from '@lucide/svelte/icons/x';
	import type { ComponentProps } from 'svelte';
	import { cn } from '@registry/lib/utils';

	type Props = ComponentProps<typeof ComboboxPrimitive.Root> & {
		variant?: ComboboxVariant;
		size?: ComboboxSize;
		placeholder?: string;
		/** Marks the field as refusing its value, for a `Field` with an error. */
		invalid?: boolean;
		'aria-describedby'?: string;
		/** What the list says when the text matches nothing. */
		emptyText?: string;
		/** The names of the two buttons and of the list, read aloud. */
		toggleLabel?: string;
		listLabel?: string;
	};

	let {
		value = $bindable(),
		inputValue = $bindable(),
		open = $bindable(),
		variant = 'default',
		size = 'default',
		placeholder,
		invalid = false,
		'aria-label': ariaLabel,
		'aria-labelledby': labelledBy,
		'aria-describedby': describedBy,
		emptyText = 'No results',
		toggleLabel = 'Show options',
		listLabel,
		class: className,
		children,
		...restProps
	}: Props = $props();

	const styles = $derived(comboboxVariants({ variant, size }));
</script>

<!--
	Name it with `aria-label`, or with a `Field`: the field's label names it through
	`aria-labelledby`. The rows are `Combobox.Item`, each with an `id` and the text it shows.
-->
<ComboboxPrimitive.Root
	bind:value
	bind:inputValue
	bind:open
	aria-label={ariaLabel}
	aria-labelledby={labelledBy}
	class={styles.root({ class: className })}
	{...restProps}
>
	<ComboboxPrimitive.Input
		{placeholder}
		aria-label={ariaLabel}
		aria-labelledby={labelledBy}
		aria-describedby={describedBy}
		aria-invalid={invalid || undefined}
		class={styles.input()}
	/>
	<ComboboxPrimitive.Clear class={styles.button({ class: styles.clear() })}>
		<X aria-hidden="true" />
	</ComboboxPrimitive.Clear>
	<ComboboxPrimitive.Trigger aria-label={toggleLabel} class={styles.button()}>
		<ChevronDown aria-hidden="true" class={cn(styles.chevron(), open && 'rotate-180')} />
	</ComboboxPrimitive.Trigger>
	<ComboboxPrimitive.Status />
	<ComboboxPrimitive.Popover offset={4} class={styles.popover()}>
		<ComboboxPrimitive.List
			aria-label={listLabel}
			emptyPlaceholder={emptyText}
			class={styles.list()}
		>
			{@render children?.()}
		</ComboboxPrimitive.List>
	</ComboboxPrimitive.Popover>
</ComboboxPrimitive.Root>
