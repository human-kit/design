<script lang="ts" module>
	import { tv, type VariantProps } from '@registry/lib/utils';

	/**
	 * A message that stays in the page: a title, words under it, a mark that says its kind, and
	 * maybe an action and a close. The toast's card at rest, for what the page says about itself
	 * rather than about something that just happened.
	 */
	export const alertVariants = tv({
		slots: {
			root: 'flex w-full items-start gap-2.5 rounded-card p-3 text-body text-ink',
			icon: 'mt-0.5 size-4 shrink-0 [&_svg]:size-4',
			content: 'flex min-w-0 flex-1 flex-col gap-0.5',
			title: 'font-medium text-ink',
			description: 'text-ink-muted',
			actions: 'mt-1.5 flex flex-wrap gap-1.5',
			close: [
				'-my-0.5 -me-1.25 grid size-6 shrink-0 cursor-pointer place-items-center rounded-control text-ink-subtle outline-hidden',
				'transition-colors duration-150 hover:bg-hover hover:text-ink focus-visible:shadow-focus [&_svg]:size-3.5'
			]
		},
		variants: {
			variant: {
				// A white card: the colour is the mark's alone, as on a toast.
				outline: { root: 'bg-surface shadow-card' },
				// The kind's soft fill and its line, for a message that must be seen before the rest. The
				// line is drawn inside, so the alert stands as tall as the card.
				soft: { root: 'inset-ring' }
			},
			tone: {
				neutral: { icon: 'text-ink-subtle' },
				info: { icon: 'text-info-ink' },
				success: { icon: 'text-success-ink' },
				warning: { icon: 'text-warning-ink' },
				danger: { icon: 'text-danger-ink' }
			}
		},
		compoundVariants: [
			{ variant: 'soft', tone: 'neutral', class: { root: 'inset-ring-line bg-surface-muted' } },
			{ variant: 'soft', tone: 'info', class: { root: 'inset-ring-info-line bg-info-soft' } },
			{
				variant: 'soft',
				tone: 'success',
				class: { root: 'inset-ring-success-line bg-success-soft' }
			},
			{
				variant: 'soft',
				tone: 'warning',
				class: { root: 'inset-ring-warning-line bg-warning-soft' }
			},
			{ variant: 'soft', tone: 'danger', class: { root: 'inset-ring-danger-line bg-danger-soft' } }
		],
		defaultVariants: { variant: 'outline', tone: 'neutral' }
	});

	export type AlertVariant = NonNullable<VariantProps<typeof alertVariants>['variant']>;
	export type AlertTone = NonNullable<VariantProps<typeof alertVariants>['tone']>;
</script>

<script lang="ts">
	import CircleAlert from '@lucide/svelte/icons/circle-alert';
	import CircleCheck from '@lucide/svelte/icons/circle-check';
	import Info from '@lucide/svelte/icons/info';
	import TriangleAlert from '@lucide/svelte/icons/triangle-alert';
	import X from '@lucide/svelte/icons/x';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'class'> & {
		class?: string;
		variant?: AlertVariant;
		tone?: AlertTone;
		title?: string;
		/** The words under the title. */
		children?: Snippet;
		/** Buttons under the words, small ones: `<Button size="sm">`. */
		actions?: Snippet;
		/** Your own mark in place of the kind's. */
		icon?: Snippet;
		/** Called by the close button; without it, there is none. */
		onDismiss?: () => void;
		/** The name of the close button, read aloud. */
		dismissLabel?: string;
	};

	let {
		variant = 'outline',
		tone = 'neutral',
		title,
		children,
		actions,
		icon,
		onDismiss,
		dismissLabel = 'Dismiss',
		class: className,
		...restProps
	}: Props = $props();

	const styles = $derived(alertVariants({ variant, tone }));
	const marks = {
		neutral: Info,
		info: Info,
		success: CircleCheck,
		warning: TriangleAlert,
		danger: CircleAlert
	};
	const Mark = $derived(marks[tone]);
</script>

<!--
	No live role of its own: one on a message that is in the page from the start is read with the
	page, and once more on every change. For one shown in answer to the user, pass
	`role="alert"` (urgent) or `role="status"`.
-->
<div class={styles.root({ class: className })} {...restProps}>
	<span class={styles.icon()} aria-hidden="true">
		{#if icon}{@render icon()}{:else}<Mark />{/if}
	</span>
	<div class={styles.content()}>
		{#if title}<p class={styles.title()}>{title}</p>{/if}
		{#if children}<div class={styles.description()}>{@render children()}</div>{/if}
		{#if actions}<div class={styles.actions()}>{@render actions()}</div>{/if}
	</div>
	{#if onDismiss}
		<button type="button" class={styles.close()} aria-label={dismissLabel} onclick={onDismiss}>
			<X aria-hidden="true" />
		</button>
	{/if}
</div>
