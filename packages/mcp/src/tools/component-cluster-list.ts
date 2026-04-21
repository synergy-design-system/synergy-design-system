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
      title: 'Component cluster list',
    },
    toolHandler('component-cluster-list', async () => {
      const aiRules = await getToolRule('component-cluster-list');
      const clusters = await listComponentClusters();

      return [
        aiRules,
        clusters.data,
      ];
    }),
  );
};
