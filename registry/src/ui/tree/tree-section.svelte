<script lang="ts">
	import { Tree as TreePrimitive } from '@human-kit/ui/tree';
	import type { TreeSectionProps } from '@human-kit/ui/tree';
	import type { Snippet } from 'svelte';

	type Props = Omit<TreeSectionProps, 'children' | 'items'> & {
		/** The small heading over the group. Without it, name the group with `aria-label`. */
		title?: string;
		children?: Snippet;
	};

	let { title, children, ...restProps }: Props = $props();
</script>

<!-- A group of top-level rows under a quiet heading, in line with the rows' labels. -->
<TreePrimitive.Section {...restProps}>
	{#if title}
		<TreePrimitive.Header
			class="text-caption text-ink-subtle flex h-6 items-center ps-6 pe-1.5 font-medium select-none"
			>{title}</TreePrimitive.Header
		>
	{/if}
	{@render children?.()}
</TreePrimitive.Section>
