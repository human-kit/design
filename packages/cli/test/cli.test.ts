import { existsSync } from 'node:fs';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { buildRegistry } from '../../../registry/scripts/build.ts';
import { injectTheme } from '../src/css.ts';
import { run } from '../src/index.ts';
import type { Logger } from '../src/types.ts';

let registryDir: string;
let cwd: string;
let logs: string[];

const logger: Logger = {
	info: (message) => logs.push(message),
	warn: (message) => logs.push(`warning: ${message}`)
};

const read = (path: string) => readFile(join(cwd, path), 'utf8');

beforeAll(async () => {
	registryDir = await mkdtemp(join(tmpdir(), 'hk-registry-'));
	for (const item of await buildRegistry()) {
		await writeFile(join(registryDir, `${item.name}.json`), JSON.stringify(item));
	}
});

beforeEach(async () => {
	logs = [];
	cwd = await mkdtemp(join(tmpdir(), 'hk-project-'));
	await mkdir(join(cwd, 'src'));
	await writeFile(join(cwd, 'src/app.css'), "@import 'tailwindcss';\n");
	await writeFile(
		join(cwd, 'package.json'),
		JSON.stringify({ name: 'app', devDependencies: { tailwindcss: '^4.1.0' } })
	);
});

afterEach(async () => {
	await rm(cwd, { recursive: true, force: true });
});

const init = () => run(['init', '--registry', registryDir, '--no-install'], cwd, logger);
const add = (...args: string[]) => run(['add', ...args, '--no-install'], cwd, logger);

describe('init', () => {
	it('writes the config, the utils and the theme', async () => {
		await init();

		const config = JSON.parse(await read('human-kit.json'));
		expect(config.aliases).toEqual({ lib: '$lib', ui: '$lib/components/ui' });
		expect(await read('src/lib/utils.ts')).toContain('export function cn(');

		const css = await read('src/app.css');
		expect(css.startsWith("@import 'tailwindcss';\n@import 'tw-animate-css';")).toBe(true);
		expect(css).toContain('--primary:');
		expect(css).toContain('@custom-variant dark');
	});

	it('does not add a second copy of the theme', async () => {
		await init();
		const first = await read('src/app.css');
		await init();
		expect(await read('src/app.css')).toBe(first);
	});

	it('stops when the CSS file does not exist', async () => {
		await expect(
			run(['init', '--css', 'src/missing.css', '--registry', registryDir], cwd, logger)
		).rejects.toThrow('src/missing.css does not exist');
	});
});

describe('add', () => {
	it('copies a component with its registry dependencies and rewrites the imports', async () => {
		await init();
		await add('dialog');

		const content = await read('src/lib/components/ui/dialog/dialog-content.svelte');
		expect(content).toContain("from '$lib/utils'");
		expect(content).not.toContain('@registry/');
		expect(existsSync(join(cwd, 'src/lib/components/ui/dialog/index.ts'))).toBe(true);
	});

	it('shows the missing npm packages with their version range', async () => {
		await init();
		logs = [];
		await add('select');

		const line = logs.find((message) => message.startsWith('Install the dependencies:'));
		expect(line).toMatch(/@human-kit\/ui@\^\d/);
		expect(line).toMatch(/@lucide\/svelte@/);
		expect(line).not.toMatch(/tailwindcss@/);
	});

	it('keeps a file with local changes unless --overwrite is given', async () => {
		await init();
		await add('button');
		const path = 'src/lib/components/ui/button/button.svelte';
		await writeFile(join(cwd, path), '<!-- mine -->');

		await add('button');
		expect(await read(path)).toBe('<!-- mine -->');
		expect(logs.some((message) => message.includes(`skipped  ${path}`))).toBe(true);

		await add('button', '--overwrite');
		expect(await read(path)).toContain('buttonVariants');
	});

	it('follows custom aliases', async () => {
		await init();
		const config = JSON.parse(await read('human-kit.json'));
		config.aliases = { lib: '$lib/design', ui: '$lib/design/ui' };
		await writeFile(join(cwd, 'human-kit.json'), JSON.stringify(config));

		await add('dialog');
		const content = await read('src/lib/design/ui/dialog/dialog-title.svelte');
		expect(content).toContain("from '$lib/design/utils'");
		expect(await read('src/lib/design/utils.ts')).toContain('twMerge');
	});

	it('stops on an unknown item', async () => {
		await init();
		await expect(add('nope')).rejects.toThrow('The registry has no item "nope"');
	});

	it('stops when the config does not exist', async () => {
		await expect(add('button')).rejects.toThrow('human-kit.json does not exist');
	});
});

describe('injectTheme', () => {
	it('puts the theme imports after the Tailwind import', () => {
		const { css } = injectTheme(
			"@import 'tailwindcss';\n@plugin 'x';\n",
			"@import 'tw-animate-css';\n:root { --a: 1; }"
		);
		expect(css.split('\n').slice(0, 3)).toEqual([
			"@import 'tailwindcss';",
			"@import 'tw-animate-css';",
			"@plugin 'x';"
		]);
	});

	it('replaces the block between the markers', () => {
		const first = injectTheme("@import 'tailwindcss';\n", ':root { --a: 1; }').css;
		const second = injectTheme(first, ':root { --a: 2; }').css;
		expect(second).toContain('--a: 2;');
		expect(second).not.toContain('--a: 1;');
	});
});
