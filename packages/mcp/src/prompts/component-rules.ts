import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  getRulesForComponent,
} from '@synergy-design-system/metadata';
import {
  promptHandler,
} from '../utilities/index.js';

export const explainComponentRules = (server: McpServer) => {
  server.registerPrompt(
    'explain-component-rules',
    {
      argsSchema: {
        component: z
          .string()
          .startsWith('syn-')
          .describe('The name of the component to get rules for.'),
      },
      description: 'Explains the usage rules, design guidelines, and accessibility considerations for a Synergy component.',
      title: 'Explain component rules',
    },
    promptHandler('explain-component-rules', async ({ component }) => {
      const metadata = await getRulesForComponent(component);

      const rulesEntries = metadata.data?.rules ?? [];
      const warningsList = metadata.data?.warnings ?? [];

      const rulesMarkdown = rulesEntries.map((entry: typeof rulesEntries[number]) => entry.content).join('\n\n');
      const warnings = warningsList.length > 0
        ? `\n\nWarnings:\n${warningsList.map((warning: typeof warningsList[number]) => `- ${warning}`).join('\n')}`
        : '';

      return [
        `
You are an expert on the Synergy Design System.

Base the explanation strictly on the provided data as seen below.
Do not speculate or invent any rules.
Structure the information clearly for a human reader.`,
        rulesMarkdown && rulesMarkdown.trim().length > 0
          ? `${rulesMarkdown}${warnings}`
          : `No rules markdown is available for ${component}.${warnings}`,
      ];
    }, {
      description: ({ component }) => `Explain design system rules for ${component}`,
    }),
  );
};
