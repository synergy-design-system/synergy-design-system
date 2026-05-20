import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import * as resources from './resources/index.js';
import * as prompts from './prompts/index.js';
import * as tools from './tools/index.js';
import { getVersion } from './utilities/cli.js';
import { getRuntimeConfig } from './utilities/config.js';

/**
 * Determines if a tool, prompt, or resource should be registered based on feature flags.
 * Items with names starting with 'intent' are gated by the intentTools experimental flag.
 */
const shouldRegisterItem = (name: string, config: ReturnType<typeof getRuntimeConfig>): boolean => {
  // Make sure to only load intent-related items if the intentTools experimental feature is enabled
  if (name.toLowerCase().startsWith('intent')) {
    return config.experimentalFeatures?.intentTools === true;
  }

  return true;
};

/**
 * Creates a new instance of the MCP server configured for the Synergy Design System.
 * @returns A new instance of the MCP server configured for the Synergy Design System.
 */
export const createServer = () => {
  const version = getVersion();
  const config = getRuntimeConfig();
  const server = new McpServer({
    description: 'A server for the Synergy Design System that provides tools to interact with components and resources.',
    name: 'synergy design system',
    title: 'Synergy Design System MCP Server',
    version,
  });

  Object.entries(prompts)
    .filter(([name]) => shouldRegisterItem(name, config))
    .forEach(([, prompt]) => prompt(server));

  Object.entries(tools)
    .filter(([name]) => shouldRegisterItem(name, config))
    .forEach(([, tool]) => tool(server));

  Object.entries(resources)
    .filter(([name]) => shouldRegisterItem(name, config))
    .forEach(([, resource]) => resource(server));

  return server;
};
