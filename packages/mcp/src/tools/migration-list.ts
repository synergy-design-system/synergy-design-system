import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { getMigrationMetaData } from '../utilities/index.js';

type SynergyMigrationPackage = 'assets' | 'components' | 'styles' | 'tokens';

type MigrationIndexMetadata = {
  from?: string;
  fromTheme?: string;
  summary?: string;
  title?: string;
  to?: string;
  toTheme?: string;
};

const extractHeadingMetadata = (content: string): MigrationIndexMetadata => {
  const result: MigrationIndexMetadata = {};

  // Try to find the first level‑1 heading.
  const headingMatch = content.match(/^#\s+(.+)$/m);
  const headingText = headingMatch?.[1]?.trim();

  if (!headingText) {
    return result;
  }

  result.title = headingText;

  // Heuristic: headings follow the pattern
  // "Migrating from <FROM> → <TO>" for path guides.
  const pathMatch = headingText.match(/^Migrating from\s+(.+?)\s*→\s*(.+)$/);
  if (!pathMatch) {
    return result;
  }

  const fromLabel = pathMatch[1].trim();
  const toLabel = pathMatch[2].trim();

  result.from = fromLabel;
  result.to = toLabel;

  const fromThemeMatch = fromLabel.match(/\(([^)]+)\)/);
  const toThemeMatch = toLabel.match(/\(([^)]+)\)/);

  if (fromThemeMatch) {
    result.fromTheme = fromThemeMatch[1].trim();
  }

  if (toThemeMatch) {
    result.toTheme = toThemeMatch[1].trim();
  }

  return result;
};

const extractSummaryMetadata = (content: string): MigrationIndexMetadata => {
  const result: MigrationIndexMetadata = {};
  const headingMatch = content.match(/^#\s+(.+)$/m);

  if (!headingMatch) {
    return result;
  }

  const startIndex = content.indexOf(headingMatch[0]) + headingMatch[0].length;
  const rest = content.slice(startIndex);
  const lines = rest.split('\n');

  const buffer = lines.reduce<string[]>((acc, rawLine) => {
    if (acc.length >= 3) {
      return acc;
    }

    const line = rawLine.trim();

    if (!line) {
      return acc.length > 0 ? acc : acc;
    }

    if (line.startsWith('#')) {
      return acc;
    }

    if (line === '---') {
      return acc;
    }

    return [...acc, line];
  }, []);

  if (buffer.length > 0) {
    result.summary = buffer.join(' ');
  }

  return result;
};

/**
 * Tool to list available migration documents for a given package in a
 * token‑efficient way. It returns only a compact index (filenames and
 * simple kinds), not the full markdown content.
 *
 * Use this together with `migration-info` to first discover what documents
 * exist and then fetch the relevant one.
 */
export const migrationListTool = (server: McpServer) => {
  server.registerTool(
    'migration-list',
    {
      description: 'List available migration documents for a Synergy package in a compact, token-efficient format.',
      inputSchema: {
        synergyPackage: z.enum([
          'assets',
          'components',
          'styles',
          'tokens',
        ]).default('components').optional().describe('The package to list migration documents for.'),
      },
      title: 'Package Migration Document Index',
    },
    async ({ synergyPackage }) => {
      const selectedPackage = (synergyPackage ?? 'components') as SynergyMigrationPackage;
      const metadata = await getMigrationMetaData(selectedPackage);

      const index = metadata
        .filter(Boolean)
        .map((file) => {
          const { content, filename } = file!;

          // Derive a simple kind for components to distinguish
          // between migration paths, overview, and package-level docs.
          let kind: 'overview' | 'path' | 'package-doc' = 'package-doc';

          if (selectedPackage === 'components') {
            if (filename === 'index.md') {
              kind = 'overview';
            } else if (filename.startsWith('v2-') && filename.endsWith('.md')) {
              kind = 'path';
            }
          }

          const extra = selectedPackage === 'components'
            ? {
              ...extractHeadingMetadata(content),
              ...extractSummaryMetadata(content),
            }
            : {};

          return {
            filename,
            kind,
            package: selectedPackage,
            ...extra,
          };
        });

      return {
        content: [
          {
            text: JSON.stringify(index, null, 2),
            type: 'text',
          },
        ],
      };
    },
  );
};
