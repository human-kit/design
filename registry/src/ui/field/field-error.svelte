<script lang="ts">
	import { cn } from '@registry/lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';
	import { fieldMessageVariants } from './recipes';

	type Props = HTMLAttributes<HTMLParagraphElement>;

	let { class: className, children, ...restProps }: Props = $props();
</script>

<!-- What is wrong with a value, announced the moment it appears. Give its id to the control's
     `aria-describedby`. -->
<p
	role="alert"
	class={fieldMessageVariants({ tone: 'error', class: cn(className) })}
	{...restProps}
>
	{@render children?.()}
</p>
