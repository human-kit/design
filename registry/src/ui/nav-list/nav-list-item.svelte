<script lang="ts">
	import type { Component, Snippet } from 'svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import { navListVariants } from './nav-list-variants';

	type Props = Omit<HTMLAnchorAttributes, 'class'> & {
		class?: string;
		/** Where it goes. */
		href: string;
		/** The page this link leads to is the one shown. */
		current?: boolean;
		icon?: Component<Record<string, unknown>>;
		/** How many wait there: unread, pending. */
		count?: number;
		children?: Snippet;
	};

	let {
		href,
		current = false,
		icon: Icon,
		count,
		class: className,
		children,
		...restProps
	}: Props = $props();

	const styles = navListVariants();
</script>

<li class="flex">
	<a
		{href}
		aria-current={current ? 'page' : undefined}
		class={styles.item({ class: className })}
		{...restProps}
	>
		{#if Icon}<Icon aria-hidden="true" />{/if}
		<span class={styles.label()}>{@render children?.()}</span>
		{#if count !== undefined}<span class={styles.count()}>{count}</span>{/if}
	</a>
</li>
