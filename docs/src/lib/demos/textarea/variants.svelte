<script lang="ts">
	import { Textarea } from '@registry/ui/textarea';
</script>

<div class="flex w-96 flex-col gap-4">
	<Textarea aria-label="Default" placeholder="Default" />
	<Textarea aria-label="Surface" variant="surface" placeholder="Surface" />
	<Textarea aria-label="Underline" variant="underline" placeholder="Underline" minRows={1} />
</div>
