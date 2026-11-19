<script lang="ts">
	import { Table as TablePrimitive } from '@human-kit/ui/table';
	import type { TableRootProps } from '@human-kit/ui/table';
	import { tableVariants } from './styles';

	type Props = TableRootProps & {
		variant?: 'outline' | 'ghost';
		/** The class of the box around the table, which scrolls. */
		frameClass?: string;
	};

	let {
		variant = 'outline',
		frameClass,
		defaultSortDescriptor,
		// The wrapper holds the sort itself, starting from `defaultSortDescriptor`: left to the
		// primitive, a starting sort is dropped once the columns register.
		sortDescriptor = $bindable(),
		onSortChange,
		class: className,
		...restProps
	}: Props = $props();

	// svelte-ignore state_referenced_locally
	if (sortDescriptor === undefined) sortDescriptor = defaultSortDescriptor;

	const styles = $derived(tableVariants({ variant }));
</script>

<!-- The box scrolls, so a wide table keeps its columns and the page keeps its width. -->
<div class={styles.frame({ class: frameClass })}>
	<TablePrimitive.Root
		{sortDescriptor}
		onSortChange={(next) => {
			sortDescriptor = next;
			onSortChange?.(next);
		}}
		class={styles.table({ class: className })}
		{...restProps}
	/>
</div>
