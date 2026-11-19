<script lang="ts">
	import { Table as TablePrimitive } from '@human-kit/ui/table';
	import type { TableColumnProps } from '@human-kit/ui/table';
	import ArrowDown from '@lucide/svelte/icons/arrow-down';
	import ArrowUp from '@lucide/svelte/icons/arrow-up';
	import ChevronsUpDown from '@lucide/svelte/icons/chevrons-up-down';
	import type { Snippet } from 'svelte';
	import { tableStyles as styles } from './styles';

	type Props = Omit<TableColumnProps, 'children'> & {
		/** The column's name, or your own header content. */
		children?: Snippet;
		/** Its name is a button that sorts the table by it. */
		sortable?: boolean;
		/** A grip at its end to change its width, by pointer or by keyboard. */
		resizable?: boolean;
		class?: string;
	};

	let {
		children,
		sortable = false,
		resizable = false,
		class: className,
		...columnProps
	}: Props = $props();
</script>

<!-- The column's metadata and its header cell in one part. -->
<TablePrimitive.Column {...columnProps}>
	<TablePrimitive.ColumnHeaderCell class={styles.head({ class: className })}>
		{#if sortable}
			<TablePrimitive.SortTrigger class={styles.sort()}>
				{#snippet children({ sortDirection })}
					{@render content()}
					{#if sortDirection === 'ascending'}
						<ArrowUp aria-hidden="true" />
					{:else if sortDirection === 'descending'}
						<ArrowDown aria-hidden="true" />
					{:else}
						<ChevronsUpDown class={styles.sortIcon()} aria-hidden="true" />
					{/if}
				{/snippet}
			</TablePrimitive.SortTrigger>
		{:else}
			{@render content()}
		{/if}
		{#if resizable}
			<TablePrimitive.ColumnResizer class={styles.resizer()} />
		{/if}
	</TablePrimitive.ColumnHeaderCell>
</TablePrimitive.Column>

{#snippet content()}{@render children?.()}{/snippet}
