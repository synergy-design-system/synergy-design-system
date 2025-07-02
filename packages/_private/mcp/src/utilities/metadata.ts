import fs from 'node:fs/promises';
import { componentPath } from './config.js';
import { getAbsolutePath } from './file.js';

/**
 * Filter function type for filtering metadata files.
 */
export type Filter = (fileName: string) => boolean;

/**
 * Get structured metadata for a specific component.
 * Will NOT crawl recursively, but will return all files in the component's metadata directory.
 * @param componentName - The name of the component to get metadata for.
 * @param filter - Optional filter function to apply to the filenames.
 *                 If provided, only files that pass the filter will be included in the result.
 */
export const getStructuredMetaDataForComponent = async (
  componentName: string,
  filter: Filter = () => true,
) => {
  const absolutePath = getAbsolutePath(`${componentPath}/${componentName}`);

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
