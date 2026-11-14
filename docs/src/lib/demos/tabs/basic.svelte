<script lang="ts">
	import { Tabs, TabsList, TabsPanel, TabsTab } from '@registry/ui/tabs';
</script>

<Tabs value="summary" class="w-full max-w-md">
	<TabsList aria-label="Patient record">
		<TabsTab value="summary">Summary</TabsTab>
		<TabsTab value="treatments" count={3}>Treatments</TabsTab>
		<TabsTab value="documents" count={12}>Documents</TabsTab>
		<TabsTab value="billing" disabled>Billing</TabsTab>
	</TabsList>
	<TabsPanel value="summary">
		<p class="text-body text-ink-muted">Last visit on 12 March, next one in two weeks.</p>
	</TabsPanel>
	<TabsPanel value="treatments">
		<p class="text-body text-ink-muted">Three treatments, one of them in progress.</p>
	</TabsPanel>
	<TabsPanel value="documents">
		<p class="text-body text-ink-muted">Twelve documents, all of them signed.</p>
	</TabsPanel>
	<TabsPanel value="billing">
		<p class="text-body text-ink-muted">No invoices yet.</p>
	</TabsPanel>
</Tabs>
