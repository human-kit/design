const START = '/* human-kit:theme:start */';
const END = '/* human-kit:theme:end */';
const IMPORT_LINE = /^@import\s+[^;]+;\s*$/gm;

/**
 * Puts the theme into a CSS file that imports Tailwind. The theme goes between two marker
 * comments, thus a second run replaces it and does not add a copy. The `@import` lines of the
 * theme go up, after the import of Tailwind, because CSS ignores an `@import` after a rule.
 */
export function injectTheme(css: string, theme: string) {
	const themeImports = theme.match(IMPORT_LINE)?.map((line) => line.trim()) ?? [];
	const themeBody = theme.replace(IMPORT_LINE, '').trim();
	const block = `${START}\n${themeBody}\n${END}`;

	let result = css;
	const start = result.indexOf(START);
	const end = result.indexOf(END);
	if (start !== -1 && end > start) {
		result = result.slice(0, start) + block + result.slice(end + END.length);
	} else {
		result = `${result.trimEnd()}\n\n${block}\n`;
	}

	const tailwindImport = result.match(/^@import\s+['"]tailwindcss['"][^;]*;\s*$/m);
	const missing = themeImports.filter((line) => !result.includes(line));
	if (missing.length > 0) {
		if (tailwindImport?.index !== undefined) {
			const at = tailwindImport.index + tailwindImport[0].trimEnd().length;
			result = `${result.slice(0, at)}\n${missing.join('\n')}${result.slice(at)}`;
		} else {
			result = `${missing.join('\n')}\n${result}`;
		}
	}

	return { css: result, hasTailwind: tailwindImport !== null };
}
