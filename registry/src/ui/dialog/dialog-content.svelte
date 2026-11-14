<script lang="ts">
	import { Dialog as DialogPrimitive } from '@human-kit/ui/dialog';
	import XIcon from '@lucide/svelte/icons/x';
	import type { ComponentProps } from 'svelte';
	import { cn } from '@registry/lib/utils';

	type Props = ComponentProps<typeof DialogPrimitive.Content> & {
		/** Shows a close button in the top corner. */
		showCloseButton?: boolean;
		/** The accessible name of the close button. */
		closeLabel?: string;
	};

	let {
		class: className,
		children,
		showCloseButton = true,
		closeLabel = 'Close',
		...restProps
	}: Props = $props();
</script>

<DialogPrimitive.Portal>
	<DialogPrimitive.Overlay
		class="data-entering:animate-in data-entering:fade-in-0 data-exiting:animate-out data-exiting:fade-out-0 fixed inset-0 bg-black/50 duration-150"
	/>
	<DialogPrimitive.Content
		class={cn(
			'bg-overlay text-ink relative grid w-full max-w-[calc(100%-2rem)] gap-4 rounded-lg border p-6 shadow-lg outline-hidden duration-150 sm:max-w-lg',
			'data-entering:animate-in data-entering:fade-in-0 data-entering:zoom-in-95 data-exiting:animate-out data-exiting:fade-out-0 data-exiting:zoom-out-95',
			className
		)}
		{...restProps}
	>
		{@render children?.()}
		{#if showCloseButton}
			<DialogPrimitive.Close
				class="text-ink-muted data-focus-visible:outline-ring data-hovered:bg-hover data-hovered:text-ink absolute top-4 right-4 inline-flex size-6 items-center justify-center rounded-sm outline-hidden transition-colors data-focus-visible:outline-2 data-focus-visible:outline-offset-2 data-focus-visible:outline-solid [&_svg]:size-4"
			>
				<XIcon aria-hidden="true" />
				<span class="sr-only">{closeLabel}</span>
			</DialogPrimitive.Close>
		{/if}
	</DialogPrimitive.Content>
</DialogPrimitive.Portal>
