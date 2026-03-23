import { mkdir, rename, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

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
  const content = `${JSON.stringify(data, null, 2)}\n`;

  await writeFile(tempPath, content, 'utf8');
  await rename(tempPath, filePath);
}
