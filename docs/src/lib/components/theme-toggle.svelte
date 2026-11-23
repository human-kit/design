<script lang="ts">
	import { Button } from '@registry/ui/button';
	import Moon from '@lucide/svelte/icons/moon';
	import Sun from '@lucide/svelte/icons/sun';
	import { onMount } from 'svelte';
	import { EASE_OUT, reducedMotion } from '$lib/motion';

	// The theme is set before the first paint (app.html), where the server cannot know it. So the
	// icon follows the `dark` class in CSS: the prerendered page already shows the right one.
	let dark = $state(false);
	let button = $state<HTMLButtonElement | null>(null);

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
		// On a click only, the icon that comes in grows out of a light blur.
		if (reducedMotion()) return;
		button?.querySelector(dark ? '.theme-moon' : '.theme-sun')?.animate(
			[
				{ opacity: 0, transform: 'scale(0.75)', filter: 'blur(2px)' },
				{ opacity: 1, transform: 'none', filter: 'none' }
			],
			{ duration: 200, easing: EASE_OUT }
		);
	}
</script>

<Button
	bind:element={button}
	variant="ghost"
	size="icon"
	aria-label="Dark theme"
	aria-pressed={dark}
	onclick={toggle}
>
	<Sun class="theme-sun dark:hidden" />
	<Moon class="theme-moon hidden dark:block" />
</Button>
