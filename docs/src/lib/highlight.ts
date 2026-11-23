import { createHighlighterCoreSync, type HighlighterCore } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';
import bash from 'shiki/langs/bash.mjs';
import css from 'shiki/langs/css.mjs';
import json from 'shiki/langs/json.mjs';
import svelte from 'shiki/langs/svelte.mjs';
import typescript from 'shiki/langs/typescript.mjs';
import githubDark from 'shiki/themes/github-dark.mjs';
import githubLight from 'shiki/themes/github-light.mjs';

export type Lang = 'svelte' | 'ts' | 'json' | 'bash' | 'css';

// The themes of the @human-kit/ui docs. Both are written into each token as a variable, and the
// stylesheet picks the one of the current theme, thus a change of theme needs no new pass.
const THEMES = { light: 'github-light', dark: 'github-dark' } as const;

let highlighter: HighlighterCore | undefined;

/**
 * Made on the first call, with the few grammars the docs show. Synchronous on purpose: the
 * prerendered page already carries the colours, and the client draws the same on hydration,
 * so the code never shows plain and then turns coloured.
 */
function load() {
	highlighter ??= createHighlighterCoreSync({
		themes: [githubLight, githubDark],
		langs: [svelte, typescript, json, bash, css],
		engine: createJavaScriptRegexEngine()
	});
	return highlighter;
}

/** The language a snippet is most likely in, for a block that does not say. */
export function guessLang(code: string): Lang {
	const text = code.trimStart();
	if (/^(npx|pnpm|npm|yarn|bun)\s/.test(text)) return 'bash';
	if (text.startsWith('{') || text.startsWith('[')) return 'json';
	if (text.startsWith('<')) return 'svelte';
	if (/^(:root|@|\.[\w-]+\s*\{)/.test(text)) return 'css';
	return 'ts';
}

/** The tokens of the code as HTML: the inner part of a `<code>`, with no `<pre>` around it. */
export function highlight(code: string, lang: Lang = guessLang(code)) {
	const shiki = load();
	const html = shiki.codeToHtml(code, {
		lang: lang === 'ts' ? 'typescript' : lang,
		themes: THEMES,
		defaultColor: false
	});
	// <pre ...><code>…</code></pre>: keep what is inside the code element.
	return html.replace(/^<pre[^>]*><code>/, '').replace(/<\/code><\/pre>$/, '');
}
