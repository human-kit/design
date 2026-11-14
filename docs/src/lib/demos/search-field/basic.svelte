<script lang="ts">
	import { SearchField } from '@registry/ui/search-field';

	let query = $state('');
</script>

<SearchField
	class="w-64"
	aria-label="Search patients"
	placeholder="Name or ID"
	bind:value={query}
/>
