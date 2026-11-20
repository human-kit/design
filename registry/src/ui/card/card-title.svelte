<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cardTitleVariants } from './card-variants';

	type Props = Omit<HTMLAttributes<HTMLHeadingElement>, 'class'> & {
		class?: string;
		/** The heading level, to fit the page's outline. */
		level?: 2 | 3 | 4 | 5 | 6;
	};

	let { level = 3, class: className, children, ...restProps }: Props = $props();
</script>

<svelte:element this={`h${level}`} class={cardTitleVariants({ class: className })} {...restProps}>
	{@render children?.()}
</svelte:element>
