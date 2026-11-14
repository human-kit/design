<script lang="ts">
	import { Field } from '@registry/ui/field';
	import { Input } from '@registry/ui/input';

	let supplier = $state('');
</script>

<Field label="Supplier" description="The legal name, as on the invoice." required class="w-64">
	{#snippet children(control)}
		<Input {...control} bind:value={supplier} placeholder="Andes Lab S.A.S." />
	{/snippet}
</Field>
