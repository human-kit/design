<script lang="ts" module>
	import { tv, type VariantProps } from '@registry/lib/utils';

	/**
	 * Something is loading: the kit's turning circle, the one a pending button wears, for an
	 * area that waits on its data. With `label` it says what in words beside it; without, the
	 * words are there only for a screen reader.
	 */
	export const spinnerVariants = tv({
		slots: {
			root: 'inline-flex items-center gap-2 text-ink-subtle',
			icon: 'shrink-0 animate-spin motion-reduce:animate-none',
			label: 'text-ink-muted'
		},
		variants: {
			size: {
				sm: { icon: 'size-3.5', label: 'text-small' },
				default: { icon: 'size-4', label: 'text-body' },
				lg: { root: 'flex-col gap-2.5', icon: 'size-6', label: 'text-body' }
			}
		},
		defaultVariants: { size: 'default' }
	});

	export type SpinnerSize = NonNullable<VariantProps<typeof spinnerVariants>['size']>;
</script>

<script lang="ts">
	import LoaderCircle from '@lucide/svelte/icons/loader-circle';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = Omit<HTMLAttributes<HTMLSpanElement>, 'class'> & {
		class?: string;
		size?: SpinnerSize;
		/** What is loading, shown beside the circle. */
		label?: string;
		/** Read aloud when there is no `label`. */
		srLabel?: string;
	};

	let {
		size = 'default',
		label,
		srLabel = 'Loading',
		class: className,
		...restProps
	}: Props = $props();

	const styles = $derived(spinnerVariants({ size }));
</script>

<!-- A status, so its words are read once when it appears, without taking the user away. -->
<span role="status" class={styles.root({ class: className })} {...restProps}>
	<LoaderCircle class={styles.icon()} aria-hidden="true" />
	{#if label}
		<span class={styles.label()}>{label}</span>
	{:else}
		<span class="sr-only">{srLabel}</span>
	{/if}
</span>
