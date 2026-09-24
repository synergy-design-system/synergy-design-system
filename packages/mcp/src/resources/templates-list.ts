import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { listTemplates } from '@synergy-design-system/metadata';
import { resourceHandler } from '../utilities/metadata.js';

const RESOURCE_URI = 'synergy://templates/list';

/**
 * Registers a static MCP resource that lists all available templates in the Synergy Design System.
 * Clients that support resources can read this directly without calling a tool.
 * @param server - The MCP server instance to register the resource on.
 */
export const templatesListResource = (server: McpServer) => {
  server.registerResource(
    'templates-list',
    RESOURCE_URI,
    {
      description: 'Static JSON index of Synergy template names. Use template-info for example markup and documentation.',
      mimeType: 'application/json',
      title: 'Synergy template index',
    },
    resourceHandler('templates-list', async (_uri) => {
      const response = await listTemplates();
      const templates = response.data
        .map(template => template.name)
        .toSorted();

      return {
        contents: [
          {
            mimeType: 'application/json',
            text: JSON.stringify(templates, null, 2),
            uri: RESOURCE_URI,
          },
        ],
      };
    }),
  );
};
