<script lang="ts">
	import * as Select from '@registry/ui/select';

	const plans = [
		{ id: 'free', label: 'Free' },
		{ id: 'team', label: 'Team' },
		{ id: 'enterprise', label: 'Enterprise' }
	];
</script>

<Select.Root
	name="plan"
	placeholder="Select a plan"
	items={plans}
	disabledKeys={['enterprise']}
	class="w-64"
>
	<Select.Label>Plan</Select.Label>
	<Select.Trigger />
	<Select.Content>
		{#each plans as plan (plan.id)}
			<Select.Item id={plan.id}>{plan.label}</Select.Item>
		{/each}
	</Select.Content>
</Select.Root>
