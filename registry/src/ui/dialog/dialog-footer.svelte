<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '@registry/lib/utils';

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<!-- A ledge under the sheet, where the buttons live. 4px from the edge, so the 8px corner of
     a button and the dialog's 12px one curve as one. An empty footer is not drawn: a grey
     strip with nothing on it reads as something broken. -->
<div
	class={cn(
		'border-line bg-surface-muted flex shrink-0 flex-col-reverse gap-2 border-t p-1 empty:hidden sm:flex-row sm:justify-end',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
