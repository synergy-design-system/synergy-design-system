import {
  getDataForTemplate,
  getTemplateMetadata,
  listTemplates,
} from '@synergy-design-system/metadata';
import {
  getStructuredMetaData,
} from './metadata.js';
import {
  templatesPath,
} from './config.js';

export const getTemplateMetaData = async () => getStructuredMetaData(templatesPath);

// Re-export metadata package APIs for MCP tools
export { getDataForTemplate, getTemplateMetadata, listTemplates };
