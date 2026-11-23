<script lang="ts">
	import * as Collapsible from '@registry/ui/collapsible';
	import ChevronDown from '@lucide/svelte/icons/chevron-down';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import type { NavGroup } from '$lib/nav';
	import { Indicator } from './indicator.svelte';

	let { nav }: { nav: NavGroup[] } = $props();

	// The current link is matched on the route, not on the resolved href: during the prerender
	// that href is relative and would never equal the pathname.
	const current = (href: string) => page.url.pathname.replace(/\/$/, '') === href;

	const indicator = new Indicator('[aria-current=page]');
	let container = $state<HTMLElement | null>(null);
	$effect(() => (container ? indicator.attach(container) : undefined));
	// A new page moves the mark; the links are the same elements, so no mutation says so.
	$effect(() => {
		void page.url.pathname;
		indicator.measure();
	});
</script>

<nav aria-label="Docs" class="relative isolate flex flex-col gap-4 py-6" bind:this={container}>
	<!-- The current page's mark, under the links. It slides from the last page to this one. -->
	<span
		aria-hidden="true"
		class="border-line bg-hover rounded-control pointer-events-none absolute top-0 left-0 -z-10 border {indicator.settled
			? 'transition-[transform,width,height,opacity] duration-250 ease-(--ease-move) motion-reduce:transition-none'
			: ''}"
		style={indicator.style}
	></span>
	{#each nav as group (group.label)}
		<!-- Each section folds on its own and starts open. -->
		<Collapsible.Root defaultOpen>
			<!-- The trigger's own chevron leads; here the group reads as a row, its chevron at the
			     end, pointing at the name while folded. -->
			<Collapsible.Trigger
				class="group/nav mx-0 h-auto w-full justify-between px-3 font-normal data-hovered:bg-transparent [&>svg:first-child]:hidden"
			>
				{group.label}
				<ChevronDown
					aria-hidden="true"
					class="text-ink-muted size-3.5 shrink-0 -rotate-90 transition-transform duration-200 group-data-open/nav:rotate-0"
				/>
			</Collapsible.Trigger>
			<Collapsible.Panel class="ps-0 pt-0">
				<!-- The links' text lands 1rem in from the group's name, as the outline's does. -->
				<ul class="flex flex-col gap-0.5 py-2 ps-4 pe-0.5">
					{#each group.items as item (item.href)}
						{@const on = current(item.href)}
						<li>
							<a
								href={resolve(item.href as '/docs/installation')}
								aria-current={on ? 'page' : undefined}
								class="text-body focus-visible:shadow-focus rounded-control flex h-6.5 w-full items-center truncate border px-2 outline-hidden transition-colors duration-150 {on
									? `text-ink ${indicator.settled ? 'border-transparent' : 'border-line bg-hover'}`
									: 'text-ink-muted hover:bg-hover hover:text-ink border-transparent'}"
							>
								{item.title}
							</a>
						</li>
					{/each}
				</ul>
			</Collapsible.Panel>
		</Collapsible.Root>
	{/each}
</nav>
