<script lang="ts">
	import { Checkbox } from '@registry/ui/checkbox';

	let accepted = $state(false);
</script>

<Checkbox
	label="I accept the terms of the treatment"
	description={accepted ? undefined : 'Accept the terms to go on.'}
	invalid={!accepted}
	required
	bind:checked={accepted}
/>
