/**
 * A mark that slides to the item that is current instead of blinking out of one and into the
 * next, as the IVF tracker's sidebar does. It measures the item against the container it sits in
 * and follows it when the container changes height (a group folding). Until it has measured, the
 * item draws itself, so the server's paint already shows where you are.
 */
export class Indicator {
	box = $state<{ top: number; left: number; width: number; height: number } | null>(null);
	/** False until the first place is known: the mark appears there, it does not slide in. */
	settled = $state(false);
	/** Folded away, or cut off by a closing group: the mark fades instead of hanging there. */
	visible = $state(false);

	#container: HTMLElement | null = null;
	#selector: string;

	constructor(selector: string) {
		this.#selector = selector;
	}

	measure = () => {
		const container = this.#container;
		const item = container?.querySelector<HTMLElement>(this.#selector);
		if (!container || !item) {
			this.visible = false;
			return;
		}
		const outer = container.getBoundingClientRect();
		const rect = item.getBoundingClientRect();
		// A group that folds clips its links: the mark goes once its link is out of the clip.
		const clip = item.closest<HTMLElement>('.overflow-hidden')?.getBoundingClientRect();
		this.visible = rect.height > 0 && (!clip || rect.bottom <= clip.bottom + 1);
		this.box = {
			top: rect.top - outer.top + container.scrollTop,
			left: rect.left - outer.left,
			width: rect.width,
			height: rect.height
		};
		if (!this.settled) requestAnimationFrame(() => (this.settled = true));
	};

	/** Watches the container. Returns the cleanup for an effect. */
	attach(container: HTMLElement) {
		this.#container = container;
		this.measure();
		const resize = new ResizeObserver(this.measure);
		resize.observe(container);
		for (const child of container.querySelectorAll('.overflow-hidden')) resize.observe(child);
		const mutation = new MutationObserver(this.measure);
		mutation.observe(container, {
			subtree: true,
			attributes: true,
			attributeFilter: ['aria-current', 'data-active']
		});
		return () => {
			resize.disconnect();
			mutation.disconnect();
		};
	}

	get style() {
		if (!this.box) return 'opacity: 0';
		const { top, left, width, height } = this.box;
		return `transform: translate(${left}px, ${top}px); width: ${width}px; height: ${height}px; opacity: ${this.visible ? 1 : 0}`;
	}
}
