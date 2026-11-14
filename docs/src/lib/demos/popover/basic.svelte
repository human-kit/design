<script lang="ts">
	import { Button } from '@registry/ui/button';
	import { Field } from '@registry/ui/field';
	import { Input } from '@registry/ui/input';
	import {
		Popover,
		PopoverContent,
		PopoverDescription,
		PopoverHeader,
		PopoverTitle,
		PopoverTrigger
	} from '@registry/ui/popover';

	let open = $state(false);
	let dose = $state('150');
</script>

<Popover bind:open>
	<PopoverTrigger>Adjust dose</PopoverTrigger>
	<PopoverContent>
		<PopoverHeader>
			<PopoverTitle>Daily dose</PopoverTitle>
			<PopoverDescription>From tomorrow on, for the rest of the cycle.</PopoverDescription>
		</PopoverHeader>
		<Field label="Units">
			{#snippet children(control)}
				<Input {...control} bind:value={dose} inputmode="numeric" />
			{/snippet}
		</Field>
		<div class="flex justify-end gap-2">
			<Button variant="ghost" onclick={() => (open = false)}>Cancel</Button>
			<Button onclick={() => (open = false)}>Save</Button>
		</div>
	</PopoverContent>
</Popover>
