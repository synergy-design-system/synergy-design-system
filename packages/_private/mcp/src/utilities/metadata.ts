import fs from 'node:fs/promises';
import { componentPath } from './config.js';
import { getAbsolutePath } from './file.js';

/**
 * Filter function type for filtering metadata files.
 */
export type Filter = (fileName: string) => boolean;

const defaultFilter: Filter = () => true;

/**
 * Get structured metadata for a specific metadata folder.
 * Will NOT crawl recursively, but will return all files in the metadata directory.
 * @param folder - The name of the folder to get metadata for.
 * @param filter - Optional filter function to apply to the filenames.
 *                 If provided, only files that pass the filter will be included in the result.
 */
export const getStructuredMetaData = async (
  folder: string,
  filter: Filter = defaultFilter,
) => {
  const absolutePath = getAbsolutePath(folder);
  const files = await fs.readdir(absolutePath);
  const metadata = await Promise.all(
    files
      .filter(filter)
      .map(async (file) => {
        const filename = file.split('.').slice(0, -1).join('.');
        const content = await fs.readFile(`${absolutePath}/${file}`, 'utf-8');
        return {
          content,
          filename,
        };
      }),
  );

  return metadata;
};

/**
 * Get structured metadata for a specific component.
 * Will NOT crawl recursively, but will return all files in the component's metadata directory.
 * @param componentName - The name of the component to get metadata for.
 * @param filter - Optional filter function to apply to the filenames.
 *                 If provided, only files that pass the filter will be included in the result.
 */
export const getStructuredMetaDataForComponent = (
  componentName: string,
  filter: Filter = defaultFilter,
) => {
  const absolutePath = getAbsolutePath(`${componentPath}/${componentName}`);
  return getStructuredMetaData(
    absolutePath,
    filter,
  );
};

/**
 * Get a list of all available components in the Synergy Design System.
 * @returns A list of all available components in the Synergy Design System.
 */
export const getAvailableComponents = async () => {
  const absolutePath = getAbsolutePath(`${componentPath}`);
  const folders = await fs.readdir(absolutePath, { withFileTypes: true });
  const components = folders
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
  return components;
};
