<script lang="ts">
	import { Dialog as DialogPrimitive } from '@human-kit/ui/dialog';
	import type { ComponentProps } from 'svelte';
	import { cn } from '@registry/lib/utils';

	let { class: className, ...restProps }: ComponentProps<typeof DialogPrimitive.Title> = $props();
</script>

<DialogPrimitive.Title class={cn('text-lg leading-none font-semibold', className)} {...restProps} />
