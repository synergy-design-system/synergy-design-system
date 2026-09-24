import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  type IntentPhase,
  getIntentOptions,
} from '@synergy-design-system/metadata';
import {
  INTENT_DEFAULT_FRAMEWORK,
  INTENT_DEFAULT_PHASES,
  buildIntentRecovery,
  createToolAnnotations,
  getRuntimeConfig,
  getToolRule,
  intentFrameworkSchema,
  intentPhaseSchema,
  toolHandler,
} from '../utilities/index.js';

const frameworkSchema = intentFrameworkSchema;

/**
 * Returns renderable target options for a specific intent.
 * @param server The MCP server instance used for tool registration.
 */
export const intentOptionsTool = (server: McpServer) => {
  server.registerTool(
    'intent-options',
    {
      annotations: createToolAnnotations(),
      description: 'Get renderable Synergy targets and preview markup for one registered intent. Use an exact intent ID returned by intent-discover; do not guess or construct intent IDs.',
      inputSchema: {
        content: z.string().optional().describe('Optional content used in preview snippets.'),
        framework: frameworkSchema.optional().describe('Target framework profile. Defaults to vanilla.'),
        includeDiagnostics: z.boolean().optional().describe('Include targets that could not be rendered and their failure reasons. Diagnostic candidates are not usable output options.'),
        includePhases: z.array(intentPhaseSchema).optional().describe('Optional phase filter. Defaults to ["experimental"].'),
        intentId: z
          .string()
          .min(1)
          .describe('Exact registered intent ID returned by intent-discover. Do not guess or construct this value.'),
        maxAlternatives: z
          .number()
          .int()
          .min(1)
          .max(20)
          .optional()
          .describe('Maximum number of alternatives.'),
      },
      title: 'Get intent rendering options',
    },
    toolHandler('intent-options', async ({
      content,
      framework,
      includeDiagnostics,
      includePhases,
      intentId,
      maxAlternatives,
    }: {
      content?: string;
      framework?: z.infer<typeof frameworkSchema>;
      includeDiagnostics?: boolean;
      includePhases?: IntentPhase[];
      intentId: string;
      maxAlternatives?: number;
    }) => {
      const { tools } = getRuntimeConfig();
      const aiRules = await getToolRule('intent-options');
      const resolvedPhases = includePhases ?? tools.intentOptions.includePhases ?? [...INTENT_DEFAULT_PHASES];
      const response = await getIntentOptions({
        content,
        framework: framework ?? tools.intentOptions.framework ?? INTENT_DEFAULT_FRAMEWORK,
        includeDiagnostics: includeDiagnostics ?? tools.intentOptions.includeDiagnostics,
        includePhases: resolvedPhases,
        intentId,
        maxAlternatives: maxAlternatives ?? tools.intentOptions.maxAlternatives,
      });

      if (!response.data) {
        const message = response.errors?.[0]?.message ?? `No intent options found for ${intentId}.`;
        // Return authoritative discovery options so agents can recover without guessing intent IDs.
        return [aiRules, await buildIntentRecovery(intentId, message, resolvedPhases)];
      }

      return [aiRules, response.data];
    }),
  );
};
