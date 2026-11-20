<script lang="ts">
	import { Stepper } from '@registry/ui/stepper';

	const steps = [
		{ label: 'Stimulation' },
		{ label: 'Retrieval' },
		{ label: 'Fertilisation' },
		{ label: 'Transfer' }
	];
</script>

<Stepper {steps} current={2} class="max-w-xl" />
