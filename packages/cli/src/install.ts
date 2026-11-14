import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

type PackageManager = 'pnpm' | 'yarn' | 'bun' | 'npm';

const LOCKFILES: [string, PackageManager][] = [
	['pnpm-lock.yaml', 'pnpm'],
	['yarn.lock', 'yarn'],
	['bun.lock', 'bun'],
	['bun.lockb', 'bun'],
	['package-lock.json', 'npm']
];

export function detectPackageManager(cwd: string): PackageManager {
	for (const [file, manager] of LOCKFILES) {
		if (existsSync(join(cwd, file))) return manager;
	}
	const agent = process.env.npm_config_user_agent ?? '';
	for (const manager of ['pnpm', 'yarn', 'bun'] as const) {
		if (agent.startsWith(manager)) return manager;
	}
	return 'npm';
}

function nameOf(spec: string) {
	const at = spec.lastIndexOf('@');
	return at > 0 ? spec.slice(0, at) : spec;
}

/** Returns the dependencies that are not in the package.json of the project. */
export async function missingDependencies(cwd: string, specs: string[]) {
	const unique = [...new Set(specs)];
	const path = join(cwd, 'package.json');
	if (!existsSync(path)) return unique;
	const pkg = JSON.parse(await readFile(path, 'utf8'));
	const present = new Set([
		...Object.keys(pkg.dependencies ?? {}),
		...Object.keys(pkg.devDependencies ?? {}),
		...Object.keys(pkg.peerDependencies ?? {})
	]);
	return unique.filter((spec) => !present.has(nameOf(spec)));
}

export function installCommand(manager: PackageManager, specs: string[]) {
	const verb = manager === 'npm' ? 'install' : 'add';
	return [manager, verb, ...specs];
}

export function install(cwd: string, specs: string[]) {
	const [command, ...args] = installCommand(detectPackageManager(cwd), specs);
	// A shell finds `pnpm.cmd` and `npm.cmd` on Windows. The specs are `name@range` from the
	// registry. They are quoted, thus a `^` or a `>` stays a part of the argument.
	const quoted = args.map((arg) => `"${arg}"`);
	const result = spawnSync(command, quoted, { cwd, stdio: 'inherit', shell: true });
	if (result.status !== 0) {
		throw new Error(`${command} ${args.join(' ')} failed.`);
	}
}
