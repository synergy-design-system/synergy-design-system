import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { listComponentClusters } from '@synergy-design-system/metadata';
import {
  createToolAnnotations,
  getToolRule,
  toolHandler,
} from '../utilities/index.js';

/**
 * Lists available component clusters so callers can use them as filters
 * in tools like `component-list`.
 */
export const componentClusterListTool = (server: McpServer) => {
  server.registerTool(
    'component-cluster-list',
    {
      annotations: createToolAnnotations(),
      description: 'Outputs all available component clusters in the Synergy Design System',
      inputSchema: {},
      title: 'Components by cluster',
    },
    toolHandler('component-cluster-list', async () => {
      const aiRules = await getToolRule('component-cluster-list');
      const clusters = await listComponentClusters();

      // Adjust the clusters data so it just outputs the relevant information:
      // - Cluster information (name, description, etc.)
      // - Component names within each cluster (instead of full metadata entities)
      const output = clusters.data.map(cluster => ({
        components: cluster.componentIds.map(id => id.split(':').at(-1)),
        description: cluster.description,
        id: cluster.id,
        name: cluster.name,
      }));

      return [
        aiRules,
        output,
      ];
    }),
  );
};
