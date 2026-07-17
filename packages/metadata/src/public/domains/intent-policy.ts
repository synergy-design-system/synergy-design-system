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
  type ComponentInterfaceSnapshot,
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
import type {
  IntentContentRule,
  IntentContentSource,
  IntentPhase,
  IntentPropRule,
  IntentStructureNode,
} from '../../intentPolicy/types.js';
import { createMetadataStore } from '../store.js';

type IntentOptionTargetRole = 'standalone' | 'container' | 'item';

type IntentOptionPatternLike = {
  phase?: IntentPhase;
  priority?: number;
  description?: string;
  targetRole?: IntentOptionTargetRole;
};

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
  structure?: IntentStructureNode;
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
  priority?: number;
  reason: string;
  targetId: string;
  targetName?: string;
  targetRole?: IntentOptionTargetRole;
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

const normalizeComponentEntityId = (component: string): string => {
  const normalized = component.trim().toLowerCase();
  if (normalized.startsWith('component:')) {
    return normalized;
  }

  if (normalized.startsWith('syn-')) {
    return `component:${normalized}`;
  }

  return `component:syn-${normalized}`;
};

const parsePropertyDefaultValue = (rawValue: string | undefined): IntentPresetValue | undefined => {
  if (typeof rawValue !== 'string') {
    return undefined;
  }

  const trimmed = rawValue.trim();
  if (trimmed.length === 0) {
    return undefined;
  }

  const isQuoted = (trimmed.startsWith('\'') && trimmed.endsWith('\''))
    || (trimmed.startsWith('"') && trimmed.endsWith('"'));
  const normalized = isQuoted ? trimmed.slice(1, -1) : trimmed;

  // Empty string defaults should not be treated as authored values for validation.
  if (normalized.length === 0) {
    return undefined;
  }

  if (normalized === 'true') {
    return true;
  }

  if (normalized === 'false') {
    return false;
  }

  if (normalized === 'null') {
    return null;
  }

  if (/^-?\d+(\.\d+)?$/.test(normalized)) {
    return Number(normalized);
  }

  return normalized;
};

const getPropertyDefaultsFromInterfaceSnapshot = (
  snapshot: Partial<ComponentInterfaceSnapshot>,
): Record<string, IntentPresetValue> => {
  const properties = Array.isArray(snapshot.properties) ? snapshot.properties : [];

  const defaults: Record<string, IntentPresetValue> = {};
  for (const property of properties) {
    if (typeof property.name !== 'string') {
      continue;
    }

    const defaultValue = parsePropertyDefaultValue(property.default);
    if (defaultValue === undefined) {
      continue;
    }

    defaults[property.name] = defaultValue;
  }

  return defaults;
};

const createComponentPropertyDefaultsResolver = (
  store: ReturnType<typeof createMetadataStore>,
): ((component: string) => Promise<Record<string, IntentPresetValue>>) => {
  const cache = new Map<string, Promise<Record<string, IntentPresetValue>>>();

  return async (component: string): Promise<Record<string, IntentPresetValue>> => {
    const cacheKey = component.trim().toLowerCase();
    if (!cacheKey || cacheKey === 'text' || !cacheKey.includes('-')) {
      return {};
    }

    const cached = cache.get(cacheKey);
    if (cached) {
      return cached;
    }

    const loadDefaultsPromise = (async (): Promise<Record<string, IntentPresetValue>> => {
      const entity = await store.getEntity(normalizeComponentEntityId(cacheKey));
      const interfaceRef = entity?.layers?.interface?.find((ref) => ref.path.endsWith('.json'));
      if (!interfaceRef) {
        return {};
      }

      const rawSnapshot = await store.readLayerFile(interfaceRef);
      const interfaceSnapshot = JSON.parse(rawSnapshot) as Partial<ComponentInterfaceSnapshot>;

      return getPropertyDefaultsFromInterfaceSnapshot(interfaceSnapshot);
    })();

    cache.set(cacheKey, loadDefaultsPromise);
    return loadDefaultsPromise;
  };
};

const getTargetIdentity = (target: IntentTargetRef): string => target.id
  ?? target.name
  ?? target.selector
  ?? `${target.kind}:unknown`;

const getIntentTargetRoleWeight = (targetRole?: IntentOptionTargetRole): number => {
  switch (targetRole ?? 'standalone') {
    case 'standalone':
      return 3;
    case 'container':
      return 2;
    case 'item':
      return 1;
    default:
      return 0;
  }
};

const compareIntentOptions = (a: Pick<IntentOption, 'priority' | 'targetId' | 'targetRole'>, b: Pick<IntentOption, 'priority' | 'targetId' | 'targetRole'>): number => {
  const roleWeightDifference = getIntentTargetRoleWeight(b.targetRole) - getIntentTargetRoleWeight(a.targetRole);
  if (roleWeightDifference !== 0) {
    return roleWeightDifference;
  }

  const priorityDifference = (b.priority ?? 0) - (a.priority ?? 0);
  if (priorityDifference !== 0) {
    return priorityDifference;
  }

  return a.targetId.localeCompare(b.targetId);
};

const hasMeaningfulContentValue = (value: IntentPresetValue | undefined): boolean => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }

  return value !== undefined && value !== null;
};

const hasContentForSource = (
  source: IntentContentSource,
  node: IntentStructureNode,
): boolean => {
  if (source.kind === 'prop') {
    return hasMeaningfulContentValue(node.props?.[source.prop]);
  }

  if (source.kind === 'text') {
    return typeof node.text === 'string' && node.text.trim().length > 0;
  }

  if (source.kind === 'children') {
    return (node.children?.length ?? 0) > 0;
  }

  return (node.children ?? []).some((child) => child.slot === source.slot);
};

const evaluateNodePropRules = (
  rules: IntentPropRule[],
  props: Record<string, IntentPresetValue> | undefined,
  nodePath: string,
  issues: ComponentValidationIssue[],
  strictRequiredEquals: boolean,
): void => {
  for (const rule of rules) {
    if (rule.kind === 'forbidden') {
      if (props && Object.prototype.hasOwnProperty.call(props, rule.prop)) {
        issues.push({
          code: rule.code,
          message: rule.message,
          path: `${nodePath}.props.${rule.prop}`,
          rationale: rule.rationale,
          severity: 'error',
          suggestedFix: rule.suggestedFix,
        });
      }
      continue;
    }

    if (rule.kind === 'requiredEquals') {
      const hasProp = !!props && Object.prototype.hasOwnProperty.call(props, rule.prop);
      const propValue = props?.[rule.prop];
      const shouldReport = strictRequiredEquals ? (!hasProp || propValue !== rule.value) : (hasProp && propValue !== rule.value);
      if (shouldReport) {
        issues.push({
          code: rule.code,
          message: rule.message,
          path: `${nodePath}.props.${rule.prop}`,
          rationale: rule.rationale,
          severity: 'error',
          suggestedFix: rule.suggestedFix,
        });
      }
      continue;
    }

    if (rule.kind === 'recommendedEquals') {
      const propValue = props?.[rule.prop];
      if (propValue !== rule.value) {
        issues.push({
          code: rule.code,
          message: rule.message,
          path: `${nodePath}.props.${rule.prop}`,
          rationale: rule.rationale,
          severity: rule.severity ?? 'info',
          suggestedFix: rule.suggestedFix,
        });
      }
      continue;
    }

    const propValue = props?.[rule.prop];
    if (propValue !== rule.value) {
      continue;
    }

    issues.push({
      code: rule.code,
      message: rule.message,
      path: `${nodePath}.props.${rule.prop}`,
      rationale: rule.rationale,
      severity: rule.severity ?? 'warning',
      suggestedFix: rule.suggestedFix,
    });
  }
};

const evaluateNodeContentRules = (
  rules: IntentContentRule[],
  node: IntentStructureNode,
  nodePath: string,
  issues: ComponentValidationIssue[],
): void => {
  for (const rule of rules) {
    if (rule.kind === 'requiredContent') {
      const hasTextContent = typeof node.text === 'string' && node.text.trim().length > 0;
      const hasChildren = (node.children?.length ?? 0) > 0;

      if (!hasTextContent && !hasChildren) {
        issues.push({
          code: rule.code,
          message: rule.message,
          path: `${nodePath}.children`,
          rationale: rule.rationale,
          severity: 'error',
          suggestedFix: rule.suggestedFix,
        });
      }

      continue;
    }

    const isSatisfied = rule.sources.some((source) => hasContentForSource(source, node));
    if (isSatisfied) {
      continue;
    }

    issues.push({
      code: rule.code,
      message: rule.message,
      path: `${nodePath}.children`,
      rationale: rule.rationale,
      severity: rule.severity ?? 'warning',
      suggestedFix: rule.suggestedFix,
    });
  }
};

const validateStructureNode = async (
  resolveComponentPropertyDefaults: (component: string) => Promise<Record<string, IntentPresetValue>>,
  expected: IntentStructureNode,
  actual: IntentStructureNode | undefined,
  nodePath: string,
  issues: ComponentValidationIssue[],
  strictRequiredEquals: boolean,
): Promise<void> => {
  if (!actual) {
    issues.push({
      code: 'STRUCTURE_NODE_MISSING',
      message: `Missing required node "${expected.component}".`,
      path: nodePath,
      severity: 'error',
    });
    return;
  }

  const componentDefaults = strictRequiredEquals
    ? await resolveComponentPropertyDefaults(actual.component)
    : {};
  const actualWithDefaults: IntentStructureNode = {
    ...actual,
    props: {
      ...componentDefaults,
      ...(actual.props ?? {}),
    },
  };

  if (actualWithDefaults.component !== expected.component) {
    issues.push({
      code: 'STRUCTURE_COMPONENT_MISMATCH',
      message: `Expected component "${expected.component}" but found "${actualWithDefaults.component}".`,
      path: `${nodePath}.component`,
      severity: 'error',
    });
  }

  if (expected.role && actualWithDefaults.role !== expected.role) {
    issues.push({
      code: 'STRUCTURE_ROLE_MISMATCH',
      message: `Expected role "${expected.role}" but found "${actualWithDefaults.role ?? 'undefined'}".`,
      path: `${nodePath}.role`,
      severity: 'warning',
    });
  }

  if (expected.slot && actualWithDefaults.slot !== expected.slot) {
    issues.push({
      code: 'STRUCTURE_SLOT_MISMATCH',
      message: `Expected slot "${expected.slot}" but found "${actualWithDefaults.slot ?? 'undefined'}".`,
      path: `${nodePath}.slot`,
      severity: 'error',
    });
  }

  const actualClasses = new Set(actualWithDefaults.classes ?? []);
  for (const requiredClass of expected.requiredClasses ?? []) {
    if (!actualClasses.has(requiredClass)) {
      issues.push({
        code: 'STRUCTURE_REQUIRED_CLASS_MISSING',
        message: `Required class "${requiredClass}" is missing on node "${expected.component}".`,
        path: `${nodePath}.classes`,
        severity: 'error',
      });
    }
  }

  for (const forbiddenClass of expected.forbiddenClasses ?? []) {
    if (actualClasses.has(forbiddenClass)) {
      issues.push({
        code: 'STRUCTURE_FORBIDDEN_CLASS_PRESENT',
        message: `Forbidden class "${forbiddenClass}" is present on node "${expected.component}".`,
        path: `${nodePath}.classes`,
        severity: 'error',
      });
    }
  }

  evaluateNodePropRules(expected.config?.propRules ?? [], actualWithDefaults.props, nodePath, issues, strictRequiredEquals);

  if (strictRequiredEquals) {
    evaluateNodeContentRules(expected.config?.contentRules ?? [], actualWithDefaults, nodePath, issues);
  }

  if (expected.component === 'text' && expected.text && actualWithDefaults.text !== expected.text) {
    issues.push({
      code: 'STRUCTURE_TEXT_MISMATCH',
      message: `Expected text "${expected.text}" but found "${actualWithDefaults.text ?? ''}".`,
      path: `${nodePath}.text`,
      severity: 'warning',
    });
  }

  const expectedChildren = expected.children ?? [];
  const actualChildren = actualWithDefaults.children ?? [];

  // Filter actual children by slot if expected children are slot-specific
  // This allows flexible default-slot content while still validating specific slots
  const expectedHasSlots = expectedChildren.some((child) => child.slot);
  const actualChildrenBySlot = new Map<string | undefined, IntentStructureNode[]>();

  if (expectedHasSlots) {
    // Group actual children by slot attribute
    for (const child of actualChildren) {
      const { slot } = child;
      if (!actualChildrenBySlot.has(slot)) {
        actualChildrenBySlot.set(slot, []);
      }
      actualChildrenBySlot.get(slot)!.push(child);
    }

    // Validate each expected child against children in its slot
    for (let index = 0; index < expectedChildren.length; index += 1) {
      const expectedChild = expectedChildren[index];
      const expectedSlot = expectedChild.slot;
      const slottedChildren = actualChildrenBySlot.get(expectedSlot) ?? [];

      if (slottedChildren.length === 0) {
        issues.push({
          code: 'STRUCTURE_NODE_MISSING',
          message: `Missing required node "${expectedChild.component}" in slot "${expectedSlot ?? 'default'}".`,
          path: `${nodePath}.children.${index}`,
          severity: 'error',
        });
      } else {
        // Compare expected child with the first actual child in that slot
        await validateStructureNode(resolveComponentPropertyDefaults, expectedChild, slottedChildren[0], `${nodePath}.children.${index}`, issues, strictRequiredEquals);
      }
    }
  } else {
    // Original positional matching for non-slot patterns
    if (actualChildren.length < expectedChildren.length) {
      issues.push({
        code: 'STRUCTURE_CHILD_MISSING',
        message: `Expected ${expectedChildren.length} child nodes but found ${actualChildren.length}.`,
        path: `${nodePath}.children`,
        severity: 'error',
      });
    }

    if (expectedChildren.length > 0 && actualChildren.length > expectedChildren.length) {
      issues.push({
        code: 'STRUCTURE_UNEXPECTED_CHILD',
        message: `Found ${actualChildren.length - expectedChildren.length} unexpected child nodes.`,
        path: `${nodePath}.children`,
        severity: 'warning',
      });
    }

    for (let index = 0; index < expectedChildren.length; index += 1) {
      const expectedChild = expectedChildren[index];
      const actualChild = actualChildren[index];
      await validateStructureNode(resolveComponentPropertyDefaults, expectedChild, actualChild, `${nodePath}.children.${index}`, issues, strictRequiredEquals);
    }
  }
};

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
  const resolveComponentPropertyDefaults = createComponentPropertyDefaultsResolver(store);
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
      const expectedStructure: IntentStructureNode = pattern.structure ?? {
        component: query.component,
      };
      const actualStructure: IntentStructureNode = query.structure
        ? {
          ...query.structure,
          props: query.structure.props ?? query.props,
        }
        : {
          component: query.component,
          props: query.props,
        };

      await validateStructureNode(resolveComponentPropertyDefaults, expectedStructure, actualStructure, 'structure', issues, !!query.structure);
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
        propRules: pattern.structure?.config?.propRules ?? [],
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

    const forbiddenRules = pattern.structure?.config?.propRules?.filter((r) => r.kind === 'forbidden')
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

    const pattern = resolveUsagePatternFromRegistry(capability.target, intent.id, phases) as IntentOptionPatternLike | null;

    renderableTargets.push({
      phase: pattern?.phase,
      previewCode: snippet,
      priority: pattern?.priority,
      reason: pattern?.description ?? `Renderable option for intent "${intent.id}".`,
      targetId,
      targetName: capability.target.name,
      targetRole: pattern?.targetRole,
    });
  }

  renderableTargets.sort(compareIntentOptions);
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
