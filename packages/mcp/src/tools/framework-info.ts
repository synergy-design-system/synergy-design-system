/* eslint-disable complexity */
import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { getStaticMetaDataForFramework } from '../utilities/index.js';

/**
 * Simple tool to list all available components in the Synergy Design System.
 * This tool fetches the component data from the Synergy package and formats it for display.
 * @param server - The MCP server instance to register the tool on.
 */
export const frameworkInfoTool = (server: McpServer) => {
  server.registerTool(
    'framework-info',
    {
      description: 'Get information about a specific framework package that the Synergy Design System supports',
      inputSchema: {
        framework: z.enum(['react', 'vue', 'angular', 'vanilla']).default('vanilla').optional().describe('The framework you want information for, e.g., "react", "vue", etc.'),
      },
      title: 'Synergy framework information',
    },
    async ({
      framework,
    }) => {
      const staticInformation = await getStaticMetaDataForFramework(framework);

      // Needed framework information
      const content: { text: string; type: 'text' }[] = [
        {
          text: `Common information about the usage of Synergy for framework ${framework}: ${JSON.stringify(staticInformation, null, 2)}`,
          type: 'text',
        },
      ];

      // Provide additional context for the vanilla framework if requested
      if (framework !== 'vanilla') {
        const vanillaInformation = await getStaticMetaDataForFramework('vanilla');
        content.push({
          text: `Additional information about the usage of Synergy for the vanilla framework: ${JSON.stringify(vanillaInformation, null, 2)}`,
          type: 'text',
        });
      }

      return {
        content,
      };
    },
  );
};
