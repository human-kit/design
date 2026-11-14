<script lang="ts">
	import { RadioGroup, RadioGroupItem } from '@registry/ui/radio-group';
</script>

<RadioGroup label="Shift" orientation="horizontal" value="morning">
	<RadioGroupItem value="morning" label="Morning" />
	<RadioGroupItem value="afternoon" label="Afternoon" />
	<RadioGroupItem value="night" label="Night" />
</RadioGroup>
