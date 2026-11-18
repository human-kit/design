<script lang="ts">
	import * as Combobox from '@registry/ui/combobox';

	const doctors = [
		{ id: 'ramirez', name: 'Dr. Ana Ramírez' },
		{ id: 'ortega', name: 'Dr. Luis Ortega' },
		{ id: 'castro', name: 'Dr. Marta Castro' },
		{ id: 'pena', name: 'Dr. Julián Peña' },
		{ id: 'rojas', name: 'Dr. Sofía Rojas' }
	];

	let value = $state<string | number | null | (string | number)[]>(null);
</script>

<Combobox.Root class="w-64" aria-label="Doctor" placeholder="Search a doctor" bind:value>
	{#each doctors as doctor (doctor.id)}
		<Combobox.Item id={doctor.id}>{doctor.name}</Combobox.Item>
	{/each}
</Combobox.Root>
