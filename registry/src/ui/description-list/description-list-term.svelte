<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { descriptionListTermVariants } from './description-list-variants';

	type Props = Omit<HTMLAttributes<HTMLElement>, 'class'> & { class?: string };

	let { class: className, children, ...restProps }: Props = $props();
</script>

<dt class={descriptionListTermVariants({ class: className })} {...restProps}>
	{@render children?.()}
</dt>
