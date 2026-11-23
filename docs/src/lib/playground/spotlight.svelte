<script lang="ts" module>
	/** Grounds of the spotlight stage, compared on /lab/spotlight-<name>. */
	export const STAGES = {
		glow: {
			dark: true,
			base: 'background: #0c0c0d',
			layers: [
				'background: radial-gradient(ellipse at 50% 40%, oklch(1 0 0 / 0.1), transparent 55%)'
			]
		},
		cone: {
			dark: true,
			base: 'background: #08080a',
			layers: [
				'background: conic-gradient(from 162deg at 50% -20%, transparent 0deg, oklch(1 0 0 / 0.11) 18deg, transparent 36deg); filter: blur(6px)',
				'background: radial-gradient(ellipse 26% 7% at 50% 66%, oklch(1 0 0 / 0.12), transparent)'
			],
			reflection: true
		},
		grain: {
			dark: true,
			base: 'background: radial-gradient(ellipse at 50% 35%, #2a2a2e, #0b0b0c 70%)',
			layers: [
				`background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); opacity: 0.13; mix-blend-mode: overlay`
			]
		},
		tint: {
			dark: true,
			base: 'background: #09090f',
			layers: [
				'background: radial-gradient(ellipse 45% 50% at 50% 45%, color-mix(in oklch, var(--primary) 32%, transparent), transparent 70%)'
			]
		},
		floor: {
			dark: true,
			base: 'background: #0a0a0b',
			layers: [
				'top: 55%; background-image: linear-gradient(oklch(1 0 0 / 0.08) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 0.08) 1px, transparent 1px); background-size: 40px 40px; background-position: center top; transform: perspective(420px) rotateX(58deg); transform-origin: top; mask-image: linear-gradient(to bottom, black, transparent 85%)',
				'background: radial-gradient(ellipse at 50% 42%, oklch(1 0 0 / 0.08), transparent 50%)'
			]
		},
		dots: {
			dark: true,
			base: 'background: #0b0b0c',
			layers: [
				'background-image: radial-gradient(oklch(1 0 0 / 0.35) 1px, transparent 1px); background-size: 14px 14px; background-position: center; mask-image: radial-gradient(circle at 50% 42%, black, transparent 42%)'
			]
		},
		aurora: {
			dark: true,
			base: 'background: #07070a',
			layers: [
				'background: radial-gradient(circle at 28% 30%, oklch(0.55 0.2 285 / 0.45), transparent 38%), radial-gradient(circle at 74% 62%, oklch(0.62 0.14 200 / 0.3), transparent 40%), radial-gradient(circle at 60% 20%, oklch(0.6 0.18 330 / 0.25), transparent 35%); filter: blur(40px)'
			]
		},
		velvet: {
			dark: true,
			base: 'background: linear-gradient(#1c1c21, #050506)',
			layers: [
				'background: radial-gradient(ellipse at 50% 45%, transparent 35%, rgb(0 0 0 / 0.65))',
				'bottom: auto; height: 1px; background: linear-gradient(90deg, transparent, oklch(1 0 0 / 0.18), transparent)'
			]
		},
		studio: {
			dark: true,
			base: 'background: linear-gradient(180deg, #0d0d0f 0%, #18181c 58%, #222227 64%, #0e0e10 100%)',
			layers: [
				'background: radial-gradient(ellipse 22% 5% at 50% 64%, rgb(0 0 0 / 0.55), transparent)',
				'background: radial-gradient(ellipse at 50% 30%, oklch(1 0 0 / 0.07), transparent 50%)'
			],
			reflection: true
		},
		paper: {
			dark: false,
			base: 'background: #efeee9',
			layers: [
				'background: radial-gradient(ellipse at 50% 42%, #fff, transparent 60%)',
				`background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); opacity: 0.18; mix-blend-mode: multiply`
			]
		},
		// The paper stage in the kit's own greys: tokens, thus it follows the theme.
		'paper-grey': {
			dark: false,
			base: 'background: var(--chrome)',
			layers: [
				'background: radial-gradient(ellipse at 50% 42%, var(--canvas), transparent 60%)',
				`background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); opacity: 0.12; mix-blend-mode: multiply`
			]
		},
		'paper-shadow': {
			dark: false,
			base: 'background: var(--chrome)',
			layers: [
				'background: radial-gradient(ellipse at 50% 42%, var(--canvas), transparent 60%)',
				'background: radial-gradient(ellipse 16% 4% at 50% 60%, var(--fall), transparent)',
				`background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); opacity: 0.12; mix-blend-mode: multiply`
			]
		},
		'paper-well': {
			dark: false,
			base: 'background: var(--chrome)',
			layers: [
				'background: radial-gradient(ellipse at 50% 42%, var(--canvas), transparent 60%)',
				'box-shadow: inset 0 1px 2px var(--fall), inset 0 0 40px -12px var(--fall)',
				`background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); opacity: 0.12; mix-blend-mode: multiply`
			]
		},
		'paper-dots': {
			dark: false,
			base: 'background: var(--chrome)',
			layers: [
				'background: radial-gradient(ellipse at 50% 42%, var(--canvas), transparent 60%)',
				'background-image: radial-gradient(var(--line-strong) 1px, transparent 1px); background-size: 14px 14px; background-position: center; mask-image: radial-gradient(circle at 50% 42%, black, transparent 45%)',
				`background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); opacity: 0.12; mix-blend-mode: multiply`
			]
		},
		'paper-fine': {
			dark: false,
			base: 'background: var(--canvas)',
			layers: [
				`background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); opacity: 0.12; mix-blend-mode: multiply`
			]
		}
	} as const satisfies Record<
		string,
		{ dark: boolean; base: string; layers: readonly string[]; reflection?: boolean }
	>;
	export type Stage = keyof typeof STAGES;
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import CopyButton from '$lib/components/copy-button.svelte';
	import type { Control, Values } from './types';

	let {
		stage,
		values = $bindable(),
		controls,
		preview,
		source
	}: {
		stage: Stage;
		values: Values;
		controls: readonly Control[];
		preview: Snippet<[Values]>;
		source: string;
	} = $props();

	type Choice = Extract<Control, { type: 'choice' }>;
	const choices = $derived(controls.filter((c): c is Choice => c.type === 'choice'));
	const flags = $derived(controls.filter((c) => c.type === 'boolean'));
	const spec = $derived<{
		dark: boolean;
		base: string;
		layers: readonly string[];
		reflection?: boolean;
	}>(STAGES[stage]);

	function cycle(c: Choice) {
		const at = c.options.indexOf(values[c.name] as string);
		values[c.name] = c.options[(at + 1) % c.options.length];
	}
	const flip = (name: string) => (values[name] = !values[name]);

	// The caption is light on a dark stage, ink on the paper one.
	const dim = $derived(
		spec.dark ? 'text-white/45 hover:text-white/80' : 'text-ink-subtle hover:text-ink-muted'
	);
	const off = $derived(
		spec.dark ? 'text-white/30 hover:text-white/60' : 'text-ink-subtle/60 hover:text-ink-muted'
	);
	const on = $derived(spec.dark ? 'text-white' : 'text-ink');
</script>

<!-- A stage: one light on the part, the props as a caption under it. -->
<div
	class="relative isolate flex min-h-[26rem] flex-col items-center overflow-hidden {spec.dark
		? 'dark'
		: ''}"
	style={spec.base}
>
	{#each spec.layers as layer, i (i)}
		<div class="pointer-events-none absolute inset-0 -z-10" style={layer}></div>
	{/each}
	<CopyButton text={source} class="absolute top-2 right-2" />
	<div class="flex flex-1 flex-col items-center justify-center pt-10">
		{@render preview(values)}
		{#if spec.reflection}
			<div
				class="pointer-events-none mt-1 -scale-y-100 [mask-image:linear-gradient(to_top,black,transparent_60%)] opacity-20"
				inert
				aria-hidden="true"
			>
				{@render preview(values)}
			</div>
		{/if}
	</div>
	<div class="flex flex-wrap justify-center gap-x-5 gap-y-1 px-6 pb-6 font-mono text-[0.75rem]">
		{#each choices as c (c.name)}
			<button class="cursor-pointer {dim}" onclick={() => cycle(c)}
				>{c.name} <span class={on}>{values[c.name]}</span></button
			>
		{/each}
		{#each flags as f (f.name)}
			<button class="cursor-pointer {values[f.name] ? on : off}" onclick={() => flip(f.name)}
				>{values[f.name] ? '●' : '○'} {f.name}</button
			>
		{/each}
	</div>
</div>
