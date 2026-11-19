<script lang="ts">
	import { Pagination } from '@registry/ui/pagination';

	let page = $state(4);
</script>

<Pagination bind:page count={24} />
