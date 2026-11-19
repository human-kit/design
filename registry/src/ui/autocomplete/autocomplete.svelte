<script lang="ts">
	import { Autocomplete as AutocompletePrimitive } from '@human-kit/ui/autocomplete';
	import type { ComponentProps } from 'svelte';
	import { autocompleteStyles } from './styles';

	let {
		inputValue = $bindable(),
		class: className,
		children,
		...restProps
	}: ComponentProps<typeof AutocompletePrimitive.Root> = $props();
</script>

<AutocompletePrimitive.Root
	bind:inputValue
	class={autocompleteStyles.root({ class: className })}
	{...restProps}
>
	{@render children?.()}
	<!-- Says how many rows the search left, for a screen reader. -->
	<AutocompletePrimitive.Status />
</AutocompletePrimitive.Root>
