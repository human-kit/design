<script lang="ts">
	import { Separator } from '@registry/ui/separator';
</script>

<div class="text-body flex w-64 flex-col gap-3">
	<p>Patient record</p>
	<Separator />
	<div class="text-ink-muted flex h-5 items-center gap-3">
		<span>Notes</span>
		<Separator orientation="vertical" />
		<span>Results</span>
		<Separator orientation="vertical" />
		<span>Billing</span>
	</div>
</div>
