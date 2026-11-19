<script lang="ts">
	import { Listbox, ListboxItem } from '@registry/ui/listbox';

	const clinics = ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena'];
</script>

<Listbox aria-label="Clinic" defaultValue={['Medellín']} class="w-48">
	{#each clinics as clinic (clinic)}
		<ListboxItem id={clinic}>{clinic}</ListboxItem>
	{/each}
</Listbox>
