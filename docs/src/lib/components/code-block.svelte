<script lang="ts">
	import CopyButton from './copy-button.svelte';

	let { code, label = 'Code' }: { code: string; label?: string } = $props();
</script>

<div class="relative">
	<!-- A long line scrolls sideways. The block is in the tab order, thus a keyboard user can
	     scroll it too (WCAG 2.1.1), and the region role gives that tab stop a name. -->
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<pre
		class="bg-muted outline-ring overflow-x-auto rounded-lg border p-4 pr-12 font-mono text-[0.8125rem] leading-relaxed focus-visible:outline-2 focus-visible:outline-offset-2"
		role="region"
		aria-label={label}
		tabindex="0"><code>{code.trim()}</code></pre>
	<CopyButton text={code.trim()} class="absolute top-2 right-2" />
</div>
