/**
 * Designs of the playground block, compared on /lab/<look> inside the real docs page. A look sets
 * where the props sit (`layout`), how each kind of prop is set, and the classes of the parts.
 */
export type Look =
	| 'inset'
	| 'split'
	| 'floating'
	| 'inspector'
	| 'toolbar'
	| 'footer'
	| 'form'
	| 'well'
	| 'popover'
	| 'code';

export type LookSpec = {
	label: string;
	/** Beside the preview, under it, over it, behind a button, or under it beside the live code. */
	layout: 'side' | 'bottom' | 'top' | 'popover' | 'code';
	/** A pick of one: segments, segments with an edge, a menu, or a list of radios. */
	choices: 'segment' | 'outline' | 'select' | 'radio';
	/** A yes or no: a switch, a toggle chip, or a checkbox. */
	booleans: 'switch' | 'toggle' | 'checkbox';
	/** The name of a prop over its control, or at the start of its row. */
	labels: 'above' | 'inline';
	block: string;
	stage: string;
	panel: string;
	field: string;
	booleansRow: string;
};

const block = 'border-line-strong bg-canvas overflow-hidden rounded-xl border';
const side = 'md:w-64 md:shrink-0';

export const LOOKS: Record<Look, LookSpec> = {
	inset: {
		label: 'Inset card',
		layout: 'side',
		choices: 'segment',
		booleans: 'switch',
		labels: 'above',
		block,
		stage: '',
		panel: `bg-hover/70 m-1.5 mt-0 flex flex-col gap-3 rounded-md p-3 md:my-1.5 md:ms-0 ${side}`,
		field: 'flex flex-col gap-1',
		booleansRow: 'grid grid-cols-2 gap-x-3 gap-y-2.5 pt-1'
	},
	split: {
		label: 'One surface, ruled',
		layout: 'side',
		choices: 'segment',
		booleans: 'switch',
		labels: 'above',
		block,
		stage: '',
		panel: `border-line-strong flex flex-col gap-3 border-t p-3 md:border-s md:border-t-0 ${side}`,
		field: 'flex flex-col gap-1',
		booleansRow: 'grid grid-cols-2 gap-x-3 gap-y-2.5 pt-1'
	},
	floating: {
		label: 'Card on a dotted canvas',
		layout: 'side',
		choices: 'segment',
		booleans: 'switch',
		labels: 'above',
		block: `${block} bg-[radial-gradient(var(--line-strong)_1px,transparent_1px)] bg-size-[14px_14px]`,
		stage: '',
		panel: `bg-surface shadow-card m-1.5 mt-0 flex flex-col gap-3 rounded-md p-3 md:my-1.5 md:ms-0 ${side}`,
		field: 'flex flex-col gap-1',
		booleansRow: 'grid grid-cols-2 gap-x-3 gap-y-2.5 pt-1'
	},
	inspector: {
		label: 'Inspector rows',
		layout: 'side',
		choices: 'segment',
		booleans: 'switch',
		labels: 'inline',
		block,
		stage: '',
		panel:
			'border-line-strong divide-line flex flex-col divide-y border-t px-3 md:w-80 md:shrink-0 md:border-s md:border-t-0',
		field: 'flex items-center justify-between gap-3 py-2.5',
		booleansRow: 'grid grid-cols-2 gap-x-3 gap-y-2.5 py-3'
	},
	toolbar: {
		label: 'Toolbar over the preview',
		layout: 'top',
		choices: 'select',
		booleans: 'toggle',
		labels: 'inline',
		block,
		stage: 'min-h-64',
		panel: 'border-line-strong flex flex-wrap items-center gap-x-4 gap-y-2 border-b px-3 py-2',
		field: 'flex items-center gap-1.5',
		booleansRow: 'flex flex-wrap items-center gap-1'
	},
	footer: {
		label: 'Footer of menus and chips',
		layout: 'bottom',
		choices: 'select',
		booleans: 'toggle',
		labels: 'inline',
		block,
		stage: 'min-h-64',
		panel:
			'border-line-strong bg-surface-muted flex flex-wrap items-center gap-x-4 gap-y-2 border-t px-3 py-2',
		field: 'flex items-center gap-1.5',
		booleansRow: 'flex flex-wrap items-center gap-1 sm:ms-auto'
	},
	form: {
		label: 'A form of radios',
		layout: 'side',
		choices: 'radio',
		booleans: 'checkbox',
		labels: 'above',
		block,
		stage: '',
		panel:
			'border-line-strong grid grid-cols-2 content-start gap-x-4 gap-y-4 border-t p-4 md:w-80 md:shrink-0 md:border-s md:border-t-0',
		field: 'flex flex-col gap-2 [&:has(input[type=text])]:col-span-2',
		booleansRow: 'col-span-2 grid grid-cols-2 gap-x-4 gap-y-2'
	},
	well: {
		label: 'Preview in a well',
		layout: 'side',
		choices: 'outline',
		booleans: 'switch',
		labels: 'above',
		block: `${block} p-1.5`,
		stage: 'bg-hover/70 rounded-md',
		panel: `flex flex-col gap-3 p-3 pe-1.5 ${side}`,
		field: 'flex flex-col gap-1',
		booleansRow: 'grid grid-cols-2 gap-x-3 gap-y-2.5 pt-1'
	},
	popover: {
		label: 'Props behind a button',
		layout: 'popover',
		choices: 'segment',
		booleans: 'switch',
		labels: 'above',
		block,
		stage: 'min-h-80',
		panel: 'flex w-64 flex-col gap-3',
		field: 'flex flex-col gap-1',
		booleansRow: 'grid grid-cols-2 gap-x-3 gap-y-2.5 pt-1'
	},
	code: {
		label: 'Code always in sight',
		layout: 'code',
		choices: 'segment',
		booleans: 'switch',
		labels: 'above',
		block,
		stage: 'min-h-56',
		panel: 'flex flex-col gap-3 p-3 md:w-64 md:shrink-0',
		field: 'flex flex-col gap-1',
		booleansRow: 'grid grid-cols-2 gap-x-3 gap-y-2.5 pt-1'
	}
};

export const LOOK_KEY = Symbol('playground-look');
