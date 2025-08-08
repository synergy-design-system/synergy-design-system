import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  getAvailableTemplates,
  getStructuredMetaData,
} from '../utilities/index.js';

/**
 * Simple tool to list all available templates in the Synergy Design System.
 * This tool fetches the templates data from the Synergy package and formats it for display.
 * @param server - The MCP server instance to register the tool on.
 */
export const templateList = (server: McpServer) => {
  server.registerTool(
    'template-list',
    {
      description: 'Outputs a list of available static templates built with the Synergy Design System',
      inputSchema: {},
      title: 'List Synergy Templates',
    },
    async () => {
      // Get the package data for templates
      try {
        const templates = await getAvailableTemplates();
        const templateNames = templates.map(
          template => `- ${template}`,
        );

        const aiRules = await getStructuredMetaData(
          '../../metadata/static/templates',
          file => file === 'index.md',
        );

        return {
          content: [
            {
              text: JSON.stringify(aiRules, null, 2),
              type: 'text',
            },
            {
              text: templateNames.join('\n'),
              type: 'text',
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              text: `Error fetching templates: ${(error as Error).message}`,
              type: 'text',
            },
          ],
        };
      }
    },
  );
};
