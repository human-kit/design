import { EASE_OUT, reducedMotion } from '$lib/motion';

/** As the IVF tracker's Morph: 200ms on a strong ease-out, a light blur clearing. */
const DURATION = 200;

type Snapshot = { sizes: Map<Element, DOMRect>; known: Set<Element> };

/**
 * Takes what the preview holds before a prop changes: the size of each piece it shows, and every
 * element in it. Call `play` with it once the change is drawn.
 */
export function snapshot(preview: HTMLElement): Snapshot {
	return {
		sizes: new Map([...preview.children].map((child) => [child, child.getBoundingClientRect()])),
		known: new Set([preview, ...preview.querySelectorAll('*')])
	};
}

/**
 * A piece that changed size eases from its old size to its new one instead of jumping, its
 * content clipped on the way. What came in with the change (an icon, a count) grows in from a
 * light blur. Nothing moves with reduced motion.
 */
export function play(preview: HTMLElement, before: Snapshot) {
	if (reducedMotion()) return;
	for (const [piece, from] of before.sizes) {
		if (!piece.isConnected) continue;
		const to = piece.getBoundingClientRect();
		if (Math.abs(from.width - to.width) < 0.5 && Math.abs(from.height - to.height) < 0.5) continue;
		piece.animate(
			[
				{ width: `${from.width}px`, height: `${from.height}px`, overflow: 'clip' },
				{ width: `${to.width}px`, height: `${to.height}px`, overflow: 'clip' }
			],
			{ duration: DURATION, easing: EASE_OUT }
		);
	}
	// Only the outermost new element animates: its children come with it.
	for (const element of preview.querySelectorAll('*')) {
		const parent = element.parentElement;
		if (before.known.has(element) || !parent || !before.known.has(parent)) continue;
		element.animate(
			[
				{ opacity: 0, transform: 'scale(0.75)', filter: 'blur(2px)' },
				{ opacity: 1, transform: 'none', filter: 'none' }
			],
			{ duration: DURATION, easing: EASE_OUT }
		);
	}
}
