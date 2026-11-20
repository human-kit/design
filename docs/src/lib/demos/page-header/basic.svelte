<script lang="ts">
	import { Badge } from '@registry/ui/badge';
	import * as Breadcrumbs from '@registry/ui/breadcrumbs';
	import { Button } from '@registry/ui/button';
	import { PageHeader } from '@registry/ui/page-header';
	import Plus from '@lucide/svelte/icons/plus';
</script>

<PageHeader
	title="Treatment cycle 2"
	description="Frozen embryo transfer, started 3 November."
	level={2}
	divided
>
	{#snippet breadcrumbs()}
		<Breadcrumbs.Root>
			<Breadcrumbs.List>
				<Breadcrumbs.Item>
					<Breadcrumbs.Link href="#patients">Patients</Breadcrumbs.Link>
					<Breadcrumbs.Separator />
				</Breadcrumbs.Item>
				<Breadcrumbs.Item>
					<Breadcrumbs.Link current>Ana María Ruiz</Breadcrumbs.Link>
				</Breadcrumbs.Item>
			</Breadcrumbs.List>
		</Breadcrumbs.Root>
	{/snippet}
	{#snippet meta()}<Badge variant="outline">In cycle</Badge>{/snippet}
	{#snippet actions()}
		<Button variant="outline">Export</Button>
		<Button icon={Plus}>New appointment</Button>
	{/snippet}
</PageHeader>
