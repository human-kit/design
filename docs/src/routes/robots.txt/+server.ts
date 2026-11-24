import { ORIGIN } from '$lib/site';

export const prerender = true;

// The lab is a workbench for the looks of the playground, not a page to find.
export const GET = () =>
	new Response(`User-agent: *\nAllow: /\nDisallow: /lab/\n\nSitemap: ${ORIGIN}/sitemap.xml\n`, {
		headers: { 'Content-Type': 'text/plain' }
	});
