import { serveStdio } from '@modelcontextprotocol/server/stdio';
import type { McpServer } from '@modelcontextprotocol/server';
import { runWithLoggingContext } from '../utilities/logging-context.js';
import type { TransportInstance } from './index.js';

/**
 * Creates a stdio transport for the MCP server.
 * Communicates via stdin/stdout with the parent process.
 *
 * @param serverFactory A factory function that creates a new MCP server instance
 * @returns A transport instance
 */
// eslint-disable-next-line @typescript-eslint/require-await
export async function createStdioTransport(serverFactory: () => McpServer): Promise<TransportInstance> {
  let handle: ReturnType<typeof serveStdio> | undefined;

  return {
    start: () => runWithLoggingContext(
      {
        sessionId: 'stdio',
        transport: 'stdio',
      },
      () => {
        handle = serveStdio(serverFactory);
        return Promise.resolve();
      },
    ),
    stop: () => handle?.close() ?? Promise.resolve(),
  };
}
