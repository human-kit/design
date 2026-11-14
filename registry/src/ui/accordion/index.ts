import { Accordion as AccordionPrimitive } from '@human-kit/ui/accordion';
import Panel from './accordion-panel.svelte';
import Trigger from './accordion-trigger.svelte';
import Root from './accordion.svelte';
import { accordionVariants, type AccordionVariant } from './accordion-variants';

// An item only groups its trigger and its panel: it has no look of its own.
const Item = AccordionPrimitive.Item;

export {
	Root,
	Item,
	Trigger,
	Panel,
	Root as Accordion,
	Item as AccordionItem,
	Trigger as AccordionTrigger,
	Panel as AccordionPanel,
	accordionVariants,
	type AccordionVariant
};
