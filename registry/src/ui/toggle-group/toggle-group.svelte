<script lang="ts" module>
	import { getContext, setContext } from 'svelte';
	import { tv } from '@registry/lib/utils';
	import type { ToggleSize, ToggleVariant } from '@registry/ui/toggle';

	type Orientation = 'horizontal' | 'vertical';
	type Look = { variant: ToggleVariant; size: ToggleSize; orientation: Orientation };

	const KEY = Symbol('toggle-group-look');

	/** The look the group gives its toggles. */
	export function getToggleGroupLook(): Look {
		return (
			getContext<(() => Look) | undefined>(KEY)?.() ?? {
				variant: 'ghost',
				size: 'default',
				orientation: 'horizontal'
			}
		);
	}

	/**
	 * The toggles of a group make one piece: no gap between them, the corners only at its two ends.
	 * In `outline` the piece is one box with one edge, ruled inside between its toggles; the toggles
	 * themselves are drawn bare, so two edges never meet.
	 */
	export const toggleGroupVariants = tv({
		slots: {
			root: 'flex w-fit items-center rounded-control',
			item: 'rounded-none data-focus-visible:z-10'
		},
		variants: {
			variant: {
				ghost: {},
				outline: { root: 'bg-surface shadow-control', item: 'border-line' }
			},
			orientation: {
				horizontal: { item: 'first:rounded-l-control last:rounded-r-control' },
				vertical: {
					root: 'flex-col items-stretch',
					item: 'first:rounded-t-control last:rounded-b-control'
				}
			}
		},
		compoundVariants: [
			{ variant: 'outline', orientation: 'horizontal', class: { item: 'not-first:border-l' } },
			{ variant: 'outline', orientation: 'vertical', class: { item: 'not-first:border-t' } }
		],
		defaultVariants: { variant: 'ghost', orientation: 'horizontal' }
	});
</script>

<script lang="ts">
	import { ToggleGroup as ToggleGroupPrimitive } from '@human-kit/ui/toggle-group';
	import type { ComponentProps } from 'svelte';

	type Props = ComponentProps<typeof ToggleGroupPrimitive.Root> & {
		variant?: ToggleVariant;
		size?: ToggleSize;
	};

	let {
		variant = 'ghost',
		size = 'default',
		orientation = 'horizontal',
		value = $bindable(),
		class: className,
		element = $bindable(null),
		...restProps
	}: Props = $props();

	setContext(KEY, () => ({ variant, size, orientation }));

	const styles = $derived(toggleGroupVariants({ variant, orientation }));
</script>

<!--
	One stop for the keyboard: the arrows move between the toggles. Name the group
	(`aria-label="Text style"`). With `selectionMode="single"` it picks one, as a radio would; for
	views of the same thing a segmented set of tabs reads better.
-->
<ToggleGroupPrimitive.Root
	bind:element
	bind:value
	{orientation}
	class={styles.root({ class: className })}
	{...restProps}
/>
