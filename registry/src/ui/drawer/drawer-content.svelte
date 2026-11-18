<script lang="ts" module>
	import { tv, type VariantProps } from '@registry/lib/utils';

	/**
	 * A card that floats 12px off the edge it hangs on, not a wall: it comes in sliding 28px
	 * while it fades, and goes back the same way, quicker than it came. A drag moves it with the
	 * finger, and a snap point holds it partly open.
	 */
	export const drawerContentVariants = tv({
		base: [
			// The primitive pins the panel to its edge; the margin lifts it off the three edges it
			// touches. The bleed the primitive paints past the edge is clipped by the corners.
			'm-3 flex flex-col overflow-hidden rounded-dialog bg-overlay text-ink shadow-dialog outline-hidden',
			// Its place: the snap point, the drag and, while it comes and goes, 28px outward.
			'[translate:calc(var(--drawer-swipe-movement-x)+var(--snap-x,0px)+var(--away-x,0px))_calc(var(--drawer-swipe-movement-y)+var(--snap-y,0px)+var(--away-y,0px))]',
			'data-starting-style:[--away-x:var(--from-x,0px)] data-starting-style:[--away-y:var(--from-y,0px)] data-starting-style:opacity-0',
			'data-exiting:[--away-x:var(--from-x,0px)] data-exiting:[--away-y:var(--from-y,0px)] data-exiting:opacity-0',
			// It arrives in 260ms and leaves in 180ms. A flick sends it off faster than a slow
			// release: the primitive gives the strength of the throw.
			'transition-[translate,opacity] ease-(--ease-out-quint) [transition-duration:calc(260ms*var(--drawer-swipe-strength,1))]',
			'data-exiting:ease-(--ease-out-cubic) data-exiting:[transition-duration:calc(180ms*var(--drawer-swipe-strength,1))]',
			'data-swiping:transition-none data-swiping:select-none',
			'motion-reduce:[--from-x:0px] motion-reduce:[--from-y:0px]'
		],
		variants: {
			side: {
				right:
					'max-h-[calc(100dvh-1.5rem)] [--from-x:28px] [--snap-x:var(--drawer-snap-point-offset)]',
				left: 'max-h-[calc(100dvh-1.5rem)] [--from-x:-28px] [--snap-x:var(--drawer-snap-point-offset)]',
				bottom:
					'max-h-[calc(100dvh-1.5rem)] sm:mx-auto sm:w-[calc(100%-1.5rem)] sm:max-w-xl [--from-y:28px] [--snap-y:var(--drawer-snap-point-offset)]',
				top: 'max-h-[calc(100dvh-1.5rem)] sm:mx-auto sm:w-[calc(100%-1.5rem)] sm:max-w-xl [--from-y:-28px] [--snap-y:var(--drawer-snap-point-offset)]'
			},
			/**
			 * How wide a side panel gets. A panel at the top or the bottom spans a phone and, from the
			 * `sm` width up, stands centred at the width of a small dialog.
			 */
			size: {
				sm: '',
				md: '',
				lg: ''
			}
		},
		compoundVariants: [
			{ side: ['left', 'right'], size: 'sm', class: 'w-80 max-w-[calc(100vw-1.5rem)]' },
			{ side: ['left', 'right'], size: 'md', class: 'w-88 max-w-[calc(100vw-1.5rem)]' },
			{ side: ['left', 'right'], size: 'lg', class: 'w-120 max-w-[calc(100vw-1.5rem)]' }
		],
		defaultVariants: { side: 'right', size: 'md' }
	});

	export type DrawerSize = NonNullable<VariantProps<typeof drawerContentVariants>['size']>;
	export type DrawerSide = NonNullable<VariantProps<typeof drawerContentVariants>['side']>;
</script>

<script lang="ts">
	import { Drawer as DrawerPrimitive } from '@human-kit/ui/drawer';
	import XIcon from '@lucide/svelte/icons/x';
	import type { ComponentProps } from 'svelte';
	import { cn } from '@registry/lib/utils';
	import { buttonVariants } from '@registry/ui/button';

	type Props = ComponentProps<typeof DrawerPrimitive.Content> & {
		/** The edge it hangs on. Give the root the same `side`: the root owns the gesture. */
		side?: DrawerSide;
		size?: DrawerSize;
		/** Shows a close button in the top corner. */
		showCloseButton?: boolean;
		/** The accessible name of the close button. */
		closeLabel?: string;
	};

	let {
		class: className,
		side = 'right',
		size = 'md',
		children,
		showCloseButton = true,
		closeLabel = 'Close',
		...restProps
	}: Props = $props();
</script>

<DrawerPrimitive.Portal>
	<!-- A light curtain, lighter than a dialog's: the page stays in view beside the panel. It is
	     the shade of a shadow, so it darkens the page in the dark theme too. It fades with the
	     panel, and the curtain of a drawer opened over another stands down. -->
	<DrawerPrimitive.Overlay
		class={cn(
			'fixed inset-0 bg-(--fall) transition-opacity duration-260 ease-(--ease-out-cubic)',
			'data-exiting:opacity-0 data-exiting:duration-180 data-starting-style:opacity-0',
			'data-nested:bg-transparent data-swiping:transition-none'
		)}
	/>
	<DrawerPrimitive.Content
		class={drawerContentVariants({ side, size, class: cn(className) })}
		{...restProps}
	>
		{#if side === 'bottom'}
			<!-- The grab bar. A mouse drags the panel by it: a drag in the body selects text. -->
			<div aria-hidden="true" class="bg-ink/15 mx-auto mt-2 h-1 w-9 shrink-0 rounded-full"></div>
		{/if}
		{@render children?.()}
		<!-- After the content on purpose, as the dialog's: the focus goes to the first control, and
		     a key pressed out of habit does not close the panel that just opened. -->
		{#if showCloseButton}
			<DrawerPrimitive.Close
				class={buttonVariants({
					variant: 'ghost',
					size: 'icon-sm',
					class: cn('absolute right-1.5 z-10', side === 'bottom' ? 'top-4.5' : 'top-1.5')
				})}
			>
				<XIcon aria-hidden="true" />
				<span class="sr-only">{closeLabel}</span>
			</DrawerPrimitive.Close>
		{/if}
	</DrawerPrimitive.Content>
</DrawerPrimitive.Portal>
