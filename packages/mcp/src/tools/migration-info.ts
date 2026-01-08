import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  componentStaticPath,
  getMigrationMetaData,
  getStructuredMetaData,
} from '../utilities/index.js';

/**
 * Simple tool to list all available migrations for the components in the Synergy Design System.
 * @param server - The MCP server instance to register the tool on.
 */
export const migrationInfoTool = (server: McpServer) => {
  server.registerTool(
    'migration-info',
    {
      description: 'Get information about migrations available in the Synergy Design System',
      inputSchema: {
      },
      title: 'Migration info',
    },
    async () => {
      const metadata = await getMigrationMetaData();
      const changelog = await getStructuredMetaData(componentStaticPath, fileName => fileName.toLowerCase().includes('changelog'));
      return {
        content: [
          {
            text: JSON.stringify(metadata, null, 2),
            type: 'text',
          },
          {
            text: JSON.stringify(changelog, null, 2),
            type: 'text',
          },
        ],
      };
    },
  );
};
