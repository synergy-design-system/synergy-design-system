import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { McpRuntimeConfig } from '../utilities/config.js';

/**
 * Common interface for all transport implementations.
 */
export interface TransportInstance {
  /** Start listening for connections. */
  start: () => Promise<void>;
  /** Optional: Stop listening for connections. */
  stop?: () => Promise<void>;
}

/**
 * Creates and returns a transport instance based on the runtime configuration.
 *
 * For stdio mode, a single server instance is used.
 * For HTTP mode, the factory is called once per client session so each client
 * gets an isolated server with its own tool registrations.
 *
 * @param serverFactory A factory function that creates a new MCP server instance
 * @param config The runtime configuration
 * @returns A transport instance ready to start
 */
export async function createTransport(
  serverFactory: () => McpServer,
  config: McpRuntimeConfig,
): Promise<TransportInstance> {
  // Determine transport type based on config.interface
  // Note we have to use dynamic imports here to avoid importing all transport modules upfront,
  // which can cause issues in certain environments (like when using stdio transport in a CLI tool)
  if (config.interface === 'http') {
    const { createHttpTransport } = await import('./http.js');
    return createHttpTransport(serverFactory, config);
  }

  // Default to stdio — create the single server instance here
  const { createStdioTransport } = await import('./stdio.js');
  return createStdioTransport(serverFactory());
}
