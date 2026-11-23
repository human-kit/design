import type { Action } from 'svelte/action';

/**
 * Sets `--fade-top` and `--fade-bottom` on a scroller to 1 while there is more to scroll toward
 * that edge, 0 otherwise. The `.scroll-fade-edge` overlays in app.css read them. Only where CSS
 * cannot drive them from the scroll (app.css), as the script runs after the first paint. It runs
 * on scroll, on resize and when the content changes height without a scroll (a group folding).
 */
export const scrollFade: Action = (node) => {
	if (CSS.supports('animation-timeline: scroll()')) return;
	const update = () => {
		const max = node.scrollHeight - node.clientHeight;
		node.style.setProperty('--fade-top', node.scrollTop > 1 ? '1' : '0');
		node.style.setProperty('--fade-bottom', node.scrollTop < max - 1 ? '1' : '0');
	};

	update();
	node.addEventListener('scroll', update, { passive: true });
	const resize = new ResizeObserver(update);
	resize.observe(node);
	const mutation = new MutationObserver(update);
	mutation.observe(node, { childList: true, subtree: true, attributes: true });

	return {
		destroy() {
			node.removeEventListener('scroll', update);
			resize.disconnect();
			mutation.disconnect();
		}
	};
};
