import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs/promises';
import { globby } from 'globby';

/**
 * Get the absolute path to the wanted file or directory, relative from the current one.
 * @param path - The relative path to the file or directory.
 * @returns The absolute path to the file or directory.
 */
export const getAbsolutePath = (fileName: string = '') => {
  const filename = fileURLToPath(import.meta.url);
  const dirname = path.dirname(filename);
  return path.isAbsolute(fileName)
    ? fileName
    : path.resolve(dirname, fileName);
};

/**
 * Create a new file or directory.
 * @param fileName - The name of the file or directory to create, relative to the current file.
 * @returns The absolute path to the created file or directory.
 */
export const createPath = async (fileName: string) => {
  const absolutePath = getAbsolutePath(fileName);
  try {
    await fs.mkdir(absolutePath, { recursive: true });
  } catch (error) {
    console.error(`Failed to create directory at ${absolutePath}:`, error);
  }
  return absolutePath;
};

/**
 * Represents the structure of files in a directory.
 */
export type FileStructure = Record<string, {
  content: string,
  filename: string,
}[]>;

/**
 * @param baseDir - The base directory to start from, relative to the current file.
 * This function will read all files in the subdirectories and return a structure
 * where each key is a subdirectory name and the value is an array of objects containing
 * the filename and its content.
 * @returns A structure object where each key
 * is a subdirectory name and the value is an array of objects
 * containing the filename and its content.
 */
export const folderToStructure = async (baseDir: string) => {
  const cwd = getAbsolutePath(baseDir);
  const files = await globby(['**/*'], { cwd, onlyFiles: true });
  const structure: FileStructure = {};

  // eslint-disable-next-line no-restricted-syntax
  for (const file of files) {
    const [group, ...rest] = file.split(path.sep);
    // eslint-disable-next-line no-await-in-loop
    const content = await fs.readFile(path.join(cwd, file), 'utf8');

    if (!structure[group]) structure[group] = [];
    structure[group].push({
      content,
      filename: rest.join(path.sep),
    });
  }

  return structure;
};
