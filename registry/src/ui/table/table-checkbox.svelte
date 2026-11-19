<script lang="ts">
	import { Table as TablePrimitive } from '@human-kit/ui/table';
	import type { TableCheckboxProps } from '@human-kit/ui/table';
	import Check from '@lucide/svelte/icons/check';
	import Minus from '@lucide/svelte/icons/minus';
	import { checkboxVariants } from '@registry/ui/checkbox';

	let { class: className, ...restProps }: TableCheckboxProps = $props();

	const box = checkboxVariants();
</script>

<!-- The kit's checkbox, for a row or, in the header, for all of them. Put it in a cell of a
	column with `width={24}`, and give the cell the `check` look from `tableStyles`. -->
<TablePrimitive.Checkbox class={box.root({ class: className })} {...restProps}>
	<TablePrimitive.CheckboxIndicator>
		<Check class={box.check()} />
		<Minus class={box.dash()} />
	</TablePrimitive.CheckboxIndicator>
</TablePrimitive.Checkbox>
