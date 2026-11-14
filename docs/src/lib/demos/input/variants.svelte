<script lang="ts">
	import { Input } from '@registry/ui/input';
</script>

<div class="text-body grid w-72 grid-cols-[6rem_1fr] items-center gap-x-3 gap-y-4">
	<label for="input-default" class="text-ink-muted">Default</label>
	<Input id="input-default" placeholder="Supplier" />
	<label for="input-surface" class="text-ink-muted">Surface</label>
	<Input id="input-surface" variant="surface" placeholder="Supplier" />
	<label for="input-ghost" class="text-ink-muted">Ghost</label>
	<Input id="input-ghost" variant="ghost" value="Edit in place" />
	<label for="input-underline" class="text-ink-muted">Underline</label>
	<Input id="input-underline" variant="underline" placeholder="Supplier" />
</div>
