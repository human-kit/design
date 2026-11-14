<script lang="ts">
	import { Button, buttonVariants } from '@registry/ui/button';
	import * as Dialog from '@registry/ui/dialog';
	import { Field } from '@registry/ui/field';
	import { Input } from '@registry/ui/input';

	let open = $state(false);
	let name = $state('');
	let email = $state('');
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger class={buttonVariants({})}>New supplier</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>New supplier</Dialog.Title>
			<Dialog.Description>It shows up in purchase orders right away.</Dialog.Description>
		</Dialog.Header>
		<Dialog.Body>
			<Field label="Legal name" required>
				{#snippet children(control)}
					<Input {...control} bind:value={name} placeholder="Andes Lab S.A.S." />
				{/snippet}
			</Field>
			<Field label="Email" description="Where purchase orders are sent.">
				{#snippet children(control)}
					<Input {...control} bind:value={email} type="email" />
				{/snippet}
			</Field>
		</Dialog.Body>
		<Dialog.Footer>
			<Dialog.Close class={buttonVariants({ variant: 'outline' })}>Cancel</Dialog.Close>
			<Button onclick={() => (open = false)}>Save supplier</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
