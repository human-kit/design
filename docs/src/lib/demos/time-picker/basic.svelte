<script lang="ts">
	import { TimePicker } from '@registry/ui/time-picker';

	let value = $state<string | null>(null);
</script>

<TimePicker aria-label="Appointment time" bind:value class="w-32" />
