<script lang="ts">
	import { onDestroy } from 'svelte';

	/**
	 * The hue of the primary, changed for the whole page with a press. It shows what the one
	 * file of tokens does: every work on the walls above is repainted at once.
	 */
	const hues = [
		{ name: 'Indigo', hue: 277 },
		{ name: 'Blue', hue: 250 },
		{ name: 'Teal', hue: 190 },
		{ name: 'Green', hue: 150 },
		{ name: 'Orange', hue: 50 },
		{ name: 'Red', hue: 25 },
		{ name: 'Pink', hue: 350 }
	];

	let { hue = $bindable(277) }: { hue?: number } = $props();

	// The page shows the swatches twice, and each group of radios needs a name of its own.
	const id = $props.id();

	$effect(() => {
		const root = document.documentElement;
		root.classList.toggle('repaint', hue !== 277);
		root.style.setProperty('--hue', String(hue));
	});

	onDestroy(() => {
		if (typeof document === 'undefined') return;
		document.documentElement.classList.remove('repaint');
		document.documentElement.style.removeProperty('--hue');
	});
</script>

<div role="radiogroup" aria-label="The colour of the walls" class="flex flex-wrap gap-2">
	{#each hues as option (option.hue)}
		<label class="group relative cursor-pointer">
			<input
				type="radio"
				name="hue-{id}"
				value={option.hue}
				bind:group={hue}
				class="peer absolute inset-0 cursor-pointer opacity-0"
			/>
			<span
				class="border-line-strong text-small text-ink-muted peer-checked:text-ink peer-checked:border-ink peer-focus-visible:shadow-focus flex items-center gap-2 rounded-lg border py-1 ps-1.5 pe-2.5"
			>
				<span
					class="size-3.5 rounded-[4px]"
					style="background: oklch(0.55 0.2 {option.hue})"
					aria-hidden="true"
				></span>
				{option.name}
			</span>
		</label>
	{/each}
</div>

<style>
	/* The six tokens of the primary, with the hue taken from the page. The values are those of
	   the theme of the kit; only the hue moves. */
	:global(:root.repaint) {
		--primary: oklch(0.55 0.2 var(--hue));
		--primary-hover: oklch(0.5 0.2 var(--hue));
		--primary-edge: oklch(0.45 0.2 var(--hue));
		--primary-soft: oklch(0.97 0.025 var(--hue));
		--primary-line: oklch(0.87 0.07 var(--hue));
		--primary-ink: oklch(0.5 0.2 var(--hue));
	}

	:global(.dark.repaint) {
		--primary: oklch(0.5 0.15 var(--hue));
		--primary-hover: oklch(0.55 0.15 var(--hue));
		--primary-edge: oklch(0.42 0.13 var(--hue));
		--primary-soft: oklch(0.27 0.045 var(--hue));
		--primary-line: oklch(0.42 0.1 var(--hue));
		--primary-ink: oklch(0.8 0.12 var(--hue));
	}
</style>
