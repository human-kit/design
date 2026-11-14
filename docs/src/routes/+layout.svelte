<script lang="ts">
	import '../app.css';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import ThemeToggle from '$lib/components/theme-toggle.svelte';
	import { components } from '$lib/registry';

	let { children } = $props();

	const guides = [
		{ path: '/docs/installation', title: 'Installation' },
		{ path: '/docs/theming', title: 'Theming' }
	] as const;

	const linkClass =
		'block rounded-md px-2 py-1 text-sm text-ink-muted outline-ring hover:text-ink focus-visible:outline-2 aria-[current=page]:bg-hover aria-[current=page]:font-medium aria-[current=page]:text-ink';
</script>

<a
	href="#main"
	class="bg-primary text-on-primary sr-only z-50 rounded-md px-3 py-2 text-sm focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
>
	Skip to the content
</a>

<header class="bg-canvas/90 sticky top-0 z-40 border-b backdrop-blur">
	<div class="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
		<a
			href={resolve('/')}
			class="outline-ring rounded-sm font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-2"
		>
			human-kit design
		</a>
		<div class="flex items-center gap-1">
			<a
				href="https://ui.human-kit.com"
				class="text-ink-muted outline-ring hover:text-ink rounded-md px-2 py-1 text-sm focus-visible:outline-2"
			>
				@human-kit/ui
			</a>
			<ThemeToggle />
		</div>
	</div>
</header>

<div class="mx-auto flex max-w-6xl gap-10 px-4">
	<nav
		aria-label="Docs"
		class="sticky top-14 hidden h-[calc(100dvh-3.5rem)] w-48 shrink-0 py-8 md:block"
	>
		<p class="text-ink-muted px-2 pb-2 text-xs font-medium">Get started</p>
		<ul class="flex flex-col gap-0.5">
			{#each guides as guide (guide.path)}
				<li>
					<a
						href={resolve(guide.path)}
						class={linkClass}
						aria-current={page.url.pathname === resolve(guide.path) ? 'page' : undefined}
					>
						{guide.title}
					</a>
				</li>
			{/each}
		</ul>
		<p class="text-ink-muted px-2 pt-6 pb-2 text-xs font-medium">Components</p>
		<ul class="flex flex-col gap-0.5">
			{#each components as item (item.name)}
				{@const href = resolve('/docs/components/[name]', { name: item.name })}
				<li>
					<a
						{href}
						class={linkClass}
						aria-current={page.url.pathname === href ? 'page' : undefined}
					>
						{item.title}
					</a>
				</li>
			{/each}
		</ul>
	</nav>

	<main id="main" class="min-w-0 flex-1 py-10">
		{@render children()}
	</main>
</div>
