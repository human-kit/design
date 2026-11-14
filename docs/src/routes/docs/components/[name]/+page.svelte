<script lang="ts">
	import CodeBlock from '$lib/components/code-block.svelte';
	import Demo from '$lib/components/demo.svelte';
	import { CLI } from '$lib/registry';

	let { data } = $props();

	const title = (name: string) => name.charAt(0).toUpperCase() + name.slice(1);
</script>

<svelte:head>
	<title>{data.entry.title} · human-kit design</title>
	<meta name="description" content={data.entry.description} />
</svelte:head>

<article class="flex max-w-3xl flex-col gap-8">
	<header class="flex flex-col gap-2">
		<h1 class="text-3xl font-semibold tracking-tight">{data.entry.title}</h1>
		<p class="text-ink-muted">{data.entry.description}</p>
	</header>

	{#if data.demos[0]}
		<Demo component={data.demos[0].component} source={data.demos[0].source} />
	{/if}

	<section class="flex flex-col gap-3">
		<h2 class="text-xl font-semibold tracking-tight">Installation</h2>
		<CodeBlock code={`${CLI} add ${data.entry.name}`} label="Install command" />
		<p class="text-ink-muted text-sm">
			The command copies the files to <code>src/lib/components/ui/{data.entry.name}</code>. It also
			installs the packages that the files import.
		</p>
	</section>

	{#each data.demos.slice(1) as demo (demo.name)}
		<section class="flex flex-col gap-3">
			<h2 class="text-xl font-semibold tracking-tight">{title(demo.name)}</h2>
			<Demo component={demo.component} source={demo.source} />
		</section>
	{/each}
</article>
