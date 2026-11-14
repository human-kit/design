<script lang="ts" module>
	import { tv, type VariantProps } from '@registry/lib/utils';

	export const dialogContentVariants = tv({
		base: [
			// A column that never grows past the viewport: a long body scrolls inside the panel,
			// and the footer, with the button that saves, stays on screen.
			'relative flex max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] flex-col overflow-hidden',
			'rounded-dialog bg-overlay text-ink shadow-dialog outline-hidden',
			// `animation-duration`, never `duration-*`: that utility also sets the transition's,
			// and a layout change while the panel enters would animate.
			'data-entering:animate-in data-entering:fade-in-0 data-entering:zoom-in-95 data-entering:animation-duration-[100ms]',
			'data-exiting:animate-out data-exiting:fade-out-0 data-exiting:zoom-out-95 data-exiting:animation-duration-[100ms]'
		],
		variants: {
			/** How wide the panel gets. Below each width, it fills the viewport less 1rem a side. */
			size: {
				sm: 'max-w-lg',
				md: 'max-w-xl',
				lg: 'max-w-2xl',
				xl: 'max-w-3xl'
			}
		},
		defaultVariants: { size: 'sm' }
	});

	export type DialogSize = NonNullable<VariantProps<typeof dialogContentVariants>['size']>;
</script>

<script lang="ts">
	import { Dialog as DialogPrimitive } from '@human-kit/ui/dialog';
	import XIcon from '@lucide/svelte/icons/x';
	import type { ComponentProps } from 'svelte';
	import { cn } from '@registry/lib/utils';
	import { buttonVariants } from '@registry/ui/button';

	type Props = ComponentProps<typeof DialogPrimitive.Content> & {
		size?: DialogSize;
		/** Shows a close button in the top corner. */
		showCloseButton?: boolean;
		/** The accessible name of the close button. */
		closeLabel?: string;
	};

	let {
		class: className,
		size = 'sm',
		children,
		showCloseButton = true,
		closeLabel = 'Close',
		...restProps
	}: Props = $props();
</script>

<DialogPrimitive.Portal>
	<DialogPrimitive.Overlay
		class={cn(
			'fixed inset-0 bg-black/20 backdrop-blur-sm',
			'data-entering:animate-in data-entering:fade-in-0 data-entering:animation-duration-[100ms]',
			'data-exiting:animate-out data-exiting:fade-out-0 data-exiting:animation-duration-[100ms]'
		)}
	/>
	<DialogPrimitive.Content
		class={dialogContentVariants({ size, class: cn(className) })}
		{...restProps}
	>
		{@render children?.()}
		<!-- After the content on purpose: the focus goes to the first control in the order of the
		     page, and a close button first would take it in every dialog. A key pressed out of
		     habit would then close the dialog that just opened. It is placed in the corner, thus
		     the order on screen does not change. -->
		{#if showCloseButton}
			<DialogPrimitive.Close
				class={buttonVariants({
					variant: 'ghost',
					size: 'icon-sm',
					class: 'absolute top-1.5 right-1.5 z-10'
				})}
			>
				<XIcon aria-hidden="true" />
				<span class="sr-only">{closeLabel}</span>
			</DialogPrimitive.Close>
		{/if}
	</DialogPrimitive.Content>
</DialogPrimitive.Portal>
