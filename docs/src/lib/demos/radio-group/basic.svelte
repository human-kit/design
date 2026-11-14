<script lang="ts">
	import { RadioGroup, RadioGroupItem } from '@registry/ui/radio-group';

	let payment = $state('insurer');
</script>

<RadioGroup label="Who pays the consultation" bind:value={payment}>
	<RadioGroupItem value="patient" label="The patient" />
	<RadioGroupItem
		value="insurer"
		label="The insurer"
		description="It is billed at the end of the month."
	/>
	<RadioGroupItem value="clinic" label="The clinic" />
</RadioGroup>
