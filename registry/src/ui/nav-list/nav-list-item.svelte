<script lang="ts">
	import type { Component, Snippet } from 'svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import { getSidebarContext } from '@registry/ui/sidebar/context';
	import { Tooltip } from '@registry/ui/tooltip';
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
	const sidebar = getSidebarContext();
	let link = $state<HTMLAnchorElement | null>(null);
	let label = $state<HTMLSpanElement | null>(null);
	// In a folded sidebar only the icon shows: the tooltip gives the name to the eye. A screen
	// reader already has it from the link.
	const folded = $derived(sidebar?.collapsed ?? false);
</script>

<li class="flex">
	<a
		bind:this={link}
		{href}
		aria-current={current ? 'page' : undefined}
		class={styles.item({ class: className })}
		{...restProps}
	>
		{#if Icon}<Icon aria-hidden="true" />{/if}
		<span bind:this={label} class={styles.label()}>{@render children?.()}</span>
		{#if count !== undefined}<span class={styles.count()}>{count}</span>{/if}
	</a>
	{#if folded}
		<Tooltip anchor={link} text={label?.textContent ?? ''} placement="right" />
	{/if}
</li>
