<script lang="ts">
	import { Table as TablePrimitive } from '@human-kit/ui/table';
	import type { TableHeaderProps } from '@human-kit/ui/table';
	import { tableStyles as styles } from './styles';

	let { class: className, ...restProps }: TableHeaderProps = $props();
</script>

<TablePrimitive.Header class={styles.header({ class: className })} {...restProps} />
