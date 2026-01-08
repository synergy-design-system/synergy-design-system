import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  getTokensMigrationMetaData,
} from '../utilities/index.js';

/**
 * Simple tool to list all available migrations for the tokens package in the Synergy Design System.
 * @param server - The MCP server instance to register the tool on.
 */
export const tokenMigrationsTool = (server: McpServer) => {
  server.registerTool(
    'tokens-migration',
    {
      description: 'Get information about migrations for the tokens package in the Synergy Design System',
      inputSchema: {
      },
      title: 'Token migrations',
    },
    async () => {
      const metadata = await getTokensMigrationMetaData();
      return {
        content: [{
          text: JSON.stringify(metadata, null, 2),
          type: 'text',
        }],
      };
    },
  );
};
