import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { listComponents } from '@synergy-design-system/metadata';
import {
  createToolAnnotations,
  getStructuredMetaData,
  toContentArray,
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
      title: 'List Synergy Components',
    },
    async () => {
      const content = [];

      try {
        const [aiRules] = await getStructuredMetaData('../../metadata/static/component-list');
        const components = await listComponents();
        const componentNames = components.data
          .map(c => c.name)
          .toSorted();

        content.push(aiRules?.content);
        content.push(componentNames);
      } catch (error) {
        content.push({
          text: `Error fetching component list: ${error instanceof Error ? error.message : String(error)}`,
          type: 'text',
        });
      }

      return toContentArray(content);
    },
  );
};
