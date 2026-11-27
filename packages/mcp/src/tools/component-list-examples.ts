import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { createToolAnnotations, listEntityExamples, toolHandler } from '../utilities/index.js';

export const componentListExamplesTool = (server: McpServer) => {
  server.registerTool(
    'component-list-examples',
    {
      annotations: createToolAnnotations(),
      description: 'List available component examples with exact IDs, titles, and descriptions. Reuse an ID with the corresponding info tool.',
      inputSchema: {
        component: z.string().min(1).describe('Exact component name returned by its catalog tool.'),
      },
      title: 'List component examples',
    },
    toolHandler('component-list-examples', async ({ component }) => [
      await listEntityExamples('component', component),
    ]),
  );
};
