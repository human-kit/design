<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cardDescriptionVariants } from './card-variants';

	type Props = Omit<HTMLAttributes<HTMLParagraphElement>, 'class'> & { class?: string };

	let { class: className, children, ...restProps }: Props = $props();
</script>

<p class={cardDescriptionVariants({ class: className })} {...restProps}>
	{@render children?.()}
</p>
