import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { createToolAnnotations, listEntityExamples, toolHandler } from '../utilities/index.js';

export const templateListExamplesTool = (server: McpServer) => {
  server.registerTool(
    'template-list-examples',
    {
      annotations: createToolAnnotations(),
      description: 'List available template examples with exact IDs, titles, and descriptions. Reuse an ID with the corresponding info tool.',
      inputSchema: {
        template: z.string().min(1).describe('Exact template name returned by its catalog tool.'),
      },
      title: 'List template examples',
    },
    toolHandler('template-list-examples', async ({ template }) => [
      await listEntityExamples('template', template),
    ]),
  );
};
