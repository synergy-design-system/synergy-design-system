/* eslint-disable complexity */
import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  getPackageData,
  getStructuredMetaDataForComponent,
} from '../utilities/index.js';

/**
 * Simple tool to list all available components in the Synergy Design System.
 * This tool fetches the component data from the Synergy package and formats it for display.
 * @param server - The MCP server instance to register the tool on.
 */
export const componentInfoTool = (server: McpServer) => {
  server.registerTool(
    'component-info',
    {
      description: 'Get information about the usage of a specific component in the Synergy Design System',
      inputSchema: {
        component: z.string().startsWith('syn-').describe('The name of the component to get information about.'),
        framework: z.enum(['react', 'vue', 'angular', 'vanilla']).default('vanilla').optional().describe('The framework of the component, e.g., "react", "vue", etc.'),
      },
      title: 'Component info',
    },
    async ({
      component,
      framework,
    }) => {
      // Split the component name to ensure it is valid
      const fsComponentName = component.split('syn-').at(-1);

      // Filter function to select specific files based on the framework
      const namePatterns = ['README.md', 'component.ts'];

      switch (framework) {
      case 'react':
        namePatterns.push('react');
        break;
      case 'vue':
        namePatterns.push('vue');
        break;
      case 'angular':
        namePatterns.push('angular');
        break;
      default:
      }

      const data = await getStructuredMetaDataForComponent(
        component,
        fileName => !namePatterns.includes(fileName),
      );

      // Old logic: Works :)
      const packageData = await getPackageData('components');
      const componentInfo = Object
        .values(packageData?.components ?? {})
        .find(c => c.filename.endsWith(`${fsComponentName}.component.ts`));

      if (!componentInfo) {
        throw new Error(`Component "${component}" not found. Please ensure it is a valid component name starting with "syn-".`);
      }

      return {
        content: [
          {
            text: JSON.stringify(componentInfo.content, null, 2),
            type: 'text',
          },
          {
            text: `Metadata for components: ${JSON.stringify(data, null, 2)}`,
            type: 'text',
          },
        ],
      };
    },
  );
};
