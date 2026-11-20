<script lang="ts" module>
	import type { Component } from 'svelte';

	/** One thing the palette can do or open. */
	export type CommandPaletteItem = {
		id: string;
		label: string;
		icon?: Component<Record<string, unknown>>;
		/** Its own shortcut, shown at the end of the row: `['Ctrl', 'N']`. */
		shortcut?: string[];
		/** More words it is found by: "appointment" for "New visit". */
		keywords?: string;
		onSelect: () => void;
	};
</script>

<script lang="ts">
	import { Autocomplete as AutocompletePrimitive } from '@human-kit/ui/autocomplete';
	import { Dialog as DialogPrimitive } from '@human-kit/ui/dialog';
	import { cn } from '@registry/lib/utils';
	import * as Autocomplete from '@registry/ui/autocomplete';
	import { Kbd } from '@registry/ui/kbd';

	type Props = {
		open?: boolean;
		items: CommandPaletteItem[];
		/** Opens it with Ctrl K, or ⌘ K on a Mac, from anywhere on the page. */
		hotkey?: boolean;
		/** The dialog's name and the search's, read aloud. */
		label?: string;
		placeholder?: string;
		emptyText?: string;
		class?: string;
	};

	let {
		open = $bindable(false),
		items,
		hotkey = true,
		label = 'Command palette',
		placeholder = 'Search for a page or an action…',
		emptyText = 'Nothing matches',
		class: className
	}: Props = $props();

	let query = $state('');
	let panel = $state<HTMLElement | null>(null);
	let returnTo: HTMLElement | null = null;

	// The search takes the focus each time it opens, once the panel is in the page, and gives it
	// back to where it was when it closes: opened by its keys, there is no trigger for the dialog
	// to return it to.
	$effect(() => {
		if (open) returnTo ??= document.activeElement as HTMLElement | null;
		else if (returnTo) {
			const target = returnTo;
			returnTo = null;
			setTimeout(() => target.isConnected && target.focus());
		}
	});
	// The panel is inert for its first moments while the dialog takes it in, and a dialog closed a
	// moment before may hand the focus back to the page when its exit ends, after this one has
	// opened. So the search takes the focus as soon as the panel lets it, and for the first second
	// a focus that falls out of the panel is brought back; one moved within it, by a click or by
	// Tab, is left alone. Driven by events, not frames: a tab in the background runs few frames.
	$effect(() => {
		if (!open || !panel) return;
		const area = panel;
		const input = area.querySelector<HTMLInputElement>('input');
		const content = area.closest<HTMLElement>('[data-dialog-content]');
		const until = performance.now() + 1000;
		const pull = () => {
			if (performance.now() < until && !area.contains(document.activeElement)) input?.focus();
		};
		const onFocusOut = (event: FocusEvent) => {
			if (!event.relatedTarget) setTimeout(pull);
		};
		const observer = new MutationObserver(pull);
		if (content) observer.observe(content, { attributes: true, attributeFilter: ['inert'] });
		document.addEventListener('focusin', pull);
		area.addEventListener('focusout', onFocusOut);
		pull();
		const retry = setTimeout(pull, 50);
		return () => {
			observer.disconnect();
			clearTimeout(retry);
			document.removeEventListener('focusin', pull);
			area.removeEventListener('focusout', onFocusOut);
		};
	});

	function onKeydown(event: KeyboardEvent) {
		if (!hotkey || event.key.toLowerCase() !== 'k' || !(event.metaKey || event.ctrlKey)) return;
		event.preventDefault();
		open = !open;
	}

	function onEscape(event: KeyboardEvent) {
		if (event.key !== 'Escape') return;
		event.preventDefault();
		event.stopPropagation();
		open = false;
		query = '';
	}

	function run(selection: Set<string | number>) {
		const item = items.find((entry) => selection.has(entry.id));
		if (!item) return;
		open = false;
		query = '';
		item.onSelect();
	}
</script>

<svelte:window onkeydown={onKeydown} />

<DialogPrimitive.Root bind:open>
	<DialogPrimitive.Portal>
		<DialogPrimitive.Overlay
			class={cn(
				'fixed inset-0 bg-black/20 backdrop-blur-sm',
				'data-entering:animate-in data-entering:fade-in-0 data-entering:animation-duration-[100ms]',
				'data-exiting:animate-out data-exiting:fade-out-0 data-exiting:animation-duration-[100ms]'
			)}
		/>
		<!-- High on the screen, not centred: the list grows down as it fills, and the search
		     row stays where the eye found it. -->
		<DialogPrimitive.Content
			class={cn(
				'mt-[12vh] flex w-[calc(100vw-2rem)] max-w-lg flex-col self-start overflow-hidden',
				'rounded-dialog bg-overlay text-ink shadow-dialog outline-hidden',
				'data-entering:animate-in data-entering:fade-in-0 data-entering:zoom-in-95 data-entering:animation-duration-[100ms]',
				'data-exiting:animate-out data-exiting:fade-out-0 data-exiting:zoom-out-95 data-exiting:animation-duration-[100ms]',
				className
			)}
		>
			<DialogPrimitive.Title class="sr-only">{label}</DialogPrimitive.Title>
			<!-- Escape closes at once: the search row would spend it clearing the text, and a palette
			     is put away with one key. -->
			<div class="contents" bind:this={panel} onkeydowncapture={onEscape}>
				<Autocomplete.Root bind:inputValue={query}>
					<div class="border-line border-b pb-1">
						<Autocomplete.Input aria-label={label} {placeholder} />
					</div>
					<Autocomplete.List aria-label={label} class="max-h-80" onChange={run}>
						{#each items as item (item.id)}
							<AutocompletePrimitive.Item
								id={item.id}
								textValue={item.keywords ? `${item.label} ${item.keywords}` : item.label}
								class={cn(
									'rounded-control flex h-6.5 shrink-0 cursor-default items-center gap-2 ps-1.5 pe-1',
									'text-body text-ink-muted transition-ink outline-hidden select-none',
									'data-hovered:bg-hover data-hovered:text-ink data-focused:bg-hover data-focused:text-ink',
									'data-disabled:pointer-events-none data-disabled:opacity-45',
									'[&>svg]:text-ink-subtle [&>svg]:size-4 [&>svg]:shrink-0'
								)}
							>
								{#if item.icon}<item.icon aria-hidden="true" />{/if}
								<span class="min-w-0 flex-1 truncate">{item.label}</span>
								{#if item.shortcut}
									<Kbd variant="ghost" keys={item.shortcut} aria-hidden="true" />
								{/if}
							</AutocompletePrimitive.Item>
						{/each}
						<Autocomplete.Empty class="ps-1.5">{emptyText}</Autocomplete.Empty>
					</Autocomplete.List>
				</Autocomplete.Root>
			</div>
		</DialogPrimitive.Content>
	</DialogPrimitive.Portal>
</DialogPrimitive.Root>
