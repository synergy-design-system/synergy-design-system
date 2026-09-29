import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  type Icon2025Keys,
  createSpriteSheet,
} from '@synergy-design-system/assets';
import {
  createToolAnnotations,
  toolHandler,
} from '../utilities/index.js';

/**
 * Simple tool to create a spritesheet for a given set of icons.
 * This can be used to generate a custom spritesheet for a specific set of icons, which can then be used in the Synergy Design System or in other projects.
 * @param server - The MCP server instance to register the tool on.
 */
export const createSpriteSheetTool = (server: McpServer) => {
  server.registerTool(
    'create-spritesheet',
    {
      annotations: createToolAnnotations(),
      description: 'Create an SVG sprite sheet from selected Synergy 2025 icons. Use asset-info with the current icon set to discover valid icon names.',
      inputSchema: {
        icons: z
          .array(z.string() as z.ZodType<Icon2025Keys>)
          .describe('The icons to include in the sprite sheet. Must be valid icon keys from the Synergy 2025 icon set.'),
      },
      title: 'Generate icon spritesheet',
    },
    toolHandler('create-spritesheet', async ({
      icons,
    // eslint-disable-next-line @typescript-eslint/require-await
    }) => {
      const iconset = createSpriteSheet(icons, 'sick2025');

      return [
        iconset,
      ];
    }),
  );
};
