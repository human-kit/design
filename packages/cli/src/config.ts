import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { Config } from './types.ts';

export const CONFIG_FILE = 'human-kit.json';
export const DEFAULT_REGISTRY = 'https://design.human-kit.com/r';

export const DEFAULT_CONFIG: Config = {
	$schema: 'https://design.human-kit.com/schema.json',
	registry: DEFAULT_REGISTRY,
	css: 'src/app.css',
	aliases: {
		lib: '$lib',
		ui: '$lib/components/ui'
	}
};

export async function readConfig(cwd: string): Promise<Config | null> {
	const path = join(cwd, CONFIG_FILE);
	if (!existsSync(path)) return null;
	const config = JSON.parse(await readFile(path, 'utf8')) as Config;
	validateConfig(config);
	return config;
}

export async function writeConfig(cwd: string, config: Config) {
	await writeFile(join(cwd, CONFIG_FILE), JSON.stringify(config, null, '\t') + '\n');
}

function validateConfig(config: Config) {
	for (const key of ['lib', 'ui'] as const) {
		const alias = config.aliases?.[key];
		if (typeof alias !== 'string' || !(alias === '$lib' || alias.startsWith('$lib/'))) {
			throw new Error(
				`${CONFIG_FILE}: "aliases.${key}" must start with "$lib". Found: ${JSON.stringify(alias)}.`
			);
		}
	}
	if (typeof config.css !== 'string') throw new Error(`${CONFIG_FILE}: "css" is missing.`);
	if (typeof config.registry !== 'string') {
		throw new Error(`${CONFIG_FILE}: "registry" is missing.`);
	}
}

/** `$lib/components/ui` -> `<cwd>/src/lib/components/ui`. SvelteKit maps `$lib` to `src/lib`. */
export function aliasToPath(cwd: string, alias: string) {
	return join(cwd, 'src', 'lib', alias.slice('$lib'.length));
}
