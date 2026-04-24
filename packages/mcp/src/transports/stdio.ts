import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { runWithLoggingContext } from '../utilities/logging-context.js';
import type { TransportInstance } from './index.js';

/**
 * Creates a stdio transport for the MCP server.
 * Communicates via stdin/stdout with the parent process.
 *
 * @param server The MCP server instance
 * @returns A transport instance
 */
// eslint-disable-next-line @typescript-eslint/require-await
export async function createStdioTransport(server: McpServer): Promise<TransportInstance> {
  const transport = new StdioServerTransport();

  return {
    start: async () => {
      await runWithLoggingContext(
        {
          sessionId: 'stdio',
          transport: 'stdio',
        },
        async () => server.connect(transport),
      );
    },
  };
}
