<script lang="ts">
	import '@fontsource-variable/roboto-serif';
	import '../app.css';
	import { page } from '$app/state';
	import { ORIGIN } from '$lib/site';

	let { children } = $props();
</script>

<a
	href="#main"
	class="bg-primary text-on-primary sr-only z-50 rounded-md px-3 py-2 text-sm focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
>
	Skip to the content
</a>

<!-- The tags every page shares. Each page writes its own title and description. -->
<svelte:head>
	<link rel="canonical" href="{ORIGIN}{page.url.pathname}" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="human-kit design" />
	<meta property="og:url" content="{ORIGIN}{page.url.pathname}" />
	<meta property="og:image" content="{ORIGIN}/og.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@humankit_" />
	<meta name="twitter:image" content="{ORIGIN}/og.png" />
</svelte:head>

{@render children()}
