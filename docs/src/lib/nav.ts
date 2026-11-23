import { components } from './registry';

export type NavItem = { href: string; title: string };
export type NavGroup = { label: string; items: NavItem[] };

/** The sections of the sidebar. A component that no section names lands in "More", at the end. */
const sections: [label: string, names: string[]][] = [
	[
		'Form',
		[
			'button',
			'checkbox',
			'checkbox-group',
			'dropzone',
			'field',
			'input',
			'number-field',
			'pin-input',
			'radio-group',
			'rating',
			'search-field',
			'slider',
			'switch',
			'textarea',
			'toggle',
			'toggle-group'
		]
	],
	[
		'Pickers',
		[
			'autocomplete',
			'calendar',
			'clock',
			'color-picker',
			'combobox',
			'date-picker',
			'date-range-picker',
			'listbox',
			'select',
			'time-picker',
			'transfer-list'
		]
	],
	['Overlays', ['command-palette', 'dialog', 'drawer', 'menu', 'popover', 'toast', 'tooltip']],
	['Navigation', ['breadcrumbs', 'link', 'nav-list', 'pagination', 'sidebar', 'stepper', 'tabs']],
	[
		'Layout',
		[
			'accordion',
			'card',
			'collapsible',
			'overflow-row',
			'page-header',
			'resizable',
			'scroll-area',
			'separator'
		]
	],
	[
		'Data display',
		['avatar', 'badge', 'description-list', 'kbd', 'stat', 'table', 'timeline', 'tree']
	],
	['Feedback', ['alert', 'empty-state', 'progress', 'spinner']]
];

const byName = new Map(components.map((entry) => [entry.name, entry]));
const link = (name: string): NavItem | undefined => {
	const entry = byName.get(name);
	return entry && { href: `/docs/components/${name}`, title: entry.title };
};

const named = new Set(sections.flatMap(([, names]) => names));
const rest = components.filter((entry) => !named.has(entry.name)).map((entry) => entry.name);

export const nav: NavGroup[] = [
	{
		label: 'Get started',
		items: [
			{ href: '/docs/installation', title: 'Installation' },
			{ href: '/docs/theming', title: 'Theming' }
		]
	},
	...[...sections, ['More', rest] as [string, string[]]]
		.map(([label, names]) => ({
			label,
			items: names.map(link).filter((item): item is NavItem => item !== undefined)
		}))
		.filter((group) => group.items.length > 0)
];
