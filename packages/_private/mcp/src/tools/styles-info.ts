import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  getStructuredMetaData,
  getStylesMetaData,
} from '../utilities/index.js';

/**
 * Simple tool to list all available tokens in the Synergy Design System.
 * This tool fetches the token data from the Synergy package and formats it for display.
 * @param server - The MCP server instance to register the tool on.
 */
export const stylesInfoTool = (server: McpServer) => {
  server.registerTool(
    'styles-info',
    {
      description: 'Get information about css utilities available in the Synergy Design System',
      inputSchema: {
      },
      title: 'Styles info',
    },
    async () => {
      const metadata = await getStylesMetaData();
      const aiRules = await getStructuredMetaData('../../metadata/static/styles');

      return {
        content: [
          {
            text: `Always follow the rules here: ${JSON.stringify(aiRules, null, 2)}`,
            type: 'text',
          },
          {
            text: JSON.stringify(metadata, null, 2),
            type: 'text',
          },
        ],
      };
    },
  );
};
