import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { listComponents } from '@synergy-design-system/metadata';

const RESOURCE_URI = 'synergy://components/list';

/**
 * Registers a static MCP resource that lists all available components in the Synergy Design System.
 * Clients that support resources can read this directly without calling a tool.
 * @param server - The MCP server instance to register the resource on.
 */
export const componentListResource = (server: McpServer) => {
  server.registerResource(
    'component-list',
    RESOURCE_URI,
    {
      description: 'A list of all available component names in the Synergy Design System.',
      mimeType: 'application/json',
      title: 'Component list',
    },
    async (_uri) => {
      const components = await listComponents({
        includeLayerRefs: false,
        includeSources: false,
      });
      const componentNames = components.data
        .map(c => c.name)
        .toSorted();

      return {
        contents: [
          {
            mimeType: 'application/json',
            text: JSON.stringify(componentNames, null, 2),
            uri: RESOURCE_URI,
          },
        ],
      };
    },
  );
};
