<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { descriptionListDetailsVariants } from './description-list-variants';

	type Props = Omit<HTMLAttributes<HTMLElement>, 'class'> & { class?: string };

	let { class: className, children, ...restProps }: Props = $props();
</script>

<dd class={descriptionListDetailsVariants({ class: className })} {...restProps}>
	{@render children?.()}
</dd>
