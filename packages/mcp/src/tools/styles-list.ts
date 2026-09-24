import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  createToolAnnotations,
  getAvailableStyleNames,
  getToolRule,
  toolHandler,
} from '../utilities/index.js';

/**
 * Simple tool to list all available styles in the Synergy Design System.
 * This tool fetches the styles data from the Synergy package and formats it for display.
 * @param server - The MCP server instance to register the tool on.
 */
export const stylesList = (server: McpServer) => {
  server.registerTool(
    'styles-list',
    {
      annotations: createToolAnnotations(),
      description: 'List available Synergy CSS utility and style names. Use a returned name with styles-info for examples and usage.',
      inputSchema: {},
      title: 'List CSS utilities',
    },
    toolHandler('styles-list', async () => {
      const aiRules = await getToolRule('styles-list');
      return [
        aiRules,
        await getAvailableStyleNames(),
      ];
    }),
  );
};
