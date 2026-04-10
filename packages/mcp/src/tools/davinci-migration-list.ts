import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  SUPPORTED_PACKAGES,
  createToolAnnotations,
  extractDavinciComponents,
  getMigrationGuideContent,
  withErrorHandler,
} from '../utilities/index.js';

export const davinciMigrationListTool = (server: McpServer) => {
  server.registerTool(
    'davinci-migration-list',
    {
      annotations: createToolAnnotations(),
      description: 'Get a list of all components that have migration information from DaVinci to Synergy.',
      inputSchema: {
        package: z.enum(SUPPORTED_PACKAGES).default('components').optional().describe('Migration package to inspect. Currently only "components" is available.'),
      },
      title: 'DaVinci Migration List',
    },
    async ({
      package: packageName = 'components',
    }) => withErrorHandler(async () => {
      const migrationGuide = await getMigrationGuideContent(packageName);
      const components = extractDavinciComponents(migrationGuide);

      return components.length > 0
        ? [components]
        : [`No DaVinci component migrations found for package "${packageName}".`];
    }),
  );
};
