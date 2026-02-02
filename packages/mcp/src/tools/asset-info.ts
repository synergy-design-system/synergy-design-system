import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import * as availableIconsets from '@synergy-design-system/assets';
import {
  getAssetsMetaData,
  getStructuredMetaData,
} from '../utilities/index.js';

const iconsetListAliases: Partial<Record<keyof typeof availableIconsets, string[]>> = {
  sick2018Icons: [
    'legacy',
    'v2',
    'synergy2018',
    'brand2018',
    'sick2018',
  ],
  sick2025Icons: [
    'current',
    'synergy2025',
    'default',
    'new',
    'next',
    'brand2025',
    'sick2025',
    'v3',
  ],
};

const DEFAULT_LIMIT = 5;

/**
 * Simple tool to list all available assets in the Synergy Design System.
 * This tool fetches the asset data from the Synergy package and formats it for display.
 * @todo: Maybe also include the metadata like in docs and use this to map the new/old sets?
 * @param server - The MCP server instance to register the tool on.
 */
export const assetInfoTool = (server: McpServer) => {
  server.registerTool(
    'asset-info',
    {
      description: 'Get information about available icons in the Synergy Design System. Will return the full list of icons in a set or just a subset',
      inputSchema: {
        filter: z
          .string()
          .optional()
          .describe('A filter to apply to the icon names. If provided, only icons matching this filter will be returned. Supports multiple filters separated by "|" (e.g., "home|search|menu" to find icons containing any of these terms).'),
        iconset: z
          .enum([
            'current', // Special key, maps to 2018 currently, should map to 2025 in the next major version
            'default', // Alias for current
            'legacy', // Fallback to 2018
            'v2', // Fallback to 2018
            'synergy2018', // Fallback name of the set for 2018
            'brand2018', // Alternative name of the set for 2018
            'sick2018', // Official name for 2018 (Synergy V2)

            'brand2025', // Alternative name of the set for 2025
            'sick2025', // Official name for 2025 (Synergy V3)
            'synergy2025', // Alias for sick2025
            'new', // Alias for sick2025
            'next', // Alias for sick2025
            'v3', // Done for completeness, maps to 2025
          ])
          .default('current')
          .optional()
          .describe('The name of the icon set to retrieve icons from.'),
        limit: z
          .number()
          .default(DEFAULT_LIMIT)
          .optional()
          .describe(`The maximum number of icons to return. Defaults to ${DEFAULT_LIMIT}. When using multiple filters (pipe-separated), this limit applies per filter term.`),
      },
      title: 'Available Icons',
    },
    async ({
      filter,
      iconset,
      limit,
    // eslint-disable-next-line complexity
    }) => {
      // Get the iconset that should be used by key/value of iconsetListAliases
      const setToUse: keyof typeof availableIconsets = iconset
        ? Object
          .entries(iconsetListAliases)
          .find(([, aliases]) => aliases.includes(iconset))?.[0] as keyof typeof availableIconsets || 'sick2025Icons'
        : 'sick2025Icons';

      // eslint-disable-next-line no-constant-binary-expression, valid-typeof
      const foundIconSet = typeof availableIconsets[setToUse] !== undefined
        ? availableIconsets[setToUse]
        : availableIconsets.sick2018Icons;

      // Filter the icons if a filter is provided
      // Support pipe-separated filters (e.g., "icon1|icon2|icon3") for multiple icon matching
      let availableIcons: string[];

      if (!filter) {
        availableIcons = Object.keys(foundIconSet);
      } else {
        const lowerFilter = filter.toLowerCase();

        // Check if filter contains pipe separator for multiple filters
        if (lowerFilter.includes('|')) {
          const filterTerms = lowerFilter.split('|').map(term => term.trim());
          const iconsPerTerm: string[] = [];

          // For each filter term, find matching icons and apply limit per term
          filterTerms.forEach(term => {
            const matchingIcons = Object
              .keys(foundIconSet)
              .filter(iconName => iconName.toLowerCase().includes(term))
              .slice(0, limit ?? DEFAULT_LIMIT); // Apply limit per filter term

            iconsPerTerm.push(...matchingIcons);
          });

          // Remove duplicates while preserving order
          availableIcons = [...new Set(iconsPerTerm)];
        } else {
          // Original single filter behavior
          availableIcons = Object
            .keys(foundIconSet)
            .filter(iconName => iconName.toLowerCase().includes(lowerFilter));
        }
      }

      // For single filters or no filter, apply the limit normally
      const limitedIcons = (!filter || !filter.includes('|')) && (limit ?? DEFAULT_LIMIT) > 0
        ? availableIcons.slice(0, limit ?? DEFAULT_LIMIT)
        : availableIcons;

      const icons = limitedIcons.map(icon => `- ${icon}`).join('\n');
      const content = [
        {
          text: `Available icons in iconset "${setToUse}":`,
          type: 'text' as const,
        },
        {
          text: `Showing ${limitedIcons.length} of ${availableIcons.length} icons`,
          type: 'text' as const,
        },
        {
          text: icons,
          type: 'text' as const,
        },
      ];

      const aiRules = await getStructuredMetaData('../../metadata/static/assets');
      const assetData = await getAssetsMetaData(
        (fileName) => !fileName.toLowerCase().startsWith('changelog'),
      );

      return {
        content: [
          {
            text: JSON.stringify(aiRules, null, 2),
            type: 'text',
          },
          {
            text: JSON.stringify(assetData, null, 2),
            type: 'text',
          },
          ...content,
        ],
      };
    },
  );
};
