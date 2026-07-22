import { z } from 'zod';
import type { FrameworkProfile, IntentPhase } from '@synergy-design-system/metadata';

/**
 * Available intent phases for categorizing intents in the intent policy layer.
 * These phases indicate the maturity and stability of intents, helping developers understand their expected behavior and potential changes.
 * The phases include:
 */
export const INTENT_PHASE_VALUES = [
  'stable',
  'preview',
  'experimental',
  'deprecated',
] as const satisfies readonly IntentPhase[];

/**
 * Default intent phases to include when listing intent categories.
 */
export const INTENT_DEFAULT_PHASES = ['experimental'] as const satisfies readonly IntentPhase[];

export const INTENT_FRAMEWORK_VALUES = [
  'react-wrapper',
  'react-web-components',
  'angular',
  'vue',
  'vanilla',
] as const satisfies readonly FrameworkProfile[];

export type IntentToolFramework = (typeof INTENT_FRAMEWORK_VALUES)[number];

export const INTENT_DEFAULT_FRAMEWORK: IntentToolFramework = 'vanilla';

export const intentPhaseSchema = z.enum(INTENT_PHASE_VALUES);
export const intentFrameworkSchema = z.enum(INTENT_FRAMEWORK_VALUES);
