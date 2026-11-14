<script lang="ts">
	import { buttonVariants } from '@registry/ui/button';
	import * as Dialog from '@registry/ui/dialog';
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>Delete project</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Delete the project?</Dialog.Title>
			<Dialog.Description>
				This removes the project and all of its data. You cannot undo it.
			</Dialog.Description>
		</Dialog.Header>
		<Dialog.Footer>
			<Dialog.Close class={buttonVariants({ variant: 'outline' })}>Cancel</Dialog.Close>
			<Dialog.Close class={buttonVariants({ variant: 'outline', intent: 'danger' })}
				>Delete</Dialog.Close
			>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
