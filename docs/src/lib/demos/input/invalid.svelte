<script lang="ts">
	import { Input } from '@registry/ui/input';
</script>

<div class="flex w-64 flex-col gap-1">
	<label for="input-invalid" class="text-body text-danger-ink">Tax ID</label>
	<Input id="input-invalid" value="900.123" invalid aria-describedby="input-invalid-error" />
	<p id="input-invalid-error" class="text-caption text-danger-ink font-medium">
		The tax ID needs 9 digits.
	</p>
</div>
