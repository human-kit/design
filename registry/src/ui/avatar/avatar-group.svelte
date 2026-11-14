<script lang="ts">
	import { Avatar as AvatarPrimitive } from '@human-kit/ui/avatar';
	import type { ComponentProps } from 'svelte';
	import { cn } from '@registry/lib/utils';
	import { avatarVariants, type AvatarSize } from './avatar.svelte';

	type Props = ComponentProps<typeof AvatarPrimitive.Group> & {
		/** The size of the count at the end: the size of the avatars in the row. */
		size?: AvatarSize;
	};

	let {
		size = 'default',
		class: className,
		children,
		element = $bindable(null),
		...restProps
	}: Props = $props();

	const styles = $derived(avatarVariants({ size }));
</script>

<!--
	A row of avatars, 2px apart: tiles with corners overlap badly, each cutting the initials of
	the one before. Name it with `aria-label` ("Care team"). Past `max`, the rest are counted at
	the end: "+3", read out as "3 more".
-->
<AvatarPrimitive.Group
	bind:element
	class={cn('flex items-center gap-0.5', className)}
	{...restProps}
>
	{@render children?.()}
	<AvatarPrimitive.Count
		class={cn(
			// The fallback's look in the avatar's box: its `size-full` would stretch the count.
			styles.fallback(),
			styles.root(),
			'bg-hover text-ink-muted place-items-center tabular-nums'
		)}
	/>
</AvatarPrimitive.Group>
