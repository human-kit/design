<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '@registry/lib/utils';

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<!-- What the dialog holds. It alone scrolls: the title and the footer stay in place. -->
<div
	class={cn('flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-3 pt-1 pb-4', className)}
	{...restProps}
>
	{@render children?.()}
</div>
