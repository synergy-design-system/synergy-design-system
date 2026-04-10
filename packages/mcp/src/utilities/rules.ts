import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const currentFilename = fileURLToPath(import.meta.url);
const currentDirname = dirname(currentFilename);
const rulesDir = join(currentDirname, '../rules');

const ruleCache = new Map<string, string | undefined>();

/**
 * Returns the markdown guidance preface for a tool.
 * Missing rule files are treated as optional and return undefined.
 */
export const getToolRule = async (toolName: string): Promise<string | undefined> => {
  if (ruleCache.has(toolName)) {
    return ruleCache.get(toolName);
  }

  const filePath = join(rulesDir, `${toolName}.md`);

  try {
    const content = await readFile(filePath, 'utf8');
    ruleCache.set(toolName, content);
    return content;
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
      ruleCache.set(toolName, undefined);
      return undefined;
    }

    throw error;
  }
};
