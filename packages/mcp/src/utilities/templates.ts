import fs from 'node:fs/promises';
import {
  templatesPath,
} from './config.js';
import { getAbsolutePath } from './file.js';
import {
  getStructuredMetaData,
} from './metadata.js';

export const getTemplateMetaData = async () => getStructuredMetaData(templatesPath);

/**
 * Get a list of all available templates in the Synergy Design System.
 * @returns A list of all available templates in the Synergy Design System.
 */
export const getAvailableTemplates = async () => {
  const absolutePath = getAbsolutePath(templatesPath);
  const files = await fs.readdir(absolutePath, { withFileTypes: true });
  const templates = files
    .filter(file => file.isFile() && file.name !== 'index.md' && file.name.endsWith('md'))
    .map(file => file.name.replace('.md', ''));
  return templates;
};
