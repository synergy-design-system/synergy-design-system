import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  SUPPORTED_PACKAGES,
  createToolAnnotations,
  extractMigrationSection,
  getMigrationGuideContent,
  getRuntimeConfig,
  toolHandler,
} from '../utilities/index.js';

export const davinciMigrationInfoTool = (server: McpServer) => {
  server.registerTool(
    'davinci-migration-info',
    {
      annotations: createToolAnnotations(),
      description: 'Get information about the migration of a specific component from DaVinci to Synergy.',
      inputSchema: {
        component: z.string().startsWith('davinci-').describe('The name of the davinci component to get migration information for.'),
        package: z.enum(SUPPORTED_PACKAGES).optional().describe('Migration package to inspect. Currently only "components" is available.'),
      },
      title: 'DaVinci Migration Info',
    },
    toolHandler('davinci-migration-info', async ({
      component,
      package: packageName,
    }) => {
      const resolvedPackage = packageName ?? getRuntimeConfig().tools.davinciMigrationInfo.package;
      const migrationGuide = await getMigrationGuideContent(resolvedPackage);
      const section = extractMigrationSection(migrationGuide, component);

      return section
        ? [section]
        : [`No migration information found for component "${component}" in package "${resolvedPackage}".`];
    }),
  );
};
