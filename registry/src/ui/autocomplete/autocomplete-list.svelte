<script lang="ts">
	import { Autocomplete as AutocompletePrimitive } from '@human-kit/ui/autocomplete';
	import type { ComponentProps } from 'svelte';
	import { autocompleteStyles as styles } from './styles';

	let {
		selectionMode = 'single',
		// One row: pressing the chosen row again keeps it. Several: each press adds or takes away.
		selectionBehavior = selectionMode === 'multiple' ? 'toggle' : 'replace',
		class: className,
		...restProps
	}: ComponentProps<typeof AutocompletePrimitive.List> = $props();
</script>

<AutocompletePrimitive.List
	{selectionMode}
	{selectionBehavior}
	class={styles.list({ class: className })}
	{...restProps}
/>
