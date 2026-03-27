import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { listStyles } from '@synergy-design-system/metadata';
import {
  createToolAnnotations,
  getStructuredMetaData,
  toContentArray,
} from '../utilities/index.js';

/**
 * Simple tool to list all available styles in the Synergy Design System.
 * This tool fetches the styles data from the Synergy package and formats it for display.
 * @param server - The MCP server instance to register the tool on.
 */
export const stylesList = (server: McpServer) => {
  server.registerTool(
    'styles-list',
    {
      annotations: createToolAnnotations(),
      description: 'Outputs a list of available css classes and styles in the Synergy Design System',
      inputSchema: {},
      title: 'Styles list',
    },
    async () => {
      const content = [];

      try {
        const [aiRules] = await getStructuredMetaData('../../metadata/static/styles');
        const styles = await listStyles({
          includeLayerRefs: false,
          includeSources: false,
        });
        const styleNames = styles.data
          .map(c => c.name)
          .toSorted();

        content.push(aiRules?.content);
        content.push(styleNames);
      } catch (error) {
        content.push({
          text: `Error fetching style list: ${error instanceof Error ? error.message : String(error)}`,
          type: 'text',
        });
      }

      return toContentArray(content);
    },
  );
};
