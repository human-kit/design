<script lang="ts" module>
	import { tv, type VariantProps } from '@registry/lib/utils';

	/**
	 * Nested rows that open and close: a folder list, a chart of accounts. The tree is one tab
	 * stop; the arrows move through the rows, and right and left open and close them. Each level
	 * steps in by the width of the chevron, so a child's chevron sits under its parent's label.
	 */
	export const treeVariants = tv({
		base: [
			'flex flex-col gap-0.5 overflow-y-auto text-body text-ink outline-hidden [--tree-indent-size:1.25rem]',
			// The ring shows when the keyboard reaches the tree itself, before a row takes the focus.
			'focus-visible:shadow-focus'
		],
		variants: {
			variant: {
				// Rows straight on the surface it sits on. The 4px inset is the focus halo's room: the
				// tree scrolls, so it cuts what reaches past its edge.
				ghost: 'rounded-control p-1',
				// A card of its own around the rows.
				outline: 'rounded-card bg-surface p-1 shadow-card'
			}
		},
		defaultVariants: { variant: 'outline' }
	});

	export type TreeVariant = NonNullable<VariantProps<typeof treeVariants>['variant']>;
</script>

<script lang="ts" generics="T extends object = object">
	import { Tree as TreePrimitive, collapseMotion } from '@human-kit/ui/tree';
	import type { TreeRootProps } from '@human-kit/ui/tree';

	type Props = TreeRootProps<T> & { variant?: TreeVariant };

	let {
		variant = 'outline',
		selectionMode = 'single',
		// One row: a press moves the choice, as in a file list. Several: each press adds or takes
		// away a row, so a plain click never wipes the rest.
		selectionBehavior = selectionMode === 'multiple' ? 'toggle' : 'replace',
		// Rows that open slide down and fade in, the accordion's motion.
		itemTransition = (node) => collapseMotion(node, { duration: 150 }),
		class: className,
		...restProps
	}: Props = $props();
</script>

<TreePrimitive.Root
	{selectionMode}
	{selectionBehavior}
	{itemTransition}
	class={treeVariants({ variant, class: className })}
	{...restProps}
/>
