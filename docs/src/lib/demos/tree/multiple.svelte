<script lang="ts">
	import { Tree, TreeItem } from '@registry/ui/tree';
</script>

<Tree
	aria-label="Permissions"
	class="w-64"
	selectionMode="multiple"
	selectionPropagation="descendants"
	defaultExpandedKeys={['records']}
	defaultSelectedKeys={['read']}
>
	<TreeItem id="records" title="Medical records">
		<TreeItem id="read" title="Read" />
		<TreeItem id="edit" title="Edit" />
		<TreeItem id="export" title="Export" />
	</TreeItem>
	<TreeItem id="billing" title="Billing">
		<TreeItem id="invoices" title="Invoices" />
	</TreeItem>
</Tree>
