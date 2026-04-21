import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  getDataForTokens,
} from '@synergy-design-system/metadata';
import {
  createToolAnnotations,
  toolHandler,
} from '../utilities/index.js';

type TokenTheme = 'sick2018-dark' | 'sick2018-light' | 'sick2025-dark' | 'sick2025-light';

/**
 * Simple tool to list available token output types and theme variants.
 * @param server - The MCP server instance to register the tool on.
 */
export const tokenListTool = (server: McpServer) => {
  server.registerTool(
    'tokens-list',
    {
      annotations: createToolAnnotations(),
      description: 'Outputs a list of available token output types and css themes in the Synergy Design System',
      inputSchema: {},
      title: 'Tokens list',
    },
    toolHandler('tokens-list', async () => {
      const cssCandidates: TokenTheme[] = ['sick2018-dark', 'sick2018-light', 'sick2025-dark', 'sick2025-light'];
      const cssChecks = await Promise.all(cssCandidates.map(async (theme) => {
        const result = await getDataForTokens({
          format: 'css',
          theme,
        });

        return {
          hasTokens: result.data.tokens.length > 0,
          theme,
        };
      }));

      const javascriptResult = await getDataForTokens({
        format: 'javascript',
      });
      const sassResult = await getDataForTokens({
        format: 'sass',
      });

      const cssThemes = cssChecks
        .filter(entry => entry.hasTokens)
        .map(entry => entry.theme)
        .sort();

      const hasJavascript = javascriptResult.data.tokens.length > 0;
      const hasSass = sassResult.data.tokens.length > 0;

      return [{
        defaults: {
          tokenInfo: {
            theme: 'sick2025-light',
            type: 'css',
          },
        },
        supportedTypes: [
          ...(cssThemes.length > 0 ? ['css'] : []),
          ...(hasJavascript ? ['javascript'] : []),
          ...(hasSass ? ['sass'] : []),
        ],
        themes: [...cssThemes].sort(),
      }];
    }),
  );
};
