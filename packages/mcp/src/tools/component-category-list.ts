import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { listComponentClusters } from '@synergy-design-system/metadata';
import {
  createToolAnnotations,
  getToolRule,
  toolHandler,
} from '../utilities/index.js';

/**
 * Lists available component categories so callers can use them as filters
 * in tools like `component-list`.
 */
export const componentCategoryListTool = (server: McpServer) => {
  server.registerTool(
    'component-category-list',
    {
      annotations: createToolAnnotations(),
      description: 'Outputs all available component categories in the Synergy Design System',
      inputSchema: {},
      title: 'Components by category',
    },
    toolHandler('component-category-list', async () => {
      const aiRules = await getToolRule('component-category-list');
      const clusters = await listComponentClusters();

      // Adjust the clusters data so it just outputs the relevant information:
      // - Category information (name, description, etc.)
      // - Component names within each category (instead of full metadata entities)
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
