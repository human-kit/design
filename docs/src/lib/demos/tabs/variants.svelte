<script lang="ts">
	import CalendarDays from '@lucide/svelte/icons/calendar-days';
	import List from '@lucide/svelte/icons/list';
	import { Tabs, TabsList, TabsPanel, TabsTab } from '@registry/ui/tabs';
</script>

<Tabs variant="segment" value="list" class="w-full max-w-md">
	<TabsList aria-label="View">
		<TabsTab value="list" icon={List}>List</TabsTab>
		<TabsTab value="calendar" icon={CalendarDays}>Calendar</TabsTab>
	</TabsList>
	<TabsPanel value="list">
		<p class="text-body text-ink-muted">Today's appointments, one per row.</p>
	</TabsPanel>
	<TabsPanel value="calendar">
		<p class="text-body text-ink-muted">The week, with the appointments on each day.</p>
	</TabsPanel>
</Tabs>
