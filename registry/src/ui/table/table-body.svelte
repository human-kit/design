<script lang="ts">
	import { Table as TablePrimitive } from '@human-kit/ui/table';
	import type { TableBodyProps } from '@human-kit/ui/table';
	import { tableStyles as styles } from './styles';

	let { class: className, ...restProps }: TableBodyProps = $props();
</script>

<TablePrimitive.Body class={styles.body({ class: className })} {...restProps} />
