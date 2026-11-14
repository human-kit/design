import Root, { type FieldControlProps } from './field.svelte';
import Description from './field-description.svelte';
import Message from './field-error.svelte';
import Label from './field-label.svelte';

export { fieldLabelVariants, fieldMessageVariants } from './recipes';
export {
	Root,
	Root as Field,
	Label,
	Label as FieldLabel,
	Description,
	Description as FieldDescription,
	Message as FieldError,
	type FieldControlProps
};
