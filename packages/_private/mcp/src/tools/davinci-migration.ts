import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { getStructuredMetaData, metaDataPath } from '../utilities/index.js';

export const davinciMigrationTool = (server: McpServer) => {
  server.registerTool(
    'davinci-migration',
    {
      description: 'Get information about the migration of a specific component from DaVinci to Synergy.',
      inputSchema: {
        component: z.string().startsWith('davinci-').describe('The name of the davinci component to get migration information about.'),
      },
      title: 'DaVinci Migration Info',
    },
    async ({ component }) => {
      const metadata = await getStructuredMetaData(`${metaDataPath}/davinci-migration`);

      if (!metadata || metadata.length === 0) {
        return {
          content: [
            {
              text: `No migration information found for components! Please ensure the metadata files are present in the ${metaDataPath}/davinci-migration directory.`,
              type: 'text',
            },
          ],
        };
      }

      const regex = new RegExp(
        `^### ${component.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}[\\s\\S]*?(?=^### |\\Z)`,
        'm',
      );
      const match = metadata.at(0)!.content.match(regex);
      return {
        content: [
          {
            text: `Overall migration information: ${JSON.stringify(metadata, null, 2)}`,
            type: 'text',
          },
          {
            text: match ? `Migration information for ${component}: ${match.at(0)}` : `No migration information found for component ${component}.`,
            type: 'text',
          },
        ],
      };
    },
  );
};
