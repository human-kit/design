<script lang="ts">
	import { Checkbox } from '@registry/ui/checkbox';

	let items = $state([
		{ name: 'Blood test', checked: true },
		{ name: 'Ultrasound', checked: false },
		{ name: 'Consultation', checked: true }
	]);
	const count = $derived(items.filter((item) => item.checked).length);
</script>

<!-- A box over a list says whether all, none or some of the list is ticked. -->
<div class="flex flex-col gap-2">
	<Checkbox
		label="All services"
		checked={count === items.length}
		indeterminate={count > 0 && count < items.length}
		onCheckedChange={(checked) => items.forEach((item) => (item.checked = checked))}
	/>
	<div class="flex flex-col gap-2 pl-6">
		{#each items as item (item.name)}
			<Checkbox label={item.name} bind:checked={item.checked} />
		{/each}
	</div>
</div>
