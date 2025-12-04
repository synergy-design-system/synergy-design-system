import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  getFontsMetaData,
  getStructuredMetaData,
} from '../utilities/index.js';

/**
 * Simple tool to retrieve information about the fonts used in the Synergy Design System.
 * @param server - The MCP server instance to register the tool on.
 */
export const fontInfoTool = (server: McpServer) => {
  server.registerTool(
    'font-info',
    {
      description: 'Get the list of used fonts and their setup for the Synergy Design System.',
      title: 'Font Information',
    },
    async () => {
      const aiRules = await getStructuredMetaData('../../metadata/static/fonts');
      const fontsData = await getFontsMetaData(
        (fileName) => !fileName.toLowerCase().startsWith('changelog'),
      );

      return {
        content: [
          {
            text: 'Available fonts in the Synergy Design System:',
            type: 'text',
          },
          {
            text: JSON.stringify([
              {
                text: JSON.stringify(aiRules, null, 2),
                type: 'text',
              },
            ], null, 2),
            type: 'text',
          },
          {
            text: JSON.stringify(fontsData, null, 2),
            type: 'text',
          },
        ],
      };
    },
  );
};
