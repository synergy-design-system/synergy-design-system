import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import * as tools from './tools/index.js';

/**
 * Creates a new instance of the MCP server configured for the Synergy Design System.
 * @returns A new instance of the MCP server configured for the Synergy Design System.
 */
export const createServer = () => {
  const server = new McpServer({
    description: 'A server for the Synergy Design System that provides tools to interact with components and resources.',
    name: 'synergy design system',
    title: 'Synergy Design System MCP Server',
    version: '0.1.0',
  });

  Object.values(tools).forEach(tool => {
    tool(server);
  });

  return server;
};
