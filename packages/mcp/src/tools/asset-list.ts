import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { listAssets } from '@synergy-design-system/metadata';
import {
  getStructuredMetaData,
  toContentArray,
} from '../utilities/index.js';

/**
 * Simple tool to list all available iconsets in the Synergy Design System.
 * @param server - The MCP server instance to register the tool on.
 */
export const assetListTool = (server: McpServer) => {
  server.registerTool(
    'asset-list',
    {
      annotations: {
        destructiveHint: true,
        idempotentHint: true,
        readOnlyHint: true,
      },
      description: 'Get the available iconsets in the Synergy Design System.',
      title: 'Available iconsets',
    },
    async () => {
      try {
        // Get the data from metadata files.
        const [aiRules] = await getStructuredMetaData('../../metadata/static/assets');
        const allAssets = await listAssets();
        const assets = allAssets.data
          .map(asset => ({
            iconCount: asset?.custom?.iconCount ?? undefined,
            id: asset.id,
            name: asset.name,
            since: asset.since,
            theme: (asset?.custom?.theme as string) ?? 'default',
          }))
          .toSorted((a, b) => a.name.localeCompare(b.name));
        const groupedAssets = Object.groupBy(assets, asset => asset.theme);

        return toContentArray([
          aiRules ? aiRules?.content : undefined,
          groupedAssets,
        ]);
      } catch (error) {
        return {
          content: [{
            text: `Error fetching asset list: ${error instanceof Error ? error.message : String(error)}`,
            type: 'text',
          }],
        };
      }
    },
  );
};
