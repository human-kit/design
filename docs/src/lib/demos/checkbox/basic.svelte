<script lang="ts">
	import { Checkbox } from '@registry/ui/checkbox';
</script>

<div class="flex flex-col gap-3">
	<Checkbox label="Send a copy to the patient" checked />
	<Checkbox
		label="Charge the consultation"
		description="It is added to the next invoice of the patient."
	/>
</div>
