<script lang="ts">
	import { cn } from '@registry/lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';
	import { fieldMessageVariants } from './recipes';

	type Props = HTMLAttributes<HTMLParagraphElement>;

	let { class: className, children, ...restProps }: Props = $props();
</script>

<!-- A hint under a control: what it takes, or why it is locked. Give its id to the control's
     `aria-describedby`. -->
<p class={fieldMessageVariants({ tone: 'hint', class: cn(className) })} {...restProps}>
	{@render children?.()}
</p>
