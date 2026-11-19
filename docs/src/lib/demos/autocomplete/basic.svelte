<script lang="ts">
	import {
		Autocomplete,
		AutocompleteEmpty,
		AutocompleteInput,
		AutocompleteItem,
		AutocompleteList
	} from '@registry/ui/autocomplete';

	const tests = [
		'Blood count',
		'Blood glucose',
		'Cholesterol',
		'Ferritin',
		'Hemoglobin A1c',
		'Liver panel',
		'Thyroid panel',
		'Vitamin D'
	];
</script>

<!-- It has no card of its own: here a card holds it, as a panel or a popover would. -->
<div class="rounded-card bg-surface shadow-card w-60">
	<Autocomplete>
		<AutocompleteInput aria-label="Search tests" placeholder="Search tests…" />
		<AutocompleteList aria-label="Tests">
			{#each tests as test (test)}
				<AutocompleteItem id={test}>{test}</AutocompleteItem>
			{/each}
			<AutocompleteEmpty>No tests match</AutocompleteEmpty>
		</AutocompleteList>
	</Autocomplete>
</div>
