import {
  getIntentFromRegistry,
  getTargetCapabilityFromRegistry,
  listCapabilitiesForIntentFromRegistry,
  listIntentCategoriesFromRegistry,
  listIntentsFromRegistry,
  normalizeIntentId,
  normalizeTargetRef,
  resolveIntentFromRegistry,
} from '../../intentPolicy/resolution.js';
import {
  type IntentCapability,
  type IntentCategory,
  type IntentDefinition,
  type IntentResolutionResult,
  type IntentTargetRef,
  type MetadataStoreOptions,
  type PublicResponse,
} from '../types.js';
import type { IntentPhase } from '../../intentPolicy/types.js';
import { createMetadataStore } from '../store.js';

/**
 * @experimental Intent policy query options may evolve during rollout.
 */
export type IntentListQueryOptions = {
  category?: string;
  includePhases?: IntentPhase[];
};

/**
 * @experimental Intent policy query options may evolve during rollout.
 */
export type IntentResolutionQuery = {
  includePhases?: IntentPhase[];
  intent: string;
  target: IntentTargetRef;
};

/**
 * @experimental Intent policy query options may evolve during rollout.
 */
export type IntentPhaseQueryOptions = {
  includePhases?: IntentPhase[];
};

/**
 * @experimental Intent policy query options may evolve during rollout.
 */
export type IntentCategoryQueryOptions = {
  includePhases?: IntentPhase[];
};

const REQUESTED_LAYER = 'full' as const;
const REQUESTED_VERBOSITY = 'readable' as const;
const normalizeCategoryId = (value: string): string => value.trim().toLowerCase();

const buildMeta = (
  builtAt: string,
  schemaVersion: string,
  total: number,
): PublicResponse<unknown>['meta'] => ({
  builtAt,
  requestedLayer: REQUESTED_LAYER,
  requestedVerbosity: REQUESTED_VERBOSITY,
  resolvedLayer: REQUESTED_LAYER,
  schemaVersion,
  total,
});

/**
 * List all available intent categories.
 *
 * @experimental This API is still under active design.
 */
export const listIntentCategories = async (
  storeOptions: MetadataStoreOptions = {},
  options: IntentPhaseQueryOptions = {},
): Promise<PublicResponse<IntentCategory[]>> => {
  const store = createMetadataStore(storeOptions);
  const index = await store.getIndex();
  const categories = listIntentCategoriesFromRegistry(options.includePhases);

  return {
    data: categories,
    meta: buildMeta(index.builtAt, index.version, categories.length),
  };
};

/**
 * Return one intent category by its ID.
 *
 * @experimental This API is still under active design.
 */
export const getIntentCategory = async (
  categoryId: string,
  options: IntentCategoryQueryOptions = {},
  storeOptions: MetadataStoreOptions = {},
): Promise<PublicResponse<IntentCategory | null>> => {
  const store = createMetadataStore(storeOptions);
  const index = await store.getIndex();

  if (typeof categoryId !== 'string' || categoryId.trim().length === 0) {
    return {
      data: null,
      errors: [{
        code: 'INVALID_QUERY',
        details: {
          categoryId,
        },
        message: 'Category ID must be a non-empty string.',
      }],
      meta: buildMeta(index.builtAt, index.version, 0),
    };
  }

  const categories = listIntentCategoriesFromRegistry(options.includePhases);
  const normalizedCategoryId = normalizeCategoryId(categoryId);
  const category = categories.find((entry) => normalizeCategoryId(entry.id) === normalizedCategoryId);

  if (!category) {
    return {
      data: null,
      errors: [{
        code: 'NOT_FOUND',
        details: {
          categoryId: normalizedCategoryId,
        },
        message: `Intent category "${categoryId}" is not registered.`,
      }],
      meta: buildMeta(index.builtAt, index.version, 0),
    };
  }

  return {
    data: category,
    meta: buildMeta(index.builtAt, index.version, 1),
  };
};

/**
 * List intents, optionally filtered by category.
 *
 * @experimental This API is still under active design.
 */
export const listIntents = async (
  options: IntentListQueryOptions = {},
  storeOptions: MetadataStoreOptions = {},
): Promise<PublicResponse<IntentDefinition[]>> => {
  const store = createMetadataStore(storeOptions);
  const index = await store.getIndex();
  const intents = listIntentsFromRegistry(options.category, options.includePhases);

  return {
    data: intents,
    meta: buildMeta(index.builtAt, index.version, intents.length),
  };
};

/**
 * List all capabilities (targets) that support a given intent.
 *
 * @experimental This API is still under active design.
 */
export const listIntentCapabilities = async (
  intentId: string,
  options: IntentListQueryOptions = {},
  storeOptions: MetadataStoreOptions = {},
): Promise<PublicResponse<IntentCapability[]>> => {
  const store = createMetadataStore(storeOptions);
  const index = await store.getIndex();

  if (typeof intentId !== 'string' || intentId.trim().length === 0) {
    return {
      data: [],
      errors: [{
        code: 'INVALID_QUERY',
        details: { intentId },
        message: 'Intent ID must be a non-empty string.',
      }],
      meta: buildMeta(index.builtAt, index.version, 0),
    };
  }

  const capabilities = listCapabilitiesForIntentFromRegistry(intentId, options.includePhases);

  return {
    data: capabilities,
    meta: buildMeta(index.builtAt, index.version, capabilities.length),
  };
};

/**
 * Return capability categories for one target.
 *
 * @experimental This API is still under active design.
 */
export const getTargetCapabilities = async (
  target: IntentTargetRef,
  storeOptions: MetadataStoreOptions = {},
): Promise<PublicResponse<IntentCapability | null>> => {
  const store = createMetadataStore(storeOptions);
  const index = await store.getIndex();

  if (!target || typeof target !== 'object' || !target.kind) {
    return {
      data: null,
      errors: [{
        code: 'INVALID_QUERY',
        details: {
          target,
        },
        message: 'Target must be a valid target reference with a kind.',
      }],
      meta: buildMeta(index.builtAt, index.version, 0),
    };
  }

  const normalizedTarget = normalizeTargetRef(target);
  const capability = getTargetCapabilityFromRegistry(normalizedTarget);
  if (!capability) {
    return {
      data: null,
      errors: [{
        code: 'NOT_FOUND',
        details: {
          target: normalizedTarget,
        },
        message: 'No intent capabilities are registered for the requested target.',
      }],
      meta: buildMeta(index.builtAt, index.version, 0),
    };
  }

  return {
    data: capability,
    meta: buildMeta(index.builtAt, index.version, 1),
  };
};

/**
 * Resolve one target + intent pair to a usage pattern/preset.
 *
 * @experimental This API is still under active design.
 */
export const resolveIntent = async (
  query: IntentResolutionQuery,
  storeOptions: MetadataStoreOptions = {},
): Promise<PublicResponse<IntentResolutionResult | null>> => {
  const store = createMetadataStore(storeOptions);
  const index = await store.getIndex();

  const hasValidIntent = typeof query.intent === 'string' && query.intent.trim().length > 0;
  const hasValidTarget = !!query.target && typeof query.target === 'object' && typeof query.target.kind === 'string';

  if (!hasValidIntent || !hasValidTarget) {
    return {
      data: null,
      errors: [{
        code: 'INVALID_QUERY',
        details: query,
        message: 'Both "intent" and "target" must be valid values.',
      }],
      meta: buildMeta(index.builtAt, index.version, 0),
    };
  }

  const intent = getIntentFromRegistry(query.intent, query.includePhases);
  if (!intent) {
    return {
      data: null,
      errors: [{
        code: 'NOT_FOUND',
        details: {
          intent: normalizeIntentId(query.intent),
        },
        message: `Intent "${query.intent}" is not registered.`,
      }],
      meta: buildMeta(index.builtAt, index.version, 0),
    };
  }

  const normalizedTarget = normalizeTargetRef(query.target);
  const capability = getTargetCapabilityFromRegistry(normalizedTarget, query.includePhases);
  if (!capability) {
    return {
      data: null,
      errors: [{
        code: 'NOT_FOUND',
        details: {
          target: normalizedTarget,
        },
        message: 'No intent capabilities are registered for the requested target.',
      }],
      meta: buildMeta(index.builtAt, index.version, 0),
    };
  }

  const canResolve = capability.categories
    .map((category) => category.toLowerCase())
    .includes(intent.category.toLowerCase());

  if (!canResolve) {
    return {
      data: null,
      errors: [{
        code: 'INVALID_QUERY',
        details: {
          capabilityCategories: capability.categories,
          intent: intent.id,
          intentCategory: intent.category,
          target: normalizedTarget,
        },
        message: `Intent "${query.intent}" is not compatible with the requested target.`,
      }],
      meta: buildMeta(index.builtAt, index.version, 0),
    };
  }

  const resolution = resolveIntentFromRegistry(normalizedTarget, query.intent, query.includePhases);
  if (!resolution) {
    return {
      data: null,
      errors: [{
        code: 'NOT_FOUND',
        details: {
          intent: normalizeIntentId(query.intent),
          target: normalizedTarget,
        },
        message: 'No usage pattern is registered for the requested target and intent.',
      }],
      meta: buildMeta(index.builtAt, index.version, 0),
    };
  }

  return {
    data: resolution,
    meta: buildMeta(index.builtAt, index.version, 1),
  };
};
