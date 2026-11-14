<script lang="ts">
	import { Select as SelectPrimitive } from '@human-kit/ui/select';
	import type { ComponentProps } from 'svelte';
	import { cn } from '@registry/lib/utils';
	import { fieldLabelVariants } from '@registry/ui/field';

	/** The name over a select drawn without a `Field`: it reads like the label of one. */
	let { class: className, ...restProps }: ComponentProps<typeof SelectPrimitive.Label> = $props();
</script>

<SelectPrimitive.Label
	class={fieldLabelVariants({ class: cn('mb-1', className) })}
	{...restProps}
/>
