/**
 * Builds the registry: one JSON file per item in `docs/static/r`, plus `index.json`.
 *
 * The files of an item and its dependencies are not written by hand. The script finds them:
 *   - `registry:ui` items are the folders in `src/ui`, with every file in the folder.
 *   - an import of `@registry/lib/<name>` or `@registry/ui/<name>` is a registry dependency.
 *   - any other bare import (except `svelte`) is an npm dependency. Its version range comes
 *     from `registry/package.json`, thus the CLI installs the version the docs are built with.
 */
import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

type ItemType = 'registry:lib' | 'registry:style' | 'registry:ui';

type Manifest = {
	items: Record<string, { type: ItemType; title: string; description: string }>;
};

export type RegistryFile = { path: string; type: ItemType; content: string };

export type RegistryItem = {
	name: string;
	type: ItemType;
	title: string;
	description: string;
	dependencies: string[];
	registryDependencies: string[];
	files: RegistryFile[];
};

const registryDir = join(dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = join(registryDir, 'src');
const outDir = join(registryDir, '..', 'docs', 'static', 'r');

const FIXED_FILES: Record<string, string[]> = {
	utils: ['lib/utils.ts'],
	segment: ['lib/segment.ts'],
	theme: ['styles/theme.css']
};

const IMPORT_PATTERN = /(?:from\s+|import\s+|@import\s+)['"]([^'"]+)['"]/g;

function packageName(specifier: string) {
	const parts = specifier.split('/');
	return specifier.startsWith('@') ? parts.slice(0, 2).join('/') : parts[0];
}

async function filesOf(name: string, type: ItemType) {
	if (FIXED_FILES[name]) return FIXED_FILES[name];
	if (type !== 'registry:ui') throw new Error(`No files are known for the item "${name}".`);
	const entries = await readdir(join(srcDir, 'ui', name));
	return entries.sort().map((entry) => `ui/${name}/${entry}`);
}

async function buildItem(
	name: string,
	meta: Manifest['items'][string],
	versions: Record<string, string>,
	known: Set<string>
): Promise<RegistryItem> {
	const dependencies = new Set<string>();
	const registryDependencies = new Set<string>();
	const files: RegistryFile[] = [];

	for (const path of await filesOf(name, meta.type)) {
		const content = await readFile(join(srcDir, path), 'utf8');
		files.push({ path, type: meta.type, content });

		for (const [, specifier] of content.matchAll(IMPORT_PATTERN)) {
			if (specifier.startsWith('.')) continue;
			if (specifier.startsWith('@registry/lib/')) {
				const dependency = specifier.slice('@registry/lib/'.length);
				if (!FIXED_FILES[dependency]?.includes(`lib/${dependency}.ts`)) {
					throw new Error(`${path} imports the unknown lib "${dependency}".`);
				}
				registryDependencies.add(dependency);
				continue;
			}
			if (specifier.startsWith('@registry/ui/')) {
				const dependency = specifier.slice('@registry/ui/'.length).split('/')[0];
				if (!known.has(dependency)) {
					throw new Error(`${path} imports the unknown item "${dependency}".`);
				}
				registryDependencies.add(dependency);
				continue;
			}
			if (specifier.startsWith('@registry/')) {
				throw new Error(`${path} imports "${specifier}". Only lib/* and ui/* are allowed.`);
			}
			const pkg = packageName(specifier);
			if (pkg === 'svelte') continue;
			const range = versions[pkg];
			if (!range) {
				throw new Error(`${path} imports "${pkg}", which is not in registry/package.json.`);
			}
			dependencies.add(`${pkg}@${range}`);
		}
	}

	registryDependencies.delete(name);

	return {
		name,
		type: meta.type,
		title: meta.title,
		description: meta.description,
		dependencies: [...dependencies].sort(),
		registryDependencies: [...registryDependencies].sort(),
		files
	};
}

export async function buildRegistry() {
	const manifest: Manifest = JSON.parse(await readFile(join(registryDir, 'registry.json'), 'utf8'));
	const pkg = JSON.parse(await readFile(join(registryDir, 'package.json'), 'utf8'));
	const versions: Record<string, string> = pkg.dependencies ?? {};
	const known = new Set(Object.keys(manifest.items));

	const uiFolders = await readdir(join(srcDir, 'ui'));
	const missing = uiFolders.filter((folder) => manifest.items[folder]?.type !== 'registry:ui');
	if (missing.length > 0) {
		throw new Error(`registry.json has no registry:ui entry for: ${missing.join(', ')}.`);
	}

	const items: RegistryItem[] = [];
	for (const [name, meta] of Object.entries(manifest.items)) {
		items.push(await buildItem(name, meta, versions, known));
	}
	return items;
}

async function main() {
	const items = await buildRegistry();

	await rm(outDir, { recursive: true, force: true });
	await mkdir(outDir, { recursive: true });

	for (const item of items) {
		await writeFile(join(outDir, `${item.name}.json`), JSON.stringify(item, null, '\t') + '\n');
	}

	const index = items.map(({ name, type, title, description, registryDependencies }) => ({
		name,
		type,
		title,
		description,
		registryDependencies
	}));
	await writeFile(join(outDir, 'index.json'), JSON.stringify(index, null, '\t') + '\n');

	console.log(`Wrote ${items.length} items to ${relative(process.cwd(), outDir) || '.'}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
	await main();
}
