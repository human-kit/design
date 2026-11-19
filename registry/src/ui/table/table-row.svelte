<script lang="ts">
	import { Table as TablePrimitive } from '@human-kit/ui/table';
	import type { TableRowProps } from '@human-kit/ui/table';
	import { tableStyles as styles } from './styles';

	let { class: className, ...restProps }: TableRowProps = $props();
</script>

<TablePrimitive.Row class={styles.row({ class: className })} {...restProps} />
