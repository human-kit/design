<script lang="ts">
	import { Tree, TreeItem } from '@registry/ui/tree';
	import Folder from '@lucide/svelte/icons/folder';
	import FileText from '@lucide/svelte/icons/file-text';
</script>

{#snippet folder()}<Folder />{/snippet}
{#snippet file()}<FileText />{/snippet}

<Tree aria-label="Patient files" class="w-64" defaultExpandedKeys={['labs']}>
	<TreeItem id="labs" title="Lab results" icon={folder}>
		<TreeItem id="blood" title="Blood panel, March" icon={file} />
		<TreeItem id="hormones" title="Hormone levels" icon={file} />
	</TreeItem>
	<TreeItem id="scans" title="Scans" icon={folder}>
		<TreeItem id="ultrasound" title="Ultrasound, week 8" icon={file} />
	</TreeItem>
	<TreeItem id="consent" title="Consent form" icon={file} />
</Tree>
