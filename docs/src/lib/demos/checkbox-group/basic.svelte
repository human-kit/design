<script lang="ts">
	import { Checkbox } from '@registry/ui/checkbox';
	import { CheckboxGroup } from '@registry/ui/checkbox-group';

	let tests = $state<string[]>(['hiv']);
</script>

<CheckboxGroup
	label="Screening tests"
	description="Pick every test the lab will run."
	bind:value={tests}
>
	<Checkbox value="hiv" label="HIV" />
	<Checkbox value="hepatitis-b" label="Hepatitis B" />
	<Checkbox value="hepatitis-c" label="Hepatitis C" />
	<Checkbox value="syphilis" label="Syphilis" />
</CheckboxGroup>
