<script lang="ts" module>
	import { tv, type VariantProps } from '@registry/lib/utils';

	/** The box's ring darkens under the pointer, as the input's does. */
	const ringHover = 'hover:not-focus-within:not-data-invalid:not-data-readonly:shadow-field-hover';

	/**
	 * The input's box with a magnifier at its start and, once there is text, a cross at its end
	 * that empties it. The cross takes no tab stop, since Escape does the same; the ring follows
	 * the focus anywhere in the box.
	 */
	export const searchFieldVariants = tv({
		slots: {
			root: [
				'flex w-full min-w-0 items-center rounded-control ps-2 pe-0.5 text-body',
				'shadow-field transition-[box-shadow,border-color,background-color,opacity] duration-150 ease-out',
				'focus-within:shadow-focus data-invalid:shadow-invalid data-invalid:focus-within:shadow-invalid-focus',
				'data-disabled:cursor-not-allowed data-disabled:opacity-45',
				'data-readonly:bg-transparent data-readonly:not-focus-within:shadow-none'
			],
			icon: 'pointer-events-none size-3.5 shrink-0 text-ink-subtle',
			input: [
				'h-full min-w-0 flex-1 truncate bg-transparent ps-1.5 pe-1 text-ink outline-hidden placeholder:text-ink-subtle',
				// The browser's own cross would stand beside ours.
				'appearance-none [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none',
				'data-disabled:cursor-not-allowed data-readonly:cursor-default'
			],
			clear: [
				'grid shrink-0 cursor-pointer place-items-center rounded-[calc(var(--radius-control)-2px)] text-ink-muted outline-hidden',
				'transition-colors duration-150 data-hovered:bg-hover data-hovered:text-ink data-pressed:bg-ink/8',
				// Gone while there is nothing to clear; its room stays, so the text does not move.
				'data-empty:invisible data-readonly:invisible',
				'[&_svg]:pointer-events-none [&_svg]:size-3.5'
			]
		},
		variants: {
			variant: {
				// A faint grey of its own, as the input's default.
				default: { root: `bg-ink/2 ${ringHover}` },
				// The white box, for a field on the page rather than on a card.
				surface: { root: `bg-surface ${ringHover}` },
				// No box until it is used: grey under the pointer, the ring on focus. For a search at
				// the head of a list or in a toolbar.
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
						'data-invalid:border-danger-solid data-invalid:shadow-none data-invalid:focus-within:shadow-invalid-focus-line'
					]
				}
			},
			size: {
				// The height of the small button.
				sm: { root: 'h-6', clear: 'size-5' },
				// The height of the default button, so the field lines up with the ones beside it.
				default: { root: 'h-6.5', clear: 'size-5.5' },
				// The input's large height, the text kept at the body size.
				lg: { root: 'h-7.5 ps-2.5', icon: 'size-4', clear: 'size-6.5' }
			}
		},
		compoundVariants: [{ variant: 'underline', size: 'lg', class: { root: 'ps-0' } }],
		defaultVariants: { variant: 'default', size: 'default' }
	});

	export type SearchFieldVariant = NonNullable<VariantProps<typeof searchFieldVariants>['variant']>;
	export type SearchFieldSize = NonNullable<VariantProps<typeof searchFieldVariants>['size']>;
</script>

<script lang="ts">
	import { SearchField as SearchFieldPrimitive } from '@human-kit/ui/search-field';
	import Search from '@lucide/svelte/icons/search';
	import X from '@lucide/svelte/icons/x';
	import type { ComponentProps } from 'svelte';

	type Props = Omit<ComponentProps<typeof SearchFieldPrimitive.Root>, 'children'> & {
		variant?: SearchFieldVariant;
		size?: SearchFieldSize;
		placeholder?: string;
		'aria-label'?: string;
		'aria-labelledby'?: string;
		'aria-describedby'?: string;
	};

	let {
		value = $bindable(),
		variant = 'default',
		size = 'default',
		placeholder,
		'aria-label': ariaLabel,
		'aria-labelledby': labelledBy,
		'aria-describedby': describedBy,
		class: className,
		...restProps
	}: Props = $props();

	const styles = $derived(searchFieldVariants({ variant, size }));
</script>

<!--
	Name it with `aria-label="Search orders"`, or with a `Field`: the field's label names it through
	`aria-labelledby`. Its `id` goes on the box, the input's is that id plus `-input`.
-->
<SearchFieldPrimitive.Root bind:value class={styles.root({ class: className })} {...restProps}>
	<Search class={styles.icon()} aria-hidden="true" />
	<SearchFieldPrimitive.Input
		{placeholder}
		aria-label={ariaLabel}
		aria-labelledby={labelledBy}
		aria-describedby={describedBy}
		class={styles.input()}
	/>
	<SearchFieldPrimitive.Clear class={styles.clear()}><X /></SearchFieldPrimitive.Clear>
</SearchFieldPrimitive.Root>
