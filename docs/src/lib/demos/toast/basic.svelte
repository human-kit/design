<script lang="ts">
	import { Button } from '@registry/ui/button';
	import { Toaster, type ToastManager } from '@registry/ui/toast';

	// In an app the Toaster wraps the layout once, and a page calls `useToastManager()`.
	let manager = $state<ToastManager>();
</script>

<Toaster bind:manager closeLabel="Close">
	<div class="flex flex-wrap gap-2">
		<Button
			variant="outline"
			onclick={() =>
				manager?.add({
					type: 'success',
					title: 'Appointment booked',
					description: 'Thursday 14 at 9:30, with Dr. Ramírez.'
				})}>Book</Button
		>
		<Button
			variant="outline"
			onclick={() =>
				manager?.add({
					title: 'Note archived',
					data: { action: { label: 'Undo', onClick: () => {} } }
				})}>Archive</Button
		>
		<Button
			variant="outline"
			onclick={() =>
				manager?.add({
					type: 'error',
					title: 'The lab did not answer',
					description: 'The results will be fetched again in a minute.'
				})}>Fail</Button
		>
	</div>
</Toaster>
