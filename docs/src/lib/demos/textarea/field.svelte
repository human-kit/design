<script lang="ts">
	import { Field } from '@registry/ui/field';
	import { Textarea } from '@registry/ui/textarea';

	let reason = $state('');
</script>

<Field
	label="Reason for the cancellation"
	required
	error={reason.trim() ? undefined : 'Write why the appointment is cancelled.'}
	class="w-96"
>
	{#snippet children(control)}
		<Textarea {...control} bind:value={reason} />
	{/snippet}
</Field>
