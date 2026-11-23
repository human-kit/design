/** The docs' few motions: an ease for what enters, and the swap of one icon for another. */

/** A strong ease-out, for what enters and does not travel: a fade, a blur clearing. */
export const EASE_OUT = 'cubic-bezier(0.23, 1, 0.32, 1)';

export const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/** An icon that takes the place of another: it grows in from 75% out of a light blur. */
export function swapIn(_node: Element) {
	return {
		duration: reducedMotion() ? 0 : 200,
		css: (t: number, u: number) =>
			`opacity: ${t}; transform: scale(${0.75 + 0.25 * t}); filter: blur(${2 * u}px);`,
		easing: (t: number) => 1 - Math.pow(1 - t, 4)
	};
}
