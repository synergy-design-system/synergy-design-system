import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import * as availableIconsets from '@synergy-design-system/assets';
import {
  getAssetsMetaData,
} from '../utilities/index.js';

const iconsetListAliases: Partial<Record<keyof typeof availableIconsets, string[]>> = {
  brand2018Icons: [
    'current',
    'legacy',
    'v2',
    'synergy2018',
    'brand2018',
  ],
  brand2025Icons: [
    'synergy2025',
    'new',
    'next',
    'brand2025',
  ],
};

/**
 * Simple tool to list all available tokens in the Synergy Design System.
 * This tool fetches the token data from the Synergy package and formats it for display.
 * @todo: Maybe also include the metadata like in docs and use this to map the new/old sets?
 * @param server - The MCP server instance to register the tool on.
 */
export const assetsTool = (server: McpServer) => {
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
            'legacy', // Fallback to 2018
            'v2', // Fallback to 2018
            'synergy2018', // Fallback name of the set for 2018
            'brand2018', // Official name of the set for 2018

            'brand2025', // Official name of the set for 2025
            'synergy2025', // Alias for brand2025
            'new', // Alias for brand2025
            'next', // Alias for brand2025
          ])
          .default('current')
          .optional()
          .describe('The name of the icon set to retrieve icons from.'),
      },
      title: 'Available Icons',
    },
    async ({
      filter,
      iconset,
    }) => {
      // Get the iconset that should be used by key/value of iconsetListAliases
      const setToUse: keyof typeof availableIconsets = iconset
        ? Object
          .entries(iconsetListAliases)
          .find(([, aliases]) => aliases.includes(iconset))?.[0] as keyof typeof availableIconsets || 'brand2018Icons'
        : 'brand2018Icons';

      const finalIconset = typeof availableIconsets[setToUse] !== undefined
        ? availableIconsets[setToUse]
        : availableIconsets.brand2018Icons;

      const iconoutput = Object
        .keys(finalIconset)
        .filter(iconName => iconName.toLowerCase().includes(filter?.toLowerCase() || ''))
        .map(icon => `- ${icon}`);

      return {
        content: [
          {
            text: JSON.stringify(await getAssetsMetaData(), null, 2),
            type: 'text',
          },
          {
            text: `The following icons where found for your search in ${setToUse}: ${iconoutput.join('\n')}`,
            type: 'text',
          },
        ],
      };
    },
  );
};
