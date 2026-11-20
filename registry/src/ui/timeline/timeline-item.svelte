<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLLiAttributes } from 'svelte/elements';
	import { badgeDotClass, type BadgeTone } from '@registry/ui/badge';
	import { timelineVariants } from './timeline-variants';

	type Props = Omit<HTMLLiAttributes, 'class' | 'title'> & {
		class?: string;
		title: string;
		/** When it happened, as shown: "12 Mar, 9:30". */
		time?: string;
		/** The same moment for machines, ISO: `2026-03-12T09:30`. */
		datetime?: string;
		/** The dot's colour, from the badge's tones: the app's meaning for the event. */
		tone?: BadgeTone;
		/** A mark of its own on a small tile, in place of the dot. */
		icon?: Snippet;
		/** What happened, under the title. */
		children?: Snippet;
	};

	let {
		title,
		time,
		datetime,
		tone = 'gray',
		icon,
		class: className,
		children,
		...restProps
	}: Props = $props();

	const styles = timelineVariants();
</script>

<li class={styles.item({ class: className })} {...restProps}>
	<div class={styles.rail()} aria-hidden="true">
		<span class={styles.markBox()}>
			{#if icon}
				<span class={styles.icon()}>{@render icon()}</span>
			{:else}
				<span class={styles.dot({ class: badgeDotClass(tone) })}></span>
			{/if}
		</span>
		<span class={styles.line()}></span>
	</div>
	<div class={styles.content()}>
		<div class={styles.header()}>
			<span class={styles.title()}>{title}</span>
			{#if time}<time class={styles.time()} {datetime}>{time}</time>{/if}
		</div>
		{#if children}<div class={styles.description()}>{@render children()}</div>{/if}
	</div>
</li>
