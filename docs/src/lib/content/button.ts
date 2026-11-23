import type { ComponentDoc } from './types';

// A closing script tag in this string would end the page's script block, thus it is split.
const usage = `<script lang="ts">
	import { Button } from '$lib/components/ui/button';
</${'script'}>

<Button onclick={save}>Save changes</Button>`;

export const doc: ComponentDoc = {
	usage,
	examples: {
		icon: {
			title: 'Icon and count',
			description:
				'Give the leading icon in `icon`, not in the label: the button then starts its text a step closer to the edge. `count` ends the label with how many records the action touches.'
		},
		intent: {
			title: 'Destructive actions',
			description:
				'`intent="danger"` marks an action that deletes or cannot be undone. It works with every variant: the filled one turns red, the others only their text.'
		},
		pending: {
			title: 'Pending',
			description:
				'While the action runs, `pending` shows a spinner in place of the label. The button keeps its width, its focus and its name, and it ignores presses until it is done.'
		}
	},
	guidelines: [
		'Use the `default` variant for the one action that the screen is for. One per screen, or per dialog.',
		'Use `outline` for every other action of a toolbar or a form.',
		'Use `ghost` for icons and for actions that repeat down a list, where a box on each row would be noise.',
		'Use `link` for an action that reads as part of a sentence.',
		'Start the label with a verb and say what happens: "Save changes", not "OK".'
	],
	accessibility: [
		'It renders a native `<button>`, of `type="button"` unless you give another type.',
		'The focus ring shows for the keyboard only, not after a click.',
		'A button with an icon and no text needs an `aria-label`.',
		'While pending it stays in the tab order and announces "pending" to a screen reader; a submit button does not submit its form again.',
		'`disabled` takes the button out of the tab order. To keep it reachable and say why it does nothing, use `aria-disabled` and a tooltip instead.'
	],
	api: [
		{
			part: 'Button',
			note: 'Plus every attribute of a native `<button>`.',
			props: [
				{
					name: 'variant',
					type: "'default' | 'outline' | 'ghost' | 'link'",
					default: "'default'",
					description: 'How much the button stands out.'
				},
				{
					name: 'intent',
					type: "'neutral' | 'danger'",
					default: "'neutral'",
					description: 'What the action means. `danger` for one that destroys or cannot be undone.'
				},
				{
					name: 'size',
					type: "'sm' | 'default' | 'icon' | 'icon-sm' | 'icon-xs' | 'icon-2xs'",
					default: "'default'",
					description: 'The height. The `icon` sizes make a square for an icon alone.'
				},
				{
					name: 'icon',
					type: 'Component',
					description: 'The icon that leads the label.'
				},
				{
					name: 'count',
					type: 'number',
					description: 'How many records the action touches, at the end of the label.'
				},
				{
					name: 'pending',
					type: 'boolean',
					default: 'false',
					description: 'Shows a spinner and ignores presses while an action runs.'
				},
				{
					name: 'disabled',
					type: 'boolean',
					default: 'false',
					description: 'Turns the button off and takes it out of the tab order.'
				},
				{
					name: 'element',
					type: 'HTMLButtonElement | null',
					description: 'The rendered element. Bindable.'
				}
			]
		}
	]
};
