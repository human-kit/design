import { Drawer as DrawerPrimitive } from '@human-kit/ui/drawer';
import Body from './drawer-body.svelte';
import Content, {
	drawerContentVariants,
	type DrawerSide,
	type DrawerSize
} from './drawer-content.svelte';
import Description from './drawer-description.svelte';
import Footer from './drawer-footer.svelte';
import Header from './drawer-header.svelte';
import Title from './drawer-title.svelte';

// The root, the trigger and the close button have no look of their own. Give the trigger and
// the close button the classes of a button: `class={buttonVariants({ variant: 'outline' })}`.
const Root = DrawerPrimitive.Root;
const Trigger = DrawerPrimitive.Trigger;
const Close = DrawerPrimitive.Close;

export {
	Root,
	Trigger,
	Close,
	Content,
	Header,
	Body,
	Footer,
	Title,
	Description,
	Root as Drawer,
	Trigger as DrawerTrigger,
	Close as DrawerClose,
	Content as DrawerContent,
	Header as DrawerHeader,
	Body as DrawerBody,
	Footer as DrawerFooter,
	Title as DrawerTitle,
	Description as DrawerDescription,
	drawerContentVariants,
	type DrawerSide,
	type DrawerSize
};
