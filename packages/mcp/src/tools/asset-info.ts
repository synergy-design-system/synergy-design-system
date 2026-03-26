import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  type IconSearchResult,
  searchIcons,
} from '@synergy-design-system/metadata';
import * as availableIconsets from '@synergy-design-system/assets';
import {
  getStructuredMetaData,
  toContentArray,
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
      annotations: {
        destructiveHint: true,
        idempotentHint: true,
        readOnlyHint: true,
      },
      description: 'Get information about available icons in the Synergy Design System. Will return the full list of icons in a set or just a subset',
      inputSchema: {
        filter: z
          .string()
          .optional()
          .describe('A filter to apply to the icon names. If provided, only icons matching this filter will be returned. Supports multiple filters separated by "," (e.g., "home,search,menu" to find icons containing any of these terms).'),
        iconset: z
          .enum([
            'legacy', // Fallback to 2018
            'v2', // Fallback to 2018
            'synergy2018', // Fallback name of the set for 2018
            'brand2018', // Alternative name of the set for 2018
            'sick2018', // Official name for 2018 (Synergy V2)

            'current', // Special key, maps to 2025.
            'default', // Alias for current
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
          .optional()
          .describe('The maximum number of icons to return. Defaults to unlimited. When using multiple filters (comma-separated), this limit applies per filter term.'),
      },
      title: 'Available Icons',
    },
    async ({
      filter,
      iconset,
      limit,
    }) => {
      // Get the iconset that should be used by key/value of iconsetListAliases
      const setToUse: keyof typeof availableIconsets = iconset
        ? Object
          .entries(iconsetListAliases)
          .find(([, aliases]) => aliases.includes(iconset))?.[0] as keyof typeof availableIconsets || 'sick2025Icons'
        : 'sick2025Icons';

      let newAvailableIcons: IconSearchResult[] = [];

      // Create the tags filter
      const tags = filter ? filter.toLowerCase().split(',').map(term => term.trim()) : [];

      const iconSearchOptions = {
        limit,
      };

      if (setToUse === 'sick2025Icons') {
        const iconsFor2025Filled = await searchIcons(
          {
            assetId: 'sick2025-icons-filled',
            tags,
          },
          iconSearchOptions,
        );
        const iconsFor2025Outlined = await searchIcons(
          {
            assetId: 'sick2025-icons-outline',
            tags,
          },
          iconSearchOptions,
        );
        newAvailableIcons = [
          ...iconsFor2025Filled.data,
          ...iconsFor2025Outlined.data,
        ];
      } else {
        const iconsFor2018 = await searchIcons(
          {
            assetId: 'sick2018-icons',
            tags,
          },
          iconSearchOptions,
        );
        newAvailableIcons = iconsFor2018.data;
      }

      // Final stripped down version of the icons to return, we only want to return the name, categories and variant for simplicity
      const icons = newAvailableIcons.map(icon => ({
        categories: icon.categories.length > 0 ? icon.categories : ['uncategorized'],
        iconName: icon.iconName,
        variant: icon.variant,
      }));

      // Group the icons by the first category found
      const iconsByCategory = Object.groupBy(icons, icon => icon.categories.at(0) ?? 'uncategorized');

      // Remove the categories from the icons, we only want to return the name and variant at this point since we are grouping by category already
      const finalIcons = Object.fromEntries(
        Object.entries(iconsByCategory).map(([category, iconsInCategory]) => [
          category,
          iconsInCategory?.map(icon => ({
            iconName: icon.iconName,
            variant: icon.variant,
          })),
        ]),
      );

      // Get the AI rules from the metadata files, we want to return this as well for better context in the response
      const [aiRules] = await getStructuredMetaData('../../metadata/static/assets');

      return toContentArray([
        aiRules?.content,
        finalIcons,
      ]);
    },
  );
};
