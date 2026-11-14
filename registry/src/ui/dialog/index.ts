import { Dialog as DialogPrimitive } from '@human-kit/ui/dialog';
import Content from './dialog-content.svelte';
import Description from './dialog-description.svelte';
import Footer from './dialog-footer.svelte';
import Header from './dialog-header.svelte';
import Title from './dialog-title.svelte';

// The root, the trigger and the close button have no look of their own. Give the trigger and
// the close button the classes of a button: `class={buttonVariants({ variant: 'outline' })}`.
const Root = DialogPrimitive.Root;
const Trigger = DialogPrimitive.Trigger;
const Close = DialogPrimitive.Close;

export {
	Root,
	Trigger,
	Close,
	Content,
	Header,
	Footer,
	Title,
	Description,
	Root as Dialog,
	Trigger as DialogTrigger,
	Close as DialogClose,
	Content as DialogContent,
	Header as DialogHeader,
	Footer as DialogFooter,
	Title as DialogTitle,
	Description as DialogDescription
};
