<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { descriptionListItemVariants } from './description-list-variants';

	type Props = Omit<HTMLAttributes<HTMLDivElement>, 'class'> & { class?: string };

	let { class: className, children, ...restProps }: Props = $props();
</script>

<div class={descriptionListItemVariants({ class: className })} {...restProps}>
	{@render children?.()}
</div>
