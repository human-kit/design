<script lang="ts">
	import { Button } from '@registry/ui/button';
	import { EmptyState } from '@registry/ui/empty-state';
	import Plus from '@lucide/svelte/icons/plus';
</script>

<EmptyState variant="outline" title="No transfers scheduled" class="max-w-md">
	Frozen embryo transfers for this patient will appear here once a date is set.
	{#snippet actions()}
		<Button size="sm" icon={Plus}>Schedule a transfer</Button>
	{/snippet}
</EmptyState>
