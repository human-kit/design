<script lang="ts">
	import { Button } from '@registry/ui/button';
	import CodeIcon from '@lucide/svelte/icons/code';
	import CodeOffIcon from '$lib/components/code-off-icon.svelte';
	import CopyButton from '$lib/components/copy-button.svelte';
	import { swapIn } from '$lib/motion';

	let {
		expanded = $bindable(false),
		controls,
		source
	}: { expanded?: boolean; controls: string; source: string } = $props();
</script>

<!-- The top right corner of a preview: copy the code, and show it under the preview. -->
<div class="absolute top-2 right-2 z-10 flex items-center gap-1">
	<CopyButton text={source} />
	<!-- The kit's Button, not a bare button with its classes: the hover and press styles follow the
	     data attributes that only the component sets. An icon like the copy one beside it. Open, it
	     keeps the hover grey and full ink, the kit's neutral on state; aria-expanded says it. -->
	<Button
		variant="ghost"
		size="icon-sm"
		class={expanded ? 'bg-hover text-ink' : ''}
		aria-label="Code"
		aria-expanded={expanded}
		aria-controls={controls}
		onclick={() => (expanded = !expanded)}
	>
		<!-- Open, the slashed icon: a click hides the code. It grows in like the copy one's check. -->
		{#key expanded}
			<span class="flex" in:swapIn>
				{#if expanded}<CodeOffIcon />{:else}<CodeIcon />{/if}
			</span>
		{/key}
	</Button>
</div>
