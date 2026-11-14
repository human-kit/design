<script lang="ts">
	import { Progress } from '@registry/ui/progress';
</script>

<div class="flex w-72 flex-col gap-4">
	<Progress label="Exporting records" value={62} />
	<Progress label="Uploading results" value={null} />
	<Progress aria-label="Storage used" value={30} size="sm" showValue={false} />
</div>
