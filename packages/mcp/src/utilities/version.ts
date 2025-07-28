import { dirname, join } from 'path';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';

/**
 * Gets the current package.json information for the MCP server.
 * @returns The parsed package.json content
 */
export const getPackageInfo = () => {
  const filename = fileURLToPath(import.meta.url);
  const directoryName = dirname(filename);
  const packageJsonPath = join(directoryName, '..', '..', 'package.json');
  return JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
};

/**
 * Gets the current version of the MCP server.
 * @returns The version string from package.json
 */
export const getVersion = () => {
  const packageJson = getPackageInfo();
  return packageJson.version;
};
