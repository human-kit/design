<script lang="ts">
	import { getHeadings } from './headings.svelte';

	/** A section heading of a docs page, listed in the outline under its text. */
	let { id, text, level = 2 }: { id: string; text: string; level?: 2 | 3 } = $props();

	// Listed while it is created, on the server too, and taken off when the page goes. Its id and
	// text are fixed for its life: a page that changes them makes a new heading.
	// svelte-ignore state_referenced_locally
	const remove = getHeadings()?.add({ id, text, depth: level });
	$effect(() => remove);
</script>

<svelte:element this={`h${level}`} {id}>{text}</svelte:element>
