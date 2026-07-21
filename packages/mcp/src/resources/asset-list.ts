import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { listAssets } from '@synergy-design-system/metadata';

const RESOURCE_URI = 'synergy://assets/list';

/**
 * Registers a static MCP resource that lists all available icon sets in the Synergy Design System.
 * Clients that support resources can read this directly without calling a tool.
 * @param server - The MCP server instance to register the resource on.
 */
export const assetListResource = (server: McpServer) => {
  server.registerResource(
    'asset-list',
    RESOURCE_URI,
    {
      description: 'All available icon sets in the Synergy Design System, including theme metadata.',
      mimeType: 'application/json',
      title: 'Available icon sets',
    },
    async (_uri) => {
      const allAssets = await listAssets();
      const assets = allAssets.data
        .map(asset => ({
          iconCount: asset.custom?.iconCount,
          id: asset.id,
          name: asset.name,
          since: asset.since,
          theme: asset.custom?.theme ?? 'default',
        }))
        .toSorted((a, b) => a.name.localeCompare(b.name));

      return {
        contents: [
          {
            mimeType: 'application/json',
            text: JSON.stringify(assets, null, 2),
            uri: RESOURCE_URI,
          },
        ],
      };
    },
  );
};
