<script lang="ts">
	import { Autocomplete as AutocompletePrimitive } from '@human-kit/ui/autocomplete';
	import type { ComponentProps } from 'svelte';
	import { autocompleteStyles as styles } from './styles';

	let { class: className, ...restProps }: ComponentProps<typeof AutocompletePrimitive.Empty> =
		$props();
</script>

<!-- In the rows' place when the search leaves none; its text lines up with theirs. -->
<AutocompletePrimitive.Empty class={styles.empty({ class: className })} {...restProps} />
