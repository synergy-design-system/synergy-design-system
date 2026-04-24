import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  listComponentClusters,
  listComponents,
} from '@synergy-design-system/metadata';
import {
  createToolAnnotations,
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
      description: 'Outputs a list of all available components in the Synergy Design System',
      inputSchema: {
        category: z.string().optional().describe('Optional component cluster id to filter by, e.g. "components-by-tag/structure".'),
      },
      title: 'Component list',
    },
    toolHandler('component-list', async ({
      category,
    }) => {
      const aiRules = await getToolRule('component-list');

      const clusters = await listComponentClusters();
      const clusterIds = clusters.data.map((entry) => entry.id);

      if (category) {
        const requestedCluster = category.trim().toLowerCase();
        const clusterExists = clusterIds.some((id) => id.toLowerCase() === requestedCluster);
        if (!clusterExists) {
          return [
            aiRules,
            {
              availableClusters: clusterIds,
              error: `Unknown cluster '${category}'.`,
            },
          ];
        }
      }

      const components = await listComponents({
        cluster: category,
        includeLayerRefs: false,
        includeSources: false,
      });
      const componentNames = components.data
        .map(c => c.name)
        .toSorted();

      return [
        aiRules,
        componentNames,
      ];
    }),
  );
};
