/** One row of a playground's panel: what it sets, and how it is set. */
export type Control =
	| {
			type: 'choice';
			name: string;
			options: readonly string[];
			default: string;
			/** What the panel calls an option, when its name in code would read poorly. */
			labels?: Record<string, string>;
	  }
	| { type: 'boolean'; name: string; default: boolean }
	| { type: 'text'; name: string; default: string };

export type Values = Record<string, string | boolean>;

/** The props of a tag as written in code: a default is left out, `true` is the bare name. */
export function props(values: Values, controls: readonly Control[], skip: string[] = []) {
	return controls
		.filter((control) => !skip.includes(control.name) && values[control.name] !== control.default)
		.map((control) => {
			const value = values[control.name];
			if (value === true) return ` ${control.name}`;
			if (value === false) return ` ${control.name}={false}`;
			return ` ${control.name}="${value}"`;
		})
		.join('');
}

/** An option as the panel shows it: its own label, or its name with a capital. */
export function optionLabel(control: Control, option: string) {
	const label = control.type === 'choice' ? control.labels?.[option] : undefined;
	return label ?? option.charAt(0).toUpperCase() + option.slice(1);
}
