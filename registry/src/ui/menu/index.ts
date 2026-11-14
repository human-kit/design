import { Menu as MenuPrimitive } from '@human-kit/ui/menu';
import Content from './menu-content.svelte';
import GroupLabel from './menu-group-label.svelte';
import Group from './menu-group.svelte';
import Item, { menuItemVariants } from './menu-item.svelte';
import Separator from './menu-separator.svelte';
import SubmenuTrigger from './menu-submenu-trigger.svelte';
import Trigger from './menu-trigger.svelte';

const Root = MenuPrimitive.Root;
const SubmenuRoot = MenuPrimitive.SubmenuRoot;
const ContextTrigger = MenuPrimitive.ContextTrigger;

export {
	Root,
	Trigger,
	ContextTrigger,
	Content,
	Item,
	Separator,
	Group,
	GroupLabel,
	SubmenuRoot,
	SubmenuTrigger,
	Root as Menu,
	Trigger as MenuTrigger,
	ContextTrigger as MenuContextTrigger,
	Content as MenuContent,
	Item as MenuItem,
	Separator as MenuSeparator,
	Group as MenuGroup,
	GroupLabel as MenuGroupLabel,
	SubmenuRoot as MenuSubmenu,
	SubmenuTrigger as MenuSubmenuTrigger,
	menuItemVariants
};
