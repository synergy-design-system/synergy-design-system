import { docsUrl } from '../utils/docsUrl';
import { buildDocsIndex, flattenDocsIndex } from '../utils/docsIndex';

const escapeXml = (value: string): string => (
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
);

export const GET = async (): Promise<Response> => {
  const sections = await buildDocsIndex();
  const entries = flattenDocsIndex(sections);

  const urls = [
    docsUrl('/'),
    ...entries.flatMap(entry => {
      const humanUrl = docsUrl(entry.path);
      return entry.aiPath ? [humanUrl, docsUrl(entry.aiPath)] : [humanUrl];
    }),
  ];

  const uniqueUrls = [...new Set(urls)];
  const lastMod = new Date().toISOString();

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...uniqueUrls.map(url => [
      '  <url>',
      `    <loc>${escapeXml(url)}</loc>`,
      `    <lastmod>${lastMod}</lastmod>`,
      '  </url>',
    ].join('\n')),
    '</urlset>',
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
