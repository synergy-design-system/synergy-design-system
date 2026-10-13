import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  type IntentPhase,
  listIntentCategories,
} from '@synergy-design-system/metadata';
import {
  INTENT_DEFAULT_PHASES,
  createToolAnnotations,
  getRuntimeConfig,
  getToolRule,
  intentPhaseSchema,
  toolHandler,
} from '../utilities/index.js';

type IntentCategoriesListDefaults = {
  includePhases: IntentPhase[];
};

/**
 * Lists available intent categories from the intent policy layer.
 * @param server The MCP server instance used for tool registration.
 */
export const intentCategoriesListTool = (server: McpServer) => {
  server.registerTool(
    'intent-categories-list',
    {
      annotations: createToolAnnotations(),
      description: 'Deprecated compatibility tool. Do not use for new requests. Use intent-discover instead. Lists registered intent categories only.',
      inputSchema: {
        includePhases: z.array(intentPhaseSchema).optional().describe('Optional phase filter. Defaults to ["experimental"].'),
      },
      title: 'Deprecated: Intent categories list',
    },
    toolHandler('intent-categories-list', async ({
      includePhases,
    }: {
      includePhases?: IntentPhase[];
    }) => {
      const toolDefaults = (getRuntimeConfig().tools as {
        intentCategoriesList: IntentCategoriesListDefaults;
      }).intentCategoriesList;
      const aiRules = await getToolRule('intent-categories-list');
      const response = await listIntentCategories(
        {},
        { includePhases: includePhases ?? toolDefaults.includePhases ?? [...INTENT_DEFAULT_PHASES] },
      );

      if (!response.data) {
        const message = response.errors?.[0]?.message ?? 'No intent categories found.';
        return [aiRules, message];
      }

      return [aiRules, response.data];
    }),
  );
};
