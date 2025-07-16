import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// Get the current file's directory
const currentFilename = fileURLToPath(import.meta.url);
const currentDirname = dirname(currentFilename);

/**
 * Path where metadata is stored, relative to the MCP directory.
 */
export const metaDataPath = join(currentDirname, '../../metadata');

/**
 * Path to the components directory, relative to the MCP directory.
 */
export const componentPath = join(currentDirname, '../../metadata/components');

/**
 * Path to the tokens directory, relative to the MCP directory.
 */
export const tokensPath = join(currentDirname, '../../metadata/tokens');

/**
 * Path to the davinci migration directory, relative to the MCP directory.
 */
export const davinciMigrationPath = join(currentDirname, '../../metadata/davinci-migration');

/**
 * Path to the static files directory, relative to the MCP directory.
 */
export const staticPath = join(currentDirname, '../../metadata/static');

/**
 * List of supported frameworks.
 */
export type Framework = 'react' | 'vue' | 'angular' | 'vanilla';
