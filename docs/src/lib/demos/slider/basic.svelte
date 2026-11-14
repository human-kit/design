<script lang="ts">
	import { Slider } from '@registry/ui/slider';

	let weight = $state(72);
</script>

<Slider
	class="w-72"
	label="Weight"
	bind:value={weight}
	min={30}
	max={150}
	formatOptions={{ style: 'unit', unit: 'kilogram' }}
/>
