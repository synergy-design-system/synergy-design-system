import fs from 'node:fs/promises';
import { existsSync, statSync } from 'node:fs';
import { basename, join } from 'node:path';
import { componentPath, staticComponentPath } from './config.js';
import { getAbsolutePath } from './file.js';

/**
 * Filter function type for filtering metadata files.
 */
export type Filter = (fileName: string) => boolean;

/**
 * MetadataFile type representing a structured metadata file.
 */
export type MetadataFile = {
  content: string;
  filename: string;
};

const defaultFilter: Filter = () => true;

export type ToolResponse = {
  content: {
    text: string;
    type: 'text';
  }[]
};

export type WithErrorHandlerOptions = {
  context?: string;
  onError?: (error: unknown, context?: string) => unknown[] | Promise<unknown[]>;
};

/**
 * Creates a content array from an array of unknown data.
 * This is useful for converting raw data into a format that can be returned by MCP tools.
 * @param data The original data to convert into a content array. Each entry will be converted to a string if it is not already a string.
 * @returns Final content array
 */
export const toContentArray = (data: unknown[]): ToolResponse => {
  // First, we want to make sure that all entries in the array are strings, as the content array expects text content.
  const content = data
    .filter(Boolean)
    .map(entry => ({
      text: typeof entry === 'string' ? entry : JSON.stringify(entry),
      type: 'text' as const,
    }));

  return {
    content,
  };
};

/**
 * Default error content generator for tool responses.
 * This can be used in the onError callback of withErrorHandler to provide a consistent error message format.
 * @param error - The error object that was thrown.
 * @param context - Optional context string to provide additional information about where the error occurred.
 * @returns An array of content objects suitable for MCP tool responses.
 */
const defaultErrorContent = (error: unknown, context?: string): unknown[] => {
  const suffix = context ? ` ${context}` : '';
  const message = error instanceof Error ? error.message : String(error);

  return [{
    text: `Error${suffix}: ${message}`,
    type: 'text',
  }];
};

/**
 * Wraps tool execution and converts both success and fallback content into MCP ToolResponse.
 * Use this in tool handlers to avoid repeating local try/catch blocks.
 * @param fn - Function that returns raw content entries for toContentArray.
 * @param options - Optional context and custom error fallback behavior.
 */
export const withErrorHandler = async (
  fn: () => Promise<unknown[]>,
  options: WithErrorHandlerOptions = {},
): Promise<ToolResponse> => {
  try {
    const content = await fn();
    return toContentArray(content);
  } catch (error) {
    const fallback = options.onError
      ? await options.onError(error, options.context)
      : defaultErrorContent(error, options.context);

    return toContentArray(fallback);
  }
};

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

  // If the directory does not exist, return an empty array
  if (!existsSync(absolutePath)) {
    return [];
  }

  const files = await fs.readdir(absolutePath);
  const metadata = await Promise.all(
    files
      .filter(file => {
        // We only allow entries that are
        // 1. are files
        // 2. pass the filter function
        const stats = statSync(join(absolutePath, file));
        return stats.isFile() && filter(file);
      })
      .map(async (file) => {
        const filename = basename(file);
        const exists = await fs.stat(`${absolutePath}/${file}`);
        if (!exists.isFile()) {
          return null;
        }

        const content = await fs.readFile(`${absolutePath}/${file}`, 'utf-8');
        return {
          content,
          filename,
        } as MetadataFile;
      })
      // Makes sure we only return valid metadata files
      .filter(Boolean),
  );

  return metadata;
};

/**
 * Get structured metadata for a specific component.
 * Will NOT crawl recursively, but will return all files in the component's metadata directory.
 * @param componentName - The name of the component to get metadata for.
 * @param filter - Optional filter function to apply to the filenames.
 *                 If provided, only files that pass the filter will be included in the result.
 * @param source - The source of the metadata, either 'package' or 'static'.
 */
export const getStructuredMetaDataForComponent = (
  componentName: string,
  filter: Filter = defaultFilter,
  source: 'package' | 'static' = 'package',
) => {
  const root = source === 'static' ? staticComponentPath : componentPath;
  const absolutePath = getAbsolutePath(`${root}/${componentName}`);
  return getStructuredMetaData(
    absolutePath,
    filter,
  );
};
