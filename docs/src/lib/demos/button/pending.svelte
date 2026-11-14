<script lang="ts">
	import { Button } from '@registry/ui/button';

	let pending = $state(false);

	function save() {
		pending = true;
		setTimeout(() => (pending = false), 2000);
	}
</script>

<Button {pending} onclick={save}>Save changes</Button>
