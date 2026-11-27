import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { createToolAnnotations, listEntityExamples, toolHandler } from '../utilities/index.js';

export const stylesListExamplesTool = (server: McpServer) => {
  server.registerTool(
    'styles-list-examples',
    {
      annotations: createToolAnnotations(),
      description: 'List available style examples with exact IDs, titles, and descriptions. Reuse an ID with the corresponding info tool.',
      inputSchema: {
        style: z.string().min(1).describe('Exact style name returned by its catalog tool.'),
      },
      title: 'List style examples',
    },
    toolHandler('styles-list-examples', async ({ style }) => [
      await listEntityExamples('style', style),
    ]),
  );
};
