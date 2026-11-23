<script lang="ts">
	import { ToggleGroup as ToggleGroupPrimitive } from '@human-kit/ui/toggle-group';
	import type { ComponentProps } from 'svelte';
	import { cn } from '@registry/lib/utils';
	import { toggleVariants } from '@registry/ui/toggle';
	import { getToggleGroupLook, toggleGroupVariants } from './toggle-group.svelte';

	type Props = ComponentProps<typeof ToggleGroupPrimitive.Item>;

	let { class: className, element = $bindable(null), ...restProps }: Props = $props();

	const look = getToggleGroupLook();
	// The box of an outline group is drawn by the group: each toggle inside is a bare one.
	const classes = $derived(
		cn(
			toggleVariants({ variant: 'ghost', size: look.size }),
			toggleGroupVariants({
				variant: look.variant,
				orientation: look.orientation,
				size: look.size
			}).item(),
			className
		)
	);
</script>

<ToggleGroupPrimitive.Item bind:element class={classes} {...restProps} />
