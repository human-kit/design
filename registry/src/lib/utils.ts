import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';
import { createTV } from 'tailwind-variants';

/**
 * The scales of the theme that `tailwind-merge` does not know. Without them it reads
 * `text-small` as a colour, thus `text-small text-ink` merges down to `text-ink` and the size
 * goes away. The same applies to the named radii and shadows.
 */
const mergeConfig = {
	extend: {
		theme: {
			text: ['caption', 'small', 'body', 'emphasis', 'heading', 'title', 'display'],
			radius: ['check', 'control', 'card', 'dialog'],
			shadow: [
				'control',
				'control-hover',
				'control-pressed',
				'field',
				'field-hover',
				'primary',
				'primary-pressed',
				'chip',
				'segment-rail',
				'switch-rail',
				'switch-on',
				'switch-thumb',
				'tooltip',
				'card',
				'popover',
				'dialog',
				'focus',
				'invalid',
				'invalid-focus',
				'focus-line',
				'invalid-focus-line'
			]
		}
	}
};

const merge = extendTailwindMerge(mergeConfig);

/** Joins class names and removes the Tailwind classes that a later class overrides. */
export function cn(...inputs: ClassValue[]) {
	return merge(clsx(inputs));
}

/** `tailwind-variants` with the same merge rules as `cn()`. */
export const tv = createTV({ twMergeConfig: mergeConfig });

export type { VariantProps } from 'tailwind-variants';
