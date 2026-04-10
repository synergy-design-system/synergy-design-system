import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  listTemplates,
} from '@synergy-design-system/metadata';
import {
  createToolAnnotations,
  getToolRule,
  withErrorHandler,
} from '../utilities/index.js';

/**
 * Simple tool to list all available templates in the Synergy Design System.
 * This tool fetches the templates data from the metadata store and formats it for display.
 * @param server - The MCP server instance to register the tool on.
 */
export const templateList = (server: McpServer) => {
  server.registerTool(
    'template-list',
    {
      annotations: createToolAnnotations(),
      description: 'Outputs a list of available static templates built with the Synergy Design System',
      inputSchema: {},
      title: 'List Synergy Templates',
    },
    async () => withErrorHandler(async () => {
      const response = await listTemplates();
      const templateNames = response.data
        .map(template => template.name)
        .sort()
        .map(name => `- ${name}`)
        .join('\n');

      const aiRules = await getToolRule('template-list');

      return [
        aiRules,
        templateNames,
      ];
    }),
  );
};
