<script lang="ts" module>
	import { tv } from '@registry/lib/utils';

	/**
	 * The head of a screen: where it is, what it is called, a line on it, and what can be done
	 * from it. The actions keep to the right of the title and drop under it when there is no
	 * room beside.
	 */
	export const pageHeaderVariants = tv({
		slots: {
			root: 'flex flex-col gap-2 text-body',
			row: 'flex flex-wrap items-start justify-between gap-x-6 gap-y-3',
			main: 'flex min-w-0 flex-1 basis-80 flex-col gap-1',
			titleRow: 'flex flex-wrap items-center gap-x-2.5 gap-y-1',
			title: 'text-title font-semibold tracking-tight text-ink',
			description: 'max-w-prose text-ink-muted',
			// As tall as the title's line, the buttons centred in it.
			actions: 'flex h-7 shrink-0 items-center gap-1.5'
		},
		variants: {
			// A line under it, for a header over content that starts without an edge of its own.
			divided: { true: { root: 'border-b border-line pb-4' }, false: {} }
		},
		defaultVariants: { divided: false }
	});
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = Omit<HTMLAttributes<HTMLElement>, 'class' | 'title'> & {
		class?: string;
		title: string;
		/** The heading level: 1 for the page's own title. */
		level?: 1 | 2 | 3;
		/** A line under the title. */
		description?: string;
		/** The breadcrumbs above the title. */
		breadcrumbs?: Snippet;
		/** Badges beside the title: a status, a count. */
		meta?: Snippet;
		/** The buttons on the right. */
		actions?: Snippet;
		divided?: boolean;
	};

	let {
		title,
		level = 1,
		description,
		breadcrumbs,
		meta,
		actions,
		divided = false,
		class: className,
		...restProps
	}: Props = $props();

	const styles = $derived(pageHeaderVariants({ divided }));
</script>

<header class={styles.root({ class: className })} {...restProps}>
	{@render breadcrumbs?.()}
	<div class={styles.row()}>
		<div class={styles.main()}>
			<div class={styles.titleRow()}>
				<svelte:element this={`h${level}`} class={styles.title()}>{title}</svelte:element>
				{@render meta?.()}
			</div>
			{#if description}<p class={styles.description()}>{description}</p>{/if}
		</div>
		{#if actions}<div class={styles.actions()}>{@render actions()}</div>{/if}
	</div>
</header>
