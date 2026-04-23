import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  createToolAnnotations,
  extractMigrationSection,
  getMigrationGuideContent,
  getRuntimeConfig,
  resolveDavinciPackageAlias,
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
        package: z.string().optional().describe('Migration package to inspect. Can be "basic-elements", "components", "dashboard-elements", or "charts".'),
      },
      title: 'DaVinci Migration Info',
    },
    toolHandler('davinci-migration-info', async ({
      component,
      package: packageName,
    }) => {
      const packageInput = packageName ?? getRuntimeConfig().tools.davinciMigrationInfo.package;
      const resolvedPackage = resolveDavinciPackageAlias(packageInput);
      const migrationGuide = await getMigrationGuideContent(resolvedPackage);
      const section = extractMigrationSection(migrationGuide, component);

      return section
        ? [section]
        : [`No migration information found for component "${component}" in package "${resolvedPackage}".`];
    }),
  );
};
