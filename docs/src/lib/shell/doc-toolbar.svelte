<script lang="ts">
	import { buttonVariants } from '@registry/ui/button';
	import ChevronDown from '@lucide/svelte/icons/chevron-down';
	import ChevronUp from '@lucide/svelte/icons/chevron-up';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { nav } from '$lib/nav';

	// The pages either side of this one, in the order of the sidebar: up is the one above.
	const flat = nav.flatMap((group) => group.items);
	const index = $derived(
		flat.findIndex((item) => item.href === page.url.pathname.replace(/\/$/, ''))
	);
	const previous = $derived(index > 0 ? flat[index - 1] : undefined);
	const next = $derived(index >= 0 ? flat[index + 1] : undefined);

	const button = `${buttonVariants({ variant: 'outline', size: 'icon-sm' })} doc-plain`;
</script>

<!-- From `sm` up it sits beside the title, as tall as the title's line, so the buttons centre on
     the words. Below that it takes its own row: a long one-word title has nowhere to wrap. -->
<div
	class="mb-2 flex items-center justify-end gap-1.5 sm:absolute sm:top-0 sm:right-0 sm:mb-0 sm:h-12.75"
>
	{#each [{ item: previous, label: 'Previous', Icon: ChevronUp }, { item: next, label: 'Next', Icon: ChevronDown }] as { item, label, Icon } (label)}
		{#if item}
			<a
				href={resolve(item.href as '/docs/installation')}
				class={button}
				aria-label="{label}: {item.title}"
				title="{label}: {item.title}"
			>
				<Icon />
			</a>
		{:else}
			<span class="{button} pointer-events-none opacity-40" aria-hidden="true"><Icon /></span>
		{/if}
	{/each}
</div>
