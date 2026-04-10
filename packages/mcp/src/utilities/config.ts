import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// Get the current file's directory
const currentFilename = fileURLToPath(import.meta.url);
const currentDirname = dirname(currentFilename);

/**
 * Path to the components base directory, relative to the MCP directory.
 */
export const componentBasePath = join(currentDirname, '../../metadata/packages/components');

/**
 * Path to the components code directory, relative to the MCP directory.
 */
export const componentPath = join(componentBasePath, '/components');

/**
 * The path where static information about components is stored, relative to the MCP directory.
 */
export const staticComponentPath = join(currentDirname, '../../metadata/static/components');

/**
 * Path to the templates directory, relative to the MCP directory.
 */
export const templatesPath = join(currentDirname, '../../metadata/static/templates');
