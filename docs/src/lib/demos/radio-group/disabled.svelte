<script lang="ts">
	import { RadioGroup, RadioGroupItem } from '@registry/ui/radio-group';
</script>

<RadioGroup label="Plan" value="basic" description="The plan is changed by the company.">
	<RadioGroupItem value="basic" label="Basic" />
	<RadioGroupItem value="pro" label="Pro" disabled />
	<RadioGroupItem value="enterprise" label="Enterprise" disabled />
</RadioGroup>
