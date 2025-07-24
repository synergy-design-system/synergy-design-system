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

  // Register tools with the server
  tools.componentListTool(server);
  tools.componentInfoTool(server);
  tools.davinciMigrateComponentList(server);
  tools.davinciMigrateComponentTool(server);
  tools.frameworkInfoTool(server);
  tools.stylesInfoTool(server);
  tools.stylesList(server);
  tools.templateList(server);
  tools.tokenInfoTool(server);
  tools.assetsTool(server);

  return server;
};
