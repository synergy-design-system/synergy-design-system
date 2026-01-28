import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { getMigrationMetaData } from '../utilities/index.js';

type SynergyMigrationPackage = 'assets' | 'components' | 'styles' | 'tokens';

/**
 * Tool to retrieve concrete migration documentation for a given package.
 *
 * For Synergy components this tool is designed to be used together with
 * `migration-list`:
 *   1. Call `migration-list` to discover available documents (filenames).
 *   2. Call `migration-info` with a specific filename to fetch only that
 *      document instead of all migration guides at once.
 *
 * For other packages (assets/styles/tokens) you can continue to omit the
 * filename to receive all available migration‑related documents.
 * @param server - The MCP server instance to register the tool on.
 */
export const migrationInfoTool = (server: McpServer) => {
  server.registerTool(
    'migration-info',
    {
      description: 'Get detailed migration documentation for a Synergy package. Use together with `migration-list` to fetch only the documents you need.',
      inputSchema: {
        filename: z.string().optional().describe('Optional filename of the migration document to return. Especially recommended for the components package to avoid fetching all guides at once.'),
        synergyPackage: z.enum([
          'assets',
          'components',
          'styles',
          'tokens',
        ]).default('components').optional().describe('The package to get migration information about.'),
      },
      title: 'Package Migration Information',
    },
    async ({
      filename,
      synergyPackage,
    }) => {
      const selectedPackage = (synergyPackage ?? 'components') as SynergyMigrationPackage;
      const metadata = await getMigrationMetaData(selectedPackage);

      // For components, strongly prefer a specific filename so we do not
      // send all path guides at once.
      if (selectedPackage === 'components' && filename) {
        const match = metadata.find(file => file && file.filename === filename);

        if (!match) {
          return {
            content: [
              {
                text: `No migration document named "${filename}" found for package "${selectedPackage}". Call the 'migration-list' tool first to see the available filenames.",`,
                type: 'text',
              },
            ],
          };
        }

        return {
          content: [
            {
              text: JSON.stringify(match, null, 2),
              type: 'text',
            },
          ],
        };
      }

      // If no filename is given for components, return only the overview
      // index and the high‑level package docs (BREAKING_CHANGES / CHANGELOG)
      // instead of all path‑specific guides.
      if (selectedPackage === 'components' && !filename) {
        const filtered = metadata.filter((file) => {
          if (!file) return false;
          const { filename: name } = file;

          const isOverview = name === 'index.md';
          const isPathGuide = name.startsWith('v2-') && name.endsWith('.md');

          // Keep overview and any non path‑guide docs
          return isOverview || !isPathGuide;
        });

        return {
          content: [
            {
              text: JSON.stringify(filtered, null, 2),
              type: 'text',
            },
          ],
        };
      }

      // For non‑components packages, or when a filename is not used,
      // fall back to returning all documents. These sets are small
      // (typically CHANGELOG + BREAKING_CHANGES).
      return {
        content: [
          {
            text: JSON.stringify(metadata, null, 2),
            type: 'text',
          },
        ],
      };
    },
  );
};
