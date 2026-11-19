<script lang="ts">
	import { Table as TablePrimitive } from '@human-kit/ui/table';
	import type { TableFooterProps } from '@human-kit/ui/table';
	import { tableStyles as styles } from './styles';

	let { class: className, ...restProps }: TableFooterProps = $props();
</script>

<TablePrimitive.Footer class={styles.footer({ class: className })} {...restProps} />
