import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  getDataForTokens,
} from '@synergy-design-system/metadata';
import {
  createToolAnnotations,
  withErrorHandler,
} from '../utilities/index.js';

/**
 * Simple tool to return raw token file contents from the Synergy Design System.
 * This tool fetches the filtered token artifact content and returns the content blocks directly.
 * @param server - The MCP server instance to register the tool on.
 */
export const tokenInfoTool = (server: McpServer) => {
  server.registerTool(
    'token-info',
    {
      annotations: createToolAnnotations(),
      description: 'Get raw design token file contents from the Synergy Design System',
      inputSchema: {
        theme: z.enum(['sick2025-light', 'sick2025-dark', 'sick2018-light', 'sick2018-dark']).optional().describe('Theme variant for CSS tokens. Ignored for javascript and sass.'),
        type: z.enum(['javascript', 'css', 'sass']).default('css').optional().describe('The type of token output to retrieve.'),
      },
      title: 'Token info',
    },
    async ({
      theme,
      type,
    }) => withErrorHandler(async () => {
      const response = await getDataForTokens({
        format: type,
        theme,
      });

      if (response.data.tokens.length === 0) {
        return [
          `No tokens found for type "${type}"${theme ? ` and theme "${theme}"` : ''}.`,
        ];
      }

      return response.data.tokens.map((item) => item.content);
    }),
  );
};
