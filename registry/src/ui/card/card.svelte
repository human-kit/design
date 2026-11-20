<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cardVariants, type CardSize, type CardVariant } from './card-variants';

	type Props = Omit<HTMLAttributes<HTMLDivElement>, 'class'> & {
		class?: string;
		variant?: CardVariant;
		size?: CardSize;
	};

	let {
		variant = 'outline',
		size = 'default',
		class: className,
		children,
		...restProps
	}: Props = $props();
</script>

<div
	data-variant={variant}
	data-size={size}
	class={cardVariants({ variant, size, class: className })}
	{...restProps}
>
	{@render children?.()}
</div>
