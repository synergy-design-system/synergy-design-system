import { createMetadataStore } from '../store.js';
import { parseExampleIndex } from '../../internal/core/example-index.js';
import type { ExampleEntry } from '../../internal/core/example-index.js';
import type {
  MetadataEntity, MetadataLayerRef, MetadataStore, MetadataStoreOptions, PublicResponse,
} from '../types.js';
import { getComponentMetadata } from './components.js';
import { getStyleMetadata } from './styles.js';
import { getTemplateMetadata } from './templates.js';
import { getAggregateExampleRef } from '../utils.js';

export type ExampleKind = 'component' | 'style' | 'template';

export type { ExampleEntry };
export type ExampleContent = ExampleEntry & { content: string };

export const readExampleIndex = async (
  store: MetadataStore,
  aggregate: MetadataLayerRef,
): Promise<ExampleEntry[] | undefined> => {
  const directory = aggregate.path.replaceAll('\\', '/').slice(0, -3);
  let raw: string;
  try {
    raw = await store.readLayerFile({ layer: 'examples', path: `${directory}/index.json` });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return undefined;
    throw error;
  }
  return parseExampleIndex(raw, directory);
};

/**
 * List the examples belonging to an entity without reading their content.
 * IDs come from Storybook and may change if their source stories are renamed.
 */
export const listExamples = async (
  kind: ExampleKind,
  nameOrId: string,
  storeOptions: MetadataStoreOptions = {},
): Promise<PublicResponse<ExampleEntry[] | null>> => {
  const options = { includeLayerRefs: true, layer: 'examples' as const, strictLayer: true };
  let response: PublicResponse<MetadataEntity<unknown> | null>;
  switch (kind) {
    case 'component':
      response = await getComponentMetadata(nameOrId, options, storeOptions);
      break;
    case 'style':
      response = await getStyleMetadata(nameOrId, options, storeOptions);
      break;
    case 'template':
      response = await getTemplateMetadata(nameOrId, options, storeOptions);
      break;
    default:
      throw new Error(`Unsupported example kind: ${String(kind)}`);
  }
  if (!response.data) return { ...response, data: null };

  const aggregate = getAggregateExampleRef(response.data);
  if (!aggregate) {
    return {
      ...response,
      data: null,
      errors: [{ code: 'LAYER_NOT_AVAILABLE', message: `No examples available for ${response.data.id}.` }],
    };
  }

  const store = createMetadataStore(storeOptions);
  const examples = await readExampleIndex(store, aggregate);
  if (!examples) {
    return {
      ...response,
      data: null,
      errors: [{
        code: 'DATA_NOT_READY',
        message: `Example index for ${response.data.id} is unavailable; regenerate Storybook metadata.`,
      }],
    };
  }
  return { ...response, data: examples, meta: { ...response.meta, total: examples.length } };
};

/** Retrieve one example by the exact ID returned by listExamples. */
export const getExample = async (
  kind: ExampleKind,
  nameOrId: string,
  exampleId: string,
  storeOptions: MetadataStoreOptions = {},
): Promise<PublicResponse<ExampleContent | null>> => {
  const response = await listExamples(kind, nameOrId, storeOptions);
  if (!response.data) return { ...response, data: null };
  const example = response.data.find(entry => entry.id === exampleId);
  if (!example) {
    return {
      ...response,
      data: null,
      errors: [{
        code: 'NOT_FOUND',
        details: { exampleId },
        message: `Example "${exampleId}" was not found for ${kind} "${nameOrId}".`,
      }],
    };
  }
  const content = await createMetadataStore(storeOptions).readLayerFile({
    layer: 'examples',
    path: example.path,
  });
  return { ...response, data: { ...example, content } };
};
