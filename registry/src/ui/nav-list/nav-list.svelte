<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { navListVariants } from './nav-list-variants';

	type Props = Omit<HTMLAttributes<HTMLElement>, 'class'> & {
		class?: string;
		/** The landmark's name: a page can have more than one navigation. */
		label?: string;
	};

	let { label = 'Main', class: className, children, ...restProps }: Props = $props();

	const styles = navListVariants();
</script>

<nav aria-label={label} class={styles.root({ class: className })} {...restProps}>
	{@render children?.()}
</nav>
