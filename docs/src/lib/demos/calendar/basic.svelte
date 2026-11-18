<script lang="ts">
	import { Calendar } from '@registry/ui/calendar';

	let value = $state<string | null>('2026-11-20');
</script>

<Calendar aria-label="Appointment day" bind:value />
