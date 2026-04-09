import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { listAssets } from '@synergy-design-system/metadata';
import {
  createToolAnnotations,
  getStructuredMetaData,
  withErrorHandler,
} from '../utilities/index.js';

/**
 * Simple tool to list all available iconsets in the Synergy Design System.
 * @param server - The MCP server instance to register the tool on.
 */
export const assetListTool = (server: McpServer) => {
  server.registerTool(
    'asset-list',
    {
      annotations: createToolAnnotations(),
      description: 'Get the available iconsets in the Synergy Design System.',
      title: 'Available iconsets',
    },
    async () => withErrorHandler(async () => {
      // Get the data from metadata files.
      const [aiRules] = await getStructuredMetaData('../../metadata/static/assets');
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
      const groupedAssets = Object.groupBy(assets, asset => asset.theme);

      return [
        aiRules?.content,
        groupedAssets,
      ];
    }),
  );
};
