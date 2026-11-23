<script lang="ts">
	import type { Snippet } from 'svelte';

	/** A numbered note for the visitor: an italic figure, a title, a text and what it shows. */
	let {
		figure,
		title,
		text,
		children
	}: { figure: string; title: Snippet; text: Snippet; children: Snippet } = $props();
</script>

<section
	class="border-line grid gap-x-12 gap-y-6 border-t py-14 sm:py-20 lg:grid-cols-[5rem_minmax(0,1fr)_minmax(0,1fr)]"
>
	<span class="font-display text-ink-subtle text-[2.75rem] leading-none italic" aria-hidden="true">
		{figure}
	</span>
	<div>
		<h2 class="font-display text-[2.25rem] leading-[1.05] tracking-[-0.01em] sm:text-[2.75rem]">
			{@render title()}
		</h2>
		<div
			class="text-ink-muted mt-5 flex max-w-[26rem] flex-col gap-3 text-[0.9375rem] leading-[1.65]"
		>
			{@render text()}
		</div>
	</div>
	<div class="min-w-0 lg:pt-2">
		{@render children()}
	</div>
</section>
