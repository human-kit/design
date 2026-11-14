<script lang="ts">
	import { Menu as MenuPrimitive } from '@human-kit/ui/menu';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
	import type { Component, ComponentProps } from 'svelte';
	import { menuItemVariants } from './menu-item.svelte';

	type Props = ComponentProps<typeof MenuPrimitive.SubmenuTrigger> & {
		/** The icon before the label. */
		icon?: Component<Record<string, unknown>>;
	};

	let { icon: Icon, class: className, children, ...restProps }: Props = $props();

	const styles = menuItemVariants();
</script>

<!-- A row like any other, with a chevron that says it opens another list. -->
<MenuPrimitive.SubmenuTrigger class={styles.row({ class: className })} {...restProps}>
	{#if Icon}<Icon />{/if}
	<span class={styles.label()}>{@render children?.()}</span>
	<ChevronRight class="-mr-0.5 ml-4" />
</MenuPrimitive.SubmenuTrigger>
