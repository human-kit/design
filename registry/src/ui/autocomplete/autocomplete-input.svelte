<script lang="ts">
	import { Autocomplete as AutocompletePrimitive } from '@human-kit/ui/autocomplete';
	import Search from '@lucide/svelte/icons/search';
	import type { ComponentProps } from 'svelte';
	import { autocompleteStyles as styles } from './styles';

	let { class: className, ...restProps }: ComponentProps<typeof AutocompletePrimitive.Input> =
		$props();
</script>

<!-- A label, so a press anywhere on the row lands in the input. -->
<label class={styles.search()}>
	<Search class={styles.icon()} aria-hidden="true" />
	<AutocompletePrimitive.Input class={styles.input({ class: className })} {...restProps} />
</label>
