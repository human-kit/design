<script lang="ts">
	import { Button } from '@registry/ui/button';
	import { CommandPalette, type CommandPaletteItem } from '@registry/ui/command-palette';
	import { Kbd } from '@registry/ui/kbd';
	import Calendar from '@lucide/svelte/icons/calendar';
	import FlaskConical from '@lucide/svelte/icons/flask-conical';
	import Plus from '@lucide/svelte/icons/plus';
	import Users from '@lucide/svelte/icons/users';

	let open = $state(false);
	let last = $state('');

	const items: CommandPaletteItem[] = [
		{
			id: 'new',
			label: 'New appointment',
			icon: Plus,
			shortcut: ['Ctrl', 'N'],
			keywords: 'visit book',
			onSelect: () => (last = 'New appointment')
		},
		{
			id: 'calendar',
			label: 'Open the calendar',
			icon: Calendar,
			onSelect: () => (last = 'Calendar')
		},
		{
			id: 'patients',
			label: 'Find a patient',
			icon: Users,
			keywords: 'search record',
			onSelect: () => (last = 'Patients')
		},
		{
			id: 'lab',
			label: 'Laboratory cultures',
			icon: FlaskConical,
			onSelect: () => (last = 'Cultures')
		}
	];
</script>

<div class="text-body text-ink-muted flex items-center gap-3">
	<Button variant="outline" onclick={() => (open = true)}>Open the palette</Button>
	<span>or press <Kbd keys={['Ctrl', 'K']} /></span>
	{#if last}<span>Ran: {last}</span>{/if}
</div>
<CommandPalette bind:open {items} />
