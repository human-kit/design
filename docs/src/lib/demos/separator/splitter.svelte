<script lang="ts">
	import { Separator } from '@registry/ui/separator';

	let size = $state(40);
</script>

<div class="rounded-card bg-surface shadow-card text-body flex h-40 w-96 overflow-hidden">
	<div id="split-list" class="p-3" style="width: {size}%">List</div>
	<Separator
		orientation="vertical"
		bind:value={size}
		min={20}
		max={80}
		aria-label="Resize list"
		aria-controls="split-list"
	/>
	<div class="flex-1 p-3">Detail</div>
</div>
