import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  getDataForTokens,
} from '@synergy-design-system/metadata';
import {
  createToolAnnotations,
  getRuntimeConfig,
  getToolRule,
  toolHandler,
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
        tokenScope: z.enum(['components', 'charts']).optional().describe(
          'Filter tokens by scope: "components" for base component tokens, "charts" for chart palette tokens.',
        ),
        type: z.enum(['javascript', 'css', 'sass']).optional().describe('The type of token output to retrieve.'),
      },
      title: 'Token info',
    },
    toolHandler('token-info', async ({
      theme,
      tokenScope,
      type,
    }) => {
      const resolvedType = type ?? getRuntimeConfig().tools.tokenInfo.type;
      const resolvedScope = tokenScope ?? getRuntimeConfig().tools.tokenInfo.tokenScope;

      // sick2018 themes are not available for chart tokens — fall back to sick2025 equivalent.
      let resolvedTheme = theme;

      if (resolvedScope === 'charts' && theme) {
        if (theme === 'sick2018-light') {
          resolvedTheme = 'sick2025-light';
        } else if (theme === 'sick2018-dark') {
          resolvedTheme = 'sick2025-dark';
        }
      }

      const response = await getDataForTokens({
        format: resolvedType,
        theme: resolvedTheme,
      });

      if (response.data.tokens.length === 0) {
        return [
          `No tokens found for type "${resolvedType}"${resolvedTheme ? ` and theme "${resolvedTheme}"` : ''} and tokenScope "${resolvedScope}".`,
        ];
      }

      // Filter tokens by scope based on whether the path contains '/charts/'.
      const filteredTokens = response.data.tokens.filter((item) => {
        const isChartToken = item.path.includes('/charts/');
        return resolvedScope === 'charts' ? isChartToken : !isChartToken;
      });

      const aiRules = await getToolRule('token-info');
      return [
        aiRules,
        ...filteredTokens.map(token => token.content),
      ];
    }),
  );
};
