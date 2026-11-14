import manifest from '../../../registry/registry.json';

export type ComponentEntry = { name: string; title: string; description: string };

export const components: ComponentEntry[] = Object.entries(manifest.items)
	.filter(([, item]) => item.type === 'registry:ui')
	.map(([name, item]) => ({ name, title: item.title, description: item.description }));

/** The command that a reader copies. It is the same for every package manager except the runner. */
export const CLI = 'npx @human-kit/design';
