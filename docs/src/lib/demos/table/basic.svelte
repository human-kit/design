<script lang="ts">
	import {
		Table,
		TableBody,
		TableCell,
		TableCheckbox,
		TableHead,
		TableHeader,
		TableRow,
		tableStyles,
		type TableSortDescriptor
	} from '@registry/ui/table';

	const patients = [
		{ id: 'p1', name: 'Ana Gómez', doctor: 'Dr. Ruiz', cycle: 12, next: 'Mon 24' },
		{ id: 'p2', name: 'Lucía Pérez', doctor: 'Dr. Vega', cycle: 3, next: 'Wed 26' },
		{ id: 'p3', name: 'Marta Díaz', doctor: 'Dr. Ruiz', cycle: 21, next: 'Thu 27' },
		{ id: 'p4', name: 'Sofía Romero', doctor: 'Dr. Luna', cycle: 8, next: 'Fri 28' }
	];

	let sort = $state<TableSortDescriptor | undefined>({ column: 'name', direction: 'ascending' });

	const rows = $derived.by(() => {
		if (!sort) return patients;
		const { column, direction } = sort;
		const key = column as keyof (typeof patients)[number];
		const sorted = [...patients].sort((a, b) => (a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0));
		return direction === 'descending' ? sorted.reverse() : sorted;
	});
</script>

<Table
	aria-label="Patients"
	selectionMode="multiple"
	bind:sortDescriptor={sort}
	frameClass="max-w-xl"
>
	<TableHeader>
		<TableRow>
			<TableHead id="select" width={24} class={tableStyles.check()}><TableCheckbox /></TableHead>
			<TableHead id="name" rowHeader sortable>Patient</TableHead>
			<TableHead id="doctor" sortable>Doctor</TableHead>
			<TableHead id="cycle" sortable class="text-end">Cycle day</TableHead>
			<TableHead id="next">Next visit</TableHead>
		</TableRow>
	</TableHeader>
	<TableBody>
		{#each rows as patient (patient.id)}
			<TableRow id={patient.id}>
				<TableCell class={tableStyles.check()}><TableCheckbox /></TableCell>
				<TableCell>{patient.name}</TableCell>
				<TableCell class="text-ink-muted">{patient.doctor}</TableCell>
				<TableCell class="text-end tabular-nums">{patient.cycle}</TableCell>
				<TableCell class="text-ink-muted">{patient.next}</TableCell>
			</TableRow>
		{/each}
	</TableBody>
</Table>
