<script lang="ts">
	import { buttonVariants } from '@registry/ui/button';
	import * as Drawer from '@registry/ui/drawer';
	import MenuIcon from '@lucide/svelte/icons/menu';
	import { page } from '$app/state';
	import type { NavGroup } from '$lib/nav';
	import Sidebar from './sidebar.svelte';

	let { nav }: { nav: NavGroup[] } = $props();

	let open = $state(false);

	// The drawer is for going somewhere: it closes once the page has changed, back and forward too.
	$effect(() => {
		void page.url.pathname;
		open = false;
	});
</script>

<Drawer.Root bind:open side="left">
	<Drawer.Trigger
		class={buttonVariants({ variant: 'ghost', size: 'icon', class: 'md:hidden' })}
		aria-label="Open the navigation"
	>
		<MenuIcon />
	</Drawer.Trigger>
	<Drawer.Content side="left" size="sm">
		<Drawer.Header>
			<Drawer.Title>Navigation</Drawer.Title>
		</Drawer.Header>
		<Drawer.Body class="min-h-0 flex-1 overflow-y-auto p-0">
			<Sidebar {nav} />
		</Drawer.Body>
	</Drawer.Content>
</Drawer.Root>
