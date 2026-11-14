<script lang="ts">
	import { ToggleGroup, ToggleGroupItem } from '@registry/ui/toggle-group';
</script>

<ToggleGroup
	selectionMode="single"
	disallowEmptySelection
	variant="outline"
	defaultValue={['all']}
	aria-label="Show"
>
	<ToggleGroupItem value="all">All</ToggleGroupItem>
	<ToggleGroupItem value="mine">Mine</ToggleGroupItem>
	<ToggleGroupItem value="unread">Unread</ToggleGroupItem>
</ToggleGroup>
