<script lang="ts">
	import { Calendar } from '@registry/ui/calendar';

	// Weekends are closed: they show, and cannot be taken.
	const closed = (date: string) => [0, 6].includes(new Date(`${date}T12:00:00`).getDay());
</script>

<Calendar
	aria-label="Treatment dates"
	selectionMode="range"
	visibleMonths={2}
	defaultValue={{ start: '2026-11-10', end: '2026-11-19' }}
	isDateUnavailable={closed}
/>
