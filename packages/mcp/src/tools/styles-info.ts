import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  getDataForStyle,
} from '@synergy-design-system/metadata';
import {
  buildStyleRecovery,
  createToolAnnotations,
  getToolRule,
  toolHandler,
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
      description: 'Get examples and usage documentation for one Synergy CSS utility. Use an exact style name returned by styles-list.',
      inputSchema: {
        style: z.string().min(1).describe('Exact style name returned by styles-list. Do not guess or construct this value.'),
      },
      title: 'Get style documentation',
    },
    toolHandler('styles-info', async ({
      style,
    }) => {
      const response = await getDataForStyle(style, { layer: 'examples' });

      if (!response.data) {
        // Return the authoritative catalog so agents can recover without guessing style names.
        return [await buildStyleRecovery(style, `No style found: ${style}`)];
      }

      const aiRules = await getToolRule('styles-info');

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
