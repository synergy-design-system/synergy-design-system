import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  createMetadataStore,
  getComponentMetadata,
  readLayerFilesForEntity,
} from '@synergy-design-system/metadata';
import {
  createToolAnnotations,
  getStructuredMetaData,
  withErrorHandler,
} from '../utilities/index.js';

const isFrameworkLayerFile = (path: string, framework: 'react' | 'vue' | 'angular' | 'vanilla'): boolean => {
  if (framework === 'vanilla') {
    return path.includes('/components/');
  }

  return path.includes(`/${framework}/`);
};

const isTestLayerFile = (path: string): boolean => path.toLowerCase().includes('.test.');

const isIncludedLayerFile = (path: string, framework: 'react' | 'vue' | 'angular' | 'vanilla'): boolean => {
  if (isTestLayerFile(path)) {
    return false;
  }

  return path.includes('/components/') || isFrameworkLayerFile(path, framework);
};

/**
 * Simple tool to retrieve information about a given component in the Synergy Design System.
 * @param server - The MCP server instance to register the tool on.
 */
export const componentInfoTool = (server: McpServer) => {
  server.registerTool(
    'component-info',
    {
      annotations: createToolAnnotations(),
      description: 'Get information about the usage of a specific component in the Synergy Design System',
      inputSchema: {
        component: z.string().startsWith('syn-').describe('The name of the component to get information about.'),
        framework: z.enum(['react', 'vue', 'angular', 'vanilla']).default('vanilla').optional().describe('The framework of the component, e.g., "react", "vue", etc.'),
      },
      title: 'Component info',
    },
    async ({
      component,
      framework,
    }) => withErrorHandler(async () => {
      const resolvedFramework = framework ?? 'vanilla';

      const metadata = await getComponentMetadata(component, {
        includeInterfaceSnapshot: true,
        includeLayerRefs: true,
        includeSources: false,
        layer: 'full',
      });

      const [aiRules] = await getStructuredMetaData('../../metadata/static/component-info');

      if (!metadata.data) {
        const notFoundMessage = metadata.errors?.[0]?.message ?? `No metadata found for component ${component}`;
        return [
          aiRules?.content,
          notFoundMessage,
        ];
      }

      const frameworks = metadata.data.custom?.frameworks;
      const frameworkDetails = resolvedFramework === 'vanilla'
        ? undefined
        : frameworks?.[resolvedFramework];

      const store = createMetadataStore();
      const fullLayerFiles = await readLayerFilesForEntity(store, metadata.data, metadata.meta.resolvedLayer);

      const relevantLayerCode = fullLayerFiles
        .filter(({ ref }) => isIncludedLayerFile(ref.path, resolvedFramework))
        .map(({ content, ref }) => ({
          content,
          layer: ref.layer,
          path: ref.path,
        }))
        .toSorted((a, b) => a.path.localeCompare(b.path));

      return [
        aiRules?.content,
        {
          component: metadata.data.id,
          framework: resolvedFramework,
          interfaceSnapshot: metadata.data.custom?.interfaceSnapshot,
          relevantLayerCode,
          requestedFrameworkDetails: frameworkDetails,
        },
      ];
    }),
  );
};
