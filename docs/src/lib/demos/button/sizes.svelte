<script lang="ts">
	import { Button } from '@registry/ui/button';
	import Plus from '@lucide/svelte/icons/plus';
</script>

<div class="flex flex-col items-center gap-4">
	<div class="flex flex-wrap items-center gap-3">
		<Button size="sm">Small</Button>
		<Button>Default</Button>
	</div>
	<div class="flex flex-wrap items-center gap-3">
		<Button variant="outline" size="icon-2xs" aria-label="Add"><Plus /></Button>
		<Button variant="outline" size="icon-xs" aria-label="Add"><Plus /></Button>
		<Button variant="outline" size="icon-sm" aria-label="Add"><Plus /></Button>
		<Button variant="outline" size="icon" aria-label="Add"><Plus /></Button>
	</div>
</div>
