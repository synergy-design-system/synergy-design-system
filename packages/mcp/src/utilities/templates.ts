import fs from 'node:fs/promises';
import {
  templatesPath,
} from './config.js';
import { getAbsolutePath } from './file.js';
import {
  getStructuredMetaData,
} from './metadata.js';

export const getTemplateMetaData = async () => getStructuredMetaData(templatesPath);

const getTemplates = async () => {
  const absolutePath = getAbsolutePath(templatesPath);
  const files = await fs.readdir(absolutePath, { withFileTypes: true });
  return files
    .filter(file => file.isFile() && file.name !== 'index.md' && file.name.endsWith('md'));
};

/**
 * Get a list of all available templates in the Synergy Design System.
 * @returns A list of all available templates in the Synergy Design System.
 */
export const getAvailableTemplates = async () => {
  const files = await getTemplates();
  return files.map(file => file.name.replace('.md', ''));
};

/**
 * Get information about a specific template in the Synergy Design System.
 * @param template The name of the template to get information about, e.g., 'appshell'.
 * @returns Structured metadata for the specified template.
 */
export const getInfoForTemplate = async (template: string) => {
  const metadata = await getStructuredMetaData(
    templatesPath,
    fileName => fileName.startsWith(template),
  );
  return metadata;
};
