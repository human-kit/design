<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '@registry/lib/utils';

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<!-- The title and what it says, as on the dialog. The right keeps the room of the close button. -->
<div class={cn('flex shrink-0 flex-col gap-0.5 py-2.5 pr-10 pl-3', className)} {...restProps}>
	{@render children?.()}
</div>
