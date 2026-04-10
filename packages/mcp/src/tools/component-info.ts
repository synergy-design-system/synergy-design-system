import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  getDataForComponent,
} from '@synergy-design-system/metadata';
import {
  createToolAnnotations,
  getToolRule,
  withErrorHandler,
} from '../utilities/index.js';

/**
 * Simple tool to retrieve information about a given component in the Synergy Design System.
 * @param server - The MCP server instance to register the tool on.
 */
export const componentInfoTool = (server: McpServer) => {
  server.registerTool(
    'component-info',
    {
      annotations: createToolAnnotations(),
      description: 'Get information about the usage of a specific component in the Synergy Design System',
      inputSchema: {
        component: z.string().startsWith('syn-').describe('The name of the component to get information about.'),
        framework: z.enum(['react', 'vue', 'angular', 'vanilla']).default('vanilla').optional().describe('The framework of the component, e.g., "react", "vue", etc.'),
        layer: z.enum(['full', 'examples', 'interface']).default('full').optional().describe('Which metadata layer to return. full = filtered source files, examples = markdown examples, interface = markdown API overview.'),
      },
      title: 'Component info',
    },
    async ({
      component,
      framework,
      layer,
    }) => withErrorHandler(async () => {
      const metadata = await getDataForComponent(component, {
        framework,
        layer,
      });

      const aiRules = await getToolRule('component-info');
      const frameworkRules = framework && framework !== 'vanilla' ? await getToolRule('component-info', framework) : undefined;

      if (!metadata.data) {
        const notFoundMessage = metadata.errors?.[0]?.message ?? `No metadata found for component ${component}`;
        return [notFoundMessage];
      }

      let finalContent = [];

      switch (metadata.data.layer) {
        case 'interface':
          finalContent = metadata.data.interface?.map((entry) => entry.content) ?? [];
          break;
        case 'examples':
          finalContent = metadata.data.examples?.map((entry) => entry.content) ?? [];
          break;
        default:
          finalContent = [metadata.data];
      }

      const rules = [aiRules, frameworkRules].filter(Boolean);
      const withRules = [...rules, ...finalContent];
      return finalContent.length > 0
        ? withRules
        : [`No metadata content found for component ${component} in layer ${metadata.data.layer}`];
    }),
  );
};
