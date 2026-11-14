<script lang="ts">
	import {
		Accordion,
		AccordionItem,
		AccordionPanel,
		AccordionTrigger
	} from '@registry/ui/accordion';
</script>

<Accordion variant="flush" selectionMode="multiple" class="w-full max-w-md">
	<AccordionItem value="fees">
		<AccordionTrigger>What does the fee cover?</AccordionTrigger>
		<AccordionPanel
			>The visits, the scans and the procedure. Medication is billed apart.</AccordionPanel
		>
	</AccordionItem>
	<AccordionItem value="cancel">
		<AccordionTrigger>Can I cancel a cycle?</AccordionTrigger>
		<AccordionPanel>Up to the first injection, at no cost.</AccordionPanel>
	</AccordionItem>
</Accordion>
