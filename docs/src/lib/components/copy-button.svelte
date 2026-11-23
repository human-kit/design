<script lang="ts">
	import { Button } from '@registry/ui/button';
	import Check from '@lucide/svelte/icons/check';
	import Copy from '@lucide/svelte/icons/copy';
	import { swapIn } from '$lib/motion';

	let { text, class: className }: { text: string; class?: string } = $props();

	let copied = $state(false);
	let timer: ReturnType<typeof setTimeout> | undefined;

	async function copy() {
		await navigator.clipboard.writeText(text);
		copied = true;
		clearTimeout(timer);
		timer = setTimeout(() => (copied = false), 1500);
	}
</script>

<Button variant="ghost" size="icon-sm" class={className} onclick={copy} aria-label="Copy">
	<!-- The check grows in where the copy icon was, and back. -->
	{#key copied}
		<span class="flex" in:swapIn>
			{#if copied}<Check />{:else}<Copy />{/if}
		</span>
	{/key}
</Button>
<!-- The visual change of the icon has no text, thus a status message tells a screen reader. -->
<span class="sr-only" role="status">{copied ? 'Copied' : ''}</span>
