<script lang="ts">
	import { RadioGroup, RadioGroupItem } from '@registry/ui/radio-group';

	let answer = $state<string | null>(null);
</script>

<RadioGroup
	label="Is the patient allergic to penicillin"
	required
	bind:value={answer}
	error={answer ? undefined : 'Answer before the prescription.'}
>
	<RadioGroupItem value="yes" label="Yes" />
	<RadioGroupItem value="no" label="No" />
	<RadioGroupItem value="unknown" label="Does not know" />
</RadioGroup>
