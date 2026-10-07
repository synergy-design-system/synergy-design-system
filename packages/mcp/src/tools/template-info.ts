import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  getDataForTemplate,
} from '@synergy-design-system/metadata';
import {
  buildTemplateRecovery,
  createToolAnnotations,
  getToolRule,
  toolHandler,
} from '../utilities/index.js';

/**
 * Simple tool to retrieve information about a given template in the Synergy Design System.
 * @param server - The MCP server instance to register the tool on.
 */
export const templateInfoTool = (server: McpServer) => {
  server.registerTool(
    'template-info',
    {
      annotations: createToolAnnotations(),
      description: 'Get example markup and documentation for one static Synergy template. Use an exact template name returned by template-list.',
      inputSchema: {
        template: z.string().min(1).describe('Exact template name returned by template-list. Do not guess or construct this value.'),
      },
      title: 'Get template details',
    },
    toolHandler('template-info', async ({
      template,
    }) => {
      const response = await getDataForTemplate(template, { layer: 'examples' });

      if (!response.data) {
        // Return the authoritative catalog so agents can recover without guessing template names.
        return [await buildTemplateRecovery(template, `No template found: ${template}`)];
      }

      const aiRules = await getToolRule('template-info');

      const markdownContent = response.data.examples
        ?.map((entry) => entry.content)
        .join('\n\n') ?? '';

      return [
        aiRules,
        markdownContent,
      ];
    }),
  );
};
