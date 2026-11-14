<script lang="ts">
	import { Button } from '@registry/ui/button';
	import Moon from '@lucide/svelte/icons/moon';
	import Sun from '@lucide/svelte/icons/sun';
	import { onMount } from 'svelte';

	let dark = $state(false);

	onMount(() => {
		dark = document.documentElement.classList.contains('dark');
	});

	function toggle() {
		dark = !dark;
		document.documentElement.classList.toggle('dark', dark);
		try {
			localStorage.setItem('theme', dark ? 'dark' : 'light');
		} catch {
			// The storage can be blocked. The theme then lasts for this page only.
		}
	}
</script>

<Button variant="ghost" size="icon" aria-label="Dark theme" aria-pressed={dark} onclick={toggle}>
	{#if dark}
		<Moon />
	{:else}
		<Sun />
	{/if}
</Button>
