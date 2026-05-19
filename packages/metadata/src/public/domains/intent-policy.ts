import {
  getIntentFromRegistry,
  getTargetCapabilityFromRegistry,
  listCapabilitiesForIntentFromRegistry,
  listIntentCategoriesFromRegistry,
  listIntentsFromRegistry,
  normalizeIntentId,
  normalizeTargetRef,
  resolveIntentFromRegistry,
  resolveUsagePatternFromRegistry,
} from '../../intentPolicy/resolution.js';
import { renderIntentFromRegistry } from '../../intentPolicy/services/render.js';
import {
  type FrameworkProfile,
  type IntentCapability,
  type IntentCategory,
  type IntentDefinition,
  type IntentPresetValue,
  type IntentResolutionResult,
  type IntentTargetRef,
  type MetadataStoreOptions,
  type PublicResponse,
} from '../types.js';
import type { IntentPhase, IntentPropRule } from '../../intentPolicy/types.js';
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
export type IntentRenderQuery = {
  content?: string;
  framework: FrameworkProfile;
  includePhases?: IntentPhase[];
  intent: string;
  target?: IntentTargetRef;
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
const DEFAULT_GUIDE_PHASES: IntentPhase[] = ['stable'];
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

const resolveGuidePhases = (includePhases?: IntentPhase[]): IntentPhase[] => {
  if (!includePhases || includePhases.length === 0) {
    return DEFAULT_GUIDE_PHASES;
  }

  return includePhases;
};

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

/**
 * Render one target + intent pair to framework-specific component markup.
 *
 * @experimental This API is still under active design.
 */
export const renderIntent = async (
  query: IntentRenderQuery,
  storeOptions: MetadataStoreOptions = {},
): Promise<PublicResponse<string | null>> => {
  const store = createMetadataStore(storeOptions);
  const index = await store.getIndex();

  const hasValidIntent = typeof query.intent === 'string' && query.intent.trim().length > 0;
  const hasValidTarget = !query.target || (typeof query.target === 'object' && typeof query.target.kind === 'string');
  const hasValidFramework = typeof query.framework === 'string' && query.framework.trim().length > 0;

  if (!hasValidIntent || !hasValidTarget || !hasValidFramework) {
    return {
      data: null,
      errors: [{
        code: 'INVALID_QUERY',
        details: query,
        message: '"intent" and "framework" must be valid values. "target" is optional but must be valid when provided.',
      }],
      meta: buildMeta(index.builtAt, index.version, 0),
    };
  }

  const rendered = renderIntentFromRegistry({
    content: query.content,
    framework: query.framework,
    includePhases: query.includePhases,
    intent: query.intent,
    target: query.target,
  });

  if (!rendered) {
    return {
      data: null,
      errors: [{
        code: 'NOT_FOUND',
        details: {
          framework: query.framework,
          intent: normalizeIntentId(query.intent),
          target: query.target ? normalizeTargetRef(query.target) : undefined,
        },
        message: 'No renderable usage pattern is registered for the requested intent and target context.',
      }],
      meta: buildMeta(index.builtAt, index.version, 0),
    };
  }

  return {
    data: rendered,
    meta: buildMeta(index.builtAt, index.version, 1),
  };
};

/**
 * @experimental Validation severity levels for component usage checks.
 */
export type ComponentValidationSeverity = 'error' | 'info' | 'warning';

/**
 * @experimental Validation issue emitted by validateComponent.
 */
export type ComponentValidationIssue = {
  code: string;
  message: string;
  path?: string;
  rationale?: string;
  severity: ComponentValidationSeverity;
  suggestedFix?: string;
};

/**
 * @experimental Query payload for validateComponent.
 */
export type ValidateComponentQuery = {
  component: string;
  framework: FrameworkProfile;
  includePhases?: IntentPhase[];
  intent?: string;
  props?: Record<string, IntentPresetValue>;
};

/**
 * @experimental validateComponent response payload.
 */
export type ValidateComponentResult = {
  component: string;
  framework: FrameworkProfile;
  issues: ComponentValidationIssue[];
  score: number;
  valid: boolean;
};

/**
 * @experimental Query payload for getComponentGuide.
 */
export type ComponentGuideQuery = {
  component: string;
  framework: FrameworkProfile;
  includePhases?: IntentPhase[];
};

/**
 * @experimental Supported intent summary for one component.
 */
export type ComponentGuideIntent = {
  category: string;
  description: string;
  id: string;
  phase?: IntentPhase;
};

/**
 * @experimental Recommended usage snippet for one component + intent.
 */
export type ComponentGuideUsage = {
  description: string;
  intentId: string;
  propRules: IntentPropRule[];
  snippet: string;
};

/**
 * @experimental getComponentGuide response payload.
 */
export type ComponentGuideResult = {
  commonMisuses: ComponentValidationIssue[];
  component: string;
  framework: FrameworkProfile;
  quickChecks: Array<{ detail: string; pass: boolean; title: string }>;
  recommendedUsages: ComponentGuideUsage[];
  supportedIntents: ComponentGuideIntent[];
};

/**
 * @experimental Query payload for findComponentsForTask.
 */
export type FindComponentsForTaskQuery = {
  constraints?: {
    avoidTargets?: string[];
    preferredTargets?: string[];
  };
  content?: string;
  framework: FrameworkProfile;
  includePhases?: IntentPhase[];
  maxAlternatives?: number;
  taskId: string;
};

/**
 * @experimental One ranked recommendation for a task.
 */
export type TaskRecommendation = {
  intentId: string;
  rank: number;
  snippet: string;
  targetId: string;
  why: string;
};

/**
 * @experimental findComponentsForTask response payload.
 */
export type FindComponentsForTaskResult = {
  alternatives: TaskRecommendation[];
  framework: FrameworkProfile;
  notes: string[];
  primaryRecommendation: TaskRecommendation | null;
  taskId: string;
};

/**
 * @experimental Query payload for getIntentOptions.
 */
export type IntentOptionsQuery = {
  content?: string;
  framework: FrameworkProfile;
  includeDiagnostics?: boolean;
  includePhases?: IntentPhase[];
  intentId: string;
  maxAlternatives?: number;
};

/**
 * @experimental One renderable option for an intent.
 */
export type IntentOption = {
  phase?: IntentPhase;
  previewCode: string;
  reason: string;
  targetId: string;
  targetName?: string;
};

/**
 * @experimental One non-renderable candidate for an intent.
 */
export type NonRenderableIntentCandidate = {
  detail: string;
  reasonCode: string;
  targetId: string;
};

/**
 * @experimental getIntentOptions response payload.
 */
export type IntentOptionsResult = {
  bestDefaultTargetId: string | null;
  framework: FrameworkProfile;
  intentId: string;
  nonRenderableCandidates: NonRenderableIntentCandidate[];
  renderableTargets: IntentOption[];
};

const toComponentTarget = (component: string): IntentTargetRef => ({
  id: `component:${component}`,
  kind: 'component',
  name: component,
});

const getTargetIdentity = (target: IntentTargetRef): string => target.id
  ?? target.name
  ?? target.selector
  ?? `${target.kind}:unknown`;

/**
 * Validate whether a component usage aligns with intent-policy guidance.
 *
 * @experimental This API is still under active design.
 */
export const validateComponent = async (
  query: ValidateComponentQuery,
  storeOptions: MetadataStoreOptions = {},
): Promise<PublicResponse<ValidateComponentResult | null>> => {
  const store = createMetadataStore(storeOptions);
  const index = await store.getIndex();

  const hasComponent = typeof query.component === 'string' && query.component.trim().length > 0;
  const hasFramework = typeof query.framework === 'string' && query.framework.trim().length > 0;

  if (!hasComponent || !hasFramework) {
    return {
      data: null,
      errors: [{
        code: 'INVALID_QUERY',
        details: query,
        message: '"component" and "framework" must be valid values.',
      }],
      meta: buildMeta(index.builtAt, index.version, 0),
    };
  }

  const phases = resolveGuidePhases(query.includePhases);
  const target = normalizeTargetRef(toComponentTarget(query.component));
  const issues: ComponentValidationIssue[] = [];
  const capability = getTargetCapabilityFromRegistry(target, phases);

  if (!capability) {
    issues.push({
      code: 'COMPONENT_NOT_REGISTERED',
      message: `No intent capability is registered for "${query.component}" in the selected phases.`,
      severity: 'error',
    });
  }

  if (query.intent) {
    const intent = getIntentFromRegistry(query.intent, phases);
    if (!intent) {
      issues.push({
        code: 'INTENT_NOT_REGISTERED',
        message: `Intent "${query.intent}" is not registered in the selected phases.`,
        severity: 'error',
      });
    } else if (capability && !capability.categories.map((category) => category.toLowerCase()).includes(intent.category.toLowerCase())) {
      issues.push({
        code: 'INTENT_CATEGORY_MISMATCH',
        message: `Component "${query.component}" does not support the "${intent.category}" category required by intent "${query.intent}".`,
        severity: 'error',
      });
    }

    const pattern = resolveUsagePatternFromRegistry(target, query.intent, phases);
    if (!pattern) {
      issues.push({
        code: 'PATTERN_NOT_FOUND',
        message: `No usage pattern is registered for "${query.component}" with intent "${query.intent}".`,
        severity: 'error',
      });
    } else {
      const propRules = pattern.config?.propRules ?? [];

      // Evaluate forbidden rules
      for (const rule of propRules.filter((r) => r.kind === 'forbidden')) {
        if (query.props && Object.prototype.hasOwnProperty.call(query.props, rule.prop)) {
          issues.push({
            code: rule.code,
            message: rule.message,
            path: `props.${rule.prop}`,
            rationale: rule.rationale,
            severity: 'error',
            suggestedFix: rule.suggestedFix,
          });
        }
      }

      // Evaluate requiredEquals rules — error when prop is present with wrong value
      for (const rule of propRules.filter((r) => r.kind === 'requiredEquals')) {
        if (query.props && Object.prototype.hasOwnProperty.call(query.props, rule.prop)) {
          const propValue = query.props[rule.prop];
          if (propValue !== rule.value) {
            issues.push({
              code: rule.code,
              message: rule.message,
              path: `props.${rule.prop}`,
              rationale: rule.rationale,
              severity: 'error',
              suggestedFix: rule.suggestedFix,
            });
          }
        }
      }

      // Evaluate warnWhenEquals rules — warning when prop equals the trigger value
      for (const rule of propRules.filter((r) => r.kind === 'warnWhenEquals')) {
        const propValue = query.props?.[rule.prop];
        if (propValue !== rule.value) {
          continue;
        }

        issues.push({
          code: rule.code,
          message: rule.message,
          path: `props.${rule.prop}`,
          rationale: rule.rationale,
          severity: rule.severity ?? 'warning',
          suggestedFix: rule.suggestedFix,
        });
      }

      // Fall back to legacy preset fields when no config.propRules are defined
      if (propRules.length === 0) {
        const forbidden = pattern.preset?.forbiddenProps ?? [];
        for (const forbiddenProp of forbidden) {
          if (query.props && Object.prototype.hasOwnProperty.call(query.props, forbiddenProp)) {
            issues.push({
              code: 'FORBIDDEN_PROP',
              message: `Property "${forbiddenProp}" must not be used for intent "${query.intent}".`,
              path: `props.${forbiddenProp}`,
              severity: 'error',
              suggestedFix: `Remove props.${forbiddenProp}.`,
            });
          }
        }

        const advisoryRules = pattern.preset?.advisoryRules ?? [];
        for (const advisoryRule of advisoryRules) {
          const propValue = query.props?.[advisoryRule.condition.prop];
          if (propValue !== advisoryRule.condition.equals) {
            continue;
          }

          issues.push({
            code: advisoryRule.code,
            message: advisoryRule.message,
            path: `props.${advisoryRule.condition.prop}`,
            rationale: advisoryRule.rationale,
            severity: advisoryRule.severity ?? 'warning',
            suggestedFix: advisoryRule.suggestedFix,
          });
        }
      }
    }
  }

  const errorCount = issues.filter((issue) => issue.severity === 'error').length;
  const warningCount = issues.filter((issue) => issue.severity === 'warning').length;

  return {
    data: {
      component: query.component,
      framework: query.framework,
      issues,
      score: Math.max(0, 100 - (errorCount * 40) - (warningCount * 10)),
      valid: errorCount === 0,
    },
    meta: buildMeta(index.builtAt, index.version, 1),
  };
};

/**
 * Return developer-focused usage guidance for one component.
 *
 * @experimental This API is still under active design.
 */
export const getComponentGuide = async (
  query: ComponentGuideQuery,
  storeOptions: MetadataStoreOptions = {},
): Promise<PublicResponse<ComponentGuideResult | null>> => {
  const store = createMetadataStore(storeOptions);
  const index = await store.getIndex();

  const hasComponent = typeof query.component === 'string' && query.component.trim().length > 0;
  const hasFramework = typeof query.framework === 'string' && query.framework.trim().length > 0;

  if (!hasComponent || !hasFramework) {
    return {
      data: null,
      errors: [{
        code: 'INVALID_QUERY',
        details: query,
        message: '"component" and "framework" must be valid values.',
      }],
      meta: buildMeta(index.builtAt, index.version, 0),
    };
  }

  const phases = resolveGuidePhases(query.includePhases);
  const target = normalizeTargetRef(toComponentTarget(query.component));
  const capability = getTargetCapabilityFromRegistry(target, phases);

  if (!capability) {
    return {
      data: null,
      errors: [{
        code: 'NOT_FOUND',
        details: {
          component: query.component,
          phases,
        },
        message: `No intent capability is registered for component "${query.component}" in the selected phases.`,
      }],
      meta: buildMeta(index.builtAt, index.version, 0),
    };
  }

  const supportedIntents = listIntentsFromRegistry(undefined, phases)
    .filter((intent) => capability.categories.map((category) => category.toLowerCase()).includes(intent.category.toLowerCase()))
    .map((intent) => ({
      category: intent.category,
      description: intent.description,
      id: intent.id,
      phase: intent.phase,
    }));

  const recommendedUsages = supportedIntents
    .map((intent) => {
      const pattern = resolveUsagePatternFromRegistry(target, intent.id, phases);
      if (!pattern) {
        return null;
      }

      const snippet = renderIntentFromRegistry({
        framework: query.framework,
        includePhases: phases,
        intent: intent.id,
        target,
      });

      if (!snippet) {
        return null;
      }

      return {
        description: pattern.description,
        intentId: intent.id,
        propRules: pattern.config?.propRules ?? [],
        snippet,
      };
    })
    .filter((entry): entry is ComponentGuideUsage => entry !== null);

  const commonMisuses: ComponentValidationIssue[] = [];
  for (const intent of supportedIntents) {
    const pattern = resolveUsagePatternFromRegistry(target, intent.id, phases);
    if (!pattern) {
      continue;
    }

    const forbiddenRules = pattern.config?.propRules?.filter((r) => r.kind === 'forbidden')
      ?? pattern.preset?.forbiddenProps?.map((prop) => ({
        code: 'FORBIDDEN_PROP',
        kind: 'forbidden' as const,
        message: `Avoid using "${prop}" with intent "${intent.id}".`,
        prop,
        rationale: undefined as string | undefined,
        suggestedFix: undefined as string | undefined,
      }))
      ?? [];

    for (const rule of forbiddenRules) {
      commonMisuses.push({
        code: rule.code,
        message: rule.message,
        path: `props.${rule.prop}`,
        rationale: rule.rationale,
        severity: 'warning',
        suggestedFix: rule.suggestedFix,
      });
    }
  }

  return {
    data: {
      commonMisuses,
      component: query.component,
      framework: query.framework,
      quickChecks: [
        {
          detail: `Component has ${supportedIntents.length} supported intents in selected phases.`,
          pass: supportedIntents.length > 0,
          title: 'Intent coverage',
        },
        {
          detail: `Component has ${recommendedUsages.length} renderable usage patterns for ${query.framework}.`,
          pass: recommendedUsages.length > 0,
          title: 'Renderable patterns',
        },
      ],
      recommendedUsages,
      supportedIntents,
    },
    meta: buildMeta(index.builtAt, index.version, 1),
  };
};

/**
 * Find component recommendations for a task mapped to an intent ID.
 *
 * @experimental This API is still under active design.
 */
export const findComponentsForTask = async (
  query: FindComponentsForTaskQuery,
  storeOptions: MetadataStoreOptions = {},
): Promise<PublicResponse<FindComponentsForTaskResult | null>> => {
  const store = createMetadataStore(storeOptions);
  const index = await store.getIndex();

  const hasTaskId = typeof query.taskId === 'string' && query.taskId.trim().length > 0;
  const hasFramework = typeof query.framework === 'string' && query.framework.trim().length > 0;

  if (!hasTaskId || !hasFramework) {
    return {
      data: null,
      errors: [{
        code: 'INVALID_QUERY',
        details: query,
        message: '"taskId" and "framework" must be valid values.',
      }],
      meta: buildMeta(index.builtAt, index.version, 0),
    };
  }

  const phases = resolveGuidePhases(query.includePhases);
  const intent = getIntentFromRegistry(query.taskId, phases);

  if (!intent) {
    return {
      data: null,
      errors: [{
        code: 'NOT_FOUND',
        details: {
          phases,
          taskId: normalizeIntentId(query.taskId),
        },
        message: `Task "${query.taskId}" is not registered as an intent in the selected phases.`,
      }],
      meta: buildMeta(index.builtAt, index.version, 0),
    };
  }

  const recommendations = listCapabilitiesForIntentFromRegistry(intent.id, phases)
    .map((capability) => {
      const targetId = getTargetIdentity(capability.target);

      if (query.constraints?.avoidTargets?.includes(targetId)) {
        return null;
      }

      const snippet = renderIntentFromRegistry({
        content: query.content,
        framework: query.framework,
        includePhases: phases,
        intent: intent.id,
        target: capability.target,
      });

      if (!snippet) {
        return null;
      }

      const preferred = !!query.constraints?.preferredTargets?.includes(targetId);

      return {
        intentId: intent.id,
        preferred,
        snippet,
        targetId,
        why: `Supports category "${intent.category}" and has a registered render pattern.`,
      };
    })
    .filter((entry): entry is { intentId: string; preferred: boolean; snippet: string; targetId: string; why: string } => entry !== null)
    .sort((a, b) => {
      if (a.preferred !== b.preferred) {
        return a.preferred ? -1 : 1;
      }

      return a.targetId.localeCompare(b.targetId);
    })
    .slice(0, query.maxAlternatives ?? 5)
    .map((entry, e) => ({
      ...entry,
      rank: e + 1,
    }));

  return {
    data: {
      alternatives: recommendations,
      framework: query.framework,
      notes: recommendations.length === 0
        ? ['No renderable component patterns were found for this task in the selected phases.']
        : [],
      primaryRecommendation: recommendations[0] ?? null,
      taskId: intent.id,
    },
    meta: buildMeta(index.builtAt, index.version, 1),
  };
};

/**
 * Return renderable options for one intent and framework.
 *
 * @experimental This API is still under active design.
 */
export const getIntentOptions = async (
  query: IntentOptionsQuery,
  storeOptions: MetadataStoreOptions = {},
): Promise<PublicResponse<IntentOptionsResult | null>> => {
  const store = createMetadataStore(storeOptions);
  const index = await store.getIndex();

  const hasIntentId = typeof query.intentId === 'string' && query.intentId.trim().length > 0;
  const hasFramework = typeof query.framework === 'string' && query.framework.trim().length > 0;

  if (!hasIntentId || !hasFramework) {
    return {
      data: null,
      errors: [{
        code: 'INVALID_QUERY',
        details: query,
        message: '"intentId" and "framework" must be valid values.',
      }],
      meta: buildMeta(index.builtAt, index.version, 0),
    };
  }

  const phases = resolveGuidePhases(query.includePhases);
  const intent = getIntentFromRegistry(query.intentId, phases);

  if (!intent) {
    return {
      data: null,
      errors: [{
        code: 'NOT_FOUND',
        details: {
          intentId: normalizeIntentId(query.intentId),
          phases,
        },
        message: `Intent "${query.intentId}" is not registered in the selected phases.`,
      }],
      meta: buildMeta(index.builtAt, index.version, 0),
    };
  }

  const capabilities = listCapabilitiesForIntentFromRegistry(intent.id, phases);
  const renderableTargets: IntentOption[] = [];
  const nonRenderableCandidates: NonRenderableIntentCandidate[] = [];
  const includeDiagnostics = query.includeDiagnostics === true;

  for (const capability of capabilities) {
    const targetId = getTargetIdentity(capability.target);
    const snippet = renderIntentFromRegistry({
      content: query.content,
      framework: query.framework,
      includePhases: phases,
      intent: intent.id,
      target: capability.target,
    });

    if (!snippet) {
      if (includeDiagnostics) {
        nonRenderableCandidates.push({
          detail: 'Capability exists for the intent category, but no concrete usage pattern is registered for this target + intent pair.',
          reasonCode: 'PATTERN_NOT_FOUND',
          targetId,
        });
      }
      continue;
    }

    const pattern = resolveUsagePatternFromRegistry(capability.target, intent.id, phases);
    renderableTargets.push({
      phase: pattern?.phase,
      previewCode: snippet,
      reason: pattern?.description ?? `Renderable option for intent "${intent.id}".`,
      targetId,
      targetName: capability.target.name,
    });
  }

  renderableTargets.sort((a, b) => a.targetId.localeCompare(b.targetId));
  const limitedTargets = renderableTargets.slice(0, query.maxAlternatives ?? 5);

  return {
    data: {
      bestDefaultTargetId: limitedTargets[0]?.targetId ?? null,
      framework: query.framework,
      intentId: intent.id,
      nonRenderableCandidates,
      renderableTargets: limitedTargets,
    },
    meta: buildMeta(index.builtAt, index.version, 1),
  };
};
