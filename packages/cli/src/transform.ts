import type { Config } from './types.ts';

/** Rewrites the registry import paths to the aliases of the project. */
export function transformImports(content: string, config: Config) {
	return content
		.replace(/(['"])@registry\/lib\//g, `$1${config.aliases.lib}/`)
		.replace(/(['"])@registry\/ui\//g, `$1${config.aliases.ui}/`);
}
