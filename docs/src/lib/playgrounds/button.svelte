<script lang="ts" module>
	import type { Control } from '$lib/playground/types';

	/** The demos this playground stands in for: the page does not show them again. */
	export const covers = ['basic', 'variants', 'sizes'];

	const controls: Control[] = [
		{
			type: 'choice',
			name: 'variant',
			options: ['default', 'outline', 'ghost', 'link'],
			default: 'default'
		},
		{ type: 'choice', name: 'intent', options: ['neutral', 'danger'], default: 'neutral' },
		{
			type: 'choice',
			name: 'size',
			options: ['sm', 'default'],
			default: 'default',
			labels: { sm: 'Small' }
		},
		{ type: 'text', name: 'label', default: 'Save changes' },
		{ type: 'boolean', name: 'icon', default: false },
		{ type: 'boolean', name: 'count', default: false },
		{ type: 'boolean', name: 'pending', default: false },
		{ type: 'boolean', name: 'disabled', default: false }
	];
</script>

<script lang="ts">
	import { Button, type ButtonSize, type ButtonVariant } from '@registry/ui/button';
	import Check from '@lucide/svelte/icons/check';
	import Playground from '$lib/playground/playground.svelte';
	import { props, type Values } from '$lib/playground/types';

	const COUNT = 12;

	function code(values: Values) {
		const icon = values.icon ? ' icon={Check}' : '';
		const count = values.count ? ` count={${COUNT}}` : '';
		const imports = values.icon ? "\n\timport Check from '@lucide/svelte/icons/check';" : '';
		// A closing script tag in this string would end this block, thus it is split.
		return `<script lang="ts">
	import { Button } from '$lib/components/ui/button';${imports}
</${'script'}>

<Button${props(values, controls, ['label', 'icon', 'count'])}${icon}${count}>${values.label}</Button>`;
	}
</script>

<Playground {controls} {code}>
	{#snippet preview(values)}
		<Button
			variant={values.variant as ButtonVariant}
			intent={values.intent as 'neutral' | 'danger'}
			size={values.size as ButtonSize}
			icon={values.icon ? Check : undefined}
			count={values.count ? COUNT : undefined}
			pending={values.pending as boolean}
			disabled={values.disabled as boolean}
		>
			{values.label}
		</Button>
	{/snippet}
</Playground>
