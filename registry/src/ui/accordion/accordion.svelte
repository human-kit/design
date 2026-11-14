<script lang="ts">
	import { Accordion as AccordionPrimitive } from '@human-kit/ui/accordion';
	import type { ComponentProps } from 'svelte';
	import {
		accordionVariants,
		setAccordionVariant,
		type AccordionVariant
	} from './accordion-variants';

	type Props = ComponentProps<typeof AccordionPrimitive.Root> & {
		/** On a card of its own (`card`), or the rules only (`flush`). */
		variant?: AccordionVariant;
	};

	let {
		variant = 'card',
		value = $bindable(),
		element = $bindable(null),
		class: className,
		children,
		...restProps
	}: Props = $props();

	setAccordionVariant(() => variant);
</script>

<AccordionPrimitive.Root
	bind:value
	bind:element
	class={accordionVariants({ variant }).root({ class: className })}
	{...restProps}
>
	{@render children?.()}
</AccordionPrimitive.Root>
