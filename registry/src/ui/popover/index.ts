import { Popover as PopoverPrimitive } from '@human-kit/ui/popover';
import Content from './popover-content.svelte';
import Description from './popover-description.svelte';
import Header from './popover-header.svelte';
import Title from './popover-title.svelte';
import Trigger from './popover-trigger.svelte';

const Root = PopoverPrimitive.Root;

export {
	Root,
	Trigger,
	Content,
	Header,
	Title,
	Description,
	Root as Popover,
	Trigger as PopoverTrigger,
	Content as PopoverContent,
	Header as PopoverHeader,
	Title as PopoverTitle,
	Description as PopoverDescription
};
