<script lang="ts">
	import { DatePicker } from '@registry/ui/date-picker';

	let value = $state<string | null>(null);
</script>

<DatePicker aria-label="Appointment day" bind:value class="w-40" />
