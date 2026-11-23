<script lang="ts">
	import Heading from '$lib/shell/heading.svelte';
	import CodeBlock from '$lib/components/code-block.svelte';
	import Demo from '$lib/components/demo.svelte';
	import Inline from '$lib/components/inline.svelte';
	import { docOf } from '$lib/content';
	import { playgroundOf } from '$lib/playgrounds';
	import { CLI } from '$lib/registry';
	import DocToolbar from '$lib/shell/doc-toolbar.svelte';

	let { data } = $props();

	const doc = $derived(docOf(data.entry.name));

	// With a playground, it leads the page and the demos that it covers go. Without one, the
	// first demo leads. The rest are the examples, in the order the content file names them.
	const playground = $derived(playgroundOf(data.entry.name));
	const demos = $derived(
		playground ? data.demos.filter((demo) => !playground.covers.includes(demo.name)) : data.demos
	);
	const lead = $derived(playground ? undefined : demos[0]);
	const examples = $derived.by(() => {
		const rest = playground ? demos : demos.slice(1);
		const order = Object.keys(doc.examples ?? {});
		const rank = (name: string) => (order.includes(name) ? order.indexOf(name) : order.length);
		return [...rest].sort((a, b) => rank(a.name) - rank(b.name));
	});

	const title = (name: string) => name.charAt(0).toUpperCase() + name.slice(1);
</script>

<svelte:head>
	<title>{data.entry.title} · human-kit design</title>
	<meta name="description" content={data.entry.description} />
</svelte:head>

<article class="doc-prose relative">
	<DocToolbar />
	<header>
		<h1>{data.entry.title}</h1>
		<p>{data.entry.description}</p>
	</header>

	{#if playground}
		<playground.default />
	{:else if lead}
		<Demo component={lead.component} source={lead.source} />
	{/if}

	<section>
		<Heading id="installation" text="Installation" />
		<CodeBlock code={`${CLI} add ${data.entry.name}`} label="Install command" />
		<p>
			The command copies the files to <code>src/lib/components/ui/{data.entry.name}</code>. It also
			installs the packages that the files import.
		</p>
	</section>

	{#if doc.usage}
		<section>
			<Heading id="usage" text="Usage" />
			<CodeBlock code={doc.usage} label="Usage" />
		</section>
	{/if}

	{#if examples.length > 0}
		<section>
			<Heading id="examples" text="Examples" />
			{#each examples as demo (demo.name)}
				{@const about = doc.examples?.[demo.name]}
				<Heading level={3} id={demo.name} text={about?.title ?? title(demo.name)} />
				{#if about?.description}
					<p><Inline text={about.description} /></p>
				{/if}
				<Demo component={demo.component} source={demo.source} />
			{/each}
		</section>
	{/if}

	{#if doc.guidelines}
		<section>
			<Heading id="guidelines" text="Guidelines" />
			<ul>
				{#each doc.guidelines as line (line)}
					<li><Inline text={line} /></li>
				{/each}
			</ul>
		</section>
	{/if}

	{#if doc.accessibility}
		<section>
			<Heading id="accessibility" text="Accessibility" />
			<ul>
				{#each doc.accessibility as line (line)}
					<li><Inline text={line} /></li>
				{/each}
			</ul>
		</section>
	{/if}

	{#if doc.api}
		<section>
			<Heading id="api" text="API reference" />
			{#each doc.api as part (part.part)}
				{#if doc.api.length > 1}
					<Heading level={3} id="api-{part.part.toLowerCase()}" text={part.part} />
				{/if}
				<div class="doc-block overflow-x-auto">
					<table>
						<thead>
							<tr>
								<th scope="col">Prop</th>
								<th scope="col">Type</th>
								<th scope="col">Default</th>
							</tr>
						</thead>
						<tbody>
							{#each part.props as prop (prop.name)}
								<tr>
									<td class="align-top"><code>{prop.name}</code></td>
									<td class="align-top">
										<code class="whitespace-normal">{prop.type}</code>
										<p class="text-ink-muted mt-1! text-[0.8125rem]">
											<Inline text={prop.description} />
										</p>
									</td>
									<td class="align-top">
										{#if prop.default}<code>{prop.default}</code>{:else}<span
												class="text-ink-subtle">—</span
											>{/if}
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
				{#if part.note}
					<p><Inline text={part.note} /></p>
				{/if}
			{/each}
		</section>
	{/if}
</article>
