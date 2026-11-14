<script lang="ts">
	import { Button } from '@registry/ui/button';
	import Check from '@lucide/svelte/icons/check';
	import Plus from '@lucide/svelte/icons/plus';
</script>

<div class="flex flex-wrap items-center gap-3">
	<Button icon={Plus}>Add row</Button>
	<Button variant="outline" icon={Plus}>Add row</Button>
	<Button icon={Check} count={12}>Approve</Button>
	<Button variant="outline" size="sm" count={3}>Export</Button>
</div>
