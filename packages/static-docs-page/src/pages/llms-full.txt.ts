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

export const GET = async (): Promise<Response> => {
  const sections = await buildDocsIndex();
  const entries = flattenDocsIndex(sections);

  const sectionBlocks = sections.map(section => {
    const sectionLines = [
      `## ${section.name}`,
      '',
      ...section.entries.map(entry => {
        const humanUrl = toAbsoluteUrl(withBasePath(entry.path, '/'));
        const aiUrl = toAbsoluteUrl(withBasePath(entry.aiPath ?? `${entry.path}.ai.md`, '/'));
        return `- id: ${entry.id}\n  kind: ${entry.kind}\n  name: ${entry.name}\n  human: ${humanUrl}\n  ai: ${aiUrl}`;
      }),
      '',
    ];

    return sectionLines.join('\n');
  });

  const summary = [
    '# Synergy Design System Docs Full Index',
    '',
    `Total entries: ${entries.length}`,
    '',
    'This file is the exhaustive machine-readable index of all canonical docs entries, including both their human page and AI page URLs.',
    'Use the AI URLs when you need structured markdown content, and use the human URLs when you need a link to give people or cite in rendered documentation.',
    '',
  ].join('\n');

  return new Response(`${summary}${sectionBlocks.join('\n')}`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
