import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  getDataForComponent,
} from '@synergy-design-system/metadata';
import {
  createToolAnnotations,
  getRuntimeConfig,
  getToolRule,
  toolHandler,
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
        framework: z.enum(['react', 'vue', 'angular', 'vanilla']).optional().describe('The framework of the component, e.g., "react", "vue", etc.'),
        layer: z.enum(['full', 'examples', 'interface'])
          .optional()
          .describe('Defines which type of information to return. full = filtered source files (useful for debugging), examples = markdown examples, interface = markdown API overview. Examples and interface are only available for vanilla components at the moment.')
        ,
      },
      title: 'Component info',
    },
    toolHandler('component-info', async ({
      component,
      framework,
      layer,
    }) => {
      const { tools } = getRuntimeConfig();
      const resolvedFramework = framework ?? tools.componentInfo.framework;
      const resolvedLayer = layer ?? tools.componentInfo.layer;

      const metadata = await getDataForComponent(component, {
        framework: resolvedFramework,
        layer: resolvedLayer,
      });

      const aiRules = await getToolRule('component-info');
      const frameworkRules = resolvedFramework !== 'vanilla' ? await getToolRule(`component-info-${resolvedFramework}`) : undefined;

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
        : [`No metadata content found for component ${component} in layer ${resolvedLayer}`];
    }),
  );
};
