import {
  listCapabilitiesForIntentFromRegistry,
  normalizeTargetRef,
  resolveUsagePatternFromRegistry,
} from '../resolution.js';
import { renderIntentUsagePattern } from '../renderers/index.js';
import type { IntentPhase, IntentTargetRef } from '../types.js';
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

    for (const capability of candidateCapabilities) {
      const candidatePattern = resolveUsagePatternFromRegistry(
        normalizeTargetRef(capability.target),
        query.intent,
        query.includePhases,
      );

      if (candidatePattern) {
        pattern = candidatePattern;
        break;
      }
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
