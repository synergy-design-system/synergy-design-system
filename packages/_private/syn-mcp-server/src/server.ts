import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import * as tools from './tools/index.js';

// Create an MCP server
const server = new McpServer({
  description: 'A server for the Synergy Design System that provides tools to interact with components and resources.',
  name: 'synergy design system',
  title: 'Synergy Design System MCP Server',
  version: '0.1.0',
});

tools.componentListTool(server);
tools.componentInfoTool(server);

// Add an addition tool
server.registerTool(
  'add',
  {
    description: 'Add two numbers',
    inputSchema: { a: z.number(), b: z.number() },
    title: 'Addition Tool',
  },
  // eslint-disable-next-line @typescript-eslint/require-await
  async ({ a, b }) => ({
    content: [{
      text: String(a + b),
      type: 'text',
    }],
  }),
);

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);
