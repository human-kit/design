<script lang="ts">
	import Code from '$lib/components/code.svelte';
	import CopyButton from '$lib/components/copy-button.svelte';

	let { id, code, hidden = false }: { id: string; code: string; hidden?: boolean } = $props();
</script>

<!-- It opens on its own height: the grid row goes from 0fr to 1fr, so no height is measured or
     guessed. Closed, it is inert, thus out of the tab order and of the accessibility tree. -->
<div
	class="grid transition-[grid-template-rows,opacity] duration-260 ease-(--ease-out-quint) motion-reduce:transition-none {hidden
		? 'grid-rows-[0fr] opacity-0'
		: 'grid-rows-[1fr] opacity-100'}"
	inert={hidden}
>
	<div class="relative min-h-0 overflow-hidden">
		<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
		<pre
			{id}
			class="bg-surface-muted text-ink border-frame focus-visible:shadow-focus-inset max-h-96 overflow-auto border-t p-3 pe-11 font-mono text-[0.8125rem] leading-5 outline-hidden"
			role="region"
			aria-label="Code"
			tabindex="0"><Code {code} /></pre>
		<CopyButton text={code} class="absolute top-[11px] right-[11px]" />
	</div>
</div>
