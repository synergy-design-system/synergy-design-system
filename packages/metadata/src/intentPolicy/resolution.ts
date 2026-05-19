import {
  intentCategories,
  intents,
  targetCapabilities,
  usagePatterns,
} from './registry.js';
import {
  INTENT_OUTPUT_NAME,
  INTENT_POLICY_LAYER_NAME,
  INTENT_RESOLUTION_PROCESS_NAME,
  type IntentCapability,
  type IntentCategory,
  type IntentDefinition,
  type IntentPhase,
  type IntentResolutionResult,
  type IntentTargetKind,
  type IntentTargetRef,
  type IntentUsagePattern,
} from './types.js';

const normalize = (value: string): string => value.trim().toLowerCase();
const DEFAULT_PHASE: IntentPhase = 'experimental';
const ALL_PHASES: IntentPhase[] = ['experimental', 'preview', 'stable', 'deprecated'];
const TARGET_KINDS: IntentTargetKind[] = [
  'asset',
  'component',
  'style',
];

const isTargetKind = (value: string): value is IntentTargetKind => TARGET_KINDS.includes(value as IntentTargetKind);
const isIntentPhase = (value: string): value is IntentPhase => ALL_PHASES.includes(value as IntentPhase);

const normalizePhase = (phase?: string): IntentPhase => {
  if (!phase) {
    return DEFAULT_PHASE;
  }

  const normalized = normalize(phase);
  return isIntentPhase(normalized) ? normalized : DEFAULT_PHASE;
};

const normalizePhaseFilter = (phases?: IntentPhase[]): Set<IntentPhase> => {
  if (!phases || phases.length === 0) {
    return new Set([DEFAULT_PHASE]);
  }

  const normalized = phases
    .map((phase) => normalizePhase(phase))
    .filter((phase, index, list) => list.indexOf(phase) === index);

  return new Set(normalized.length > 0 ? normalized : [DEFAULT_PHASE]);
};

const isAllowedPhase = (phase: IntentPhase, allowedPhases: Set<IntentPhase>): boolean => allowedPhases.has(phase);

const withCategoryPhase = (category: IntentCategory): IntentCategory => ({
  ...category,
  phase: normalizePhase(category.phase),
});

const withIntentPhase = (intent: IntentDefinition): IntentDefinition => ({
  ...intent,
  phase: normalizePhase(intent.phase),
});

const withCapabilityPhase = (capability: IntentCapability): IntentCapability => ({
  ...capability,
  phase: normalizePhase(capability.phase),
});

const withPatternPhase = (pattern: IntentUsagePattern): IntentUsagePattern => ({
  ...pattern,
  phase: normalizePhase(pattern.phase),
});

/**
 * Normalize an intent ID for deterministic registry lookup.
 */
export const normalizeIntentId = (intentId: string): string => normalize(intentId);

/**
 * Normalize a target reference so matching stays deterministic across registry lookups.
 */
export const normalizeTargetRef = (target: IntentTargetRef): IntentTargetRef => {
  const normalizedKind = normalize(target.kind);
  const kind: IntentTargetKind = isTargetKind(normalizedKind) ? normalizedKind : 'component';

  const classes = target.classes
    ?.map((entry) => normalize(entry).replace(/^\./, ''))
    .filter(Boolean);

  const normalized: IntentTargetRef = {
    kind,
  };

  if (target.id) {
    normalized.id = normalize(target.id);
  }

  if (target.name) {
    normalized.name = normalize(target.name);
  }

  if (target.selector) {
    normalized.selector = normalize(target.selector);
  }

  if (target.layer) {
    normalized.layer = normalize(target.layer);
  }

  if (classes && classes.length > 0) {
    normalized.classes = Array.from(new Set(classes)).sort();
  }

  return normalized;
};

const targetKey = (target: IntentTargetRef): string => {
  const normalized = normalizeTargetRef(target);

  if (normalized.id) {
    return `${normalized.kind}|id:${normalized.id}`;
  }

  if (normalized.selector) {
    return `${normalized.kind}|selector:${normalized.selector}`;
  }

  if (normalized.classes && normalized.classes.length > 0) {
    return `${normalized.kind}|classes:${normalized.classes.join('.')}`;
  }

  if (normalized.name) {
    return `${normalized.kind}|name:${normalized.name}`;
  }

  return `${normalized.kind}|unknown`;
};

const getCapabilityTarget = (capability: IntentCapability): IntentTargetRef => normalizeTargetRef(capability.target);

const getPatternTarget = (pattern: IntentUsagePattern): IntentTargetRef => normalizeTargetRef(pattern.target);

/**
 * List intent categories from the in-memory registry.
 */
export const listIntentCategoriesFromRegistry = (phases?: IntentPhase[]): IntentCategory[] => {
  const allowedPhases = normalizePhaseFilter(phases);
  return structuredClone(intentCategories)
    .map(withCategoryPhase)
    .filter((category) => isAllowedPhase(category.phase ?? DEFAULT_PHASE, allowedPhases));
};

/**
 * List intent definitions from the in-memory registry.
 */
export const listIntentsFromRegistry = (category?: string, phases?: IntentPhase[]): IntentDefinition[] => {
  const allowedPhases = normalizePhaseFilter(phases);
  const categoriesById = new Map(
    structuredClone(intentCategories)
      .map(withCategoryPhase)
      .map((entry) => [normalize(entry.id), entry]),
  );

  const filteredIntents = structuredClone(intents)
    .map(withIntentPhase)
    .filter((intent) => {
      const intentPhase = intent.phase ?? DEFAULT_PHASE;
      if (!isAllowedPhase(intentPhase, allowedPhases)) {
        return false;
      }

      const categoryEntry = categoriesById.get(normalize(intent.category));
      const categoryPhase = categoryEntry?.phase ?? DEFAULT_PHASE;
      return isAllowedPhase(categoryPhase, allowedPhases);
    });

  if (!category) {
    return filteredIntents;
  }

  const normalizedCategory = normalize(category);
  return filteredIntents.filter((intent) => normalize(intent.category) === normalizedCategory);
};

/**
 * Return a single intent definition by ID if present and phase-compatible.
 */
export const getIntentFromRegistry = (intentId: string, phases?: IntentPhase[]): IntentDefinition | null => {
  const allowedPhases = normalizePhaseFilter(phases);
  const categoriesById = new Map(
    structuredClone(intentCategories)
      .map(withCategoryPhase)
      .map((entry) => [normalize(entry.id), entry]),
  );

  const normalizedIntent = normalizeIntentId(intentId);
  const intent = structuredClone(intents)
    .map(withIntentPhase)
    .find((candidate) => normalize(candidate.id) === normalizedIntent);

  if (!intent) {
    return null;
  }

  const intentPhase = intent.phase ?? DEFAULT_PHASE;
  if (!isAllowedPhase(intentPhase, allowedPhases)) {
    return null;
  }

  const categoryEntry = categoriesById.get(normalize(intent.category));
  const categoryPhase = categoryEntry?.phase ?? DEFAULT_PHASE;
  if (!isAllowedPhase(categoryPhase, allowedPhases)) {
    return null;
  }

  return intent;
};

/**
 * Return the capability declaration for a normalized target reference.
 */
export const getTargetCapabilityFromRegistry = (target: IntentTargetRef, phases?: IntentPhase[]): IntentCapability | null => {
  const allowedPhases = normalizePhaseFilter(phases);
  const normalizedTargetKey = targetKey(target);
  const capability = structuredClone(targetCapabilities)
    .map(withCapabilityPhase)
    .find((candidate) => (
      targetKey(getCapabilityTarget(candidate)) === normalizedTargetKey
        && isAllowedPhase(candidate.phase ?? DEFAULT_PHASE, allowedPhases)
    ));

  return capability ?? null;
};

/**
 * Resolve one target + intent pair to the matching usage pattern.
 */
export const resolveUsagePatternFromRegistry = (
  target: IntentTargetRef,
  intentId: string,
  phases?: IntentPhase[],
): IntentUsagePattern | null => {
  const allowedPhases = normalizePhaseFilter(phases);
  const normalizedTargetKey = targetKey(target);
  const normalizedIntent = normalizeIntentId(intentId);

  const pattern = structuredClone(usagePatterns)
    .map(withPatternPhase)
    .find((candidate) => (
      targetKey(getPatternTarget(candidate)) === normalizedTargetKey
        && normalize(candidate.intent) === normalizedIntent
        && isAllowedPhase(candidate.phase ?? DEFAULT_PHASE, allowedPhases)
    ));

  return pattern ?? null;
};

/**
 * Check whether a target is eligible to resolve a given intent.
 */
export const canTargetResolveIntent = (
  target: IntentTargetRef,
  intentId: string,
  phases?: IntentPhase[],
): boolean => {
  const capability = getTargetCapabilityFromRegistry(target, phases);
  const intent = getIntentFromRegistry(intentId, phases);

  if (!capability || !intent) {
    return false;
  }

  return capability.categories.map(normalize).includes(normalize(intent.category));
};

/**
 * List all capabilities that support the category of a given intent.
 */
export const listCapabilitiesForIntentFromRegistry = (
  intentId: string,
  phases?: IntentPhase[],
): IntentCapability[] => {
  const intent = getIntentFromRegistry(intentId, phases);
  if (!intent) {
    return [];
  }

  const allowedPhases = normalizePhaseFilter(phases);
  const normalizedCategory = normalize(intent.category);

  return structuredClone(targetCapabilities)
    .map(withCapabilityPhase)
    .filter(
      (capability) => isAllowedPhase(capability.phase ?? DEFAULT_PHASE, allowedPhases)
        && capability.categories.map(normalize).includes(normalizedCategory),
    );
};

/**
 * Resolve a target + intent pair to a full intent-resolution payload.
 */
export const resolveIntentFromRegistry = (
  target: IntentTargetRef,
  intentId: string,
  phases?: IntentPhase[],
): IntentResolutionResult | null => {
  if (!canTargetResolveIntent(target, intentId, phases)) {
    return null;
  }

  const pattern = resolveUsagePatternFromRegistry(target, intentId, phases);
  if (!pattern) {
    return null;
  }

  return {
    architecture: INTENT_POLICY_LAYER_NAME,
    output: INTENT_OUTPUT_NAME,
    pattern,
    process: INTENT_RESOLUTION_PROCESS_NAME,
  };
};
