<script lang="ts">
	import type { Snippet } from 'svelte';
	import { scrollFade } from './scroll-fade';

	let { class: className = '', children }: { class?: string; children: Snippet } = $props();
</script>

<!-- A side rail sits on the chrome, with no fill of its own. Its edges fade into the chrome
     while there is more to scroll: two sticky overlays, cheaper than a mask on the scroller. -->
<aside class="rail-scrollbar scroll-fade min-h-0 {className}" use:scrollFade>
	<div class="scroll-fade-edge scroll-fade-edge-top" aria-hidden="true"></div>
	{@render children()}
	<div class="scroll-fade-edge scroll-fade-edge-bottom" aria-hidden="true"></div>
</aside>
