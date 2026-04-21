import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  SUPPORTED_PACKAGES,
  createToolAnnotations,
  extractDavinciComponents,
  getMigrationGuideContent,
  getRuntimeConfig,
  toolHandler,
} from '../utilities/index.js';

export const davinciMigrationListTool = (server: McpServer) => {
  server.registerTool(
    'davinci-migration-list',
    {
      annotations: createToolAnnotations(),
      description: 'Get a list of all components that have migration information from DaVinci to Synergy.',
      inputSchema: {
        package: z.enum(SUPPORTED_PACKAGES).optional().describe('Migration package to inspect. Currently only "components" is available.'),
      },
      title: 'DaVinci Migration List',
    },
    toolHandler('davinci-migration-list', async ({
      package: packageName,
    }) => {
      const resolvedPackage = packageName ?? getRuntimeConfig().tools.davinciMigrationList.package;
      const migrationGuide = await getMigrationGuideContent(resolvedPackage);
      const components = extractDavinciComponents(migrationGuide);

      return components.length > 0
        ? [components]
        : [`No DaVinci component migrations found for package "${resolvedPackage}".`];
    }),
  );
};
