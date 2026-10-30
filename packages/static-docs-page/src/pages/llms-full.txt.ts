import { docsUrl } from '../utils/docsUrl';
import { buildDocsIndex, flattenDocsIndex } from '../utils/docsIndex';

export const GET = async (): Promise<Response> => {
  const sections = await buildDocsIndex();
  const entries = flattenDocsIndex(sections);

  const sectionBlocks = sections.map(section => {
    const sectionLines = [
      `## ${section.name}`,
      '',
      ...section.entries.map(entry => {
        const humanUrl = docsUrl(entry.path);
        const aiLine = entry.aiPath ? `\n  ai: ${docsUrl(entry.aiPath)}` : '';
        return `- id: ${entry.id}\n  kind: ${entry.kind}\n  name: ${entry.name}\n  human: ${humanUrl}${aiLine}`;
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
    'This file is the exhaustive machine-readable index of all canonical docs entries, including their human page URLs and AI page URLs where available.',
    'Use the AI URLs when you need structured markdown content, and use the human URLs when you need a link to give people or cite in rendered documentation.',
    '',
  ].join('\n');

  return new Response(`${summary}${sectionBlocks.join('\n')}`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
