import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  getStructuredMetaData,
} from '../utilities/index.js';

/**
 * Simple tool to list all available iconsets in the Synergy Design System.
 * @param server - The MCP server instance to register the tool on.
 */
export const assetListTool = (server: McpServer) => {
  server.registerTool(
    'asset-list',
    {
      description: 'Get the available iconsets in the Synergy Design System.',
      title: 'Available iconsets',
    },
    async () => {
      const aiRules = await getStructuredMetaData('../../metadata/static/assets');
      return {
        content: [
          {
            text: 'Available iconsets in the Synergy Design System:',
            type: 'text',
          },
          {
            text: JSON.stringify([
              {
                text: JSON.stringify(aiRules, null, 2),
                type: 'text',
              },
              {
                description: 'The original set of icons from the Synergy Design System. Use this for projects using Synergy Major Version 2.0.',
                iconset: 'sick2018Icons',
                title: 'Synergy 2018 Icons',
              },
              {
                description: 'New icon set for the brand 2025 refresh. Use this for projects using Synergy Major Version 3.0.',
                iconset: 'sick2025Icons',
                title: 'Synergy 2025 Icons',
              },
            ], null, 2),
            type: 'text',
          },
        ],
      };
    },
  );
};
