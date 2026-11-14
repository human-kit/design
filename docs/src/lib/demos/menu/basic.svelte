<script lang="ts">
	import Copy from '@lucide/svelte/icons/copy';
	import Ellipsis from '@lucide/svelte/icons/ellipsis';
	import Pencil from '@lucide/svelte/icons/pencil';
	import Printer from '@lucide/svelte/icons/printer';
	import Trash from '@lucide/svelte/icons/trash-2';
	import { Menu, MenuContent, MenuItem, MenuSeparator, MenuTrigger } from '@registry/ui/menu';
</script>

<Menu>
	<MenuTrigger variant="ghost" size="icon" aria-label="Appointment actions">
		<Ellipsis />
	</MenuTrigger>
	<MenuContent>
		<MenuItem icon={Pencil} shortcut="E">Edit</MenuItem>
		<MenuItem icon={Copy} shortcut="Ctrl D">Duplicate</MenuItem>
		<MenuItem icon={Printer} disabled>Print</MenuItem>
		<MenuSeparator />
		<MenuItem icon={Trash} intent="danger">Delete</MenuItem>
	</MenuContent>
</Menu>
