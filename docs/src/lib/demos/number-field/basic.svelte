<script lang="ts">
	import { Field } from '@registry/ui/field';
	import { NumberField } from '@registry/ui/number-field';

	let embryos = $state<number | null>(2);
</script>

<Field class="w-48" label="Embryos to transfer" description="One or two.">
	{#snippet children(control)}
		<NumberField {...control} bind:value={embryos} min={1} max={2} />
	{/snippet}
</Field>
