<script lang="ts">
	import { Table as TablePrimitive } from '@human-kit/ui/table';
	import type { TableEmptyStateProps } from '@human-kit/ui/table';
	import { tableStyles as styles } from './styles';

	let { class: className, ...restProps }: TableEmptyStateProps = $props();
</script>

<!-- Shown in the body while it has no rows. -->
<TablePrimitive.EmptyState class={styles.empty({ class: className })} {...restProps} />
