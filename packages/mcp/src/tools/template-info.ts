import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  createToolAnnotations,
  getDataForTemplate,
  getStructuredMetaData,
  withErrorHandler,
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
      description: 'Get a specific template in the Synergy Design System',
      inputSchema: {
        template: z.string().describe('The name of the template to get information about.'),
      },
      title: 'Template info',
    },
    async ({
      template,
    }) => withErrorHandler(async () => {
      const response = await getDataForTemplate(template, { layer: 'examples' });

      if (!response.data) {
        return [
          `No template found: ${template}`,
        ];
      }

      const [aiRules] = await getStructuredMetaData(
        '../../metadata/static/templates',
        file => file === 'index.md',
      );

      const markdownContent = response.data.examples
        ?.map((entry) => entry.content)
        .join('\n\n') ?? '';

      return [
        aiRules?.content,
        markdownContent,
      ];
    }),
  );
};
