import {
  type MetadataLayerRef,
  createMetadataStore,
  getComponentMetadata,
} from '@synergy-design-system/metadata';
import {
  type Framework,
} from './config.js';
import {
  type MetadataFile,
  getStructuredMetaDataForComponent,
} from './metadata.js';

/**
 * Get additional information for a specific component from the static metadata.
 * @param component The name of the component to get information about, e.g., 'syn-button'.
 * @returns The structured metadata for the specified component, taken from the static metadata.
 */
const getAdditionalInformationForComponent = async (
  component: string,
) => getStructuredMetaDataForComponent(
  component,
  undefined,
  'static',
);

/**
 * Get information about the usage of a specific component in the Synergy Design System.
 * @param component The name of the component to get information about, e.g., 'syn-button'.
 * @param framework The framework to filter the component usage information by.
 * @returns The structured metadata for the specified component.
 */
export const getInfoForComponent = async (
  component: string,
  framework: Framework = 'vanilla',
) => {
  const namePatterns = new Set([
    'component.ts',
    'component.styles.ts',
    'component.custom.styles.ts',
  ]);

  if (framework === 'react') {
    namePatterns.add('component.react.ts');
  }

  if (framework === 'vue') {
    namePatterns.add('component.vue');
  }

  if (framework === 'angular') {
    namePatterns.add('component.angular.ts');
  }

  const matchFileName = (ref: MetadataLayerRef): boolean => {
    const fileName = ref.path.split('/').at(-1)?.toLowerCase() ?? '';
    return [...namePatterns].some(pattern => fileName.includes(pattern));
  };

  const metadata = await getComponentMetadata(component, {
    includeLayerRefs: true,
    includeSources: false,
    layer: 'full',
  });

  const entity = metadata.data;
  const layerRefs = entity?.layers?.[metadata.meta.resolvedLayer] ?? [];

  const store = createMetadataStore();
  const data: MetadataFile[] = await Promise.all(
    layerRefs
      .filter(matchFileName)
      .map(async (ref) => ({
        content: await store.readLayerFile(ref),
        filename: ref.path.split('/').at(-1) ?? ref.path,
      })),
  );

  const additionalData = await getAdditionalInformationForComponent(component);

  return [
    ...data,
    ...additionalData,
  ].filter(Boolean);
};
