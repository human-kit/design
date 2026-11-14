<script lang="ts" module>
	import { tv, type VariantProps } from '@registry/lib/utils';

	/**
	 * A button that stays in when pressed: bold in an editor, a filter left on. In, it keeps its
	 * shape and takes the light grey of a hover, the label in full ink; nothing else moves. The
	 * press shows the same fill, so it already looks like what it leads to.
	 */
	export const toggleVariants = tv({
		base: [
			'relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-control font-medium whitespace-nowrap select-none',
			'text-small text-ink-muted outline-hidden',
			'transition-[box-shadow,color,background-color] duration-150 ease-out',
			'data-hovered:text-ink',
			'data-pressed:bg-hover data-selected:bg-hover data-selected:text-ink',
			'data-focus-visible:shadow-focus',
			'data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-45',
			'[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0'
		],
		variants: {
			variant: {
				// No box until the pointer is on it: for a toolbar of icons.
				ghost: 'data-hovered:not-data-pressed:not-data-selected:bg-hover',
				// A box with an edge, as a button has, kept in and out: beside the buttons of a form.
				outline: [
					'bg-surface not-data-focus-visible:shadow-control',
					'data-hovered:not-data-pressed:not-data-selected:bg-surface-hover'
				]
			},
			size: {
				default: 'h-6.5 px-2',
				sm: 'h-6 px-1.5 [&_svg]:size-3.5',
				icon: 'size-6.5',
				'icon-sm': 'size-6 [&_svg]:size-3.5'
			}
		},
		defaultVariants: { variant: 'ghost', size: 'default' }
	});

	export type ToggleVariant = NonNullable<VariantProps<typeof toggleVariants>['variant']>;
	export type ToggleSize = NonNullable<VariantProps<typeof toggleVariants>['size']>;
</script>

<script lang="ts">
	import { Toggle as TogglePrimitive } from '@human-kit/ui/toggle';
	import type { ComponentProps } from 'svelte';

	type Props = ComponentProps<typeof TogglePrimitive.Root> & {
		variant?: ToggleVariant;
		size?: ToggleSize;
	};

	let {
		variant = 'ghost',
		size = 'default',
		selected = $bindable(),
		class: className,
		element = $bindable(null),
		...restProps
	}: Props = $props();
</script>

<!--
	An icon alone needs a name (`aria-label="Bold"`). Keep the name the same in and out: the
	button says whether it is pressed, the name should not say it again.
-->
<TogglePrimitive.Root
	bind:element
	bind:selected
	class={toggleVariants({ variant, size, class: className })}
	{...restProps}
/>
