import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const currentFilename = fileURLToPath(import.meta.url);
const currentDirname = dirname(currentFilename);
const rulesDir = join(currentDirname, '../rules');

const ruleCache = new Map<string, string | undefined>();

/**
 * Returns the markdown guidance preface for a tool.
 * Optionally appends framework suffix, e.g. getToolRule('component-info', 'react') -> component-info-react.md
 * Missing rule files are treated as optional and return undefined.
 */
export const getToolRule = async (
  toolName: string,
  framework?: 'angular' | 'react' | 'vue',
): Promise<string | undefined> => {
  const fileName = framework ? `${toolName}-${framework}` : toolName;
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
