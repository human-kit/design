<script lang="ts" module>
	import { tv } from '@registry/lib/utils';

	/**
	 * Two cards of rows with the move buttons between them. Each card is a list of its own: one
	 * tab stop, the arrows inside, Shift for a range. A double click, or Ctrl or Cmd with Enter,
	 * sends a row across; the buttons send what is chosen, or everything.
	 */
	export const transferListVariants = tv({
		slots: {
			root: 'grid w-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-stretch gap-3 text-body text-ink',
			// The keyboard's ring goes round the whole card while its list or a row in it has the focus:
			// the list scrolls, so a ring on it or on a row would be cut.
			panel: [
				'flex min-w-0 flex-col rounded-card bg-surface shadow-card transition-shadow duration-150 ease-out',
				'has-[[role=listbox]:focus-visible]:shadow-[var(--shadow-card),var(--shadow-focus)]',
				'has-[[role=option][data-focus-visible]]:shadow-[var(--shadow-card),var(--shadow-focus)]'
			],
			header: 'flex h-8 shrink-0 items-center gap-2 border-b border-line ps-3 pe-1.5',
			title: 'min-w-0 flex-1 truncate font-medium',
			count: 'shrink-0 text-caption text-ink-subtle tabular-nums',
			// The autocomplete's search row: grey under the pointer, ringed on focus, 4px in so its halo
			// fits. Its magnifier and text stand over the rows' check and text.
			search: [
				'mx-1 mt-1 flex h-6.5 shrink-0 items-center gap-1.5 rounded-control ps-1 pe-1.5',
				'transition-[box-shadow,background-color] duration-150',
				'hover:not-focus-within:bg-hover focus-within:shadow-focus'
			],
			searchIcon: 'pointer-events-none size-3.5 shrink-0 text-ink-subtle',
			input:
				'h-full min-w-0 flex-1 truncate bg-transparent text-ink outline-hidden placeholder:text-ink-subtle',
			list: 'flex h-60 flex-col gap-0.5 overflow-y-auto rounded-b-card p-1 outline-hidden',
			// The listbox's row: the check in a column of its own, grey under the pointer and on the
			// focused row while the list holds the focus.
			item: [
				'group/item relative grid h-6 shrink-0 cursor-default grid-cols-[0.875rem_minmax(0,1fr)] items-center gap-1.5 rounded-control ps-1 pe-1.5',
				'text-ink-muted transition-ink outline-hidden select-none',
				'data-hovered:bg-hover data-hovered:text-ink in-focus-within:data-focused:bg-hover in-focus-within:data-focused:text-ink',
				'data-selected:text-ink',
				'data-disabled:pointer-events-none data-disabled:opacity-45',
				'[&_svg]:pointer-events-none [&_svg]:size-3.5 [&_svg]:shrink-0'
			],
			check: 'invisible text-ink-muted group-data-selected/item:visible',
			empty: 'grid flex-1 place-items-center px-3 text-center text-caption text-ink-subtle',
			moves: 'flex flex-col items-center justify-center gap-1.5',
			icon: 'rtl:-scale-x-100'
		}
	});
</script>

<script lang="ts" generics="T extends object">
	import { TransferList as TransferListPrimitive } from '@human-kit/ui/transfer-list';
	import type { TransferListKey } from '@human-kit/ui/transfer-list';
	import Check from '@lucide/svelte/icons/check';
	import ChevronLeft from '@lucide/svelte/icons/chevron-left';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
	import ChevronsLeft from '@lucide/svelte/icons/chevrons-left';
	import ChevronsRight from '@lucide/svelte/icons/chevrons-right';
	import ArrowUp from '@lucide/svelte/icons/arrow-up';
	import ArrowDown from '@lucide/svelte/icons/arrow-down';
	import Search from '@lucide/svelte/icons/search';
	import type { ComponentProps, Snippet } from 'svelte';
	import { buttonVariants } from '@registry/ui/button';

	type RootProps = ComponentProps<typeof TransferListPrimitive.Root<T>>;

	type Props = Omit<RootProps, 'children' | 'items'> & {
		items: T[];
		/** The text of a row. The default reads `label`, then `name`. */
		getLabel?: (item: T) => string;
		/** Draw a row yourself; the default is its text. */
		row?: Snippet<[T]>;
		/** The name over the left list. */
		sourceLabel?: string;
		/** The name over the right list. */
		targetLabel?: string;
		/** What an empty list says. */
		emptyText?: string;
		/** Buttons to put the right list in order, for when the order is part of the answer. */
		reorder?: boolean;
		/** A search field at the head of each list. With a search on, "move all" moves the rows found. */
		searchable?: boolean;
		/** What a search that finds nothing says. */
		noMatchText?: string;
	};

	let {
		items,
		value = $bindable(),
		getKey = (item: T) => (item as { id: TransferListKey }).id,
		getLabel = (item: T) => {
			const named = item as { label?: string; name?: string };
			return named.label ?? named.name ?? String(getKey(item));
		},
		row,
		sourceLabel = 'Available',
		targetLabel = 'Selected',
		emptyText = 'Nothing here',
		reorder = false,
		searchable = true,
		noMatchText = 'No matches',
		class: className,
		...restProps
	}: Props = $props();

	const styles = transferListVariants();
	const moveButton = buttonVariants({ variant: 'outline', size: 'icon' });
	const orderButton = buttonVariants({ variant: 'ghost', size: 'icon-xs' });

	// The primitive writes a move back into `value`; before the first one it may only have a default.
	let sourceQuery = $state('');
	let targetQuery = $state('');

	// Case and accents set aside, so "garcia" finds "García".
	const fold = (text: string) =>
		text
			.normalize('NFD')
			.replace(/\p{Diacritic}/gu, '')
			.toLowerCase();
	function filterBy(query: string) {
		const needle = fold(query.trim());
		return needle ? (item: T) => fold(getLabel(item)).includes(needle) : undefined;
	}

	const targetCount = $derived((value ?? restProps.defaultValue ?? []).length);
</script>

{#snippet rowContent(item: T)}
	<TransferListPrimitive.Item {item} class={styles.item()}>
		<span class="col-start-1 flex items-center" aria-hidden="true">
			<Check class={styles.check()} />
		</span>
		<span class="col-start-2 truncate">
			{#if row}{@render row(item)}{:else}{getLabel(item)}{/if}
		</span>
	</TransferListPrimitive.Item>
{/snippet}

{#snippet emptySource()}
	<span class={styles.empty()}>{sourceQuery.trim() ? noMatchText : emptyText}</span>
{/snippet}

{#snippet emptyTarget()}
	<span class={styles.empty()}>{targetQuery.trim() ? noMatchText : emptyText}</span>
{/snippet}

{#snippet search(label: string, query: { get: () => string; set: (next: string) => void })}
	<!-- A label, so a press anywhere on the row lands in the input. -->
	<label class={styles.search()}>
		<Search class={styles.searchIcon()} aria-hidden="true" />
		<input
			type="search"
			class={styles.input()}
			placeholder="Search"
			aria-label={`Search ${label}`}
			bind:value={query.get, query.set}
		/>
	</label>
{/snippet}

<TransferListPrimitive.Root
	{items}
	{getKey}
	bind:value
	class={styles.root({ class: className })}
	{...restProps}
>
	<div class={styles.panel()}>
		<div class={styles.header()}>
			<span class={styles.title()}>{sourceLabel}</span>
			<span class={styles.count()}>{items.length - targetCount}</span>
		</div>
		{#if searchable}
			{@render search(sourceLabel, { get: () => sourceQuery, set: (next) => (sourceQuery = next) })}
		{/if}
		<TransferListPrimitive.Source
			label={sourceLabel}
			class={styles.list()}
			filter={filterBy(sourceQuery)}
			emptyPlaceholder={emptySource}
		>
			{#snippet children(item: T)}{@render rowContent(item)}{/snippet}
		</TransferListPrimitive.Source>
	</div>

	<div class={styles.moves()}>
		<TransferListPrimitive.MoveSelected to="target" class={moveButton}>
			<ChevronRight class={styles.icon()} aria-hidden="true" />
		</TransferListPrimitive.MoveSelected>
		<TransferListPrimitive.MoveAll to="target" class={moveButton}>
			<ChevronsRight class={styles.icon()} aria-hidden="true" />
		</TransferListPrimitive.MoveAll>
		<TransferListPrimitive.MoveAll to="source" class={moveButton}>
			<ChevronsLeft class={styles.icon()} aria-hidden="true" />
		</TransferListPrimitive.MoveAll>
		<TransferListPrimitive.MoveSelected to="source" class={moveButton}>
			<ChevronLeft class={styles.icon()} aria-hidden="true" />
		</TransferListPrimitive.MoveSelected>
	</div>

	<div class={styles.panel()}>
		<div class={styles.header()}>
			<span class={styles.title()}>{targetLabel}</span>
			<span class={styles.count()}>{targetCount}</span>
			{#if reorder}
				<span class="flex shrink-0 items-center">
					<TransferListPrimitive.MoveUp class={orderButton}>
						<ArrowUp aria-hidden="true" />
					</TransferListPrimitive.MoveUp>
					<TransferListPrimitive.MoveDown class={orderButton}>
						<ArrowDown aria-hidden="true" />
					</TransferListPrimitive.MoveDown>
				</span>
			{/if}
		</div>
		{#if searchable}
			{@render search(targetLabel, { get: () => targetQuery, set: (next) => (targetQuery = next) })}
		{/if}
		<TransferListPrimitive.Target
			label={targetLabel}
			class={styles.list()}
			filter={filterBy(targetQuery)}
			emptyPlaceholder={emptyTarget}
		>
			{#snippet children(item: T)}{@render rowContent(item)}{/snippet}
		</TransferListPrimitive.Target>
	</div>

	<TransferListPrimitive.Status />
</TransferListPrimitive.Root>
