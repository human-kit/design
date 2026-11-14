<script lang="ts">
	import { Avatar, AvatarGroup } from '@registry/ui/avatar';

	const team = ['Ana María Ruiz', 'Julián Ortega', 'Lucía Fernández', 'Pedro Gómez', 'Sara Díaz'];
</script>

<AvatarGroup max={3} aria-label="Care team">
	{#each team as name (name)}
		<Avatar {name} />
	{/each}
</AvatarGroup>
