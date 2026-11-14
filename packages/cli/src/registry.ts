import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { isAbsolute, join, resolve } from 'node:path';
import type { RegistryItem } from './types.ts';

function isUrl(source: string) {
	return /^https?:\/\//.test(source);
}

export async function fetchItem(source: string, name: string, cwd: string): Promise<RegistryItem> {
	if (!/^[a-z0-9-]+$/.test(name)) throw new Error(`"${name}" is not a valid item name.`);

	if (isUrl(source)) {
		const url = `${source.replace(/\/$/, '')}/${name}.json`;
		const response = await fetch(url);
		if (response.status === 404) throw new Error(`The registry has no item "${name}".`);
		if (!response.ok) throw new Error(`GET ${url} failed with ${response.status}.`);
		return (await response.json()) as RegistryItem;
	}

	const dir = isAbsolute(source) ? source : resolve(cwd, source);
	const path = join(dir, `${name}.json`);
	if (!existsSync(path)) throw new Error(`The registry has no item "${name}" (${path}).`);
	return JSON.parse(await readFile(path, 'utf8')) as RegistryItem;
}

/**
 * Fetches the items and all their registry dependencies. A dependency comes before the item
 * that needs it, and each item is in the list one time.
 */
export async function resolveItems(source: string, names: string[], cwd: string) {
	const resolved = new Map<string, RegistryItem>();
	const visiting = new Set<string>();

	async function visit(name: string) {
		if (resolved.has(name) || visiting.has(name)) return;
		visiting.add(name);
		const item = await fetchItem(source, name, cwd);
		for (const dependency of item.registryDependencies) await visit(dependency);
		visiting.delete(name);
		resolved.set(name, item);
	}

	for (const name of names) await visit(name);
	return [...resolved.values()];
}
