<script lang="ts">
	import { Table as TablePrimitive } from '@human-kit/ui/table';
	import type { TableSectionRowProps } from '@human-kit/ui/table';
	import { tableStyles as styles } from './styles';

	let { class: className, ...restProps }: TableSectionRowProps = $props();
</script>

<!-- A full-width heading row between groups of rows. -->
<TablePrimitive.SectionRow class={styles.section({ class: className })} {...restProps} />
