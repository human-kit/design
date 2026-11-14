<script lang="ts">
	import { Dialog as DialogPrimitive } from '@human-kit/ui/dialog';
	import type { ComponentProps } from 'svelte';
	import { cn } from '@registry/lib/utils';

	let { class: className, ...restProps }: ComponentProps<typeof DialogPrimitive.Description> =
		$props();
</script>

<DialogPrimitive.Description
	class={cn('text-muted-foreground text-sm', className)}
	{...restProps}
/>
