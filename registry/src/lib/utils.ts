import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Joins class names and removes the Tailwind classes that a later class overrides. */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
