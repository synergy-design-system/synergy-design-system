import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  type IntentPhase,
  findComponentsForTask,
} from '@synergy-design-system/metadata';
import {
  INTENT_DEFAULT_FRAMEWORK,
  INTENT_DEFAULT_PHASES,
  createToolAnnotations,
  getRuntimeConfig,
  getToolRule,
  intentFrameworkSchema,
  intentPhaseSchema,
  toolHandler,
} from '../utilities/index.js';

const frameworkSchema = intentFrameworkSchema;

/**
 * Recommends components for a task represented by an intent ID.
 * @param server The MCP server instance used for tool registration.
 */
export const intentTaskRecommendationsTool = (server: McpServer) => {
  server.registerTool(
    'intent-task-recommendations',
    {
      annotations: createToolAnnotations(),
      description: 'Answer the question: What does Synergy provide for a specific task intent?',
      inputSchema: {
        avoidTargets: z.array(z.string()).optional().describe('Optional target IDs to avoid.'),
        content: z.string().optional().describe('Optional content used in render snippets.'),
        framework: frameworkSchema.optional().describe('Target framework profile. Defaults to vanilla.'),
        includePhases: z.array(intentPhaseSchema).optional().describe('Optional phase filter. Defaults to ["experimental"].'),
        maxAlternatives: z
          .number()
          .int()
          .min(1)
          .max(20)
          .optional()
          .describe('Maximum number of alternatives.'),
        preferredTargets: z.array(z.string()).optional().describe('Optional preferred target IDs for ranking.'),
        taskId: z
          .string()
          .min(1)
          .describe('Intent ID representing the task, for example action.submit. Can be obtained by calling intent-categories-list tool.'),
      },
      title: 'Intent task recommendations',
    },
    toolHandler('intent-task-recommendations', async ({
      avoidTargets,
      content,
      framework,
      includePhases,
      maxAlternatives,
      preferredTargets,
      taskId,
    }: {
      avoidTargets?: string[];
      content?: string;
      framework?: z.infer<typeof frameworkSchema>;
      includePhases?: IntentPhase[];
      maxAlternatives?: number;
      preferredTargets?: string[];
      taskId: string;
    }) => {
      const { tools } = getRuntimeConfig();
      const aiRules = await getToolRule('intent-task-recommendations');
      const hasConstraints = Boolean(
        (preferredTargets && preferredTargets.length > 0)
        || (avoidTargets && avoidTargets.length > 0),
      );

      const response = await findComponentsForTask({
        constraints: hasConstraints ? {
          avoidTargets,
          preferredTargets,
        } : undefined,
        content,
        framework: framework ?? tools.intentTaskRecommendations.framework ?? INTENT_DEFAULT_FRAMEWORK,
        includePhases: includePhases ?? tools.intentTaskRecommendations.includePhases ?? [...INTENT_DEFAULT_PHASES],
        maxAlternatives: maxAlternatives ?? tools.intentTaskRecommendations.maxAlternatives,
        taskId,
      });

      if (!response.data) {
        const message = response.errors?.[0]?.message ?? `No recommendations found for task ${taskId}.`;
        return [aiRules, message];
      }

      return [aiRules, response.data];
    }),
  );
};
