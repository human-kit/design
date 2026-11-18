<script lang="ts">
	import { buttonVariants } from '@registry/ui/button';
	import * as Drawer from '@registry/ui/drawer';
</script>

<Drawer.Root side="bottom">
	<Drawer.Trigger class={buttonVariants({ variant: 'outline' })}>Share the results</Drawer.Trigger>
	<Drawer.Content side="bottom">
		<Drawer.Header>
			<Drawer.Title>Share the results</Drawer.Title>
			<Drawer.Description>The patient gets a link that lasts 30 days.</Drawer.Description>
		</Drawer.Header>
		<Drawer.Footer>
			<Drawer.Close class={buttonVariants({ variant: 'outline' })}>Cancel</Drawer.Close>
			<Drawer.Close class={buttonVariants({})}>Send link</Drawer.Close>
		</Drawer.Footer>
	</Drawer.Content>
</Drawer.Root>
