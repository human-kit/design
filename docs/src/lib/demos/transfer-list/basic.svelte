<script lang="ts">
	import { TransferList } from '@registry/ui/transfer-list';

	const columns = [
		{ id: 'name', label: 'Patient name' },
		{ id: 'dob', label: 'Date of birth' },
		{ id: 'cycle', label: 'Cycle day' },
		{ id: 'doctor', label: 'Doctor' },
		{ id: 'clinic', label: 'Clinic' },
		{ id: 'insurer', label: 'Insurer' }
	];

	let shown = $state(['name', 'cycle']);
</script>

<TransferList
	class="max-w-lg"
	aria-label="Table columns"
	items={columns}
	bind:value={shown}
	sourceLabel="Hidden"
	targetLabel="Shown"
	reorder
/>
