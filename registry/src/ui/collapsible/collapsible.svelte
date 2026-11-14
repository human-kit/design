<script lang="ts">
	import { Collapsible as CollapsiblePrimitive } from '@human-kit/ui/collapsible';
	import type { ComponentProps } from 'svelte';
	import {
		collapsibleVariants,
		setCollapsibleVariant,
		type CollapsibleVariant
	} from './collapsible-variants';

	type Props = ComponentProps<typeof CollapsiblePrimitive.Root> & {
		variant?: CollapsibleVariant;
	};

	let {
		variant = 'ghost',
		open = $bindable(),
		element = $bindable(null),
		class: className,
		...restProps
	}: Props = $props();

	setCollapsibleVariant(() => variant);
	const styles = $derived(collapsibleVariants({ variant }));
</script>

<CollapsiblePrimitive.Root
	bind:open
	bind:element
	class={styles.root({ class: className })}
	{...restProps}
/>
