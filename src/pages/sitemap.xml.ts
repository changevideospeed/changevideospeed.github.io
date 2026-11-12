import type { APIRoute } from 'astro';
import { localeList } from '../i18n/ui';
import { getLocalizedPath } from '../i18n/utils';

export const prerender = true;

const SITE_ORIGIN = 'https://changevideospeed.github.io';

export const GET: APIRoute = () => {
  const lastmod = new Date().toISOString().split('T')[0];

  const alternateLinks = [
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_ORIGIN}/" />`,
    ...localeList.map(
      (loc) =>
        `    <xhtml:link rel="alternate" hreflang="${loc}" href="${SITE_ORIGIN}${getLocalizedPath(loc)}" />`
    ),
  ].join('\n');

  const urls = localeList
    .map((loc) => {
      const locUrl = `${SITE_ORIGIN}${getLocalizedPath(loc)}`;
      return `  <url>
    <loc>${locUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
${alternateLinks}
  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
