<script lang="ts">
	import { ColorPicker } from '@registry/ui/color-picker';

	let colour = $state('#4f46e5');
</script>

<ColorPicker
	label="Calendar colour"
	bind:value={colour}
	swatches={[
		'#4f46e5',
		'#0ea5e9',
		'#10b981',
		'#f59e0b',
		'#ef4444',
		'#ec4899',
		'#64748b',
		'#171717'
	]}
/>
