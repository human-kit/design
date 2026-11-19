<script lang="ts">
	import { Dropzone } from '@registry/ui/dropzone';
</script>

<div class="grid w-full max-w-xl gap-3 sm:grid-cols-2">
	<Dropzone aria-label="Lab results" variant="ghost" hint="PDF or images, up to 10 MB" />
	<div class="flex flex-col justify-end">
		<Dropzone aria-label="More files" variant="inline" hint="PDF or images, up to 10 MB" />
	</div>
</div>
