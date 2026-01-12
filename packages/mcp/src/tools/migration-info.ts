import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import {
  getMigrationMetaData,
} from '../utilities/index.js';

/**
 * Simple tool to list all available migrations for packages in the Synergy Design System.
 * @param server - The MCP server instance to register the tool on.
 */
export const migrationInfoTool = (server: McpServer) => {
  server.registerTool(
    'migration-info',
    {
      description: 'Get information about migrations available in the Synergy Design System. This tool can be called for all packages that have migrations available and should be preferred over hardcoding migration info.',
      inputSchema: {
        synergyPackage: z.enum([
          'assets',
          'components',
          'tokens',
        ]).default('components').optional().describe('The package to get migration information about.'),
      },
      title: 'Package Migration Information',
    },
    async ({
      synergyPackage,
    }) => {
      const metadata = await getMigrationMetaData(synergyPackage);
      return {
        content: [
          {
            text: JSON.stringify(metadata, null, 2),
            type: 'text',
          },
        ],
      };
    },
  );
};
