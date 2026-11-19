<script lang="ts">
	import { Badge } from '@registry/ui/badge';
</script>

<div class="flex flex-wrap items-center gap-3">
	<Badge tone="blue">Default</Badge>
	<Badge tone="blue" dot={false}>Without a dot</Badge>
	<Badge tone="blue" variant="outline">Outline</Badge>
	<Badge variant="outline" dot={false}>Plain</Badge>
	<Badge tone="blue" variant="text">Text</Badge>
</div>
