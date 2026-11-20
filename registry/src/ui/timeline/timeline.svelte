<script lang="ts">
	import type { HTMLOlAttributes } from 'svelte/elements';
	import { timelineVariants, type TimelineVariant } from './timeline-variants';

	type Props = Omit<HTMLOlAttributes, 'class'> & { class?: string; variant?: TimelineVariant };

	let { variant = 'outline', class: className, children, ...restProps }: Props = $props();

	const styles = timelineVariants();
</script>

<ol data-variant={variant} class={styles.root({ class: className })} {...restProps}>
	{@render children?.()}
</ol>
