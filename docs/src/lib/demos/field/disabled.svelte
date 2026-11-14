<script lang="ts">
	import { Field } from '@registry/ui/field';
	import { Input } from '@registry/ui/input';
</script>

<Field label="Currency" description="Set by the company." disabled class="w-64">
	{#snippet children(control)}
		<Input {...control} value="COP" />
	{/snippet}
</Field>
