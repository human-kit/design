<script lang="ts">
	import { Badge } from '@registry/ui/badge';
	import { OverflowRow } from '@registry/ui/overflow-row';

	const tags = ['IVF', 'Frozen transfer', 'Donor eggs', 'PGT-A', 'ICSI', 'Second cycle'];
</script>

<div class="w-72">
	<OverflowRow items={tags} getKey={(tag) => tag} getLabel={(tag) => tag}>
		{#snippet children({ item })}
			<Badge variant="outline" dot={false}>{item}</Badge>
		{/snippet}
	</OverflowRow>
</div>
