import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  getAvailableComponents,
  getStructuredMetaData,
} from '../utilities/index.js';

/**
 * Simple tool to list all available components in the Synergy Design System.
 * This tool fetches the component data from the Synergy package and formats it for display.
 * @param server - The MCP server instance to register the tool on.
 */
export const componentListTool = (server: McpServer) => {
  server.registerTool(
    'component-list',
    {
      description: 'Outputs a list of all available components in the Synergy Design System',
      inputSchema: {},
      title: 'List Synergy Components',
    },
    async () => {
      // Get the package data for components
      try {
        const components = await getAvailableComponents();
        const componentNames = components.map(
          filename => `- [syn-${filename}](component-info://syn-${filename})`,
        );

        const aiRules = await getStructuredMetaData('../../metadata/static/component-list');

        return {
          content: [
            {
              text: `Always follow the rules here: ${JSON.stringify(aiRules, null, 2)}`,
              type: 'text',
            },
            {
              text: componentNames.join('\n'),
              type: 'text',
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              text: `Error fetching components: ${(error as Error).message}`,
              type: 'text',
            },
          ],
        };
      }
    },
  );
};
