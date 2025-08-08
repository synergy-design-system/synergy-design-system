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
 * Path to the components base directory, relative to the MCP directory.
 */
export const componentBasePath = join(currentDirname, '../../metadata/packages/components');

/**
 * Path to the components code directory, relative to the MCP directory.
 */
export const componentPath = join(componentBasePath, '/components');

/**
 * Path to the components static directory, relative to the MCP directory.
 */
export const componentStaticPath = join(componentBasePath, '/static');

/**
 * Path to the components migration directory, relative to the MCP directory.
 */
export const componentMigrationPath = join(componentBasePath, '/migration');

/**
 * The path where static information about components is stored, relative to the MCP directory.
 */
export const staticComponentPath = join(currentDirname, '../../metadata/static/components');

/**
 * The path where setup related information is stored.
 */
export const setupPath = join(currentDirname, '../../metadata/static/setup');

/**
 * Path to the styles directory, relative to the MCP directory.
 */
export const stylesPath = join(currentDirname, '../../metadata/packages/styles');

/**
 * Path to the angular directory, relative to the MCP directory.
 */
export const angularPath = join(currentDirname, '../../metadata/packages/angular');

/**
 * Path to the react directory, relative to the MCP directory.
 */
export const reactPath = join(currentDirname, '../../metadata/packages/react');

/**
 * Path to the vue directory, relative to the MCP directory.
 */
export const vuePath = join(currentDirname, '../../metadata/packages/vue');

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
 * Path to the migration directory, relative to the MCP directory.
 */
export const staticMigrationPath = join(currentDirname, '../../metadata/static/migration');

/**
 * List of supported frameworks.
 */
export type Framework = 'react' | 'vue' | 'angular' | 'vanilla';
