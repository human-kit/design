<script lang="ts">
	import Printer from '@lucide/svelte/icons/printer';
	import { Button } from '@registry/ui/button';
	import { Tooltip } from '@registry/ui/tooltip';

	let print = $state<HTMLButtonElement | null>(null);
</script>

<Button variant="outline" size="icon" aria-label="Print" bind:element={print}>
	<Printer />
</Button>
<Tooltip anchor={print} text="Print the prescription" />
