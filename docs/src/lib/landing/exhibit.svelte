<script lang="ts">
	import type { Snippet } from 'svelte';
	import { resolve } from '$app/paths';

	/**
	 * One work of the exhibition: the part alone on its wall, live, at the size it has in an
	 * app, and under it the label a museum hangs beside a work. The size on the label is
	 * measured from the part itself.
	 */
	let {
		number,
		name,
		title,
		description,
		class: className = '',
		children
	}: {
		number: number;
		name: string;
		title: string;
		description: string;
		class?: string;
		children: Snippet;
	} = $props();

	let size = $state('');

	function measure(node: HTMLElement) {
		const work = node.firstElementChild;
		if (!work) return;
		const observer = new ResizeObserver(() => {
			const box = work.getBoundingClientRect();
			size = `${Math.round(box.width)} × ${Math.round(box.height)} px`;
		});
		observer.observe(work);
		return { destroy: () => observer.disconnect() };
	}
</script>

<figure class="flex min-w-0 flex-col {className}">
	<div
		use:measure
		class="bg-chrome text-body flex min-h-56 flex-1 items-center justify-center overflow-hidden rounded-xl px-5 py-10 leading-normal [&>*]:min-w-0"
	>
		{@render children()}
	</div>
	<figcaption class="flex gap-4 pt-3.5 pb-3">
		<span
			class="font-display text-ink-subtle w-9 shrink-0 text-[1.75rem] leading-[1.1] italic"
			aria-hidden="true"
		>
			{String(number).padStart(2, '0')}
		</span>
		<div class="text-small min-w-0">
			<a
				href={resolve('/docs/components/[name]', { name })}
				class="text-ink text-body focus-visible:shadow-focus rounded-sm font-medium underline-offset-4 outline-hidden hover:underline"
			>
				{title}
			</a>
			<p class="text-ink-muted mt-0.5 max-w-[19rem]">{description}</p>
			<p class="text-ink-subtle mt-1 min-h-[1.125rem] tabular-nums">
				Svelte 5 and Tailwind CSS{size ? `, ${size}` : ''}
			</p>
		</div>
	</figcaption>
</figure>
