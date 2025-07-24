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
 * Path to the assets directory, relative to the MCP directory.
 */
export const assetsPath = join(currentDirname, '../../metadata/packages/assets');

/**
 * Path to the components directory, relative to the MCP directory.
 */
export const componentPath = join(currentDirname, '../../metadata/packages/components');

/**
 * The path where static information about components is stored, relative to the MCP directory.
 */
export const staticComponentPath = join(currentDirname, '../../metadata/static/components');

/**
 * Path to the styles directory, relative to the MCP directory.
 */
export const stylesPath = join(currentDirname, '../../metadata/packages/styles');

/**
 * The path where static information about styles is stored, relative to the MCP directory.
 */
export const staticStylesPath = join(currentDirname, '../../metadata/static/styles');

/**
 * Path to the templates directory, relative to the MCP directory.
 */
export const templatesPath = join(currentDirname, '../../metadata/static/templates');

/**
 * Path to the tokens directory, relative to the MCP directory.
 */
export const tokensPath = join(currentDirname, '../../metadata/packages/tokens');

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
