<script lang="ts">
	import { Button } from '@registry/ui/button';
	import Trash from '@lucide/svelte/icons/trash-2';
</script>

<div class="flex flex-wrap items-center gap-3">
	<Button intent="danger">Delete</Button>
	<Button variant="outline" intent="danger">Cancel invoice</Button>
	<Button variant="ghost" intent="danger" size="icon" aria-label="Delete row">
		<Trash />
	</Button>
	<Button variant="link" intent="danger">Discard changes</Button>
</div>
