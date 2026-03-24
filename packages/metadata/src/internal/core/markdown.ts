import prettier from 'prettier';

/**
 * Format generated markdown content consistently across metadata writers.
 */
export async function formatGeneratedMarkdown(content: string): Promise<string> {
  return prettier.format(content, { parser: 'markdown' });
}
