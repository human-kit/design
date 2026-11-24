<script lang="ts">
	import { setContext } from 'svelte';
	import { LOOK_KEY } from '$lib/playground/looks';
	import DocsShell from '$lib/shell/docs-shell.svelte';
	import ComponentPage from '../../docs/components/[name]/+page.svelte';

	let { data } = $props();

	// svelte-ignore state_referenced_locally
	setContext(LOOK_KEY, data.look);
</script>

<svelte:head>
	<meta name="robots" content="noindex" />
</svelte:head>

<!-- The real page of a component, with its playground in the look under review. -->
<DocsShell>
	<ComponentPage data={{ entry: data.entry, demos: data.demos }} />
</DocsShell>
