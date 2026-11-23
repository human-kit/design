<script lang="ts">
	import type { Component } from 'svelte';
	import CodeToggle from '$lib/playground/code-toggle.svelte';
	import Source from '$lib/playground/source.svelte';

	let { component: DemoComponent, source }: { component: Component; source: string } = $props();

	let expanded = $state(false);
	const id = $props.id();
</script>

<!-- The demo, its copy and code buttons in its top right corner, and the code opening under it. -->
<div class="doc-block border-frame overflow-hidden rounded-xl border">
	<div
		class="bg-canvas relative flex min-h-48 items-center justify-center p-4 pt-12 text-[0.8125rem] leading-normal sm:p-8 sm:pt-12"
	>
		<CodeToggle bind:expanded controls={id} source={source.trim()} />
		<DemoComponent />
	</div>
	<Source {id} code={source.trim()} hidden={!expanded} />
</div>
