<script lang="ts">
	import { Tabs as TabsPrimitive } from '@human-kit/ui/tabs';
	import type { ComponentProps } from 'svelte';
	import { cn } from '@registry/lib/utils';
	import { setTabsVariant, type TabsVariant } from './tabs-variants';

	type Props = ComponentProps<typeof TabsPrimitive.Root> & {
		/** A strip of titles over a rule (`line`), or a few options on a rail (`segment`). */
		variant?: TabsVariant;
	};

	let {
		variant = 'line',
		value = $bindable(),
		element = $bindable(null),
		class: className,
		children,
		...restProps
	}: Props = $props();

	setTabsVariant(() => variant);
</script>

<TabsPrimitive.Root
	bind:value
	bind:element
	class={cn('flex min-w-0 flex-col', className)}
	{...restProps}
>
	{@render children?.()}
</TabsPrimitive.Root>
