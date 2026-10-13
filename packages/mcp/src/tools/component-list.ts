import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  listComponentClusters,
} from '@synergy-design-system/metadata';
import {
  createToolAnnotations,
  getAvailableComponentNames,
  getToolRule,
  toolHandler,
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
      annotations: createToolAnnotations(),
      description: 'List Synergy component tag names, optionally filtered by cluster. Use component-cluster-list to discover cluster IDs and component-info for documentation.',
      inputSchema: {
        cluster: z.string().optional().describe('Optional component cluster id to filter by, e.g. "components-by-tag/structure".'),
      },
      title: 'List components',
    },
    toolHandler('component-list', async ({
      cluster,
    }) => {
      const aiRules = await getToolRule('component-list');

      const clusters = await listComponentClusters();
      const clusterIds = clusters.data.map((entry) => entry.id);

      if (cluster) {
        const requestedCluster = cluster.trim().toLowerCase();
        const clusterExists = clusterIds.some((id) => id.toLowerCase() === requestedCluster);
        if (!clusterExists) {
          return [
            aiRules,
            {
              availableClusters: clusterIds,
              error: `Unknown cluster '${cluster}'.`,
            },
          ];
        }
      }

      return [
        aiRules,
        await getAvailableComponentNames(cluster),
      ];
    }),
  );
};
