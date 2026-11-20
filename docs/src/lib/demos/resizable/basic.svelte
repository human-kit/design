<script lang="ts">
	import { Resizable } from '@registry/ui/resizable';

	let size = $state(35);
</script>

<div class="rounded-card bg-surface shadow-card h-64 overflow-hidden">
	<Resizable bind:size min={20} max={70} label="Resize the patient list" class="h-full">
		{#snippet start()}
			<div class="text-body text-ink-muted p-3">Patients ({Math.round(size)}%)</div>
		{/snippet}
		{#snippet end()}
			<div class="text-body text-ink-muted p-3">Ana María Ruiz</div>
		{/snippet}
	</Resizable>
</div>
