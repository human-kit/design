<script lang="ts">
	import {
		Accordion,
		AccordionItem,
		AccordionPanel,
		AccordionTrigger
	} from '@registry/ui/accordion';
</script>

<Accordion value={['stimulation']} class="w-full max-w-md">
	<AccordionItem value="stimulation">
		<AccordionTrigger>Stimulation</AccordionTrigger>
		<AccordionPanel>Ten days of daily injections, with a scan every other day.</AccordionPanel>
	</AccordionItem>
	<AccordionItem value="retrieval">
		<AccordionTrigger>Retrieval</AccordionTrigger>
		<AccordionPanel>A short procedure under sedation, about twenty minutes.</AccordionPanel>
	</AccordionItem>
	<AccordionItem value="transfer" disabled>
		<AccordionTrigger>Transfer</AccordionTrigger>
		<AccordionPanel>Scheduled once the embryos are ready.</AccordionPanel>
	</AccordionItem>
</Accordion>
