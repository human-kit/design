<script lang="ts">
	import { Select as SelectPrimitive } from '@human-kit/ui/select';
	import type { ComponentProps } from 'svelte';
	import { cn } from '@registry/lib/utils';

	let { class: className, ...restProps }: ComponentProps<typeof SelectPrimitive.Label> = $props();
</script>

<SelectPrimitive.Label class={cn('text-sm leading-none font-medium', className)} {...restProps} />
