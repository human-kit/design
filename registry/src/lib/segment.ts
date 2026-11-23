/**
 * The segmented look, shared by the segmented tabs and the segmented toggle group: a sunken rail
 * with the picked option lifted on a chip. Tabs switch what is in view; a toggle group sets a
 * value. They differ in what they are, not in how they look, so the look lives here once.
 *
 * The rail has no edge of its own: 2px off the chip's, it would draw a second frame. Its fill
 * alone sets it off. 2px of rail around the chips, whose corners are the rail's less those 2px.
 * A chip 4px shorter than a control keeps the whole at a control's height. Each value is written
 * out whole, with its states: Tailwind finds a class only as it reads in the source.
 */
export const segment = {
	rail: 'gap-0.5 rounded-control bg-segment-rail p-0.5',
	chip: 'rounded-[calc(var(--radius-control)-2px)]',
	/**
	 * The picked option drawn as the chip itself, until the sliding chip is measured on the
	 * client: the server's paint already looks as the page will. Its focus halo wins the shadow.
	 */
	picked: 'data-selected:bg-segment-chip data-selected:not-data-focus-visible:shadow-segment-chip',
	/** On the rail, once the sliding chip is there: the picked option hands its look to it. */
	handedOver:
		'data-indicator-ready:*:data-selected:bg-transparent data-indicator-ready:*:data-selected:not-data-focus-visible:shadow-none',
	/** The chip that slides under the picked option: a chip of its own, lifted. */
	lifted: 'bg-segment-chip shadow-segment-chip',
	/** The slide: a quick ease along the rail, none when motion is reduced. */
	slide:
		'transition-[left,top,width,height,opacity] duration-200 ease-out motion-reduce:transition-none'
} as const;
