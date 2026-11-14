<script lang="ts">
	import { Menu as MenuPrimitive } from '@human-kit/ui/menu';
	import type { ComponentProps } from 'svelte';
	import { buttonVariants, type ButtonSize, type ButtonVariant } from '@registry/ui/button';

	type Props = ComponentProps<typeof MenuPrimitive.Trigger> & {
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

<!-- A button: while its menu is open it stays pressed, as the primitive marks it. -->
<MenuPrimitive.Trigger
	bind:element
	class={buttonVariants({ variant, size, class: className })}
	{...restProps}
>
	{@render children?.()}
</MenuPrimitive.Trigger>
