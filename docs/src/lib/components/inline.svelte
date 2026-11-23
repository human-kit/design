<script lang="ts">
	/** A line of text where `backticks` mark code, as the content files write it. */
	let { text }: { text: string } = $props();

	const parts = $derived(text.split('`'));
</script>

{#each parts as part, index (index)}{#if index % 2 === 1}<code>{part}</code
		>{:else}{part}{/if}{/each}
