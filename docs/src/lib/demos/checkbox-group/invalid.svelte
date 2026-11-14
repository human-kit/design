<script lang="ts">
	import { Checkbox } from '@registry/ui/checkbox';
	import { CheckboxGroup } from '@registry/ui/checkbox-group';

	let days = $state<string[]>([]);
</script>

<CheckboxGroup
	label="Days the clinic is open"
	orientation="horizontal"
	required
	bind:value={days}
	error={days.length ? undefined : 'Pick at least one day.'}
>
	<Checkbox value="mon" label="Mon" />
	<Checkbox value="tue" label="Tue" />
	<Checkbox value="wed" label="Wed" />
	<Checkbox value="thu" label="Thu" />
	<Checkbox value="fri" label="Fri" />
</CheckboxGroup>
