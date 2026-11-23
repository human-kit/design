import type { ComponentDoc } from './types';

const modules = import.meta.glob<{ doc: ComponentDoc }>('./*.ts', { eager: true });

/** The written part of a component's page: usage, examples, guidelines, accessibility, API. */
export function docOf(component: string): ComponentDoc {
	return modules[`./${component}.ts`]?.doc ?? {};
}
