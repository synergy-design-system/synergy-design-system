import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  type IntentPhase,
  getComponentGuide,
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

type IntentComponentGuideDefaults = {
  framework: z.infer<typeof frameworkSchema>;
  includePhases: IntentPhase[];
};

/**
 * Returns intent-focused usage guidance for a component.
 * @param server The MCP server instance used for tool registration.
 */
export const intentComponentGuideTool = (server: McpServer) => {
  server.registerTool(
    'intent-component-guide',
    {
      annotations: createToolAnnotations(),
      description: 'Answer the question: What can I do with this component in the intent system?',
      inputSchema: {
        component: z.string().startsWith('syn-').describe('Component tag name, for example syn-button.'),
        framework: frameworkSchema.optional().describe('Target framework profile. Defaults to vanilla.'),
        includePhases: z.array(intentPhaseSchema).optional().describe('Optional phase filter. Defaults to ["experimental"].'),
      },
      title: 'Intent component guide',
    },
    toolHandler('intent-component-guide', async ({
      component,
      framework,
      includePhases,
    }: {
      component: string;
      framework?: z.infer<typeof frameworkSchema>;
      includePhases?: IntentPhase[];
    }) => {
      const toolDefaults = (getRuntimeConfig().tools as {
        intentComponentGuide: IntentComponentGuideDefaults;
      }).intentComponentGuide;
      const aiRules = await getToolRule('intent-component-guide');
      const response = await getComponentGuide({
        component,
        framework: framework ?? toolDefaults.framework ?? INTENT_DEFAULT_FRAMEWORK,
        includePhases: includePhases ?? toolDefaults.includePhases ?? [...INTENT_DEFAULT_PHASES],
      });

      if (!response.data) {
        const message = response.errors?.[0]?.message ?? `No intent guide found for component ${component}.`;
        return [aiRules, message];
      }

      return [aiRules, response.data];
    }),
  );
};
