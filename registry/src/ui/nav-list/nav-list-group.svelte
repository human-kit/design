<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { navListVariants } from './nav-list-variants';

	type Props = Omit<HTMLAttributes<HTMLDivElement>, 'class'> & {
		class?: string;
		/** The group's heading; its links are read as a list named by it. */
		heading?: string;
	};

	let { heading, class: className, children, ...restProps }: Props = $props();

	const id = $props.id();
	const styles = navListVariants();
</script>

<div class={className} {...restProps}>
	{#if heading}<span {id} class={styles.heading()}>{heading}</span>{/if}
	<!-- A real list, not `display: contents`: that drops the list from the tree in some browsers. -->
	<ul class={styles.group()} aria-labelledby={heading ? id : undefined}>
		{@render children?.()}
	</ul>
</div>
