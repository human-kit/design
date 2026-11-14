/**
 * Checks the color pairs of the theme against WCAG 2.2, in the light and the dark theme.
 *
 *   - 4.5:1 for text on its surface (1.4.3).
 *   - 3:1 for the focus ring and the edge of a form field on their surface (1.4.11).
 *
 * The tokens must be plain `oklch(L C H)` values. Exits with 1 when a pair fails.
 */
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

type Pair = { fg: string; bg: string; min: number };

const TEXT = 4.5;
const NON_TEXT = 3;

const PAIRS: Pair[] = [
	{ fg: 'foreground', bg: 'background', min: TEXT },
	{ fg: 'muted-foreground', bg: 'background', min: TEXT },
	{ fg: 'muted-foreground', bg: 'muted', min: TEXT },
	{ fg: 'muted-foreground', bg: 'popover', min: TEXT },
	{ fg: 'popover-foreground', bg: 'popover', min: TEXT },
	{ fg: 'primary-foreground', bg: 'primary', min: TEXT },
	{ fg: 'secondary-foreground', bg: 'secondary', min: TEXT },
	{ fg: 'accent-foreground', bg: 'accent', min: TEXT },
	{ fg: 'destructive-foreground', bg: 'destructive', min: TEXT },
	{ fg: 'ring', bg: 'background', min: NON_TEXT },
	{ fg: 'ring', bg: 'popover', min: NON_TEXT },
	{ fg: 'input', bg: 'background', min: NON_TEXT },
	{ fg: 'input', bg: 'popover', min: NON_TEXT }
];

/** OKLCH to linear sRGB, then the WCAG relative luminance. */
function luminance(l: number, c: number, h: number) {
	const hr = (h * Math.PI) / 180;
	const a = c * Math.cos(hr);
	const b = c * Math.sin(hr);

	const l_ = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3;
	const m_ = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3;
	const s_ = (l - 0.0894841775 * a - 1.291485548 * b) ** 3;

	const clamp = (v: number) => Math.min(1, Math.max(0, v));
	const r = clamp(4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_);
	const g = clamp(-1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_);
	const bl = clamp(-0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_);

	return 0.2126 * r + 0.7152 * g + 0.0722 * bl;
}

function contrast(a: number, b: number) {
	const [hi, lo] = a > b ? [a, b] : [b, a];
	return (hi + 0.05) / (lo + 0.05);
}

function parseBlock(css: string, selector: string) {
	const start = css.indexOf(`${selector} {`);
	if (start === -1) throw new Error(`theme.css has no "${selector}" block.`);
	const body = css.slice(start, css.indexOf('}', start));
	const tokens = new Map<string, number>();
	for (const [, name, l, c, h] of body.matchAll(
		/--([a-z-]+):\s*oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)/g
	)) {
		tokens.set(name, luminance(Number(l), Number(c), Number(h)));
	}
	return tokens;
}

const themePath = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'styles', 'theme.css');
const css = await readFile(themePath, 'utf8');

let failures = 0;
for (const [mode, selector] of [
	['light', ':root'],
	['dark', '.dark']
] as const) {
	const tokens = parseBlock(css, selector);
	console.log(`\n${mode}`);
	for (const { fg, bg, min } of PAIRS) {
		const a = tokens.get(fg);
		const b = tokens.get(bg);
		if (a === undefined || b === undefined) {
			console.log(`  MISSING  ${fg} on ${bg}`);
			failures++;
			continue;
		}
		const ratio = contrast(a, b);
		const ok = ratio >= min;
		if (!ok) failures++;
		console.log(
			`  ${ok ? 'ok  ' : 'FAIL'}  ${ratio.toFixed(2).padStart(5)}:1  (min ${min})  ${fg} on ${bg}`
		);
	}
}

if (failures > 0) {
	console.error(`\n${failures} pair(s) fail.`);
	process.exit(1);
}
