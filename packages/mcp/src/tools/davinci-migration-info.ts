import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  buildDavinciRecovery,
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
      description: 'Get migration guidance from one DaVinci component to Synergy. Use an exact component name returned by davinci-migration-list.',
      inputSchema: {
        component: z.string().min(1).describe('Exact DaVinci component name returned by davinci-migration-list. Do not guess or construct this value.'),
        package: z.string().optional().describe('Migration package to inspect. Can be "basic-elements", "components", "dashboard-elements", or "charts".'),
      },
      title: 'Get DaVinci migration guide',
    },
    toolHandler('davinci-migration-info', async ({
      component,
      package: packageName,
    }) => {
      const packageInput = packageName ?? getRuntimeConfig().tools.davinciMigrationInfo.package;
      const resolvedPackage = resolveDavinciPackageAlias(packageInput);
      const migrationGuide = await getMigrationGuideContent(resolvedPackage);
      const section = extractMigrationSection(migrationGuide, component);

      if (!section) {
        const message = `No migration information found for component "${component}" in package "${resolvedPackage}".`;
        // Return package-scoped component names so agents can recover without guessing migration IDs.
        return [await buildDavinciRecovery(resolvedPackage, component, message)];
      }

      return [section];
    }),
  );
};
