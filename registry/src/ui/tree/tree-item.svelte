<script lang="ts" module>
	import { tv } from '@registry/lib/utils';

	export const treeItemVariants = tv({
		slots: {
			// The select's row, nested: quiet at rest, up to ink under the pointer, on the focused row
			// while the tree holds the focus, and on the chosen one. The primitive sets the start
			// padding for the level, so the first part carries the row's own 4px.
			row: [
				'group/item relative flex h-6 shrink-0 cursor-default items-center gap-1 rounded-control pe-1.5',
				'text-body text-ink-muted transition-ink outline-hidden select-none',
				'data-hovered:bg-hover data-hovered:text-ink in-data-focus-within:data-focused:bg-hover in-data-focus-within:data-focused:text-ink',
				// With several, the box says which are chosen; the grey would only repeat it.
				'data-selected:text-ink data-[selection-mode=single]:data-selected:bg-hover data-focus-visible:shadow-focus',
				'data-disabled:pointer-events-none data-disabled:opacity-45'
			],
			// The chevron, and on a row with nothing under it an empty slot as wide, so labels line up.
			trigger: [
				'ms-1 grid size-4 shrink-0 cursor-pointer place-items-center rounded-check text-ink-subtle outline-hidden',
				'hover:text-ink'
			],
			chevron:
				'size-3.5 transition-transform duration-150 ease-out group-data-expanded/item:rotate-90 motion-reduce:transition-none rtl:-scale-x-100 rtl:group-data-expanded/item:rotate-90',
			spacer: 'ms-1 size-4 shrink-0',
			checkbox: 'me-0.5',
			icon: 'flex shrink-0 items-center text-ink-subtle [&_svg]:size-3.5 group-data-selected/item:text-ink-muted',
			label: 'min-w-0 truncate'
		}
	});
</script>

<script lang="ts">
	import { Tree as TreePrimitive, getTreeContext } from '@human-kit/ui/tree';
	import type { TreeItemProps } from '@human-kit/ui/tree';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
	import Check from '@lucide/svelte/icons/check';
	import Minus from '@lucide/svelte/icons/minus';
	import type { Snippet } from 'svelte';
	import { checkboxVariants } from '@registry/ui/checkbox';

	type Props = Omit<TreeItemProps, 'children'> & {
		/** The row's text. */
		title: string;
		/** A small icon before the text: a folder, a file. */
		icon?: Snippet;
		/** The rows under this one. Giving them is what makes the row open and close. */
		children?: Snippet;
	};

	let { title, icon, children, class: className, ...restProps }: Props = $props();

	const tree = getTreeContext();
	// Several rows at once get a box each, which also says when only part of a branch is chosen.
	const withCheckbox = $derived(tree?.selectionMode === 'multiple');

	const styles = treeItemVariants();
	const box = checkboxVariants();
</script>

<TreePrimitive.Item {title} class={styles.row({ class: className })} {...restProps}>
	{#if children}
		<TreePrimitive.Trigger class={styles.trigger()} aria-label={`Open ${title}`}>
			<ChevronRight class={styles.chevron()} aria-hidden="true" />
		</TreePrimitive.Trigger>
	{:else}
		<span class={styles.spacer()} aria-hidden="true"></span>
	{/if}
	{#if withCheckbox}
		<TreePrimitive.Checkbox class={box.root({ class: styles.checkbox() })}>
			<TreePrimitive.CheckboxIndicator>
				<Check class={box.check()} />
				<Minus class={box.dash()} />
			</TreePrimitive.CheckboxIndicator>
		</TreePrimitive.Checkbox>
	{/if}
	{#if icon}
		<span class={styles.icon()} aria-hidden="true">{@render icon()}</span>
	{/if}
	<TreePrimitive.Label class={styles.label()}>{title}</TreePrimitive.Label>
	{#if children}
		<TreePrimitive.Children>{@render children()}</TreePrimitive.Children>
	{/if}
</TreePrimitive.Item>
