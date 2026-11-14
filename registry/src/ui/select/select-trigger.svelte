<script lang="ts">
	import { Select as SelectPrimitive } from '@human-kit/ui/select';
	import ChevronDown from '@lucide/svelte/icons/chevron-down';
	import type { ComponentProps, Snippet } from 'svelte';
	import { cn } from '@registry/lib/utils';
	import { inputVariants, type InputSize, type InputVariant } from '@registry/ui/input';

	type Props = Omit<ComponentProps<typeof SelectPrimitive.Trigger>, 'children'> & {
		/** The look of the field, the same as an input's. */
		variant?: InputVariant;
		size?: InputSize;
		/** The content of the trigger. The default is the selected value. */
		children?: Snippet;
	};

	let {
		variant = 'default',
		size = 'default',
		class: className,
		children: content,
		...restProps
	}: Props = $props();
</script>

<!--
	The trigger is drawn as a field, not as a button: in a form it sits among inputs and reads as
	one of them. It keeps the focus ring while its list is open, since the focus is still its own.
	A large one stays as wide as its column: a select that took the width of its value would jump
	at each choice.
-->
<SelectPrimitive.Trigger
	class={inputVariants({
		variant,
		size,
		class: cn(
			'flex cursor-pointer items-center justify-between gap-1.5 text-left',
			'data-[state=open]:shadow-focus data-placeholder:text-ink-subtle',
			// A line has its halo under it only, as on its focus.
			variant === 'underline' &&
				'data-[state=open]:border-primary data-[state=open]:shadow-focus-line',
			size === 'lg' && 'w-full',
			'[&_svg]:pointer-events-none [&_svg]:shrink-0',
			className
		)
	})}
	{...restProps}
>
	{#snippet children({ open })}
		{#if content}
			{@render content()}
		{:else}
			<SelectPrimitive.Value class="min-w-0 truncate" />
		{/if}
		<ChevronDown
			aria-hidden="true"
			class={cn(
				'text-ink-subtle size-3.5 transition-transform duration-150 motion-reduce:transition-none',
				open && 'rotate-180'
			)}
		/>
	{/snippet}
</SelectPrimitive.Trigger>
