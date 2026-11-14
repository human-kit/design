import { Select as SelectPrimitive } from '@human-kit/ui/select';
import Content from './select-content.svelte';
import Item from './select-item.svelte';
import Label from './select-label.svelte';
import Trigger from './select-trigger.svelte';

// The root holds the state and has no look. `Value` takes its classes from the trigger.
const Root = SelectPrimitive.Root;
const Value = SelectPrimitive.Value;

export {
	Root,
	Label,
	Trigger,
	Value,
	Content,
	Item,
	Root as Select,
	Label as SelectLabel,
	Trigger as SelectTrigger,
	Value as SelectValue,
	Content as SelectContent,
	Item as SelectItem
};
