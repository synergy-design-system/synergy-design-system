import fs from 'node:fs/promises';
import {
  stylesPath,
} from './config.js';
import { getAbsolutePath } from './file.js';
import {
  getStructuredMetaData,
} from './metadata.js';

export const getStylesMetaData = async () => getStructuredMetaData(
  stylesPath,
);

/**
 * Get a list of all available styles in the Synergy Design System.
 * @returns A list of all available styles in the Synergy Design System.
 */
export const getAvailableStyles = async () => {
  const absolutePath = getAbsolutePath(`${stylesPath}`);
  const files = await fs.readdir(absolutePath, { withFileTypes: true });
  const styles = files
    .filter(file => file.isFile() && file.name !== 'index.css' && file.name.endsWith('css'))
    .map(file => file.name.replace('.css', ''));
  return styles;
};
