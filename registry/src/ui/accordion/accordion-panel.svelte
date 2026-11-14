<script lang="ts">
	import { Accordion as AccordionPrimitive } from '@human-kit/ui/accordion';
	import type { ComponentProps } from 'svelte';
	import { accordionVariants, getAccordionVariant } from './accordion-variants';

	let {
		class: className,
		forceMount = true,
		children,
		element = $bindable(null),
		...restProps
	}: ComponentProps<typeof AccordionPrimitive.Panel> = $props();

	const variant = getAccordionVariant();
	const styles = $derived(accordionVariants({ variant }));
</script>

<!--
	Kept in the page while closed (`forceMount`), hidden: it opens with its motion the first time
	too, and a page drawn on the server already holds it. Set `region={false}` past six or so rows,
	where a landmark for each one crowds the list of landmarks.
-->
<AccordionPrimitive.Panel bind:element {forceMount} class={styles.panel()} {...restProps}>
	<div class={styles.content({ class: className })}>
		{@render children?.()}
	</div>
</AccordionPrimitive.Panel>
