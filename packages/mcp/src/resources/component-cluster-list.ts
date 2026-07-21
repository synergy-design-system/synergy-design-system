import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { listComponentClusters } from '@synergy-design-system/metadata';

const RESOURCE_URI = 'synergy://component-clusters/list';

/**
 * Registers a static MCP resource that lists all available component clusters in the Synergy Design System.
 * Clients that support resources can read this directly without calling a tool.
 * @param server - The MCP server instance to register the resource on.
 */
export const componentClustersListRessource = (server: McpServer) => {
  server.registerResource(
    'component-clusters-list',
    RESOURCE_URI,
    {
      description: 'Available component clusters in the Synergy Design System.',
      mimeType: 'application/json',
      title: 'Available component clusters',
    },
    async (_uri) => {
      const clusters = await listComponentClusters();
      const data = clusters.data.map(cluster => ({
        description: cluster.description,
        id: cluster.id,
        name: cluster.name,
      }));

      return {
        contents: [
          {
            mimeType: 'application/json',
            text: JSON.stringify(data, null, 2),
            uri: RESOURCE_URI,
          },
        ],
      };
    },
  );
};
