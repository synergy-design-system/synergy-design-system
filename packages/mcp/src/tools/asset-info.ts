/* eslint-disable complexity */
import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import * as availableIconsets from '@synergy-design-system/assets';
import {
  getAssetsMetaData,
  getStructuredMetaData,
} from '../utilities/index.js';

const iconsetListAliases: Partial<Record<keyof typeof availableIconsets, string[]>> = {
  brand2018Icons: [
    'current',
    'default',
    'legacy',
    'v2',
    'synergy2018',
    'brand2018',
    'sick2018',
  ],
  brand2025Icons: [
    'synergy2025',
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
      description: 'Get information about available icons in the Synergy Design System. Will return the full list of icons in a set or just a subset',
      inputSchema: {
        filter: z
          .string()
          .optional()
          .describe('A filter to apply to the icon names. If provided, only icons matching this filter will be returned.'),
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
          .default(5)
          .optional()
          .describe('The maximum number of icons to return. Defaults to 5.'),
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
          .find(([, aliases]) => aliases.includes(iconset))?.[0] as keyof typeof availableIconsets || 'brand2018Icons'
        : 'brand2018Icons';

      const foundIconSet = typeof availableIconsets[setToUse] !== undefined
        ? availableIconsets[setToUse]
        : availableIconsets.brand2018Icons;

      // Filter the icons if a filter is provided
      const availableIcons = Object
        .keys(foundIconSet)
        .filter(iconName => iconName.toLowerCase().includes(filter?.toLowerCase() || ''));

      // Limit the number of icons returned
      const limitedIcons = (limit ?? 5) > 0
        ? availableIcons.slice(0, limit ?? 5)
        : availableIcons;

      const icons = limitedIcons.map(icon => `- ${icon}`).join('\n');
      const content = [
        {
          text: `Available icons in iconset "${setToUse}":`,
          type: 'text' as const,
        },
        {
          text: icons,
          type: 'text' as const,
        },
      ];

      const aiRules = await getStructuredMetaData('../../metadata/static/assets');

      return {
        content: [
          {
            text: JSON.stringify(aiRules, null, 2),
            type: 'text',
          },
          {
            text: JSON.stringify(await getAssetsMetaData(), null, 2),
            type: 'text',
          },
          ...content,
        ],
      };
    },
  );
};
