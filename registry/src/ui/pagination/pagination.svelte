<script lang="ts" module>
	import { tv } from '@registry/lib/utils';

	/**
	 * The pages of a long list, under it: the first and the last always, the current one with a
	 * page on each side, and an ellipsis for what is skipped. Seven places at most, so the row
	 * keeps its width as the page moves. The current page wears the kit's neutral selection.
	 */
	export const paginationVariants = tv({
		slots: {
			root: 'flex w-fit items-center gap-0.5',
			list: 'flex items-center gap-0.5',
			// As wide as a square button, and wider for a number of three digits.
			page: 'w-auto min-w-6.5 px-1 tabular-nums aria-[current=page]:bg-hover aria-[current=page]:font-medium aria-[current=page]:text-ink',
			ellipsis: 'grid size-6.5 place-items-center text-ink-subtle [&_svg]:size-3.5',
			step: 'rtl:[&_svg]:-scale-x-100'
		}
	});

	type Place = number | 'gap-start' | 'gap-end';

	/** The places to show: never more than 5 + 2 × siblings, so the row does not jump. */
	export function paginationRange(page: number, count: number, siblings = 1): Place[] {
		const slots = 5 + siblings * 2;
		if (count <= slots) return Array.from({ length: count }, (_, i) => i + 1);
		const run = (from: number, to: number) =>
			Array.from({ length: to - from + 1 }, (_, i) => from + i);
		// Near an end, the run reaches it and only the far side has a gap.
		const edge = slots - 2;
		if (page <= edge - siblings) return [...run(1, edge), 'gap-end', count];
		if (page >= count - edge + 1 + siblings)
			return [1, 'gap-start', ...run(count - edge + 1, count)];
		return [1, 'gap-start', ...run(page - siblings, page + siblings), 'gap-end', count];
	}
</script>

<script lang="ts">
	import ChevronLeft from '@lucide/svelte/icons/chevron-left';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
	import Ellipsis from '@lucide/svelte/icons/ellipsis';
	import type { HTMLAttributes } from 'svelte/elements';
	import { Button } from '@registry/ui/button';

	type Props = Omit<HTMLAttributes<HTMLElement>, 'class'> & {
		/** The current page, from 1. */
		page?: number;
		/** How many pages there are. */
		count: number;
		/** Pages shown on each side of the current one. */
		siblings?: number;
		onPageChange?: (page: number) => void;
		/** The names read aloud: the row's, the arrows', and each page's. */
		label?: string;
		previousLabel?: string;
		nextLabel?: string;
		pageLabel?: (page: number) => string;
		class?: string;
	};

	let {
		page = $bindable(1),
		count,
		siblings = 1,
		onPageChange,
		label = 'Pagination',
		previousLabel = 'Previous page',
		nextLabel = 'Next page',
		pageLabel = (n: number) => `Page ${n}`,
		class: className,
		...restProps
	}: Props = $props();

	const styles = paginationVariants();
	const places = $derived(paginationRange(page, count, siblings));

	function go(next: number) {
		const clamped = Math.min(Math.max(next, 1), count);
		if (clamped === page) return;
		page = clamped;
		onPageChange?.(clamped);
	}
</script>

<nav aria-label={label} class={styles.root({ class: className })} {...restProps}>
	<!-- At an end the arrow stays, disabled: a row whose buttons come and go moves under the
		pointer. -->
	<Button
		variant="ghost"
		size="icon"
		class={styles.step()}
		aria-label={previousLabel}
		disabled={page <= 1}
		onclick={() => go(page - 1)}
	>
		<ChevronLeft aria-hidden="true" />
	</Button>
	<ul class={styles.list()}>
		{#each places as place (place)}
			<li>
				{#if typeof place === 'number'}
					<Button
						variant="ghost"
						size="icon"
						class={styles.page()}
						aria-label={pageLabel(place)}
						aria-current={place === page ? 'page' : undefined}
						onclick={() => go(place)}
					>
						{place}
					</Button>
				{:else}
					<span class={styles.ellipsis()} aria-hidden="true"><Ellipsis /></span>
				{/if}
			</li>
		{/each}
	</ul>
	<Button
		variant="ghost"
		size="icon"
		class={styles.step()}
		aria-label={nextLabel}
		disabled={page >= count}
		onclick={() => go(page + 1)}
	>
		<ChevronRight aria-hidden="true" />
	</Button>
</nav>
