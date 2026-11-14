import { readFileSync } from 'node:fs';
import { parseArgs } from 'node:util';
import { add } from './commands/add.ts';
import { init } from './commands/init.ts';
import { CONFIG_FILE, readConfig } from './config.ts';
import type { Logger } from './types.ts';

export type { Config, RegistryItem } from './types.ts';

const HELP = `Usage: human-kit-design <command> [options]

Commands:
  init               Write ${CONFIG_FILE}, then add the utils and the theme.
  add <name...>      Copy the components into your project.

Options:
  --css <path>       The CSS file that imports Tailwind (init). Default: src/app.css.
  --registry <src>   A registry URL or folder. It replaces the one in ${CONFIG_FILE}.
  --overwrite        Replace the files that have changes (add).
  --no-install       Show the missing packages, but do not install them.
  -h, --help         Show this help.
  -v, --version      Show the version.`;

const consoleLogger: Logger = {
	info: (message) => console.log(message),
	warn: (message) => console.warn(`warning: ${message}`)
};

export async function run(argv: string[], cwd = process.cwd(), logger = consoleLogger) {
	const { values, positionals } = parseArgs({
		args: argv,
		allowPositionals: true,
		allowNegative: true,
		options: {
			css: { type: 'string' },
			registry: { type: 'string' },
			overwrite: { type: 'boolean' },
			install: { type: 'boolean', default: true },
			help: { type: 'boolean', short: 'h' },
			version: { type: 'boolean', short: 'v' }
		}
	});
	const [command, ...names] = positionals;

	if (values.version) {
		const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
		logger.info(pkg.version);
		return;
	}
	if (values.help || !command) {
		logger.info(HELP);
		return;
	}

	if (command === 'init') {
		await init({
			cwd,
			css: values.css,
			registry: values.registry,
			install: values.install,
			logger
		});
		logger.info('Done. Add a component: human-kit-design add button');
		return;
	}

	if (command === 'add') {
		if (names.length === 0) throw new Error('Give one or more component names: add button dialog');
		const config = await readConfig(cwd);
		if (!config) throw new Error(`${CONFIG_FILE} does not exist. Run init first.`);
		if (values.registry) config.registry = values.registry;
		await add({
			cwd,
			config,
			names,
			overwrite: values.overwrite,
			install: values.install,
			logger
		});
		return;
	}

	throw new Error(`Unknown command "${command}".\n\n${HELP}`);
}
