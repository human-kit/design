<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { descriptionListVariants, type DescriptionListLayout } from './description-list-variants';

	type Props = Omit<HTMLAttributes<HTMLDListElement>, 'class'> & {
		class?: string;
		layout?: DescriptionListLayout;
		divided?: boolean;
		/** The width of the terms' column, in the horizontal layout. */
		termWidth?: string;
	};

	let {
		layout = 'horizontal',
		divided = false,
		termWidth,
		class: className,
		style,
		children,
		...restProps
	}: Props = $props();
</script>

<dl
	data-layout={layout}
	data-divided={divided}
	class={descriptionListVariants({ layout, divided, class: className })}
	style={[termWidth ? `--dl-term: ${termWidth}` : '', style].filter(Boolean).join('; ') ||
		undefined}
	{...restProps}
>
	{@render children?.()}
</dl>
