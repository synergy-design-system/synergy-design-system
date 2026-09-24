import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  createToolAnnotations,
  getAvailableDavinciComponents,
  getRuntimeConfig,
  resolveDavinciPackageAlias,
  toolHandler,
} from '../utilities/index.js';

export const davinciMigrationListTool = (server: McpServer) => {
  server.registerTool(
    'davinci-migration-list',
    {
      annotations: createToolAnnotations(),
      description: 'List DaVinci components with migration guidance for a selected package. Use a returned component name with davinci-migration-info.',
      inputSchema: {
        package: z.string().optional().describe('Migration package to inspect. Can be "basic-elements", "components", "dashboard-elements", or "charts".'),
      },
      title: 'List DaVinci migrations',
    },
    toolHandler('davinci-migration-list', async ({
      package: packageName,
    }) => {
      const packageInput = packageName ?? getRuntimeConfig().tools.davinciMigrationList.package;
      const resolvedPackage = resolveDavinciPackageAlias(packageInput);
      const components = await getAvailableDavinciComponents(resolvedPackage);

      return components.length > 0
        ? [components]
        : [`No DaVinci component migrations found for package "${resolvedPackage}".`];
    }),
  );
};
