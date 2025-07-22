/* eslint-disable complexity */
import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  getInfoForComponent,
  getStructuredMetaData,
} from '../utilities/index.js';

/**
 * Simple tool to list all available components in the Synergy Design System.
 * This tool fetches the component data from the Synergy package and formats it for display.
 * @param server - The MCP server instance to register the tool on.
 */
export const componentInfoTool = (server: McpServer) => {
  server.registerTool(
    'component-info',
    {
      description: 'Get information about the usage of a specific component in the Synergy Design System',
      inputSchema: {
        component: z.string().startsWith('syn-').describe('The name of the component to get information about.'),
        framework: z.enum(['react', 'vue', 'angular', 'vanilla']).default('vanilla').optional().describe('The framework of the component, e.g., "react", "vue", etc.'),
      },
      title: 'Component info',
    },
    async ({
      component,
      framework,
    }) => {
      const data = await getInfoForComponent(component, framework);
      const text = data && data.length > 0
        ? JSON.stringify(data, null, 2)
        : `No metadata found for component ${component}`;

      const aiRules = await getStructuredMetaData('../../metadata/static/component-info');

      return {
        content: [
          {
            text: `Always follow the rules here: ${JSON.stringify(aiRules, null, 2)}`,
            type: 'text',
          },
          {
            text,
            type: 'text',
          },
        ],
      };
    },
  );
};
