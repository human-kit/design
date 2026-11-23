<script lang="ts">
	import type { Lang } from '$lib/highlight';
	import Code from './code.svelte';
	import CopyButton from './copy-button.svelte';

	let { code, label = 'Code', lang }: { code: string; label?: string; lang?: Lang } = $props();
</script>

<div class="doc-block relative">
	<!-- A long line scrolls sideways. The block is in the tab order, thus a keyboard user can
	     scroll it too (WCAG 2.1.1), and the region role gives that tab stop a name. -->
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<pre
		class="bg-surface-muted text-ink focus-visible:shadow-focus border-frame overflow-x-auto rounded-xl border p-3 pe-11 font-mono text-[0.8125rem] leading-5 outline-hidden"
		role="region"
		aria-label={label}
		tabindex="0"><Code code={code.trim()} {lang} /></pre>
	<!-- The copy button sits on the first line: its centre on the line's, and as far from the right
	     edge as from the top, 11px. A one-line block then reads even all round, the text 12px in. -->
	<CopyButton text={code.trim()} class="absolute top-[11px] right-[11px]" />
</div>
