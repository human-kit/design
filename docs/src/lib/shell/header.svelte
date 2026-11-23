<script lang="ts">
	import { buttonVariants } from '@registry/ui/button';
	import { resolve } from '$app/paths';
	import Logo from '$lib/components/logo.svelte';
	import ThemeToggle from '$lib/components/theme-toggle.svelte';
	import { nav } from '$lib/nav';
	import Github from './github.svelte';
	import MobileNav from './mobile-nav.svelte';
	import MobileToc from './mobile-toc.svelte';

	/** In the docs frame it also opens the two rails, as drawers, where they do not fit. */
	let { docs = false }: { docs?: boolean } = $props();

	const repository = 'https://github.com/human-kit/design';
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -->
<header class="relative mx-auto flex h-7 w-full max-w-(--frame-max) items-center gap-2 px-3 pe-1.5">
	{#if docs}
		<div class="-ms-1.5 flex items-center md:hidden">
			<MobileNav {nav} />
		</div>
	{/if}

	<!-- Centred on the row below `md`, where the two buttons either side are not the same
	     weight and flexbox would set it off-centre. -->
	<a
		href={resolve('/')}
		class="text-ink focus-visible:shadow-focus flex items-center rounded-sm outline-hidden {docs
			? 'absolute top-0 bottom-0 left-1/2 -translate-x-1/2 md:static md:translate-x-0'
			: ''}"
	>
		<Logo class="h-6 w-auto" />
		<span class="sr-only">human-kit design</span>
	</a>

	<div class="ms-auto flex items-center gap-1">
		{#if docs}<MobileToc />{/if}
		<!-- Below `md` the docs header has room for the logo and two buttons only. -->
		<div class="items-center gap-1 {docs ? 'hidden md:flex' : 'flex'}">
			<a href="https://ui.human-kit.com" class={buttonVariants({ variant: 'ghost', size: 'sm' })}>
				@human-kit/ui
			</a>
			<a
				href={repository}
				target="_blank"
				rel="noreferrer"
				aria-label="The repository on GitHub"
				class={buttonVariants({ variant: 'ghost', size: 'icon' })}
			>
				<Github />
			</a>
			<ThemeToggle />
		</div>
	</div>
</header>
