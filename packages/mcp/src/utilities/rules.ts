import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const currentFilename = fileURLToPath(import.meta.url);
const currentDirname = dirname(currentFilename);
const rulesDir = join(currentDirname, '../../rules');

const ruleCache = new Map<string, string | undefined>();

/**
 * Returns the markdown guidance preface for a tool.
 * Missing rule files are treated as optional and return undefined.
 * @param toolName The name of the tool to get rules for. This should correspond to a markdown file in the rules directory (without the .md extension).
 * @returns The content of the markdown file as a string, or undefined if the file does not exist.
 * @throws Any errors encountered while reading the file, except for file not found errors which are handled gracefully.
 */
export const getToolRule = async (
  toolName: string,
): Promise<string | undefined> => {
  const fileName = toolName;
  if (ruleCache.has(fileName)) {
    return ruleCache.get(fileName);
  }

  const filePath = join(rulesDir, `${fileName}.md`);

  try {
    const content = await readFile(filePath, 'utf8');
    ruleCache.set(fileName, content);
    return content;
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
      ruleCache.set(fileName, undefined);
      return undefined;
    }

    throw error;
  }
};
