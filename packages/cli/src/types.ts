export type ItemType = 'registry:lib' | 'registry:style' | 'registry:ui';

export type RegistryFile = { path: string; type: ItemType; content: string };

export type RegistryItem = {
	name: string;
	type: ItemType;
	title: string;
	description: string;
	/** npm packages, as `name@range`. */
	dependencies: string[];
	/** Other registry items that this item imports. */
	registryDependencies: string[];
	files: RegistryFile[];
};

export type Config = {
	$schema?: string;
	/** A URL, or a folder on the disk, that holds `<name>.json` for each item. */
	registry: string;
	/** The CSS file that imports Tailwind. The theme goes into it. */
	css: string;
	/** The import paths of the copied files. Both start with `$lib`. */
	aliases: {
		lib: string;
		ui: string;
	};
};

export type Logger = {
	info(message: string): void;
	warn(message: string): void;
};
