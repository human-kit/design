<script lang="ts">
	import * as Select from '@registry/ui/select';

	const plans = [
		{ id: 'free', label: 'Free' },
		{ id: 'team', label: 'Team' },
		{ id: 'enterprise', label: 'Enterprise' }
	];
</script>

<div class="flex w-full max-w-xs flex-col gap-2">
	<Select.Root name="plan" placeholder="Select a plan" items={plans} disabledKeys={['enterprise']}>
		<Select.Label>Plan</Select.Label>
		<Select.Trigger />
		<Select.Content>
			{#each plans as plan (plan.id)}
				<Select.Item id={plan.id}>{plan.label}</Select.Item>
			{/each}
		</Select.Content>
	</Select.Root>
</div>
