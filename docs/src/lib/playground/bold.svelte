<script lang="ts" module>
	import { STAGES, type Stage } from './spotlight.svelte';
	/** Designs that change how the props are set, not only where the panel sits. */
	export const BOLD = [
		'paper-dock',
		'dock',
		'sentence',
		'live-code',
		'matrix',
		'states',
		'loupe',
		'context',
		'command',
		'swatches',
		'spotlight'
	] as const;
	export type BoldLook = (typeof BOLD)[number] | `spotlight-${Stage}`;
	export const isBold = (look: string): look is BoldLook =>
		(BOLD as readonly string[]).includes(look) ||
		(look.startsWith('spotlight-') && look.slice(10) in STAGES);
</script>

<script lang="ts">
	import { Button } from '@registry/ui/button';
	import { Input } from '@registry/ui/input';
	import * as Select from '@registry/ui/select';
	import { Toggle } from '@registry/ui/toggle';
	import { ToggleGroup, ToggleGroupItem } from '@registry/ui/toggle-group';
	import type { Snippet } from 'svelte';
	import CopyButton from '$lib/components/copy-button.svelte';
	import CodeToggle from './code-toggle.svelte';
	import Source from './source.svelte';
	import Spotlight from './spotlight.svelte';
	import { optionLabel, props as writeProps, type Control, type Values } from './types';

	let {
		look,
		values = $bindable(),
		controls,
		preview,
		source,
		stage = $bindable(null)
	}: {
		look: BoldLook;
		values: Values;
		controls: readonly Control[];
		preview: Snippet<[Values]>;
		source: string;
		/** The element around the preview, for the playground to morph a change of a prop. */
		stage?: HTMLElement | null;
	} = $props();

	type Choice = Extract<Control, { type: 'choice' }>;
	const choices = $derived(controls.filter((c): c is Choice => c.type === 'choice'));
	const flags = $derived(controls.filter((c) => c.type === 'boolean'));
	const texts = $derived(controls.filter((c) => c.type === 'text'));
	const title = (name: string) => name.charAt(0).toUpperCase() + name.slice(1);
	const tag = $derived([...source.matchAll(/<([A-Z]\w*)/g)].at(-1)?.[1] ?? 'Component');

	const merged = (over: Values) => ({ ...values, ...over });
	function cycle(c: Choice) {
		const at = c.options.indexOf(values[c.name] as string);
		values[c.name] = c.options[(at + 1) % c.options.length];
	}
	const flip = (name: string) => (values[name] = !values[name]);

	// The command line: the tag as written, parsed back into the values on every keystroke.
	const write = () =>
		`<${tag}${writeProps(
			values,
			controls,
			texts.map((t) => t.name)
		)}>${texts.map((t) => values[t.name]).join('')}</${tag}>`;
	let command = $state('');
	let typing = false;
	$effect(() => {
		const next = write();
		if (!typing) command = next;
	});
	function parse(text: string) {
		typing = true;
		command = text;
		for (const c of controls) {
			if (c.type === 'boolean')
				values[c.name] = new RegExp(`\\s${c.name}(\\s|>|/|=\\{true\\})`).test(text);
			else if (c.type === 'choice') {
				const hit = text.match(new RegExp(`${c.name}="(\\w+)"`))?.[1];
				values[c.name] = hit && c.options.includes(hit) ? hit : c.default;
			} else {
				const hit = text.match(/>([^<]*)</)?.[1];
				if (hit !== undefined) values[c.name] = hit;
			}
		}
		queueMicrotask(() => (typing = false));
	}

	// The loupe reads the size of what it magnifies.
	let measured = $state({ w: 0, h: 0 });
	let target = $state<HTMLElement | null>(null);
	$effect(() => {
		if (!target) return;
		const read = () => {
			const el = target?.firstElementChild as HTMLElement | null;
			if (el) measured = { w: el.offsetWidth, h: el.offsetHeight };
		};
		read();
		const observer = new ResizeObserver(read);
		observer.observe(target);
		return () => observer.disconnect();
	});

	// A grain of paper: fractal noise, multiplied onto the ground.
	// Specks of ink, not a grey veil: the noise becomes the alpha of black dots, so the ground
	// keeps its white and only the grain shows. Inverted in the dark.
	const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.2 1.35'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

	const id = $props.id();
	let expanded = $state(false);

	let context = $state<'dialog' | 'toolbar' | 'form'>('dialog');

	const tokenAttr = 'text-[#953800] dark:text-[#ffa657]';
	const tokenTag = 'text-[#0550ae] dark:text-[#79c0ff]';
</script>

{#snippet choiceSelect(
	c: Choice,
	variant: 'default' | 'ghost' = 'default',
	cls = 'w-auto min-w-20'
)}
	<Select.Root
		items={c.options.map((o) => ({ id: o, label: optionLabel(c, o) }))}
		bind:value={() => values[c.name] as string, (n) => (values[c.name] = String(n ?? c.default))}
	>
		<Select.Label class="sr-only">{title(c.name)}</Select.Label>
		<Select.Trigger size="sm" {variant} class={cls} />
		<Select.Content>
			{#each c.options as o (o)}
				<Select.Item id={o}>{optionLabel(c, o)}</Select.Item>
			{/each}
		</Select.Content>
	</Select.Root>
{/snippet}

{#snippet dockSelect(c: Choice)}
	<!-- A pick of the dock is a button among the toggles beside it, not a field. -->
	<Select.Root
		items={c.options.map((o) => ({ id: o, label: optionLabel(c, o) }))}
		bind:value={() => values[c.name] as string, (n) => (values[c.name] = String(n ?? c.default))}
	>
		<Select.Label class="sr-only">{title(c.name)}</Select.Label>
		<Select.Trigger look="button" />
		<Select.Content>
			{#each c.options as o (o)}
				<Select.Item id={o}>{optionLabel(c, o)}</Select.Item>
			{/each}
		</Select.Content>
	</Select.Root>
{/snippet}

{#snippet segments(c: Choice)}
	<ToggleGroup
		selectionMode="single"
		disallowEmptySelection
		variant="segment"
		size="sm"
		aria-label={title(c.name)}
		bind:value={
			() => [values[c.name] as string], (n) => (values[c.name] = String(n?.[0] ?? c.default))
		}
	>
		{#each c.options as o (o)}
			<ToggleGroupItem value={o}>{optionLabel(c, o)}</ToggleGroupItem>
		{/each}
	</ToggleGroup>
{/snippet}

{#snippet flagChips(variant: 'outline' | 'ghost')}
	{#each flags as f (f.name)}
		<Toggle
			{variant}
			size="sm"
			bind:selected={() => values[f.name] as boolean, (on) => (values[f.name] = on ?? false)}
			>{title(f.name)}</Toggle
		>
	{/each}
{/snippet}

{#snippet textField(cls: string, variant: 'default' | 'ghost')}
	{#each texts as t (t.name)}
		<Input
			{variant}
			size="sm"
			class={cls}
			aria-label={title(t.name)}
			autocomplete="off"
			bind:value={() => values[t.name] as string, (v) => (values[t.name] = v ?? '')}
		/>
	{/each}
{/snippet}

<!-- A pick drawn as the component itself: a card per option, the preview inside it. -->
{#snippet tile(
	label: string,
	on: boolean,
	toggle: () => void,
	shown: Values,
	role: 'radio' | 'checkbox'
)}
	<div
		{role}
		tabindex="0"
		aria-checked={on}
		aria-label={label || undefined}
		class="focus-visible:shadow-focus flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg p-2 transition-[background-color,box-shadow] outline-none {on
			? 'bg-surface shadow-segment-chip'
			: 'hover:bg-hover/70'}"
		onclick={toggle}
		onkeydown={(e) => {
			if (e.key === ' ' || e.key === 'Enter') {
				e.preventDefault();
				toggle();
			}
		}}
	>
		<div class="pointer-events-none flex min-h-12 items-center justify-center" inert>
			{@render preview(shown)}
		</div>
		{#if label}
			<span class="text-small {on ? 'text-ink' : 'text-ink-muted'}">{label}</span>
		{/if}
	</div>
{/snippet}

<div class="doc-block border-frame bg-canvas overflow-hidden rounded-xl border">
	{#if look === 'paper-dock'}
		<!-- A sheet of paper: the kit's light grey, lit at the middle, with a grain. The props sit
		     in a dock that floats over it, like a design tool's bottom bar. -->
		<div
			class="relative isolate flex min-h-96 items-center justify-center pb-16"
			style="background: var(--canvas)"
		>
			<div
				class="pointer-events-none absolute inset-0 -z-10"
				style="background: radial-gradient(ellipse at 50% 40%, transparent 45%, color-mix(in oklch, var(--chrome) 50%, transparent))"
			></div>
			<div
				class="pointer-events-none absolute inset-0 -z-10 opacity-[0.09] dark:opacity-[0.07] dark:invert"
				style="background-image: {GRAIN}"
			></div>
			<CodeToggle bind:expanded controls={id} {source} />
			<div bind:this={stage} class="contents">{@render preview(values)}</div>
			<!-- Its corners follow the controls inside, 4px out: a pill would leave the ends of the
			     dock wider than its top and bottom. -->
			<div
				class="bg-surface shadow-card absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-0.5 rounded-[calc(var(--radius-control)+4px)] p-1 whitespace-nowrap"
			>
				{#each choices as c (c.name)}
					{@render dockSelect(c)}
				{/each}
				{#if texts.length > 0}
					<span class="bg-line mx-1 h-4 w-px"></span>
					{@render textField('h-6.5 w-28 rounded-control px-2', 'ghost')}
				{/if}
				{#if flags.length > 0}
					<span class="bg-line mx-1 h-4 w-px"></span>
					<!-- The states as a set of toggles: any of them on at once. -->
					<ToggleGroup
						selectionMode="multiple"
						variant="ghost"
						size="default"
						aria-label="State"
						class="gap-0.5"
						bind:value={
							() => flags.filter((f) => values[f.name]).map((f) => f.name),
							(next) => flags.forEach((f) => (values[f.name] = next?.includes(f.name) ?? false))
						}
					>
						{#each flags as f (f.name)}
							<ToggleGroupItem value={f.name} class="rounded-control"
								>{title(f.name)}</ToggleGroupItem
							>
						{/each}
					</ToggleGroup>
				{/if}
			</div>
		</div>
		<Source {id} code={source} hidden={!expanded} />
	{:else if look === 'dock'}
		<!-- A dock that floats over the canvas, like a design tool's bottom bar. -->
		<div
			class="relative flex min-h-96 items-center justify-center bg-[radial-gradient(var(--line-strong)_1px,transparent_1px)] bg-size-[16px_16px] pb-16"
		>
			<CopyButton text={source} class="absolute top-2 right-2" />
			{@render preview(values)}
			<div
				class="bg-surface shadow-card absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full p-1 ps-2 whitespace-nowrap"
			>
				{#each choices as c (c.name)}
					{@render choiceSelect(c, 'ghost')}
				{/each}
				<span class="bg-line mx-1 h-4 w-px"></span>
				{@render textField('w-28', 'ghost')}
				<span class="bg-line mx-1 h-4 w-px"></span>
				{@render flagChips('ghost')}
			</div>
		</div>
	{:else if look === 'sentence'}
		<!-- The props as a sentence: every value is a word you can click to change. -->
		<div class="flex min-h-56 items-center justify-center p-8">{@render preview(values)}</div>
		<div class="border-frame relative border-t px-8 py-6">
			<CopyButton text={source} class="absolute top-2 right-2" />
			<p class="text-ink-muted max-w-2xl font-serif text-[1.375rem] leading-[1.7]">
				A {tag} in the
				{#each choices as c, i (c.name)}
					<button
						class="text-ink decoration-ink/30 hover:decoration-ink cursor-pointer underline decoration-dashed decoration-1 underline-offset-[6px]"
						onclick={() => cycle(c)}
						>{optionLabel(c, values[c.name] as string).toLowerCase()}</button
					>
					{c.name}{i < choices.length - 2 ? ', ' : i === choices.length - 2 ? ' and ' : ''}
				{/each}, that says
				{#each texts as t (t.name)}“<input
						class="text-ink decoration-ink/30 field-sizing-content min-w-4 bg-transparent underline decoration-dashed decoration-1 underline-offset-[6px] outline-none"
						aria-label={title(t.name)}
						bind:value={() => values[t.name] as string, (v) => (values[t.name] = v)}
					/>”{/each}, with
				{#each flags as f, i (f.name)}
					<button
						class="cursor-pointer transition-colors {values[f.name]
							? 'text-ink'
							: 'text-ink-subtle line-through decoration-1'}"
						aria-pressed={values[f.name] as boolean}
						onclick={() => flip(f.name)}>{f.name}</button
					>{i < flags.length - 1 ? ', ' : '.'}
				{/each}
			</p>
		</div>
	{:else if look === 'live-code'}
		<!-- The code is the panel: click a value in it to change it. -->
		<div class="grid md:grid-cols-[1fr_1.1fr]">
			<div class="flex min-h-80 items-center justify-center p-8">{@render preview(values)}</div>
			<div
				class="border-frame bg-surface-muted relative border-t p-5 font-mono text-[0.8125rem] leading-[1.9] md:border-s md:border-t-0"
			>
				<CopyButton text={source} class="absolute top-2 right-2" />
				<div><span class="text-ink-subtle">&lt;</span><span class={tokenTag}>{tag}</span></div>
				{#each choices as c (c.name)}
					<div class="ps-4 {values[c.name] === c.default ? 'opacity-55' : ''}">
						<span class={tokenAttr}>{c.name}</span><span class="text-ink-subtle">="</span><button
							class="hover:bg-hover cursor-pointer rounded-sm px-0.5 text-[#0a3069] dark:text-[#a5d6ff]"
							onclick={() => cycle(c)}>{values[c.name]}</button
						><span class="text-ink-subtle">"</span>
					</div>
				{/each}
				{#each flags as f (f.name)}
					<div class="ps-4 {values[f.name] ? '' : 'opacity-55'}">
						<span class={tokenAttr}>{f.name}</span><span class="text-ink-subtle">={'{'}</span
						><button
							class="hover:bg-hover cursor-pointer rounded-sm px-0.5 text-[#cf222e] dark:text-[#ff7b72]"
							onclick={() => flip(f.name)}>{String(values[f.name])}</button
						><span class="text-ink-subtle">}</span>
					</div>
				{/each}
				<div><span class="text-ink-subtle">&gt;</span></div>
				{#each texts as t (t.name)}
					<div class="ps-4">
						<input
							class="text-ink hover:bg-hover field-sizing-content rounded-sm bg-transparent px-0.5 outline-none"
							aria-label={title(t.name)}
							bind:value={() => values[t.name] as string, (v) => (values[t.name] = v)}
						/>
					</div>
				{/each}
				<div>
					<span class="text-ink-subtle">&lt;/</span><span class={tokenTag}>{tag}</span><span
						class="text-ink-subtle">&gt;</span
					>
				</div>
				<p class="text-ink-subtle mt-4 font-sans text-[0.75rem]">
					Click a value to change it. Dimmed lines are defaults.
				</p>
			</div>
		</div>
	{:else if look === 'matrix'}
		<!-- Every pair of the first two props at once: the picked cell is the one you get. -->
		{@const cols = choices[0]}
		{@const rows = choices[1]}
		<div class="border-frame flex flex-wrap items-center gap-2 border-b px-3 py-2">
			{#each choices.slice(2) as c (c.name)}{@render segments(c)}{/each}
			{@render textField('w-32', 'default')}
			{@render flagChips('outline')}
			<CopyButton text={source} class="ms-auto" />
		</div>
		<div class="overflow-x-auto p-4">
			<div
				class="grid gap-1"
				style="grid-template-columns: auto repeat({cols.options.length}, minmax(0, 1fr))"
			>
				<span></span>
				{#each cols.options as o (o)}
					<span class="text-small text-ink-muted pb-1 text-center">{optionLabel(cols, o)}</span>
				{/each}
				{#each rows.options as r (r)}
					<span class="text-small text-ink-muted flex items-center pe-3"
						>{optionLabel(rows, r)}</span
					>
					{#each cols.options as o (o)}
						{@render tile(
							'',
							values[cols.name] === o && values[rows.name] === r,
							() => {
								values[cols.name] = o;
								values[rows.name] = r;
							},
							merged({ [cols.name]: o, [rows.name]: r }),
							'radio'
						)}
					{/each}
				{/each}
			</div>
		</div>
	{:else if look === 'states'}
		<!-- One look, every state beside it: a strip to compare, a click keeps a state on. -->
		<div class="border-frame flex flex-wrap items-center gap-2 border-b px-3 py-2">
			{#each choices as c (c.name)}{@render segments(c)}{/each}
			{@render textField('w-32', 'default')}
			<CopyButton text={source} class="ms-auto" />
		</div>
		<div class="border-frame flex min-h-48 items-center justify-center border-b p-8">
			{@render preview(values)}
		</div>
		<div class="grid grid-cols-2 gap-1 p-2 sm:grid-cols-3 md:grid-cols-5">
			{@render tile(
				'Rest',
				flags.every((f) => !values[f.name]),
				() => flags.forEach((f) => (values[f.name] = false)),
				merged(Object.fromEntries(flags.map((f) => [f.name, false]))),
				'radio'
			)}
			{#each flags as f (f.name)}
				{@render tile(
					title(f.name),
					values[f.name] as boolean,
					() => flip(f.name),
					merged({ [f.name]: true }),
					'checkbox'
				)}
			{/each}
		</div>
	{:else if look === 'loupe'}
		<!-- Under a loupe: three times its size, on a grid of 4px, with its measures. -->
		<div
			class="relative flex min-h-96 items-center justify-center overflow-hidden bg-[linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] bg-size-[12px_12px]"
		>
			<CopyButton text={source} class="absolute top-2 right-2" />
			<div class="relative" style="width: {measured.w * 3}px; height: {measured.h * 3}px">
				<div
					bind:this={target}
					class="absolute top-0 left-0 inline-flex origin-top-left"
					style="scale: 3"
				>
					{@render preview(values)}
				</div>
				<div
					class="text-primary absolute right-0 -bottom-8 left-0 flex items-center gap-2 font-mono text-[0.6875rem]"
				>
					<span class="bg-primary h-px flex-1"></span>{measured.w}px<span
						class="bg-primary h-px flex-1"
					></span>
				</div>
				<div
					class="text-primary absolute top-0 -right-14 bottom-0 flex flex-col items-center gap-1 font-mono text-[0.6875rem]"
				>
					<span class="bg-primary w-px flex-1"></span>{measured.h}px<span
						class="bg-primary w-px flex-1"
					></span>
				</div>
			</div>
			<span class="text-ink-subtle absolute bottom-2 left-3 font-mono text-[0.6875rem]"
				>300% · grid 4px</span
			>
		</div>
		<div class="border-frame flex flex-wrap items-center gap-2 border-t px-3 py-2">
			{#each choices as c (c.name)}{@render choiceSelect(c)}{/each}
			{@render textField('w-32', 'default')}
			{@render flagChips('outline')}
		</div>
	{:else if look === 'context'}
		<!-- In a real place: a dialog, a toolbar or a form, with the parts around it. -->
		<div class="border-frame flex flex-wrap items-center gap-2 border-b px-3 py-2">
			<ToggleGroup
				selectionMode="single"
				disallowEmptySelection
				variant="segment"
				size="sm"
				aria-label="Context"
				bind:value={() => [context], (n) => (context = (n?.[0] ?? 'dialog') as typeof context)}
			>
				<ToggleGroupItem value="dialog">In a dialog</ToggleGroupItem>
				<ToggleGroupItem value="toolbar">In a toolbar</ToggleGroupItem>
				<ToggleGroupItem value="form">In a form</ToggleGroupItem>
			</ToggleGroup>
			<CopyButton text={source} class="ms-auto" />
		</div>
		<div class="bg-hover/50 flex min-h-80 items-center justify-center p-8">
			{#if context === 'dialog'}
				<div class="bg-surface shadow-card w-full max-w-sm rounded-xl p-5">
					<p class="text-ink text-[0.9375rem] font-medium">Discard the draft?</p>
					<p class="text-ink-muted text-small mt-1">
						The notes of this visit will be lost. You cannot undo it.
					</p>
					<div class="mt-5 flex items-center justify-end gap-2">
						<Button variant="ghost">Cancel</Button>
						{@render preview(values)}
					</div>
				</div>
			{:else if context === 'toolbar'}
				<div class="bg-surface shadow-card flex w-full max-w-xl items-center gap-2 rounded-xl p-2">
					<Input placeholder="Search patients" aria-label="Search" class="flex-1" />
					<Button variant="ghost">Filters</Button>
					{@render preview(values)}
				</div>
			{:else}
				<div class="bg-surface shadow-card flex w-full max-w-sm flex-col gap-3 rounded-xl p-5">
					<span class="text-small text-ink-muted">Name</span>
					<Input aria-label="Name" value="Ana Gómez" />
					<span class="text-small text-ink-muted">Email</span>
					<Input aria-label="Email" value="ana@clinic.co" />
					<div class="pt-1">{@render preview(values)}</div>
				</div>
			{/if}
		</div>
		<div class="border-frame flex flex-wrap items-center gap-2 border-t px-3 py-2">
			{#each choices as c (c.name)}{@render choiceSelect(c)}{/each}
			{@render textField('w-32', 'default')}
			{@render flagChips('outline')}
		</div>
	{:else if look === 'command'}
		<!-- Write the tag: the preview follows what you type, the hints fill it in. -->
		<div class="flex min-h-64 items-center justify-center p-8">{@render preview(values)}</div>
		<div class="border-frame bg-surface-muted border-t p-3">
			<div
				class="bg-surface shadow-card flex items-center gap-2 rounded-lg px-3 py-2 font-mono text-[0.8125rem]"
			>
				<span class="text-primary select-none">›</span>
				<input
					class="text-ink min-w-0 flex-1 bg-transparent outline-none"
					aria-label="Tag"
					spellcheck="false"
					value={command}
					oninput={(e) => parse(e.currentTarget.value)}
				/>
				<CopyButton text={source} />
			</div>
			<div
				class="text-ink-muted mt-2.5 flex flex-wrap gap-x-5 gap-y-1.5 px-1 font-mono text-[0.75rem]"
			>
				{#each choices as c (c.name)}
					<span
						>{c.name}={#each c.options as o, i (o)}<button
								class="hover:text-ink cursor-pointer {values[c.name] === o
									? 'text-ink underline underline-offset-2'
									: ''}"
								onclick={() => (values[c.name] = o)}>{o}</button
							>{i < c.options.length - 1 ? ' | ' : ''}{/each}</span
					>
				{/each}
				{#each flags as f (f.name)}
					<button
						class="hover:text-ink cursor-pointer {values[f.name]
							? 'text-ink underline underline-offset-2'
							: ''}"
						onclick={() => flip(f.name)}>{f.name}</button
					>
				{/each}
			</div>
		</div>
	{:else if look === 'swatches'}
		<!-- Pick by looking: every option is drawn, the panel is a wall of small previews. -->
		<div class="flex flex-col">
			<div class="relative flex min-h-72 flex-1 items-center justify-center p-8">
				<CopyButton text={source} class="absolute top-2 right-2" />
				{@render preview(values)}
			</div>
			<div class="border-frame bg-hover/40 flex flex-col gap-4 border-t p-3">
				{#each choices as c (c.name)}
					<div class="flex flex-col gap-1.5">
						<span class="text-small text-ink-muted px-1">{title(c.name)}</span>
						<div
							class="grid gap-1"
							style="grid-template-columns: repeat({Math.min(c.options.length, 4)}, minmax(0, 1fr))"
						>
							{#each c.options as o (o)}
								{@render tile(
									optionLabel(c, o),
									values[c.name] === o,
									() => (values[c.name] = o),
									merged({ [c.name]: o }),
									'radio'
								)}
							{/each}
						</div>
					</div>
				{/each}
				<div class="flex flex-col gap-1.5">
					<span class="text-small text-ink-muted px-1">States</span>
					<div class="grid grid-cols-4 gap-1">
						{#each flags as f (f.name)}
							{@render tile(
								title(f.name),
								values[f.name] as boolean,
								() => flip(f.name),
								merged({ [f.name]: true }),
								'checkbox'
							)}
						{/each}
					</div>
				</div>
			</div>
		</div>
	{:else if look.startsWith('spotlight')}
		<Spotlight
			stage={(look === 'spotlight' ? 'glow' : look.slice(10)) as Stage}
			bind:values
			{controls}
			{preview}
			{source}
		/>
	{/if}
</div>
