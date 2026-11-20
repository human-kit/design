<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cardContentVariants } from './card-variants';

	type Props = Omit<HTMLAttributes<HTMLDivElement>, 'class'> & { class?: string };

	let { class: className, children, ...restProps }: Props = $props();
</script>

<div class={cardContentVariants({ class: className })} {...restProps}>
	{@render children?.()}
</div>
