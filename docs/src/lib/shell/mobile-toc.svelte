<script lang="ts">
	import { buttonVariants } from '@registry/ui/button';
	import * as Drawer from '@registry/ui/drawer';
	import ListIcon from '@lucide/svelte/icons/list';
	import { page } from '$app/state';
	import Toc from './toc.svelte';

	let open = $state(false);

	$effect(() => {
		void page.url.pathname;
		open = false;
	});
</script>

<!-- From the right, as the rail it stands in for, and mirroring the navigation drawer. -->
<Drawer.Root bind:open side="right">
	<Drawer.Trigger
		class={buttonVariants({ variant: 'ghost', size: 'icon', class: 'xl:hidden' })}
		aria-label="On this page"
	>
		<ListIcon />
	</Drawer.Trigger>
	<Drawer.Content side="right" size="sm">
		<Drawer.Header>
			<Drawer.Title>On this page</Drawer.Title>
		</Drawer.Header>
		<!-- Its links scroll the pane instead of changing the page, thus a click on one closes it. -->
		<Drawer.Body
			class="min-h-0 flex-1 overflow-y-auto p-0"
			onclick={(event: MouseEvent) => {
				if ((event.target as HTMLElement).closest('a')) open = false;
			}}
		>
			<Toc showLabel={false} />
		</Drawer.Body>
	</Drawer.Content>
</Drawer.Root>
