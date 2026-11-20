<script lang="ts">
	import { ScrollArea } from '@registry/ui/scroll-area';

	const notes = Array.from(
		{ length: 24 },
		(_, i) => `Note ${i + 1}: follow-up after the transfer.`
	);
</script>

<div class="rounded-card bg-surface shadow-card w-72">
	<ScrollArea label="Visit notes" fade class="h-48 p-3">
		<ul class="text-body text-ink-muted flex flex-col gap-1.5">
			{#each notes as note (note)}<li>{note}</li>{/each}
		</ul>
	</ScrollArea>
</div>
