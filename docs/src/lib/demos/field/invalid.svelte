<script lang="ts">
	import { Field } from '@registry/ui/field';
	import { Input } from '@registry/ui/input';

	let taxId = $state('900.123');
	const error = $derived(
		taxId.replace(/\D/g, '').length === 9 ? undefined : 'The tax ID needs 9 digits.'
	);
</script>

<Field label="Tax ID" description="Nine digits, dots optional." {error} class="w-64">
	{#snippet children(control)}
		<Input {...control} bind:value={taxId} />
	{/snippet}
</Field>
