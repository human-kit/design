<script lang="ts">
	import { Clock } from '@registry/ui/clock';

	let value = $state<string | null>('09:30');
</script>

<Clock label="Appointment" bind:value minuteStep={5} hourCycle={24} />
