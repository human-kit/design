import { ORIGIN, PAGES } from '$lib/site';

export const prerender = true;

export const GET = () =>
	new Response(
		`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PAGES.map((path) => `<url><loc>${ORIGIN}${path}</loc></url>`).join('\n')}
</urlset>
`,
		{ headers: { 'Content-Type': 'application/xml' } }
	);
