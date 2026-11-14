<script lang="ts">
	import Bold from '@lucide/svelte/icons/bold';
	import Italic from '@lucide/svelte/icons/italic';
	import Underline from '@lucide/svelte/icons/underline';
	import { Button } from '@registry/ui/button';
	import { Tooltip, TooltipProvider } from '@registry/ui/tooltip';

	let bold = $state<HTMLButtonElement | null>(null);
	let italic = $state<HTMLButtonElement | null>(null);
	let underline = $state<HTMLButtonElement | null>(null);
</script>

<!-- Inside a provider, the next tooltip of the toolbar opens at once. -->
<TooltipProvider>
	<div class="flex gap-1">
		<Button variant="ghost" size="icon" aria-label="Bold" bind:element={bold}><Bold /></Button>
		<Button variant="ghost" size="icon" aria-label="Italic" bind:element={italic}><Italic /></Button
		>
		<Button variant="ghost" size="icon" aria-label="Underline" bind:element={underline}
			><Underline /></Button
		>
	</div>
	<Tooltip anchor={bold} text="Bold" shortcut="Ctrl B" />
	<Tooltip anchor={italic} text="Italic" shortcut="Ctrl I" />
	<Tooltip anchor={underline} text="Underline" shortcut="Ctrl U" />
</TooltipProvider>
