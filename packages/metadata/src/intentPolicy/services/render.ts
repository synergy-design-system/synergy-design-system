import {
  listCapabilitiesForIntentFromRegistry,
  normalizeTargetRef,
  resolveUsagePatternFromRegistry,
} from '../resolution.js';
import { renderIntentUsagePattern } from '../renderers/index.js';
import type {
  IntentPhase,
  IntentTargetRef,
  IntentTargetRole,
  IntentUsagePattern,
} from '../types.js';
import type { FrameworkProfile } from '../intermediate-representation/types.js';

/**
 * Query payload for rendering a target + intent pair to framework output.
 */
export type RenderIntentQuery = {
  content?: string;
  framework: FrameworkProfile;
  includePhases?: IntentPhase[];
  intent: string;
  target?: IntentTargetRef;
};

const getIntentTargetRoleWeight = (targetRole?: IntentTargetRole): number => {
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

const compareIntentPatterns = (a: IntentUsagePattern, b: IntentUsagePattern): number => {
  const roleWeightDifference = getIntentTargetRoleWeight(b.targetRole) - getIntentTargetRoleWeight(a.targetRole);
  if (roleWeightDifference !== 0) {
    return roleWeightDifference;
  }

  const priorityDifference = (b.priority ?? 0) - (a.priority ?? 0);
  if (priorityDifference !== 0) {
    return priorityDifference;
  }

  const aTargetId = a.target.id ?? a.target.name ?? a.target.selector ?? `${a.target.kind}:unknown`;
  const bTargetId = b.target.id ?? b.target.name ?? b.target.selector ?? `${b.target.kind}:unknown`;
  return aTargetId.localeCompare(bTargetId);
};

/**
 * Resolve and render a registered intent pattern into framework-specific markup.
 */
export const renderIntentFromRegistry = (
  query: RenderIntentQuery,
): string | null => {
  if (!query.intent) {
    return null;
  }

  let pattern = null;
  const explicitTarget = query.target && query.target.kind ? query.target : null;

  if (explicitTarget) {
    pattern = resolveUsagePatternFromRegistry(
      normalizeTargetRef(explicitTarget),
      query.intent,
      query.includePhases,
    );
  }

  if (!pattern && !explicitTarget) {
    const candidateCapabilities = listCapabilitiesForIntentFromRegistry(query.intent, query.includePhases);
    const candidatePatterns = candidateCapabilities
      .map((capability) => resolveUsagePatternFromRegistry(
        normalizeTargetRef(capability.target),
        query.intent,
        query.includePhases,
      ))
      .filter((candidatePattern): candidatePattern is IntentUsagePattern => candidatePattern !== null)
      .sort(compareIntentPatterns);

    if (candidatePatterns.length > 0) {
      [pattern] = candidatePatterns;
    }
  }

  if (!pattern) {
    return null;
  }

  return renderIntentUsagePattern(
    pattern,
    query.framework,
    query.content ?? 'CONTENT',
  );
};
