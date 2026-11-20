<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cardFooterVariants } from './card-variants';

	type Props = Omit<HTMLAttributes<HTMLDivElement>, 'class'> & { class?: string };

	let { class: className, children, ...restProps }: Props = $props();
</script>

<div class={cardFooterVariants({ class: className })} {...restProps}>
	{@render children?.()}
</div>
