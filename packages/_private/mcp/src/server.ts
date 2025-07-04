import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import * as tools from './tools/index.js';

// Create an MCP server
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

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);
