import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import * as resources from './resources/index.js';
import * as prompts from './prompts/index.js';
import * as tools from './tools/index.js';
import { getVersion } from './utilities/cli.js';
import { getRuntimeConfig } from './utilities/config.js';

/**
 * List of tool factory names that are considered experimental and should only be registered if the corresponding experimental feature flag is enabled.
 * This allows us to include experimental tools in the codebase without exposing them to users unless they explicitly opt in.
 */
const experimentalToolFactoryNames = new Set([
  'intentCategoriesListTool',
  'intentComponentGuideTool',
  'intentComponentValidateTool',
  'intentOptionsTool',
  'intentTaskRecommendationsTool',
]);

/**
 * Creates a new instance of the MCP server configured for the Synergy Design System.
 * @returns A new instance of the MCP server configured for the Synergy Design System.
 */
export const createServer = () => {
  const version = getVersion();
  const server = new McpServer({
    description: 'A server for the Synergy Design System that provides tools to interact with components and resources.',
    name: 'synergy design system',
    title: 'Synergy Design System MCP Server',
    version,
  });

  Object.values(prompts).forEach(prompt => {
    prompt(server);
  });

  const isIntentToolsEnabled = getRuntimeConfig().experimentalFeatures.intentTools === true;

  Object.entries(tools).forEach(([name, tool]) => {
    if (experimentalToolFactoryNames.has(name) && !isIntentToolsEnabled) {
      return;
    }

    tool(server);
  });

  Object.values(resources).forEach(resource => {
    resource(server);
  });

  return server;
};
