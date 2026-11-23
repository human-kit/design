/** One prop of a part, as the API table shows it. */
export type Prop = { name: string; type: string; default?: string; description: string };

/**
 * What a component's page says beyond its demos. Every field is optional: a page shows the
 * sections it has content for, in a fixed order.
 */
export type ComponentDoc = {
	/** The smallest code that uses the component. */
	usage?: string;
	/** The demos shown as examples, by file name, with a title and a line about each. */
	examples?: Record<string, { title: string; description?: string }>;
	/** When to use which form of it. */
	guidelines?: string[];
	accessibility?: string[];
	/** The props of each part. `note` closes the table: what else the part takes. */
	api?: { part: string; note?: string; props: Prop[] }[];
};
