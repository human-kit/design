<script lang="ts" module>
	import { tv } from '@registry/lib/utils';

	/**
	 * The app's column of navigation, at the left of every screen: a head with the product or
	 * the clinic, the links (a Nav List), and a foot for the account. It folds to a rail of
	 * icons; the parts inside read that through the `sidebar` group, and a Nav List's names
	 * stay there for a screen reader.
	 */
	export const sidebarVariants = tv({
		slots: {
			root: [
				'group/sidebar flex h-full shrink-0 flex-col gap-2 overflow-hidden border-e border-line bg-surface p-2',
				'w-60 transition-[width] duration-200 ease-out motion-reduce:transition-none',
				'data-[collapsed=true]:w-12'
			],
			header:
				'flex h-8 shrink-0 items-center gap-2 ps-1.5 group-data-[collapsed=true]/sidebar:ps-0',
			brand:
				'flex min-w-0 flex-1 items-center gap-2 truncate font-medium text-ink group-data-[collapsed=true]/sidebar:hidden',
			// 4px of room round the links, so a focus ring is not cut by the scrolling edge.
			content: '-mx-1 flex min-h-0 flex-1 flex-col px-1 py-0.5',
			footer: 'flex shrink-0 flex-col gap-1 border-t border-line pt-2'
		}
	});
</script>

<script lang="ts">
	import PanelLeft from '@lucide/svelte/icons/panel-left';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { Button } from '@registry/ui/button';
	import { ScrollArea } from '@registry/ui/scroll-area';
	import { setSidebarContext } from './context';

	type Props = Omit<HTMLAttributes<HTMLElement>, 'class'> & {
		class?: string;
		/** Folded to a rail of icons. */
		collapsed?: boolean;
		/** The product or the clinic, at the head. Hidden while folded. */
		brand?: Snippet;
		/** The account, at the foot. */
		footer?: Snippet;
		/** The fold button's names, read aloud. */
		collapseLabel?: string;
		expandLabel?: string;
		onCollapsedChange?: (collapsed: boolean) => void;
	};

	let {
		collapsed = $bindable(false),
		brand,
		footer,
		collapseLabel = 'Collapse the sidebar',
		expandLabel = 'Expand the sidebar',
		onCollapsedChange,
		class: className,
		children,
		...restProps
	}: Props = $props();

	const styles = sidebarVariants();
	setSidebarContext({
		get collapsed() {
			return collapsed;
		}
	});
	const contentId = $props.id();

	function toggle() {
		collapsed = !collapsed;
		onCollapsedChange?.(collapsed);
	}
</script>

<aside data-collapsed={collapsed} class={styles.root({ class: className })} {...restProps}>
	<div class={styles.header()}>
		{#if brand}<div class={styles.brand()}>{@render brand()}</div>{/if}
		<Button
			variant="ghost"
			size="icon-sm"
			class="ms-auto shrink-0 group-data-[collapsed=true]/sidebar:mx-auto"
			aria-label={collapsed ? expandLabel : collapseLabel}
			aria-expanded={!collapsed}
			aria-controls={contentId}
			onclick={toggle}
		>
			<PanelLeft aria-hidden="true" class="rtl:-scale-x-100" />
		</Button>
	</div>
	<ScrollArea id={contentId} class={styles.content()} fade>
		{@render children?.()}
	</ScrollArea>
	{#if footer}<div class={styles.footer()}>{@render footer()}</div>{/if}
</aside>
