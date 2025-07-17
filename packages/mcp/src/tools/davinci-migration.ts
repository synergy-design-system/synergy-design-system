import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { getStructuredMetaData, metaDataPath } from '../utilities/index.js';

const data = getStructuredMetaData(`${metaDataPath}/davinci-migration`);

export const davinciMigrateComponentList = (server: McpServer) => {
  server.registerTool(
    'davinci-migrate-list',
    {
      description: 'Get a list of all components that have migration information from DaVinci to Synergy.',
      title: 'DaVinci Migration List',
    },
    async () => {
      const metadata = await data; // Ensure metadata is loaded

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

      // Extract all h3 headings that start with 'davinci-'
      const matches = Array.from(
        metadata.at(0)!.content.matchAll(/^### (davinci-[\w-]+)/gm),
      ).map(match => `- ${match[1].replace('### ', '')}`);

      return {
        content: [
          {
            text: `Migration information was found for the following components: ${matches.join(', ')}`,
            type: 'text',
          },
        ],
      };
    },
  );
};

export const davinciMigrateComponentTool = (server: McpServer) => {
  server.registerTool(
    'davinci-migrate-component',
    {
      description: 'Get information about the migration of a specific component from DaVinci to Synergy.',
      inputSchema: {
        component: z.string().startsWith('davinci-').describe('The name of the davinci component to get migration information about.'),
      },
      title: 'DaVinci Migration Info',
    },
    async ({ component }) => {
      const metadata = await data; // Ensure metadata is loaded

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

      // Only process the the parts of the migration guide we are interested in
      const regex = new RegExp(
        `^### ${component.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}[\\s\\S]*?(?=^### |\\Z)`,
        'm',
      );
      const match = metadata.at(0)!.content.match(regex);

      const text = match
        ? `Migration information for ${component}: ${match.at(0)}`
        : `No migration information found for component ${component}. Here is some common migration information: ${JSON.stringify(metadata, null, 2)}`;

      return {
        content: [
          {
            text,
            type: 'text',
          },
        ],
      };
    },
  );
};
