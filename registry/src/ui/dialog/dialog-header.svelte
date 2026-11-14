<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '@registry/lib/utils';

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<!-- The title and what it says, on the sheet of the body: what the dialog asks and what it
     holds read as one thing. The right keeps the room of the close button. -->
<div class={cn('flex shrink-0 flex-col gap-0.5 py-2.5 pr-10 pl-3', className)} {...restProps}>
	{@render children?.()}
</div>
