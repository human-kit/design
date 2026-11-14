<script lang="ts">
	import { Accordion as AccordionPrimitive } from '@human-kit/ui/accordion';
	import ChevronDown from '@lucide/svelte/icons/chevron-down';
	import type { ComponentProps } from 'svelte';
	import { accordionVariants, getAccordionVariant } from './accordion-variants';

	type Props = ComponentProps<typeof AccordionPrimitive.Trigger> & {
		/** The level of the heading around the row, to agree with the headings above it. */
		level?: 1 | 2 | 3 | 4 | 5 | 6;
	};

	let {
		level = 3,
		class: className,
		children,
		element = $bindable(null),
		...restProps
	}: Props = $props();

	const variant = getAccordionVariant();
	const styles = $derived(accordionVariants({ variant }));
</script>

<!-- A heading that holds a button: the rows are found in a list of headings, and opened from it. -->
<AccordionPrimitive.Header {level} class={styles.header()}>
	<AccordionPrimitive.Trigger
		bind:element
		class={styles.trigger({ class: className })}
		{...restProps}
	>
		{@render children?.()}
		<ChevronDown class={styles.chevron()} aria-hidden="true" />
	</AccordionPrimitive.Trigger>
</AccordionPrimitive.Header>
