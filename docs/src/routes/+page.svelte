<script lang="ts">
	import '@fontsource/dm-serif-display/400.css';
	import '@fontsource/dm-serif-display/400-italic.css';
	import type { Component } from 'svelte';
	import { buttonVariants } from '@registry/ui/button';
	import { resolve } from '$app/paths';
	import CodeBlock from '$lib/components/code-block.svelte';
	import FamilyLogo from '$lib/components/family-logo.svelte';
	import AvatarGroups from '$lib/demos/avatar/groups.svelte';
	import BadgeTones from '$lib/demos/badge/tones.svelte';
	import ButtonVariants from '$lib/demos/button/variants.svelte';
	import CalendarBasic from '$lib/demos/calendar/basic.svelte';
	import CheckboxGroupBasic from '$lib/demos/checkbox-group/basic.svelte';
	import PinInputBasic from '$lib/demos/pin-input/basic.svelte';
	import ProgressBasic from '$lib/demos/progress/basic.svelte';
	import RatingBasic from '$lib/demos/rating/basic.svelte';
	import SelectBasic from '$lib/demos/select/basic.svelte';
	import SliderBasic from '$lib/demos/slider/basic.svelte';
	import SwitchBasic from '$lib/demos/switch/basic.svelte';
	import TabsBasic from '$lib/demos/tabs/basic.svelte';
	import ToggleGroupBasic from '$lib/demos/toggle-group/basic.svelte';
	import Chapter from '$lib/landing/chapter.svelte';
	import Exhibit from '$lib/landing/exhibit.svelte';
	import Repaint from '$lib/landing/repaint.svelte';
	import { nav } from '$lib/nav';
	import { CLI, components } from '$lib/registry';
	import Header from '$lib/shell/header.svelte';

	// The page is the catalogue of an exhibition. These are the works on its walls: the part,
	// the demo that shows it, and the place it takes on the wall.
	const hung: [name: string, work: Component, place: string][] = [
		['calendar', CalendarBasic, 'md:col-span-3 lg:col-span-4'],
		['tabs', TabsBasic, 'md:col-span-3 lg:col-span-8'],
		['switch', SwitchBasic, 'md:col-span-3 lg:col-span-4'],
		['slider', SliderBasic, 'md:col-span-3 lg:col-span-4'],
		['select', SelectBasic, 'md:col-span-3 lg:col-span-4'],
		['checkbox-group', CheckboxGroupBasic, 'md:col-span-3 lg:col-span-4'],
		['pin-input', PinInputBasic, 'md:col-span-3 lg:col-span-4'],
		['progress', ProgressBasic, 'md:col-span-3 lg:col-span-4'],
		['button', ButtonVariants, 'md:col-span-3 lg:col-span-4'],
		['rating', RatingBasic, 'md:col-span-3 lg:col-span-4'],
		['badge', BadgeTones, 'md:col-span-3 lg:col-span-4'],
		['avatar', AvatarGroups, 'md:col-span-3 lg:col-span-6'],
		['toggle-group', ToggleGroupBasic, 'md:col-span-6 lg:col-span-6']
	];
	const entries = new Map(components.map((entry) => [entry.name, entry]));
	const works = hung.map(([name, work, place]) => ({ ...entries.get(name)!, work, place }));

	// The checklist names every part, by room: the first group of the sidebar is the guides.
	// The numbers run on from one room to the next.
	let count = 0;
	const rooms = nav.slice(1).map((group) => ({
		label: group.label,
		items: group.items.map((item) => ({ ...item, number: ++count }))
	}));

	const two = (value: number) => String(value).padStart(2, '0');

	let hue = $state(277);
	const tokens = $derived(`:root {
	--primary: oklch(0.55 0.2 ${hue});
}`);

	const notice = [
		['On show', `${components.length} parts for Svelte 5`],
		['Admission', 'Free, under the MIT licence'],
		['Hours', 'Open in light and in dark'],
		['To take home', 'Any of them, as source']
	];
</script>

<svelte:head>
	<title>human-kit design</title>
	<meta
		name="description"
		content="Styled, accessible Svelte 5 components that you copy into your project and own."
	/>
</svelte:head>

<!-- eslint-disable svelte/no-navigation-without-resolve -->
<div class="bg-canvas min-h-dvh px-3 py-2 sm:px-8">
	<div class="mx-auto max-w-[1536px]">
		<Header />
	</div>

	<main id="main" class="mx-auto max-w-[1120px] px-3">
		<!-- The poster of the exhibition: its name, large, and the notice a poster carries. -->
		<section class="pt-20 sm:pt-32">
			<p class="text-ink-muted text-emphasis">An exhibition of parts for Svelte 5</p>
			<h1
				class="font-display mt-5 text-[clamp(3.25rem,10.5vw,7.5rem)] leading-[0.95] tracking-[-0.02em]"
			>
				Parts that look <i>finished</i>
			</h1>
			<p class="text-ink-muted mt-8 max-w-[34rem] text-[1.1875rem] leading-[1.5]">
				Styled components that you copy into your project. From then on the code is yours. The
				behaviour and the accessibility come from
				<a
					class="text-ink underline decoration-1 underline-offset-4"
					href="https://ui.human-kit.com">human-kit ui</a
				>, and this kit adds the look.
			</p>
			<div class="mt-9 flex flex-wrap items-center gap-2">
				<a href={resolve('/docs/installation')} class={buttonVariants()}>Get started</a>
				<a href="#checklist" class={buttonVariants({ variant: 'outline' })}>Read the checklist</a>
			</div>

			<dl class="border-ink mt-20 grid grid-cols-2 border-t sm:mt-28 lg:grid-cols-4">
				{#each notice as [term, fact] (term)}
					<div class="border-line border-b py-4 pe-6 lg:border-b-0">
						<dt class="text-small text-ink-muted">{term}</dt>
						<dd class="text-emphasis text-ink mt-1">{fact}</dd>
					</div>
				{/each}
			</dl>
		</section>

		<!-- The room. A museum asks not to touch; here the works are live, and it asks the
		     other thing. -->
		<section class="border-line border-t pt-14 pb-10 sm:pt-20" aria-labelledby="room">
			<div class="flex flex-wrap items-end justify-between gap-x-12 gap-y-4 pb-10 sm:pb-14">
				<h2
					id="room"
					class="font-display text-[2.75rem] leading-[1] tracking-[-0.015em] sm:text-[4.25rem]"
				>
					Please <i>touch</i><br />the works
				</h2>
				<div class="flex max-w-[23rem] flex-col gap-4">
					<p class="text-ink-muted text-[0.9375rem] leading-[1.65]">
						{works.length} of the {components.length}, live and at the size they have in an app.
						Each label gives the size of the work as it hangs in your window. The colour is yours to
						change.
					</p>
					<Repaint bind:hue />
				</div>
			</div>
			<div class="grid grid-cols-1 gap-x-3 gap-y-5 md:grid-cols-6 lg:grid-cols-12">
				{#each works as { name, title, description, work: Work, place }, index (name)}
					<Exhibit number={index + 1} {name} {title} {description} class={place}>
						<Work />
					</Exhibit>
				{/each}
			</div>
		</section>

		<Chapter figure="i">
			{#snippet title()}Take one <i>home</i>.{/snippet}
			{#snippet text()}
				<p>
					The command writes the component into your project as source. There is no package to
					update and no wrapper to work around.
				</p>
				<p>Change a class, a variant or the whole file. Nothing comes back to undo it.</p>
			{/snippet}
			<div class="flex flex-col gap-3">
				<CodeBlock code={`${CLI} init`} label="Set the project up" />
				<CodeBlock code={`${CLI} add button dialog select`} label="Add components" />
			</div>
		</Chapter>

		<Chapter figure="ii">
			{#snippet title()}Nothing is behind <i>glass</i>.{/snippet}
			{#snippet text()}
				<p>
					Under each part there is a primitive of human-kit ui. The keyboard, the focus, the roles
					and the states are set there, and tested there.
				</p>
				<p>This kit never writes that again. It only says how the part looks.</p>
			{/snippet}
			<dl class="text-body">
				{#each [['Keyboard', 'Every part can be used without a pointer.'], ['Focus', 'It goes where it must, and it comes back.'], ['Screen readers', 'Roles, names and states, set for you.'], ['Forms', 'Native names and values, and their errors.']] as [term, fact] (term)}
					<div class="border-line flex gap-6 border-b py-3.5 first:border-t">
						<dt class="text-ink w-32 shrink-0 font-medium">{term}</dt>
						<dd class="text-ink-muted">{fact}</dd>
					</div>
				{/each}
			</dl>
		</Chapter>

		<Chapter figure="iii">
			{#snippet title()}Repaint the <i>walls</i>.{/snippet}
			{#snippet text()}
				<p>
					Colours, corners and heights live in one stylesheet. Change the hue of the primary and
					every part follows, in light and in dark.
				</p>
				<p>The swatches here are the ones of the room above. Pick one, and the token changes.</p>
				<p>
					<a
						class="text-ink underline decoration-1 underline-offset-4"
						href={resolve('/docs/theming')}>Read about theming</a
					>
				</p>
			{/snippet}
			<div class="flex flex-col gap-4">
				<Repaint bind:hue />
				<CodeBlock code={tokens} label="The token of the primary" lang="css" />
			</div>
		</Chapter>

		<!-- The checklist of the exhibition: every part by its number, as at the back of a
		     catalogue. -->
		<section id="checklist" class="border-line scroll-mt-8 border-t py-14 sm:py-20">
			<h2 class="font-display text-[2.25rem] leading-[1.05] tracking-[-0.01em] sm:text-[2.75rem]">
				The <i>checklist</i>
			</h2>
			<p class="text-ink-muted mt-4 text-[0.9375rem]">
				All {components.length} works, room by room.
			</p>
			<div class="mt-10 columns-2 gap-x-8 sm:columns-3 lg:columns-4">
				{#each rooms as room (room.label)}
					<div class="mb-10 break-inside-avoid">
						<h3 class="text-small text-ink-muted border-line border-b pb-2">{room.label}</h3>
						<ul class="text-body mt-1.5 flex flex-col">
							{#each room.items as item (item.href)}
								<li>
									<a
										href={item.href}
										class="group focus-visible:shadow-focus flex gap-3 rounded-sm py-1 outline-hidden"
									>
										<span class="text-ink-subtle tabular-nums">{two(item.number)}</span>
										<span class="text-ink underline-offset-4 group-hover:underline"
											>{item.title}</span
										>
									</a>
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</section>
	</main>

	<!-- The colophon: what the catalogue is made with, and who signs it. -->
	<footer
		class="border-ink text-small text-ink-muted mx-3 flex max-w-[1096px] flex-wrap items-end justify-between gap-x-12 gap-y-6 border-t py-8 min-[1144px]:mx-auto"
	>
		<p class="max-w-[30rem]">
			<span class="text-ink">Colophon.</span> Set in DM Serif Display and Geist. Built on human-kit
			ui. Free under the MIT licence.
			<a class="hover:text-ink underline underline-offset-4" href={resolve('/docs/installation')}
				>Docs</a
			>,
			<a class="hover:text-ink underline underline-offset-4" href="https://ui.human-kit.com"
				>human-kit ui</a
			>,
			<a
				class="hover:text-ink underline underline-offset-4"
				href="https://github.com/human-kit/design">GitHub</a
			>.
		</p>
		<a
			href="https://human-kit.com"
			class="focus-visible:shadow-focus flex items-center gap-2.5 rounded-sm outline-hidden"
		>
			A product of <FamilyLogo class="text-ink h-[1.125rem] w-auto" />
			<span class="sr-only">human-kit</span>
		</a>
	</footer>
</div>
