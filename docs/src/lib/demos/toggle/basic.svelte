<script lang="ts">
	import { Toggle } from '@registry/ui/toggle';
	import Bold from '@lucide/svelte/icons/bold';
	import Star from '@lucide/svelte/icons/star';
</script>

<div class="flex items-center gap-2">
	<Toggle size="icon" aria-label="Bold"><Bold /></Toggle>
	<Toggle variant="outline" defaultSelected><Star />Favourite</Toggle>
</div>
