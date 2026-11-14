<script lang="ts">
	import { Popover as PopoverPrimitive } from '@human-kit/ui/popover';
	import type { ComponentProps } from 'svelte';
	import { buttonVariants, type ButtonSize, type ButtonVariant } from '@registry/ui/button';

	type Props = ComponentProps<typeof PopoverPrimitive.Trigger> & {
		/** The look of a button: an outline one by default. */
		variant?: ButtonVariant;
		size?: ButtonSize;
	};

	let {
		variant = 'outline',
		size = 'default',
		class: className,
		children,
		element = $bindable(null),
		...restProps
	}: Props = $props();
</script>

<!-- A button: while its panel is open it stays pressed, as the primitive marks it. -->
<PopoverPrimitive.Trigger
	bind:element
	class={buttonVariants({ variant, size, class: className })}
	{...restProps}
>
	{@render children?.()}
</PopoverPrimitive.Trigger>
