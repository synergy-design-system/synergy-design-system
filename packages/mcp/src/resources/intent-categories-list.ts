import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  listIntentCategories,
} from '@synergy-design-system/metadata';

const RESOURCE_URI = 'synergy://intent-categories/list';

/**
 * Registers a static MCP resource that lists all available intent categories in the Synergy Design System.
 * Clients that support resources can read this directly without calling a tool.
 * @param server - The MCP server instance to register the resource on.
 */
export const intentCategoriesListResource = (server: McpServer) => {
  server.registerResource(
    'intent-categories-list',
    RESOURCE_URI,
    {
      description: 'Available intent categories in the Synergy Design System.',
      mimeType: 'application/json',
      title: 'Available intent categories',
    },
    async (_uri) => {
      const categories = await listIntentCategories();

      return {
        contents: [
          {
            mimeType: 'application/json',
            text: JSON.stringify(categories, null, 2),
            uri: RESOURCE_URI,
          },
        ],
      };
    },
  );
};
