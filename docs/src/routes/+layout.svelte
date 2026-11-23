<script lang="ts">
	import '@fontsource-variable/roboto-serif';
	import '../app.css';

	let { children } = $props();
</script>

<a
	href="#main"
	class="bg-primary text-on-primary sr-only z-50 rounded-md px-3 py-2 text-sm focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
>
	Skip to the content
</a>

{@render children()}
