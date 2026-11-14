import { Breadcrumbs as BreadcrumbsPrimitive } from '@human-kit/ui/breadcrumbs';
import Ellipsis from './breadcrumbs-ellipsis.svelte';
import Item from './breadcrumbs-item.svelte';
import Link from './breadcrumbs-link.svelte';
import List from './breadcrumbs-list.svelte';
import Separator from './breadcrumbs-separator.svelte';
import { breadcrumbsVariants } from './breadcrumbs-variants';

// The root is the landmark alone, with nothing to draw: it comes straight from the primitive.
const Root = BreadcrumbsPrimitive.Root;

export {
	Root,
	List,
	Item,
	Link,
	Separator,
	Ellipsis,
	Root as Breadcrumbs,
	List as BreadcrumbsList,
	Item as BreadcrumbsItem,
	Link as BreadcrumbsLink,
	Separator as BreadcrumbsSeparator,
	Ellipsis as BreadcrumbsEllipsis,
	breadcrumbsVariants
};
