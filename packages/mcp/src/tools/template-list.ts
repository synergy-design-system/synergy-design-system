import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  createToolAnnotations,
  getAvailableTemplateNames,
  getToolRule,
  toolHandler,
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
      description: 'List available static templates built with Synergy components. Use a returned template name with template-info.',
      inputSchema: {},
      title: 'List templates',
    },
    toolHandler('template-list', async () => {
      const templateNames = (await getAvailableTemplateNames())
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
