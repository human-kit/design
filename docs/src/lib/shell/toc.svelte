<script lang="ts">
	import { page } from '$app/state';
	import { getHeadings } from './headings.svelte';
	import { Indicator } from './indicator.svelte';

	let { showLabel = true }: { showLabel?: boolean } = $props();

	// The page's headings, as they rendered: on the server too, so the outline is in the first
	// paint and does not appear after it.
	const source = getHeadings();
	const headings = $derived(source?.list ?? []);
	const selector = 'main h2[id], main h3[id]';

	// The heading scrolled to. Null at the top, where "(Top)" is the current item.
	let active = $state<string | null>(null);

	$effect(() => {
		// Again on every page and every followed link: the new page has rendered by then.
		void page.url.pathname;
		void page.url.hash;

		const elements = () => [...document.querySelectorAll<HTMLElement>(selector)];

		// The reading pane scrolls, not the window. A heading is current once its top has crossed
		// the line where a click on its link parks it: the pane's top plus its scroll margin.
		const pane = document.getElementById('main-scroll');
		const update = () => {
			const list = elements();
			const top = pane?.getBoundingClientRect().top ?? 0;
			const margin = list[0] ? parseFloat(getComputedStyle(list[0]).scrollMarginTop) || 0 : 0;
			let current: string | null = null;
			for (const el of list) {
				if (el.getBoundingClientRect().top <= top + margin + 1) current = el.id;
				else break;
			}
			// At the bottom the last headings can never reach the line. A link followed there
			// still marks its own heading, as long as that heading is in view.
			if (pane && pane.scrollTop >= pane.scrollHeight - pane.clientHeight - 1) {
				const target = list.find((el) => `#${el.id}` === decodeURIComponent(location.hash));
				const bottom = pane.getBoundingClientRect().bottom;
				if (target && target.getBoundingClientRect().top < bottom) current = target.id;
				// Scrolled to the end by hand: the last section is the one being read.
				else if (!target) current = list.at(-1)?.id ?? current;
			}
			active = current;
		};
		update();
		const scroller = pane ?? window;
		scroller.addEventListener('scroll', update, { passive: true });
		window.addEventListener('resize', update, { passive: true });
		return () => {
			scroller.removeEventListener('scroll', update);
			window.removeEventListener('resize', update);
		};
	});

	// The bar on the rule slides from the section you left to the one you reached.
	const indicator = new Indicator('[data-active]');
	let list = $state<HTMLElement | null>(null);
	$effect(() => (list ? indicator.attach(list) : undefined));

	// Until the bar has measured, the current link draws its own on the rule, as the sidebar's
	// link does: the server's paint already marks where you are.
	const itemClass = (on: boolean) =>
		on
			? `text-ink relative ${indicator.settled ? '' : 'before:bg-ink before:absolute before:inset-y-0 before:left-0 before:w-0.5 before:rounded-full'}`
			: 'text-ink-muted hover:text-ink';
</script>

{#if headings.length > 0}
	<nav aria-label="On this page" class="text-body px-2 py-6">
		{#if showLabel}
			<p class="text-ink">On this page</p>
		{/if}
		<ul class="border-line relative mt-3 flex flex-col gap-1.5 border-s" bind:this={list}>
			<span
				aria-hidden="true"
				class="bg-ink pointer-events-none absolute top-0 -left-px w-0.5! rounded-full {indicator.settled
					? 'transition-[transform,height] duration-250 ease-(--ease-move) motion-reduce:transition-none'
					: ''}"
				style={indicator.style}
			></span>
			<!-- No element has this id: the pane finds no target and goes back to the top. -->
			<li>
				<a
					href="#top"
					data-active={active === null || undefined}
					class="block py-0.5 ps-4 transition-colors {itemClass(active === null)}"
				>
					(Top)
				</a>
			</li>
			{#each headings as heading (heading)}
				<li>
					<a
						href="#{heading.id}"
						data-active={active === heading.id || undefined}
						class="block py-0.5 transition-colors {heading.depth === 3
							? 'ps-7'
							: 'ps-4'} {itemClass(active === heading.id)}"
					>
						{heading.text}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
{/if}
