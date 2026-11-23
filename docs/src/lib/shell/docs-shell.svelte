<script lang="ts">
	import type { Snippet } from 'svelte';
	import { page } from '$app/state';
	import { nav } from '$lib/nav';
	import Header from './header.svelte';
	import { Headings, setHeadings } from './headings.svelte';
	import Rail from './rail.svelte';
	import Sidebar from './sidebar.svelte';
	import Toc from './toc.svelte';

	let { children }: { children: Snippet } = $props();

	setHeadings(new Headings());

	// The pane, not the window, scrolls, thus the router's own scroll handling never reaches it.
	// On each new URL it goes to the fragment if there is one, else back to the top.
	let pane = $state<HTMLElement | null>(null);
	$effect(() => {
		const { hash } = page.url;
		const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
		if (target) target.scrollIntoView();
		else pane?.scrollTo(0, 0);
	});
</script>

<!--
	The frame: a shell fixed to the viewport, so the page itself never scrolls. The chrome (the
	header and the two rails) sits on the darker ground; the reading pane is the card on it, and
	the only thing that scrolls besides the rails. `overflow-clip`, not `hidden`: a hidden box is
	still a scroller, and an anchor would scroll it, header and all.

	Both rows cap at the same width and centre, so the header and the rails share one column.
	The pane keeps its measure and the rails take the slack: under the cap they give it back
	first, and only at their minimum does the pane narrow.
-->
<div
	class="bg-chrome fixed inset-0 flex flex-col gap-2 overflow-clip px-3 py-2 [--frame-max:1536px] [--pane-max:calc(52rem+2*3rem)] sm:px-8"
>
	<Header docs />

	<div class="mx-auto flex min-h-0 w-full max-w-(--frame-max) flex-1 gap-4">
		<!-- The two rails size alike: 240px wanted, they split what the pane leaves, and one alone
		     never takes more than 288px. -->
		<Rail class="hidden min-w-56 flex-1 basis-60 md:block md:max-w-72">
			<Sidebar {nav} />
		</Rail>

		<main
			id="main"
			class="bg-canvas shadow-card min-h-0 min-w-0 shrink grow-0 basis-(--pane-max) overflow-hidden rounded-xl"
		>
			<div
				bind:this={pane}
				id="main-scroll"
				class="pane-scrollbar h-full overflow-y-auto px-4 py-6 sm:px-6 sm:py-9 lg:px-12"
			>
				{@render children()}
			</div>
		</main>

		<Rail class="hidden min-w-56 flex-1 basis-60 xl:block xl:max-w-72">
			<Toc />
		</Rail>
	</div>
</div>
