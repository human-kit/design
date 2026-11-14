<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '@registry/lib/utils';

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<!-- The title and the description, close together, over what the panel holds. -->
<div class={cn('flex flex-col gap-0.5', className)} {...restProps}>
	{@render children?.()}
</div>
