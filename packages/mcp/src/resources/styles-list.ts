import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { listStyles } from '@synergy-design-system/metadata';

const RESOURCE_URI = 'synergy://styles/list';

/**
 * Registers a static MCP resource that lists all available styles in the Synergy Design System.
 * Clients that support resources can read this directly without calling a tool.
 * @param server - The MCP server instance to register the resource on.
 */
export const stylesListResource = (server: McpServer) => {
  server.registerResource(
    'styles-list',
    RESOURCE_URI,
    {
      description: 'All available styles in the Synergy Design System, including theme metadata.',
      mimeType: 'application/json',
      title: 'Available styles',
    },
    async (_uri) => {
      const styles = await listStyles({
        includeLayerRefs: false,
        includeSources: false,
      });
      const styleNames = styles.data
        .map(c => c.name)
        .toSorted();

      return {
        contents: [
          {
            mimeType: 'application/json',
            text: JSON.stringify(styleNames, null, 2),
            uri: RESOURCE_URI,
          },
        ],
      };
    },
  );
};
