import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { getDataForSetup } from '@synergy-design-system/metadata';
import {
  createToolAnnotations,
  getRuntimeConfig,
  toolHandler,
} from '../utilities/index.js';

/**
 * Setup entrypoint for Synergy packages and framework-specific setup guidance.
 * @param server - The MCP server instance to register the tool on.
 */
export const setupTool = (server: McpServer) => {
  server.registerTool(
    'setup',
    {
      annotations: createToolAnnotations(),
      description: 'Get setup information for a Synergy package. Framework packages (react, vue, angular) automatically include base components setup.',
      inputSchema: {
        includeLimitations: z.boolean().optional().describe('Add a list of known limitations and issues to the output.'),
        package: z.enum(['components', 'react', 'vue', 'angular', 'tokens', 'styles', 'fonts', 'assets', 'migrations']).describe('Synergy package to retrieve setup instructions for.'),
      },
      title: 'Setup info',
    },
    toolHandler('setup', async ({
      includeLimitations,
      package: packageName,
    }) => {
      const resolvedIncludeLimitations = includeLimitations ?? getRuntimeConfig().tools.setup.includeLimitations;
      const response = await getDataForSetup({
        includeLimitations: resolvedIncludeLimitations,
        package: packageName,
      });

      if (!response.data) {
        return [response.errors?.[0]?.message ?? `No setup data found for package "${packageName}".`];
      }

      const setupContent = response.data.setups
        .flatMap((entry) => entry.text)
        .map((entry) => entry.content);

      return setupContent;
    }),
  );
};
