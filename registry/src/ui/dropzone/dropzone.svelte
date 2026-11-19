<script lang="ts" module>
	import { cn, tv, type VariantProps } from '@registry/lib/utils';

	/**
	 * A place to drop files. It is a button, so Tab reaches it and Enter or Space opens the
	 * picker; a paste while it has the focus also counts. The three variants say the same thing
	 * (an icon, what to do, and a quieter hint) and differ only in the box around it.
	 */
	export const dropzoneVariants = tv({
		slots: {
			root: [
				'flex w-full cursor-pointer rounded-card border text-body text-ink outline-hidden',
				'transition-[background-color,border-color,box-shadow] duration-150 ease-out',
				'data-focus-visible:shadow-focus',
				// A file held over it: only the edge turns to the primary, solid. The icon and the
				// text stay as they are, so nothing inside jumps while the file moves.
				'data-drop-target:border-solid data-drop-target:border-primary',
				'disabled:cursor-not-allowed disabled:opacity-45'
			],
			// The icon sits on a small grey tile, the same in the three variants.
			tile: 'grid size-7 shrink-0 place-items-center rounded-control bg-hover text-ink-muted',
			icon: 'size-4 stroke-[1.75]',
			text: 'flex min-w-0 flex-col gap-0.5',
			title: 'font-medium',
			hint: 'text-caption text-ink-subtle'
		},
		variants: {
			variant: {
				// A dashed edge on whatever it sits on, and a faint grey under the pointer.
				outline: {
					root: 'flex-col items-center gap-2 border-dashed border-ink/20 px-4 py-5 text-center data-hovered:bg-ink/2'
				},
				// A sunken grey panel with no edge of its own; one shade deeper under the pointer.
				ghost: {
					root: 'flex-col items-center gap-2 border-transparent bg-ink/3 px-4 py-5 text-center data-hovered:bg-ink/4',
					// On the grey panel the tile goes the other way, to the surface, or it would vanish.
					tile: 'bg-surface'
				},
				// The same, on one line and left-aligned: for the foot of a card or a list of files.
				inline: {
					root: 'items-center gap-2.5 border-dashed border-ink/15 px-3 py-2.5 text-start data-hovered:bg-ink/2',
					title: 'truncate',
					hint: 'truncate'
				}
			}
		},
		defaultVariants: { variant: 'outline' }
	});

	export type DropzoneVariant = NonNullable<VariantProps<typeof dropzoneVariants>['variant']>;
</script>

<script lang="ts">
	import { Dropzone as DropzonePrimitive } from '@human-kit/ui/dropzone';
	import FileUp from '@lucide/svelte/icons/file-up';
	import type { ComponentProps } from 'svelte';

	type Props = ComponentProps<typeof DropzonePrimitive> & {
		variant?: DropzoneVariant;
		/** The line that says what to do. */
		title?: string;
		/** A quieter line under it: the kinds of file, the size it takes. */
		hint?: string;
	};

	let {
		variant = 'outline',
		title = 'Drop files here, or click to choose',
		hint,
		class: className,
		children: content,
		...restProps
	}: Props = $props();

	const styles = $derived(dropzoneVariants({ variant }));
</script>

<!-- Give it `children` to draw your own content; the snippet gets `dragging` and the rest. -->
<DropzonePrimitive class={cn(styles.root(), className)} {...restProps}>
	{#snippet children(state)}
		{#if content}
			{@render content(state)}
		{:else}
			<span class={styles.tile()} aria-hidden="true"><FileUp class={styles.icon()} /></span>
			<span class={styles.text()}>
				<span class={styles.title()}>{title}</span>
				{#if hint}
					<span class={styles.hint()}>{hint}</span>
				{/if}
			</span>
		{/if}
	{/snippet}
</DropzonePrimitive>
