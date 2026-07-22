import { withBasePath } from '../utils/basePath';
import { buildDocsIndex, flattenDocsIndex } from '../utils/docsIndex';

const baseUrl = process.env.STATIC_DOCS_SITE_URL?.replace(/\/+$/, '');

const toAbsoluteUrl = (path: string): string => {
  if (!baseUrl) {
    return path;
  }

  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  return `${baseUrl}${path}`;
};

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
    toAbsoluteUrl(withBasePath('/', '/')),
    ...entries.flatMap(entry => {
      const humanUrl = toAbsoluteUrl(withBasePath(entry.path, '/'));
      const aiUrl = toAbsoluteUrl(withBasePath(entry.aiPath ?? `${entry.path}/ai.md`, '/'));

      return [humanUrl, aiUrl];
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
