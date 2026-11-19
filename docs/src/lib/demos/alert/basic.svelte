<script lang="ts">
	import { Alert } from '@registry/ui/alert';
	import { Button } from '@registry/ui/button';

	let shown = $state(true);
</script>

{#if shown}
	<Alert
		tone="warning"
		title="Consent form missing"
		onDismiss={() => (shown = false)}
		class="max-w-md"
	>
		The patient has not signed the consent for the frozen transfer. It is needed before the
		procedure.
		{#snippet actions()}
			<Button size="sm" variant="outline">Send the form</Button>
		{/snippet}
	</Alert>
{/if}
