import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  getDataForComponent,
} from '@synergy-design-system/metadata';
import {
  buildComponentRecovery,
  createToolAnnotations,
  getEntityExample,
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
      description: 'Get API, examples, rules, or full documentation for one Synergy component and optional framework. Use an exact component tag returned by component-list. For one example, set layer to examples and use an ID returned by component-list-examples.',
      inputSchema: z.object({
        component: z.string().min(1).describe('Exact component tag returned by component-list, for example syn-button. Do not guess or construct this value.'),
        exampleId: z.string().optional().describe('Exact ID returned by component-list-examples. A non-empty ID requires layer: "examples". Omit or leave empty to return the requested layer.'),
        framework: z.enum(['react', 'vue', 'angular', 'vanilla']).optional().describe('The framework of the component, e.g., "react", "vue", etc.'),
        layer: z.enum(['full', 'examples', 'interface', 'rules'])
          .optional()
          .describe('Information layer: full source, markdown examples, API interface, or usage rules. Examples and interface are currently available only for vanilla components.'),
      }).superRefine((args, ctx) => {
        if (args.exampleId !== undefined && args.exampleId !== '' && args.layer !== 'examples') {
          ctx.addIssue({ code: 'custom', message: 'exampleId requires layer: examples.', path: ['exampleId'] });
        }
      }).meta({
        // Zod refinements are not included in the MCP JSON schema.
        allOf: [{
          if: { properties: { exampleId: { minLength: 1 } }, required: ['exampleId'] },
          then: { properties: { layer: { const: 'examples' } }, required: ['layer'] },
        }],
      }),
      title: 'Get component details',
    },
    toolHandler('component-info', async ({
      component,
      exampleId,
      framework,
      layer,
    }) => {
      const { tools } = getRuntimeConfig();
      const resolvedFramework = framework ?? tools.componentInfo.framework;
      const resolvedLayer = layer ?? tools.componentInfo.layer;

      if (exampleId !== undefined && exampleId !== '') {
        const aiRules = await getToolRule('component-info');
        const frameworkRules = resolvedFramework !== 'vanilla' ? await getToolRule(`component-info-${resolvedFramework}`) : undefined;
        return [aiRules, frameworkRules, await getEntityExample('component', component, exampleId)];
      }

      const metadata = await getDataForComponent(component, {
        framework: resolvedFramework,
        layer: resolvedLayer,
      });

      const aiRules = await getToolRule('component-info');
      const frameworkRules = resolvedFramework !== 'vanilla' ? await getToolRule(`component-info-${resolvedFramework}`) : undefined;

      if (!metadata.data) {
        const notFoundMessage = metadata.errors?.[0]?.message ?? `No metadata found for component ${component}`;
        // Return the authoritative catalog so agents can recover without guessing component tags.
        return [aiRules, frameworkRules, await buildComponentRecovery(component, notFoundMessage)];
      }

      const { data } = metadata;
      const finalContent = data.layer === 'full'
        ? [data]
        : data[data.layer]?.map(entry => entry.content) ?? [];

      const withRules = [aiRules, frameworkRules, ...finalContent];
      return finalContent.length > 0
        ? withRules
        : [`No metadata content found for component ${component} in layer ${resolvedLayer}`];
    }),
  );
};
