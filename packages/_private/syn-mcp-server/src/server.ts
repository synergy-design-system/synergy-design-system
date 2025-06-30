import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

// Create an MCP server
const server = new McpServer({
  name: 'demo-server',
  version: '1.0.0',
});

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

// Add a dynamic greeting resource
server.registerResource(
  'greeting',
  new ResourceTemplate('greeting://{name}', { list: undefined }),
  {
    description: 'Dynamic greeting generator',
    title: 'Greeting Resource', // Display name for UI
  },
  // eslint-disable-next-line @typescript-eslint/require-await
  async (uri: URL) => {
    const name = uri.hostname;
    return {
      contents: [{
        text: `Hello, ${name}!`,
        uri: `greeting://${name}`,
      }],
    };
  },
);

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);
