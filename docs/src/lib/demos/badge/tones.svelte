<script lang="ts">
	import { Badge, badgeTones } from '@registry/ui/badge';
</script>

<!-- A state says what it means once, in the app: map it to a tone, and every badge follows. -->
<div class="flex flex-wrap items-center gap-2">
	{#each badgeTones as tone (tone)}
		<Badge {tone}>{tone}</Badge>
	{/each}
</div>
