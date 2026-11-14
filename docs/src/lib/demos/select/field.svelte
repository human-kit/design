<script lang="ts">
	import { Field } from '@registry/ui/field';
	import * as Select from '@registry/ui/select';

	const terms = [
		{ id: 'cash', label: 'Cash' },
		{ id: '30', label: '30 days' },
		{ id: '60', label: '60 days' }
	];

	let value = $state<string | number | null>(null);
	const error = $derived(value === null ? 'Choose the payment terms.' : undefined);
</script>

<Field label="Payment terms" required {error} class="w-64">
	{#snippet children(control)}
		<Select.Root {...control} bind:value items={terms} placeholder="Choose">
			<Select.Trigger />
			<Select.Content>
				{#each terms as term (term.id)}
					<Select.Item id={term.id}>{term.label}</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
	{/snippet}
</Field>
