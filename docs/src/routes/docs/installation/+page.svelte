<script lang="ts">
	import CodeBlock from '$lib/components/code-block.svelte';
	import { CLI } from '$lib/registry';

	const config = `{
	"registry": "https://design.human-kit.com/r",
	"css": "src/app.css",
	"aliases": {
		"lib": "$lib",
		"ui": "$lib/components/ui"
	}
}`;

	// A closing script tag in the markup would end this block, thus it is split.
	const usage = `<script lang="ts">
	import { Button } from '$lib/components/ui/button';
</${'script'}>

<Button variant="outline">Save</Button>`;
</script>

<svelte:head>
	<title>Installation · human-kit design</title>
	<meta name="description" content="Set up human-kit design in a SvelteKit project." />
</svelte:head>

<article class="flex max-w-3xl flex-col gap-8">
	<header class="flex flex-col gap-2">
		<h1 class="text-3xl font-semibold tracking-tight">Installation</h1>
		<p class="text-ink-muted">
			Set up the kit in a SvelteKit project. The project must use Svelte 5 and Tailwind CSS v4.
		</p>
	</header>

	<section class="flex flex-col gap-3">
		<h2 class="text-xl font-semibold tracking-tight">1. Run init</h2>
		<CodeBlock code={`${CLI} init`} label="Init command" />
		<p class="text-ink-muted text-sm">The command does these steps:</p>
		<ul class="text-ink-muted list-disc pl-5 text-sm">
			<li>It writes <code>human-kit.json</code> at the root of the project.</li>
			<li>It writes the <code>cn()</code> helper to <code>src/lib/utils.ts</code>.</li>
			<li>
				It adds the theme to <code>src/app.css</code>. Use <code>--css</code> for a different file.
			</li>
			<li>
				It installs <code>clsx</code>, <code>tailwind-merge</code> and <code>tw-animate-css</code>.
			</li>
		</ul>
	</section>

	<section class="flex flex-col gap-3">
		<h2 class="text-xl font-semibold tracking-tight">2. Add components</h2>
		<CodeBlock code={`${CLI} add button dialog select`} label="Add command" />
		<p class="text-ink-muted text-sm">
			The command copies the files of each component and of the components that it needs. It does
			not replace a file that you changed. Use <code>--overwrite</code> to replace it.
		</p>
	</section>

	<section class="flex flex-col gap-3">
		<h2 class="text-xl font-semibold tracking-tight">3. Use them</h2>
		<CodeBlock code={usage} label="Usage" />
	</section>

	<section class="flex flex-col gap-3">
		<h2 class="text-xl font-semibold tracking-tight">Configuration</h2>
		<p class="text-ink-muted text-sm">
			<code>human-kit.json</code> tells the CLI where to put the files. The two aliases must start
			with <code>$lib</code>. The CLI writes the import paths of the copied files with these
			aliases.
		</p>
		<CodeBlock code={config} label="human-kit.json" />
	</section>
</article>
