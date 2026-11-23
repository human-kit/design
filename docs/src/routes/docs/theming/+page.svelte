<script lang="ts">
	import Heading from '$lib/shell/heading.svelte';
	import DocToolbar from '$lib/shell/doc-toolbar.svelte';
	import CodeBlock from '$lib/components/code-block.svelte';

	const tokens = [
		['canvas', 'The page.'],
		['surface / surface-muted', 'The box of a control or a card, and a quieter one.'],
		['overlay', 'What opens over the page: a popover, a menu, a dialog.'],
		['hover / selected', 'An item under the pointer, and the selected item.'],
		[
			'ink / ink-muted / ink-subtle',
			'The text, in three weights. Subtle is for placeholders and icons.'
		],
		['line / line-strong', 'Dividers and the edge of a region.'],
		['primary / primary-hover / on-primary', 'The main action, and its text.'],
		[
			'primary-soft / primary-line / primary-ink',
			'A quiet fill, a border and text in the primary colour.'
		],
		[
			'danger / success / warning / info',
			'The states. Each one has -soft, -line, -ink and -solid.'
		],
		[
			'tone-{gray, blue, cyan, teal, green, amber, orange, red, pink, violet}',
			'The palette for tags and charts, with the same four roles.'
		],
		['ring', 'The focus ring.']
	];

	const override = `:root {
	--primary: oklch(0.55 0.2 260);
	--primary-hover: oklch(0.51 0.21 260);
	--primary-ink: oklch(0.47 0.2 260);
	--ring: oklch(0.55 0.2 260);
}

.dark {
	--primary-ink: oklch(0.78 0.12 260);
	--ring: oklch(0.7 0.15 260);
}`;
</script>

<svelte:head>
	<title>Theming · human-kit design</title>
	<meta name="description" content="Change the colors, the radius and the dark theme." />
</svelte:head>

<article class="doc-prose relative">
	<DocToolbar />
	<header>
		<h1>Theming</h1>
		<p>
			The components use semantic tokens. A token names the use of a color, not the color. Change a
			token, and all the components change.
		</p>
	</header>

	<section>
		<Heading id="tokens" text="Tokens" />
		<p>
			Each token is a CSS variable, and a Tailwind CSS utility: <code>--primary</code> gives
			<code>bg-primary</code>, <code>text-primary</code> and <code>border-primary</code>.
		</p>
		<div class="doc-block overflow-x-auto">
			<table>
				<thead>
					<tr>
						<th scope="col">Token</th>
						<th scope="col">Use</th>
					</tr>
				</thead>
				<tbody>
					{#each tokens as [name, use] (name)}
						<tr>
							<td><code>{name}</code></td>
							<td>{use}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>

	<section>
		<Heading id="change-a-token" text="Change a token" />
		<p>
			Write the new value in your CSS file, after the theme block. Give a value for the light theme
			and for the dark theme.
		</p>
		<CodeBlock code={override} label="Token override" />
	</section>

	<section>
		<Heading id="dark-theme" text="Dark theme" />
		<p>
			The dark theme starts when an ancestor has the <code>dark</code> class. Put the class on the
			<code>html</code> element. The components have no <code>dark:</code> classes, because the tokens
			change.
		</p>
	</section>

	<section>
		<Heading id="contrast" text="Contrast" />
		<p>The default tokens obey WCAG 2.2 in the two themes:</p>
		<ul>
			<li>A text has a contrast of 4.5:1 or more on its surface.</li>
			<li>The focus ring has a contrast of 3:1 or more.</li>
		</ul>
		<p>When you change a token, check these pairs again.</p>
	</section>

	<section>
		<Heading id="reduced-motion" text="Reduced motion" />
		<p>When the system asks for reduced motion, the overlays open and close with no animation.</p>
	</section>
</article>
