import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  getDataForStyle,
} from '@synergy-design-system/metadata';
import {
  createToolAnnotations,
  getStructuredMetaData,
  withErrorHandler,
} from '../utilities/index.js';

/**
 * Simple tool to retrieve information about a given style in the Synergy Design System.
 * @param server - The MCP server instance to register the tool on.
 */
export const stylesInfoTool = (server: McpServer) => {
  server.registerTool(
    'styles-info',
    {
      annotations: createToolAnnotations(),
      description: 'Get information about css utilities available in the Synergy Design System',
      inputSchema: {
        style: z.string().describe('The name of the style to get information about.'),
      },
      title: 'Styles info',
    },
    async ({
      style,
    }) => withErrorHandler(async () => {
      const response = await getDataForStyle(style, { layer: 'examples' });

      if (!response.data) {
        return [
          `No style found: ${style}`,
        ];
      }

      const [aiRules] = await getStructuredMetaData(
        '../../metadata/static/styles',
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
