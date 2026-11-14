<script lang="ts">
	import { buttonVariants } from '@registry/ui/button';
	import { resolve } from '$app/paths';
	import CodeBlock from '$lib/components/code-block.svelte';
	import { CLI } from '$lib/registry';
</script>

<svelte:head>
	<title>human-kit design</title>
	<meta
		name="description"
		content="Styled, accessible Svelte 5 components that you copy into your project and own."
	/>
</svelte:head>

<section class="flex max-w-2xl flex-col gap-6">
	<h1 class="text-4xl font-semibold tracking-tight">human-kit design</h1>
	<p class="text-muted-foreground text-lg">
		Styled components for Svelte 5. You copy them into your project, and then the code is yours. The
		behavior and the accessibility come from
		<a class="text-foreground underline underline-offset-4" href="https://ui.human-kit.com"
			>@human-kit/ui</a
		>. This kit adds the look: tokens, variants and Tailwind CSS classes.
	</p>
	<div class="flex flex-wrap gap-3">
		<a href={resolve('/docs/installation')} class={buttonVariants()}>Get started</a>
	</div>
	<CodeBlock code={`${CLI} add button`} label="Add a component" />
</section>
