<script lang="ts">
	import type { Component } from 'svelte';
	import CodeBlock from './code-block.svelte';

	let { component: DemoComponent, source }: { component: Component; source: string } = $props();
</script>

<div class="flex flex-col gap-3">
	<div class="flex min-h-40 items-center justify-center rounded-lg border p-8">
		<DemoComponent />
	</div>
	<details class="group">
		<summary
			class="text-ink-muted outline-ring cursor-pointer rounded-sm text-sm select-none focus-visible:outline-2 focus-visible:outline-offset-2"
		>
			Show the code
		</summary>
		<div class="mt-3">
			<CodeBlock code={source} />
		</div>
	</details>
</div>
