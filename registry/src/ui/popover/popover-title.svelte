<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '@registry/lib/utils';
	import { getPopoverLabels } from './context';

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLHeadingElement> = $props();

	const labels = getPopoverLabels();
	$effect(() => {
		if (!labels) return;
		labels.hasTitle = true;
		return () => (labels.hasTitle = false);
	});
</script>

<!-- Names the panel: the content points at it with `aria-labelledby`. -->
<h2 id={labels?.titleId} class={cn('text-body text-ink font-medium', className)} {...restProps}>
	{@render children?.()}
</h2>
