import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  createToolAnnotations,
  extractDavinciComponents,
  getMigrationGuideContent,
  getRuntimeConfig,
  resolveDavinciPackageAlias,
  toolHandler,
} from '../utilities/index.js';

export const davinciMigrationListTool = (server: McpServer) => {
  server.registerTool(
    'davinci-migration-list',
    {
      annotations: createToolAnnotations(),
      description: 'Get a list of all components that have migration information from DaVinci to Synergy.',
      inputSchema: {
        package: z.string().optional().describe('Migration package to inspect. Can be "basic-elements", "components", "dashboard-elements", or "charts".'),
      },
      title: 'DaVinci Migration List',
    },
    toolHandler('davinci-migration-list', async ({
      package: packageName,
    }) => {
      const packageInput = packageName ?? getRuntimeConfig().tools.davinciMigrationList.package;
      const resolvedPackage = resolveDavinciPackageAlias(packageInput);
      const migrationGuide = await getMigrationGuideContent(resolvedPackage);
      const components = extractDavinciComponents(migrationGuide);

      return components.length > 0
        ? [components]
        : [`No DaVinci component migrations found for package "${resolvedPackage}".`];
    }),
  );
};
