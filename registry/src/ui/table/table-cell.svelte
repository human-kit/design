<script lang="ts">
	import { Table as TablePrimitive } from '@human-kit/ui/table';
	import type { TableCellProps } from '@human-kit/ui/table';
	import { tableStyles as styles } from './styles';

	let { class: className, ...restProps }: TableCellProps = $props();
</script>

<TablePrimitive.Cell class={styles.cell({ class: className })} {...restProps} />
