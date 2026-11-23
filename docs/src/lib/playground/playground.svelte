<script lang="ts">
	import { Checkbox } from '@registry/ui/checkbox';
	import { Input } from '@registry/ui/input';
	import * as Popover from '@registry/ui/popover';
	import { RadioGroup, RadioGroupItem } from '@registry/ui/radio-group';
	import * as Select from '@registry/ui/select';
	import { Switch } from '@registry/ui/switch';
	import { Toggle } from '@registry/ui/toggle';
	import { ToggleGroup, ToggleGroupItem } from '@registry/ui/toggle-group';
	import SlidersIcon from '@lucide/svelte/icons/sliders-horizontal';
	import { getContext, type Snippet } from 'svelte';
	import Code from '$lib/components/code.svelte';
	import CopyButton from '$lib/components/copy-button.svelte';
	import CodeToggle from './code-toggle.svelte';
	import { LOOKS, LOOK_KEY, type Look } from './looks';
	import { play, snapshot } from './morph';
	import Source from './source.svelte';
	import { optionLabel, type Control, type Values } from './types';
	import Bold, { isBold } from './bold.svelte';

	let {
		controls,
		preview,
		code
	}: {
		controls: readonly Control[];
		/** Draws the component with the values of the panel. */
		preview: Snippet<[Values]>;
		/** Writes the code of what the preview shows. */
		code: (values: Values) => string;
	} = $props();

	// The controls are fixed for a page, thus they seed the values once.
	// svelte-ignore state_referenced_locally
	let values = $state<Values>(
		Object.fromEntries(controls.map((control) => [control.name, control.default]))
	);
	let expanded = $state(false);

	// A change of a prop morphs the preview instead of redrawing it: the size is taken before the
	// change is drawn and played after. Both read every value, so any change runs them.
	let stage = $state<HTMLElement | null>(null);
	let before: ReturnType<typeof snapshot> | null = null;
	$effect.pre(() => {
		void JSON.stringify(values);
		if (stage) before = snapshot(stage);
	});
	$effect(() => {
		void JSON.stringify(values);
		if (stage && before) play(stage, before);
		before = null;
	});
	const id = $props.id();
	const source = $derived(code(values).trim());

	const fields = $derived(controls.filter((control) => control.type !== 'boolean'));
	const switches = $derived(controls.filter((control) => control.type === 'boolean'));

	const title = (name: string) => name.charAt(0).toUpperCase() + name.slice(1);
	// A short list reads at a glance as a row of segments; a longer one would not fit the panel.
	const SEGMENTS = 4;

	// The look of the block, for comparing designs (/lab/<look>). Pages use the default one.
	const lookName = getContext<string | undefined>(LOOK_KEY) ?? 'paper-dock';
	const bold = isBold(lookName) ? lookName : null;
	const look = LOOKS[(bold ? 'inset' : lookName) as Look];
</script>

<!-- One prop: its name and the control that sets it, drawn as the look asks. -->
{#snippet field(control: Control)}
	{@const labelId = `${id}-${control.name}`}
	{@const choice = control.type === 'choice' ? control : null}
	{@const useSelect =
		choice !== null && (look.choices === 'select' || choice.options.length > SEGMENTS)}
	<div class={look.field}>
		{#if !useSelect}
			<span class="text-small text-ink-muted shrink-0" id={labelId}>{title(control.name)}</span>
		{/if}
		{#if control.type === 'text'}
			<Input
				variant={look.layout === 'top' || look.layout === 'bottom' ? 'default' : 'underline'}
				size="sm"
				class={look.layout === 'top' || look.layout === 'bottom' ? 'w-32' : ''}
				aria-labelledby={labelId}
				bind:value={
					() => values[control.name] as string, (text) => (values[control.name] = text ?? '')
				}
			/>
		{:else if choice && useSelect}
			<Select.Root
				items={choice.options.map((option) => ({ id: option, label: optionLabel(choice, option) }))}
				bind:value={
					() => values[choice.name] as string,
					(next) => (values[choice.name] = String(next ?? choice.default))
				}
			>
				<Select.Label class="text-small text-ink-muted font-normal"
					>{title(choice.name)}</Select.Label
				>
				<Select.Trigger size="sm" class={look.labels === 'inline' ? 'w-auto min-w-24' : ''} />
				<Select.Content>
					{#each choice.options as option (option)}
						<Select.Item id={option}>{optionLabel(choice, option)}</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
		{:else if choice && look.choices === 'radio'}
			<RadioGroup
				aria-labelledby={labelId}
				bind:value={
					() => values[choice.name] as string,
					(next) => (values[choice.name] = String(next ?? choice.default))
				}
			>
				{#each choice.options as option (option)}
					<RadioGroupItem value={option} label={optionLabel(choice, option)} />
				{/each}
			</RadioGroup>
		{:else if choice}
			<ToggleGroup
				selectionMode="single"
				disallowEmptySelection
				variant={look.choices === 'outline' ? 'outline' : 'segment'}
				size="sm"
				class={look.labels === 'inline' ? 'w-auto' : 'w-full'}
				aria-labelledby={labelId}
				bind:value={
					() => [values[choice.name] as string],
					(next) => (values[choice.name] = String(next?.[0] ?? choice.default))
				}
			>
				{#each choice.options as option (option)}
					<ToggleGroupItem value={option} class="flex-1"
						>{optionLabel(choice, option)}</ToggleGroupItem
					>
				{/each}
			</ToggleGroup>
		{/if}
	</div>
{/snippet}

<!-- The yes-or-no props, each a short word with its switch, chip or box. -->
{#snippet booleans()}
	{#if switches.length > 0}
		<div class={look.booleansRow}>
			{#each switches as control (control.name)}
				{#if look.booleans === 'toggle'}
					<Toggle
						variant="outline"
						size="sm"
						bind:selected={
							() => values[control.name] as boolean, (on) => (values[control.name] = on ?? false)
						}>{title(control.name)}</Toggle
					>
				{:else if look.booleans === 'checkbox'}
					<Checkbox
						label={title(control.name)}
						bind:checked={
							() => values[control.name] as boolean, (on) => (values[control.name] = on ?? false)
						}
					/>
				{:else}
					<Switch
						size="sm"
						label={title(control.name)}
						bind:checked={
							() => values[control.name] as boolean, (on) => (values[control.name] = on ?? false)
						}
					/>
				{/if}
			{/each}
		</div>
	{/if}
{/snippet}

{#snippet panel(className: string)}
	<div class={className} role="group" aria-label="Props">
		{#each fields as control (control.name)}
			{@render field(control)}
		{/each}
		{@render booleans()}
	</div>
{/snippet}

{#snippet stageBox(className: string)}
	<div
		class="relative flex min-h-72 min-w-0 flex-1 items-center justify-center p-4 pt-12 text-[0.8125rem] leading-normal sm:p-8 sm:pt-12 {look.stage} {className}"
	>
		{#if look.layout === 'popover'}
			<Popover.Root>
				<Popover.Trigger variant="ghost" size="sm" class="absolute top-2 left-2">
					<SlidersIcon />Props
				</Popover.Trigger>
				<Popover.Content aria-label="Props">
					{@render panel(look.panel)}
				</Popover.Content>
			</Popover.Root>
		{/if}
		{#if look.layout !== 'code'}
			<CodeToggle bind:expanded controls={id} {source} />
		{/if}
		<div bind:this={stage} class="contents">
			{@render preview(values)}
		</div>
	</div>
{/snippet}

{#if bold}
	<Bold look={bold} bind:values bind:stage {controls} {preview} {source} />
{:else}
	<div class="doc-block {look.block}">
		{#if look.layout === 'side'}
			<div class="flex flex-col md:flex-row">
				{@render stageBox('')}
				{@render panel(look.panel)}
			</div>
		{:else if look.layout === 'top'}
			{@render panel(look.panel)}
			{@render stageBox('')}
		{:else if look.layout === 'bottom'}
			{@render stageBox('')}
			{@render panel(look.panel)}
		{:else if look.layout === 'popover'}
			{@render stageBox('')}
		{:else}
			{@render stageBox('border-frame border-b')}
			<div class="flex flex-col md:flex-row">
				{@render panel(look.panel)}
				<div
					class="border-frame bg-surface-muted relative min-w-0 flex-1 border-t md:border-s md:border-t-0"
				>
					<pre
						class="text-ink overflow-auto p-4 pe-12 font-mono text-[0.8125rem] leading-[1.6]"><Code
							code={source}
						/></pre>
					<CopyButton text={source} class="absolute top-2 right-2" />
				</div>
			</div>
		{/if}
		{#if look.layout !== 'code'}
			<Source {id} code={source} hidden={!expanded} />
		{/if}
	</div>
{/if}
