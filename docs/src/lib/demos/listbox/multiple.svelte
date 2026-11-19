<script lang="ts">
	import { Listbox, ListboxItem } from '@registry/ui/listbox';

	const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
</script>

<Listbox
	aria-label="Clinic days"
	selectionMode="multiple"
	defaultValue={['Monday', 'Wednesday']}
	class="w-48"
>
	{#each days as day (day)}
		<ListboxItem id={day} disabled={day === 'Friday'}>{day}</ListboxItem>
	{/each}
</Listbox>
