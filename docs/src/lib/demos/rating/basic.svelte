<script lang="ts">
	import { Rating } from '@registry/ui/rating';

	let score = $state(4);
</script>

<Rating label="How was the visit?" name="visit" bind:value={score} showValue />
