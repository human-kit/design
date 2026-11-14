<script lang="ts">
	import { ToggleGroup, ToggleGroupItem } from '@registry/ui/toggle-group';
	import Bold from '@lucide/svelte/icons/bold';
	import Italic from '@lucide/svelte/icons/italic';
	import Underline from '@lucide/svelte/icons/underline';
</script>

<ToggleGroup selectionMode="multiple" size="icon" defaultValue={['bold']} aria-label="Text style">
	<ToggleGroupItem value="bold" aria-label="Bold"><Bold /></ToggleGroupItem>
	<ToggleGroupItem value="italic" aria-label="Italic"><Italic /></ToggleGroupItem>
	<ToggleGroupItem value="underline" aria-label="Underline"><Underline /></ToggleGroupItem>
</ToggleGroup>
