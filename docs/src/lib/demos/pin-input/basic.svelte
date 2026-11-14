<script lang="ts">
	import { Field } from '@registry/ui/field';
	import { PinInput } from '@registry/ui/pin-input';

	let code = $state('');
</script>

<Field label="Verification code" description="We sent it by text to the number ending in 4417.">
	{#snippet children(control)}
		<PinInput {...control} otp split={3} bind:value={code} />
	{/snippet}
</Field>
