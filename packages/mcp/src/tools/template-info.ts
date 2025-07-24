/* eslint-disable complexity */
import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  getInfoForTemplate,
  getStructuredMetaData,
} from '../utilities/index.js';

/**
 * Simple tool to list all available components in the Synergy Design System.
 * This tool fetches the component data from the Synergy package and formats it for display.
 * @param server - The MCP server instance to register the tool on.
 */
export const templateInfoTool = (server: McpServer) => {
  server.registerTool(
    'template-info',
    {
      description: 'Get a specific template in the Synergy Design System',
      inputSchema: {
        template: z.string().describe('The name of the template to get information about.'),
      },
      title: 'Template info',
    },
    async ({
      template,
    }) => {
      const data = await getInfoForTemplate(template);
      const text = data && data.length > 0
        ? JSON.stringify(data, null, 2)
        : `No metadata found for template ${template}`;

      const aiRules = await getStructuredMetaData(
        '../../metadata/static/templates',
        file => file === 'index.md',
      );

      return {
        content: [
          {
            text: JSON.stringify(aiRules, null, 2),
            type: 'text',
          },
          {
            text,
            type: 'text',
          },
        ],
      };
    },
  );
};
