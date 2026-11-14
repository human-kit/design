import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { aliasToPath } from '../config.ts';
import { injectTheme } from '../css.ts';
import { detectPackageManager, install, installCommand, missingDependencies } from '../install.ts';
import { resolveItems } from '../registry.ts';
import { transformImports } from '../transform.ts';
import type { Config, Logger, RegistryFile } from '../types.ts';

export type AddOptions = {
	cwd: string;
	config: Config;
	names: string[];
	/** Replaces a file that is different from the registry. */
	overwrite?: boolean;
	/** Installs the missing npm packages. When false, the command only shows them. */
	install?: boolean;
	logger: Logger;
};

export type AddResult = {
	written: string[];
	skipped: string[];
	/** The npm packages that the project did not have. */
	dependencies: string[];
};

function targetOf(cwd: string, config: Config, file: RegistryFile) {
	if (file.type === 'registry:lib') {
		return join(aliasToPath(cwd, config.aliases.lib), file.path.replace(/^lib\//, ''));
	}
	if (file.type === 'registry:ui') {
		return join(aliasToPath(cwd, config.aliases.ui), file.path.replace(/^ui\//, ''));
	}
	return join(cwd, config.css);
}

async function writeStyle(target: string, shown: string, theme: string, logger: Logger) {
	if (!existsSync(target)) {
		throw new Error(`${shown} does not exist. Set "css" in human-kit.json to your CSS file.`);
	}
	const current = await readFile(target, 'utf8');
	const { css, hasTailwind } = injectTheme(current, theme);
	if (!hasTailwind) {
		logger.warn(`${shown} has no @import 'tailwindcss'. The theme needs Tailwind CSS v4.`);
	}
	if (css === current) return false;
	await writeFile(target, css);
	return true;
}

export async function add(options: AddOptions): Promise<AddResult> {
	const { cwd, config, logger } = options;
	const items = await resolveItems(config.registry, options.names, cwd);
	const result: AddResult = { written: [], skipped: [], dependencies: [] };
	const dependencies: string[] = [];

	for (const item of items) {
		dependencies.push(...item.dependencies);

		for (const file of item.files) {
			const target = targetOf(cwd, config, file);
			const shown = relative(cwd, target).replaceAll('\\', '/');

			if (file.type === 'registry:style') {
				if (await writeStyle(target, shown, file.content, logger)) result.written.push(shown);
				continue;
			}

			const content = transformImports(file.content, config);
			if (existsSync(target)) {
				const current = await readFile(target, 'utf8');
				if (current === content) continue;
				if (!options.overwrite) {
					result.skipped.push(shown);
					continue;
				}
			}
			await mkdir(dirname(target), { recursive: true });
			await writeFile(target, content);
			result.written.push(shown);
		}
	}

	for (const path of result.written) logger.info(`wrote    ${path}`);
	for (const path of result.skipped) {
		logger.warn(`skipped  ${path} (it has changes; use --overwrite to replace it)`);
	}

	result.dependencies = await missingDependencies(cwd, dependencies);
	if (result.dependencies.length > 0) {
		if (options.install === false) {
			const command = installCommand(detectPackageManager(cwd), result.dependencies);
			logger.info(`Install the dependencies: ${command.join(' ')}`);
		} else {
			install(cwd, result.dependencies);
		}
	}

	return result;
}
