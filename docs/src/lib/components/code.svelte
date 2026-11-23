<script lang="ts">
	import { highlight, type Lang } from '$lib/highlight';

	/** The text of a `<code>`, coloured: on the server already, the same on the client. */
	let { code, lang }: { code: string; lang?: Lang } = $props();

	const html = $derived(highlight(code, lang));
</script>

<!-- eslint-disable-next-line svelte/no-at-html-tags -- the highlighter's own output, from our own code strings -->
<code class="shiki-code">{@html html}</code>
