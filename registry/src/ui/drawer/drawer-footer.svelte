<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '@registry/lib/utils';

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<!-- The dialog's ledge, at the foot of the panel: 4px from the edge, so a button's corner and the
     panel's curve as one. An empty footer is not drawn. -->
<div
	class={cn(
		'border-line bg-surface-muted mt-auto flex shrink-0 flex-col-reverse gap-2 border-t p-1 empty:hidden sm:flex-row sm:justify-end',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
