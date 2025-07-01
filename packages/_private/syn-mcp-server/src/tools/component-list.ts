import { dirname } from 'path';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { getPackageData } from '../utilities/index.js';

/**
 * Simple tool to list all available components in the Synergy Design System.
 * This tool fetches the component data from the Synergy package and formats it for display.
 * @param server - The MCP server instance to register the tool on.
 */
export const componentListTool = (server: McpServer) => {
  server.registerTool(
    'component-list',
    {
      description: 'Outputs a list of all available components in the Synergy Design System',
      inputSchema: {},
      title: 'List Synergy Components',
    },
    async () => {
      // Get the package data for components
      try {
        const packages = await getPackageData('components');
        const componentNames = Object
          .values(packages?.components ?? {})
          .map(component => component.filename)
          .filter(filename => filename.endsWith('.component.ts'))
          .sort()
          .map(filename => dirname(filename))
          .map(filename => `- syn-${filename}`);
        return {
          content: [
            {
              text: `Available components: ${componentNames.join('\n')}`,
              type: 'text',
            },
          ],
        };
      } catch (error: unknown) {
        return {
          content: [
            {
              text: `Error fetching components: ${(error as Error).message}`,
              type: 'text',
            },
          ],
        };
      }
    },
  );
};
