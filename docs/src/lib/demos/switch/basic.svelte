<script lang="ts">
	import { Switch } from '@registry/ui/switch';
</script>

<div class="flex flex-col gap-3">
	<Switch label="Remind the patient by email" checked />
	<Switch
		label="Show the prices on the agenda"
		description="Everyone with access to the agenda sees them."
	/>
</div>
