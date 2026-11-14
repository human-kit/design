<script lang="ts">
	import { cn } from '@registry/lib/utils';
	import type { HTMLLabelAttributes } from 'svelte/elements';
	import { fieldLabelVariants, fieldRequiredMarkClass } from './recipes';

	type Props = HTMLLabelAttributes & {
		/** Red with the control while what it holds is wrong. */
		invalid?: boolean;
		/** Faded with the control while it is disabled. */
		disabled?: boolean;
		/** Ends the name with the mark of a field that has to be filled. */
		required?: boolean;
	};

	let {
		invalid = false,
		disabled = false,
		required = false,
		class: className,
		children,
		...restProps
	}: Props = $props();
</script>

<!-- The mark is written flush against the name: any whitespace here would part the two. -->
<label class={fieldLabelVariants({ invalid, disabled, class: cn(className) })} {...restProps}
	>{@render children?.()}{#if required}<span class={fieldRequiredMarkClass} aria-hidden="true"
			>&nbsp;⋆</span
		>{/if}</label
>
