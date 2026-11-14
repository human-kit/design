import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { CONFIG_FILE, DEFAULT_CONFIG, readConfig, writeConfig } from '../config.ts';
import type { Config, Logger } from '../types.ts';
import { add } from './add.ts';

export type InitOptions = {
	cwd: string;
	css?: string;
	registry?: string;
	install?: boolean;
	logger: Logger;
};

/** Writes human-kit.json, then adds the utils and the theme. */
export async function init(options: InitOptions) {
	const { cwd, logger } = options;
	let config = await readConfig(cwd);

	if (config) {
		logger.info(`${CONFIG_FILE} exists. The command uses it.`);
		if (options.registry) config.registry = options.registry;
	} else {
		config = {
			...DEFAULT_CONFIG,
			css: options.css ?? DEFAULT_CONFIG.css,
			registry: options.registry ?? DEFAULT_CONFIG.registry
		} satisfies Config;
		if (!existsSync(join(cwd, config.css))) {
			throw new Error(`${config.css} does not exist. Give the CSS file with --css <path>.`);
		}
		await writeConfig(cwd, config);
		logger.info(`wrote    ${CONFIG_FILE}`);
	}

	return add({ cwd, config, names: ['utils', 'theme'], install: options.install, logger });
}
