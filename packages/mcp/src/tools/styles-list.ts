import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  getAvailableStyles,
  getStructuredMetaData,
} from '../utilities/index.js';

/**
 * Simple tool to list all available styles in the Synergy Design System.
 * This tool fetches the styles data from the Synergy package and formats it for display.
 * @param server - The MCP server instance to register the tool on.
 */
export const stylesList = (server: McpServer) => {
  server.registerTool(
    'styles-list',
    {
      description: 'Outputs a list of available styles in the Synergy Design System',
      inputSchema: {},
      title: 'List Synergy Styles',
    },
    async () => {
      // Get the package data for styles
      try {
        const styles = await getAvailableStyles();
        const styleNames = styles.map(
          style => `- ${style}`,
        );

        const aiRules = await getStructuredMetaData('../../metadata/static/styles');

        return {
          content: [
            {
              text: `Always follow the rules here: ${JSON.stringify(aiRules, null, 2)}`,
              type: 'text',
            },
            {
              text: styleNames.join('\n'),
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
