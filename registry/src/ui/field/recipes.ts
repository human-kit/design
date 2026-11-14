import { tv } from '@registry/lib/utils';

/**
 * The name over a control. Red with the control while what it holds is wrong, so the two read
 * as one thing that failed, and faded with it while it is disabled.
 */
export const fieldLabelVariants = tv({
	// A 19px line, not the body's 20: with the 4px under it, a field takes a round height.
	base: 'block w-fit text-body leading-4.75 transition-[color,opacity]',
	variants: {
		invalid: { true: 'text-danger-ink', false: 'text-ink' },
		disabled: { true: 'opacity-45', false: '' }
	},
	defaultVariants: { invalid: false, disabled: false }
});

/**
 * The line under a control: a hint about what it takes, or what is wrong with it. One recipe
 * for both because they take turns in the same place: the error replaces the hint while there
 * is one, so a field that goes wrong does not push the form down.
 */
export const fieldMessageVariants = tv({
	base: 'text-caption leading-3.75',
	variants: {
		tone: {
			hint: 'text-ink-muted',
			error: 'font-medium text-danger-ink'
		}
	},
	defaultVariants: { tone: 'hint' }
});

/**
 * The mark after the name of a field that has to be filled. Only drawn: the control says it to
 * assistive technology with `aria-required`. A step bigger than the label so it reads beside it,
 * with no leading of its own, so a required label is no taller than an optional one.
 */
export const fieldRequiredMarkClass = 'text-heading leading-0 text-danger-ink';
