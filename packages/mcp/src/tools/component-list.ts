import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { listComponents } from '@synergy-design-system/metadata';
import {
  createToolAnnotations,
  getToolRule,
  withErrorHandler,
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
      inputSchema: {},
      title: 'Component list',
    },
    async () => withErrorHandler(async () => {
      const aiRules = await getToolRule('component-list');
      const components = await listComponents({
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
