<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '@registry/lib/utils';
	import { getPopoverLabels } from './context';

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLParagraphElement> = $props();

	const labels = getPopoverLabels();
	$effect(() => {
		if (!labels) return;
		labels.hasDescription = true;
		return () => (labels.hasDescription = false);
	});
</script>

<!-- Read after the panel's name: the content points at it with `aria-describedby`. -->
<p id={labels?.descriptionId} class={cn('text-body text-ink-muted', className)} {...restProps}>
	{@render children?.()}
</p>
