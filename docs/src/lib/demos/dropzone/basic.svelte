<script lang="ts">
	import { Dropzone } from '@registry/ui/dropzone';

	let files = $state<File[]>([]);
	let announcement = $state('');

	function add(picked: File[]) {
		files = [...files, ...picked];
		announcement = `${picked.length} ${picked.length === 1 ? 'file' : 'files'} added`;
	}
</script>

<div class="flex w-80 flex-col gap-2">
	<Dropzone
		aria-label="Lab results"
		accept=".pdf,image/*"
		multiple
		hint="PDF or images, up to 10 MB"
		{announcement}
		onFilesPicked={add}
	/>
	{#if files.length > 0}
		<ul class="text-caption text-ink-muted flex flex-col gap-0.5">
			{#each files as file, index (index)}
				<li class="truncate">{file.name}</li>
			{/each}
		</ul>
	{/if}
</div>
