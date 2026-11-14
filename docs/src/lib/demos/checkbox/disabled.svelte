<script lang="ts">
	import { Checkbox } from '@registry/ui/checkbox';
</script>

<div class="flex flex-col gap-3">
	<Checkbox label="Signed by the doctor" checked disabled />
	<Checkbox label="Sent to the insurer" disabled description="Set when the invoice is sent." />
</div>
