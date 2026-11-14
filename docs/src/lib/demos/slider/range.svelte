<script lang="ts">
	import { Slider } from '@registry/ui/slider';

	let age = $state([25, 40]);
</script>

<Slider
	class="w-72"
	label="Age"
	bind:value={age}
	min={18}
	max={65}
	minStepsBetweenThumbs={1}
	thumbLabels={['Youngest', 'Oldest']}
/>
