<script lang="ts" module>
	import { tv, type VariantProps } from '@registry/lib/utils';

	/**
	 * A list that stays on the page, for picking one row or several: the select's rows without
	 * the field that opens them. The list takes the focus as one stop; the arrows move through it.
	 */
	export const listboxVariants = tv({
		base: [
			'flex flex-col gap-0.5 overflow-y-auto text-body text-ink outline-hidden',
			// The ring shows when the keyboard reaches the list itself, before a row takes the focus.
			'focus-visible:shadow-focus'
		],
		variants: {
			variant: {
				// Rows straight on the surface it sits on, for a list inside a card or a panel. The 4px
				// inset is the focus halo's room: the list scrolls, so it cuts what reaches past its edge.
				ghost: 'rounded-control p-1',
				// A card of its own around the rows.
				outline: 'rounded-card bg-surface p-1 shadow-card'
			}
		},
		defaultVariants: { variant: 'outline' }
	});

	export type ListboxVariant = NonNullable<VariantProps<typeof listboxVariants>['variant']>;
</script>

<script lang="ts">
	import { ListBox as ListboxPrimitive } from '@human-kit/ui/listbox';
	import type { ComponentProps } from 'svelte';

	type Props = ComponentProps<typeof ListboxPrimitive.Root> & { variant?: ListboxVariant };

	let {
		variant = 'outline',
		selectionMode = 'single',
		// One row: pressing the chosen row again keeps it, as a select does. Several: each press
		// adds or takes away a row, so a plain click never wipes the rest.
		selectionBehavior = selectionMode === 'multiple' ? 'toggle' : 'replace',
		class: className,
		...restProps
	}: Props = $props();
</script>

<!-- The rows come as children, or from `items` with a row snippet. -->
<ListboxPrimitive.Root
	{selectionMode}
	{selectionBehavior}
	class={listboxVariants({ variant, class: className })}
	{...restProps}
/>
