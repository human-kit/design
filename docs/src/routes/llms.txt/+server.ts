import { CLI, components } from '$lib/registry';
import { ORIGIN } from '$lib/site';

export const prerender = true;

// The site as an AI tool reads it: what design is, how it is installed, and every component.
export const GET = () =>
	new Response(
		`# human-kit design

> Styled, accessible Svelte 5 components that you copy into your project and own.

human-kit design (also written "humankit design") is a registry of finished components built on \`@human-kit/ui\` (https://ui.human-kit.com), the headless library of the same family. A CLI copies the source of each component into your project, so the code is yours to change. It is MIT licensed, and the source is at https://github.com/human-kit/design.

- Add a component: \`${CLI} add button\`
- Family: https://human-kit.com

## Docs

- [Installation](${ORIGIN}/docs/installation): Set up human-kit design in a SvelteKit project.
- [Theming](${ORIGIN}/docs/theming): Change the colors, the radius and the dark theme.

## Components

${components.map(({ name, title, description }) => `- [${title}](${ORIGIN}/docs/components/${name}): ${description}`).join('\n')}
`,
		{ headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
	);
