import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { IntentPhase } from '@synergy-design-system/metadata';
import {
  INTENT_DEFAULT_PHASES,
  createToolAnnotations,
  discoverIntents,
  getRuntimeConfig,
  getToolRule,
  intentPhaseSchema,
  toolHandler,
} from '../utilities/index.js';

type IntentDiscoverDefaults = {
  includePhases: IntentPhase[];
};

/**
 * Registers hierarchical discovery for registered intent categories and IDs.
 * @param server The MCP server instance used for tool registration.
 */
export const intentDiscoverTool = (server: McpServer) => {
  server.registerTool(
    'intent-discover',
    {
      annotations: createToolAnnotations(),
      description: 'Discover registered Synergy intent categories and exact intent IDs. Omit category to list categories; provide an exact category ID to list its intents. Use returned IDs verbatim.',
      inputSchema: {
        category: z.string().min(1).optional().describe('Optional exact category ID returned by this tool. Omit it to list categories.'),
        includePhases: z.array(intentPhaseSchema).optional().describe('Optional phase filter. Defaults to ["experimental"].'),
      },
      title: 'Discover intent categories and IDs',
    },
    toolHandler('intent-discover', async ({
      category,
      includePhases,
    }: {
      category?: string;
      includePhases?: IntentPhase[];
    }) => {
      const toolDefaults = (getRuntimeConfig().tools as {
        intentDiscover: IntentDiscoverDefaults;
      }).intentDiscover;
      const aiRules = await getToolRule('intent-discover');
      const resolvedPhases = includePhases ?? toolDefaults.includePhases ?? [...INTENT_DEFAULT_PHASES];
      try {
        return [aiRules, await discoverIntents(category, resolvedPhases)];
      } catch (error) {
        const discovery = await discoverIntents(undefined, resolvedPhases);
        return [aiRules, {
          availableCategoryIds: discovery.level === 'categories'
            ? discovery.categories.map((entry) => entry.id)
            : [],
          error: error instanceof Error ? error.message : String(error),
          level: 'categories',
          requestedCategory: category,
        }];
      }
    }),
  );
};
