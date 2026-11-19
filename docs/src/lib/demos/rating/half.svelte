<script lang="ts">
	import { Rating } from '@registry/ui/rating';

	let score = $state(3.5);
</script>

<Rating label="Clinic score" bind:value={score} precision={0.5} showValue />
