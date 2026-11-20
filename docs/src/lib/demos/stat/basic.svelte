<script lang="ts">
	import { Stat } from '@registry/ui/stat';
</script>

<div class="grid max-w-2xl grid-cols-3 gap-3">
	<Stat label="Transfers this month" value="48" delta="+12%" trend="up" description="vs October" />
	<Stat label="Pregnancy rate" value="62%" delta="+3 pts" trend="up" description="vs October" />
	<Stat
		label="Average wait"
		value="18 days"
		delta="+4 days"
		trend="up"
		inverted
		description="vs October"
	/>
</div>
