import { mkdir, rename, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const prototype = Object.getPrototypeOf(value) as unknown;
  return prototype === Object.prototype || prototype === null;
};

const sortJsonKeysDeep = (value: unknown): unknown => {
  if (Array.isArray(value)) {
    return value.map((item) => sortJsonKeysDeep(item));
  }

  if (!isPlainObject(value)) {
    return value;
  }

  const sortedObject: Record<string, unknown> = {};
  const keys = Object.keys(value).sort((a, b) => a.localeCompare(b));
  for (const key of keys) {
    sortedObject[key] = sortJsonKeysDeep(value[key]);
  }

  return sortedObject;
};

/**
 * Ensure a directory exists before writing files into it.
 */
export async function ensureDir(path: string): Promise<void> {
  await mkdir(path, { recursive: true });
}

/**
 * Write JSON atomically: write a temporary file first, then rename.
 */
export async function writeJsonAtomic(filePath: string, data: unknown): Promise<void> {
  await ensureDir(dirname(filePath));

  const tempPath = `${filePath}.tmp-${process.pid}-${Date.now()}`;
  const content = `${JSON.stringify(sortJsonKeysDeep(data), null, 2)}\n`;

  await writeFile(tempPath, content, 'utf8');
  await rename(tempPath, filePath);
}
