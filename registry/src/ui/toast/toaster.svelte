<script lang="ts" module>
	import { tv } from '@registry/lib/utils';

	/** What a toast may carry besides its words: one button that acts on the message. */
	export type ToastData = { action?: { label: string; onClick: () => void } };

	/**
	 * Toasts stack in the bottom end corner as cards. At rest only the newest shows whole, the
	 * ones behind it peek out above it, a step smaller each; under the pointer or the focus the
	 * stack spreads into a column. A toast comes up from below and leaves the way it is swiped.
	 */
	export const toastVariants = tv({
		slots: {
			viewport: 'fixed end-4 bottom-4 z-50 w-90 max-w-[calc(100vw-2rem)] outline-hidden',
			root: [
				'absolute inset-x-0 bottom-0 flex items-start gap-2.5 rounded-card bg-surface p-3 shadow-popover outline-hidden select-none',
				'focus-visible:shadow-[var(--shadow-popover),var(--shadow-focus)]',
				// The place in the stack: behind, 10px up and 5% smaller a step, cut to the front one's
				// height, its words hidden; spread, the heights in front of it and a gap of 8px each.
				// The newest comes first in the list, so the order of painting is turned around by hand.
				'origin-bottom [--gap:8px] [--peek:10px] [z-index:calc(100-var(--toast-index))]',
				'[transform:translateY(calc(var(--toast-index)*var(--peek)*-1))_scale(calc(1-var(--toast-index)*0.05))]',
				'data-expanded:[transform:translateY(calc((var(--toast-offset-y)+var(--toast-index)*var(--gap))*-1))]',
				'not-data-front:not-data-expanded:h-(--toast-frontmost-height) not-data-front:not-data-expanded:overflow-hidden',
				// The words of a toast behind go at once and come back once the stack has spread.
				'*:transition-opacity *:duration-[360ms] *:delay-[180ms]',
				'not-data-front:not-data-expanded:*:opacity-0 not-data-front:not-data-expanded:*:duration-50 not-data-front:not-data-expanded:*:delay-0',
				// Everything moves on the spring: the toast rises 6px from 95% as it fades in and
				// leaves the same way, the stack's steps in 400ms and a height in its full 600ms. The
				// swipe moves it with the finger, and it leaves to the side it was swiped to.
				'[translate:var(--toast-swipe-movement-x)_var(--toast-swipe-movement-y)]',
				'transition-[transform,translate,scale,opacity,height] ease-(--ease-spring) data-swiping:transition-none',
				'[transition-duration:400ms,400ms,400ms,400ms,600ms]',
				'data-entering:[translate:0_6px] data-entering:scale-95 data-entering:opacity-0',
				'data-ending:opacity-0 data-ending:not-data-swipe-dismissed:[translate:0_6px] data-ending:not-data-swipe-dismissed:scale-95',
				'data-[swipe-direction=right]:data-ending:[translate:calc(100%+2rem)_var(--toast-swipe-movement-y)]',
				'motion-reduce:transition-opacity',
				// The pointer crosses the gap between two spread toasts without leaving the stack.
				"after:absolute after:inset-x-0 after:top-full after:h-(--gap) after:content-['']"
			],
			icon: 'mt-0.5 size-4 shrink-0 [&_svg]:size-4',
			content: 'flex min-w-0 flex-1 flex-col gap-0.5',
			title: 'text-body font-medium text-ink',
			description: 'text-body text-ink-muted',
			// The primitive's action is a plain button, without the state marks the button's styles
			// follow, so its hover, press and ring are written on the pseudo-classes.
			action: [
				'mt-1.5 self-start',
				'hover:not-active:bg-surface-hover hover:not-active:text-ink hover:not-active:shadow-control-hover',
				'active:bg-surface-pressed active:shadow-control-pressed',
				'focus-visible:shadow-focus'
			],
			close: [
				'-my-0.5 -me-1.25 grid size-6 shrink-0 cursor-pointer place-items-center rounded-control text-ink-subtle outline-hidden',
				'transition-colors duration-150 hover:bg-hover hover:text-ink focus-visible:shadow-focus [&_svg]:size-3.5'
			]
		}
	});
</script>

<script lang="ts">
	import { Toast as ToastPrimitive, type ToastItem } from '@human-kit/ui/toast';
	import CircleCheck from '@lucide/svelte/icons/circle-check';
	import CircleAlert from '@lucide/svelte/icons/circle-alert';
	import TriangleAlert from '@lucide/svelte/icons/triangle-alert';
	import Info from '@lucide/svelte/icons/info';
	import LoaderCircle from '@lucide/svelte/icons/loader-circle';
	import X from '@lucide/svelte/icons/x';
	import type { ComponentProps, Snippet } from 'svelte';
	import { buttonVariants } from '@registry/ui/button';

	type Props = Omit<ComponentProps<typeof ToastPrimitive.Provider>, 'children'> & {
		/** The app. Anything under it reaches the manager with `useToastManager()`. */
		children?: Snippet;
		/** The name of the close button, read aloud. */
		closeLabel?: string;
	};

	let { manager = $bindable(), closeLabel = 'Close', children, ...restProps }: Props = $props();

	const styles = toastVariants();

	// The kind sets the mark beside the words; the colour is the mark's alone.
	const marks: Record<string, { icon: typeof Info; class: string }> = {
		success: { icon: CircleCheck, class: 'text-success-ink' },
		error: { icon: CircleAlert, class: 'text-danger-ink' },
		warning: { icon: TriangleAlert, class: 'text-warning-ink' },
		info: { icon: Info, class: 'text-ink-subtle' },
		loading: {
			icon: LoaderCircle,
			class: 'text-ink-subtle animate-spin motion-reduce:animate-none'
		}
	};
</script>

<ToastPrimitive.Provider bind:manager {...restProps}>
	{@render children?.()}
	<ToastPrimitive.Viewport class={styles.viewport()}>
		{#snippet children(toast: ToastItem)}
			{@const mark = toast.type ? marks[toast.type] : undefined}
			{@const action = (toast.data as ToastData | undefined)?.action}
			<ToastPrimitive.Root {toast} class={styles.root()}>
				{#if mark}
					<span class={styles.icon({ class: mark.class })} aria-hidden="true"><mark.icon /></span>
				{/if}
				<div class="flex min-w-0 flex-1 flex-col">
					<ToastPrimitive.Content class={styles.content()}>
						{#if toast.title}<ToastPrimitive.Title class={styles.title()} />{/if}
						{#if toast.description}<ToastPrimitive.Description class={styles.description()} />{/if}
					</ToastPrimitive.Content>
					{#if action}
						<ToastPrimitive.Action
							class={buttonVariants({ variant: 'outline', size: 'sm', class: styles.action() })}
							onclick={action.onClick}>{action.label}</ToastPrimitive.Action
						>
					{/if}
				</div>
				<ToastPrimitive.Close aria-label={closeLabel} class={styles.close()}
					><X /></ToastPrimitive.Close
				>
			</ToastPrimitive.Root>
		{/snippet}
	</ToastPrimitive.Viewport>
</ToastPrimitive.Provider>
