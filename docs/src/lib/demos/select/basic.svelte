<script lang="ts">
	import * as Select from '@registry/ui/select';

	const currencies = [
		{ id: 'cop', label: 'Colombian peso' },
		{ id: 'usd', label: 'US dollar' },
		{ id: 'eur', label: 'Euro' }
	];

	let value = $state<string | number | null>('cop');
</script>

<Select.Root bind:value name="currency" items={currencies} class="w-64">
	<Select.Label>Currency</Select.Label>
	<Select.Trigger />
	<Select.Content>
		{#each currencies as currency (currency.id)}
			<Select.Item id={currency.id}>{currency.label}</Select.Item>
		{/each}
	</Select.Content>
</Select.Root>
