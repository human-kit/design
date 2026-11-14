<script lang="ts">
	import * as Select from '@registry/ui/select';

	const fruits = [
		{ id: 'apple', label: 'Apple' },
		{ id: 'banana', label: 'Banana' },
		{ id: 'cherry', label: 'Cherry' },
		{ id: 'grape', label: 'Grape' },
		{ id: 'mango', label: 'Mango' }
	];

	let value = $state<string | number | null>('cherry');
</script>

<div class="flex w-full max-w-xs flex-col gap-2">
	<Select.Root bind:value name="fruit" items={fruits}>
		<Select.Label>Fruit</Select.Label>
		<Select.Trigger />
		<Select.Content>
			{#each fruits as fruit (fruit.id)}
				<Select.Item id={fruit.id}>{fruit.label}</Select.Item>
			{/each}
		</Select.Content>
	</Select.Root>
</div>
