import { getContext, setContext } from 'svelte';

const KEY = Symbol('sidebar');

/** What a folded sidebar tells the parts inside it, so a link can name itself in a tooltip. */
export type SidebarContext = { readonly collapsed: boolean };

export function setSidebarContext(context: SidebarContext) {
	setContext(KEY, context);
}

/** The sidebar round the caller, or nothing outside one. */
export function getSidebarContext(): SidebarContext | undefined {
	return getContext<SidebarContext | undefined>(KEY);
}
