<script lang="ts">
	import { Select as SelectPrimitive } from '@human-kit/ui/select';
	import ChevronDown from '@lucide/svelte/icons/chevron-down';
	import type { ComponentProps, Snippet } from 'svelte';
	import { cn } from '@registry/lib/utils';

	type Props = Omit<ComponentProps<typeof SelectPrimitive.Trigger>, 'children'> & {
		/** The content of the trigger. The default is the selected value. */
		children?: Snippet;
	};

	let { class: className, children: content, ...restProps }: Props = $props();
</script>

<SelectPrimitive.Trigger
	class={cn(
		'border-line-strong bg-canvas flex h-9 w-full items-center justify-between gap-2 rounded-md border px-3 text-sm whitespace-nowrap outline-hidden transition-colors',
		'data-focus-visible:outline-ring data-focus-visible:outline-2 data-focus-visible:outline-offset-2 data-focus-visible:outline-solid',
		'data-placeholder:text-ink-muted data-invalid:border-danger-solid',
		'data-disabled:cursor-not-allowed data-disabled:opacity-50',
		'[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
		className
	)}
	{...restProps}
>
	{#snippet children({ open })}
		{#if content}
			{@render content()}
		{:else}
			<SelectPrimitive.Value class="truncate" />
		{/if}
		<ChevronDown
			aria-hidden="true"
			class={cn(
				'text-ink-muted transition-transform motion-reduce:transition-none',
				open && 'rotate-180'
			)}
		/>
	{/snippet}
</SelectPrimitive.Trigger>
